"""
The module containing the logic for entities (tables) in SQLiteFrame
"""

from __future__ import annotations
from typing import TypeVar, Literal, Iterable, Optional, Callable, Iterator, TYPE_CHECKING
from pprint import pformat
from inspect import getmembers, isroutine
from .column import Column
from ..types import Type
from ..statements import InsertInto, Set, CreateTable, Select, DeleteFrom, DropTable
from ..wildcards import Wildcards
from ..foreign_key import ForeignKey
if TYPE_CHECKING:
    from ..database import Database


TableT = TypeVar("TableT")
ColumnT = TypeVar("ColumnT", bound=Column)


def table(database: Database, auto_create: bool = True) -> Callable[[type[TableT]], Entity | TableT]:
    """
    The decorator used to declare a table in a schema.

    :param database: The database the table belongs to
    :param auto_create: Whether the table should be created in the database automatically, after it is declared
    :return: A wrapper function to convert a valid class into an Entity
    """

    def wrapper(table_: type[TableT]) -> Entity | type[TableT]:
        """
        The wrapper method in the decorator, which returns an Entity from a valid class.

        :param table_: The class to convert
        :return: An entity object with all the declared data
        """

        return Entity(table_, database, auto_create=auto_create)
    return wrapper


class Entity:
    """
    The class containing the logic for Entities in SQLiteFrame.
    """

    def __init__(self, table_: Type[TableT], database: Database, auto_create: bool = True):
        """
        :param table_: The decorated table class
        :param database: The database the table belongs to
        :param auto_create: Whether the table should be created in the database automatically, after it is declared
        """
        self.database = database
        self.auto_create = auto_create
        self.table_name = None
        self.columns = []
        self.integrate_with_structure(table_)

    def integrate_with_structure(self, table_: Type[TableT]) -> None:
        """
        Creates and registers the table with the database as necessary and declared.

        :param table_: The decorated table class
        """

        self.database.add_table(self)
        self.table_name = table_.__name__
        for column in self.extract_columns(table_):
            if hasattr(self, column.name):
                raise NameError(f"Column name '{column.name}' cannot exist within a table") from None
            setattr(self, column.name, column)
            self.columns.append(column)
        if self.auto_create:
            with self.database.connection():
                try:
                    self.create_table().execute()
                except NameError:
                    raise ValueError("Cannot lazy-load foreign key with auto_create=True") from None

    def __repr__(self) -> str:
        """
        An internal string representation of the table.

        :return: The columns of this table formatted as a string
        """
        return pformat(self.columns)

    def __str__(self) -> str:
        """
        A string representation of the table.

        :return: The name of the table
        """
        return self.table_name

    def extract_columns(self, table_: Type[TableT]) -> Iterator[Column]:
        """
        Extracts the declared columns from a valid class definition of a class in the schema.

        :param table_: The decorated table class
        :return: A generator which iterates each of the created Column objects
        """

        column_information = list(filter(lambda member: not member[0].startswith("__"),
                                         getmembers(table_, lambda member: not isroutine(member))))
        for name, column in column_information:
            yield self.amend_column(name, column)

    def amend_column(self, column_name: str, column_type: Type | type | ForeignKey) -> Column:
        """
        Converts a column as defined in the schema into a valid Column object.

        :param column_name: The defined name of the column
        :param column_type: The defined type of the column
        :return: The valid column object to be used by SQLiteFrame
        """
        if isinstance(column_type, type):  # Plain Key
            column_type = column_type()
        return Column(self, column_name, column_type)

    def sort_columns(self, columns: Iterable[Column | Wildcards],
                     base_columns_override: Optional[list[Column]] = None) -> list[Column]:
        """
        Returns the given columns in the correct order as per the schema.

        This is used in SELECT statements to ensure that the column order
        matches with the order of columns in the returned data.

        :param columns: The columns to sort
        :param base_columns_override: An override mechanism for the columns to base the ordering off of
        :return: The sorted list of columns
        """
        base_columns = self.columns if base_columns_override is None else base_columns_override
        if Wildcards.All in columns:
            return base_columns
        return sorted(columns, key=lambda column: base_columns.index(column))

    def set(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> Set:
        """
        Create a SET statement which runs on this table.

        :param data: The data to set into this table as a valid mapping
        :return: A Set statement object, which can be operated on further.
        """

        for column in data:
            if not column.is_nullable and data[column] is None:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
        return Set(self, data)

    def insert_into(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> InsertInto:
        """
        Create an INSERT INTO statement which runs on this table.

        :param data: The data to set into this table as a valid mapping
        :return: An InsertInto statement object, which can be operated on further.
        """

        for column in data:
            if not column.is_nullable and data[column] is None:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
        for column in set(self.columns) - set(data):
            if not column.is_nullable and column.default is None:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
            data[column] = None
        return InsertInto(self, data)

    def select(self, *columns: Column | Literal[Wildcards.All], distinct: bool = False) -> Select:
        """
        Create an SELECT statement which runs on this table.

        :param columns: The column(s) to select
        :param distinct: Whether to select only distinct (non-duplicate) data
        :return: A Select statement object, which can be operated on further.
        """

        if Wildcards.All in columns:
            columns = [Wildcards.All]
        return Select(self, list(columns), distinct=distinct)

    def delete_from(self) -> DeleteFrom:
        """
        Create an DELETE FROM statement which runs on this table.

        :return: A DeleteFrom statement object, which can be operated on further.
        """

        return DeleteFrom(self)

    def drop_table(self) -> DropTable:
        """
        Create an DROP TABLE statement which runs on this table.

        :return: A DropTable statement object, which can be operated on further.
        """

        return DropTable(self)

    def __getitem__(self, item: ColumnT.type.decoded_type) -> ColumnT.type.decoded_type:
        """
        Entity[data] --> data

        This is method which serves only to create a more declarative API - it can be used when inserting
        or setting data into a foreign key column, to explicitly show which table the data being input
        is intended to be coming from.

        :param item: The data in the primary key column of this table
        :return: The same data input as a parameter
        """

        return item

    def create_table(self) -> CreateTable:
        """
        Create an CREATE TABLE statement which runs on this table.

        :return: A CreateTable statement object, which can be operated on further.
        """
        return CreateTable(self, self.columns)
