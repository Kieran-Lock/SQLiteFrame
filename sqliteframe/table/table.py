from __future__ import annotations
from typing import TypeVar, Literal, Iterable, Optional
from pprint import pformat
from inspect import getmembers, isroutine
from .column import Column
from ..types import Type
from ..statements import InsertInto, Set, CreateTable, Select, DeleteFrom, DropTable
from ..wildcards import Wildcards
from ..foreign_key import ForeignKey
if False:
    from ..database import Database


TableT = TypeVar("TableT", bound=type)
ColumnT = TypeVar("ColumnT", bound=Column)


class Table:
    def __init__(self, database: Database):
        self.database = database
        self.table_name = None
        self.columns = []

    def __call__(self, table: TableT) -> Table | TableT:
        self.database.add_table(self)
        self.table_name = table.__name__
        for column in self.extract_columns(table):
            if hasattr(self, column.name):
                raise NameError(f"Column name '{column.name}' cannot exist within a table") from None
            setattr(self, column.name, column)
            self.columns.append(column)
        with self.database.connection():
            CreateTable(self, self.columns).execute()
        return self

    def __repr__(self) -> str:
        return pformat(self.columns)

    def __str__(self) -> str:
        return self.table_name

    def extract_columns(self, table: TableT):
        column_information = list(filter(lambda member: not member[0].startswith("__"),
                                         getmembers(table, lambda member: not isroutine(member))))
        for name, column in column_information:
            yield self.amend_column(name, column)

    def amend_column(self, column_name: str, column_type: Type | type | ForeignKey) -> Column:
        if isinstance(column_type, type):  # Plain Key
            column_type = column_type()
        return Column(self, column_name, column_type)

    def sort_columns(self, columns: Iterable[Column | Wildcards],
                     base_columns_override: Optional[list[Column]] = None) -> list:
        base_columns = self.columns if base_columns_override is None else base_columns_override
        if Wildcards.All in columns:
            return base_columns
        return sorted(columns, key=lambda column: base_columns.index(column))

    def set(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> Set:
        for column in data:
            if not column.is_nullable and data[column] is None:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
        return Set(self, data)

    def insert_into(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> InsertInto:
        for column in data:
            if not column.is_nullable and data[column] is None:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
        for column in set(self.columns) - set(data):
            if not column.is_nullable:
                raise ValueError(f"Non-nullable column '{column.name}' passed NULL") from None
            data[column] = None
        return InsertInto(self, data)

    def select(self, *columns: Column | Literal[Wildcards.All], distinct: bool = False) -> Select:
        if Wildcards.All in columns:
            columns = [Wildcards.All]
        return Select(self, list(columns), distinct=distinct)

    def delete_from(self) -> DeleteFrom:
        return DeleteFrom(self)

    def drop_table(self) -> DropTable:
        return DropTable(self)

    def __getitem__(self, item: ColumnT.type.decoded_type) -> ColumnT.type.decoded_type:
        return item
