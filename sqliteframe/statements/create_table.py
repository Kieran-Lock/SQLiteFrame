"""
The module containing logic for CREATE TABLE statements.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .statement import Statement
if TYPE_CHECKING:
    from ..entity import Column, Entity


class CreateTable(Statement):
    """
    The class containing the logic for building and executing CREATE TABLE statements with SQLiteFrame.
    """

    def __init__(self, table: Entity, columns: list[Column]):
        """

        :param table: The table this query is associated with
        :param columns: The columns the table being created should have
        """
        super().__init__(table.database)
        self.table = table
        self.columns = columns
        self.foreign_key_columns = list(filter(lambda column: column.is_foreign_key, self.columns))

    def build_sql(self) -> str:
        columns_section = "\n".join(f"\t{column.name} {column}," for column in self.columns)
        if not self.foreign_key_columns:
            columns_section = columns_section[:-1]
        foreign_key_section = ("\n\n\t" if self.foreign_key_columns else "") + "\n".join(
            column.type.sql_restraint(column).replace("\n", "\n\t") for column in self.foreign_key_columns)
        return f"CREATE TABLE IF NOT EXISTS {self.table} (\n{columns_section}{foreign_key_section}\n);"
