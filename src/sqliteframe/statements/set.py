"""
The module containing logic for SET statements.
"""

from __future__ import annotations
from typing import TypeVar, TYPE_CHECKING
from .statement import Statement
from ..where import Where
if TYPE_CHECKING:
    from ..entity import Column, Entity
    ColumnT = TypeVar("ColumnT", bound=Column)


class Set(Statement):
    """
    The class containing the logic for building and executing SET statements with SQLiteFrame.
    """

    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):
        """
        :param table: The table this query is associated with
        :param data: A mapping of the column and corresponding data to set in the given table
        """

        super().__init__(table.database)
        self.table = table
        self.data = data.items()
        self.where_statement = None

    def where(self, where: Where) -> Set:
        """
        A method to attach WHERE clauses onto the SET statement

        :param where: The WHERE clause to add to the statement
        :return: A mutated version of this statement with the extended WHERE clause
        """

        if self.where_statement is None:
            where.register(self)
            self.where_statement = where
        else:
            self.where_statement &= where
        return self

    def build_sql(self) -> str:
        set_section = ", ".join(f"{column.name} = {self.parameter(column.type.encode(value))}"
                                for column, value in self.data)
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        return f"UPDATE {self.table}\nSET {set_section}{where_section};"
