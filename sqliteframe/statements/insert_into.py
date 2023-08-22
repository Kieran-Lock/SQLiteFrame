"""
The module containing logic for INSERT INTO statements.
"""

from __future__ import annotations
from typing import TypeVar, TYPE_CHECKING
from .statement import Statement
if TYPE_CHECKING:
    from ..entity import Column, Entity
    ColumnT = TypeVar("ColumnT", bound=Column)


class InsertInto(Statement):
    """
    The class containing the logic for building and executing INSERT INTO statements with SQLiteFrame.
    """

    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):
        """
        :param table: The table this query is associated with
        :param data: A mapping of the column and corresponding data to insert into the given table
        """
        super().__init__(table.database)
        self.table = table
        self.data = data.items()

    def build_sql(self) -> str:
        columns_section = ", ".join(column.name for column, _ in self.data)
        values_section = ", ".join(self.parameter(column.type.encode(value)) for column, value in self.data)
        return f"INSERT INTO {self.table} ({columns_section})\nVALUES ({values_section});"
