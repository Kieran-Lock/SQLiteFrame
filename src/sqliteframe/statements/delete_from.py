"""
The module containing logic for DELETE FROM statements.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .statement import Statement
from ..where import Where, Condition
if TYPE_CHECKING:
    from ..entity import Entity


class DeleteFrom(Statement):
    """
    The class containing the logic for building and executing DELETE FROM statements with SQLiteFrame.
    """

    def __init__(self, table: Entity):
        """
        :param table: The table this query is associated with
        """
        super().__init__(table.database)
        self.table = table
        self.where_statement = None

    def build_sql(self) -> str:
        where_section = "" if self.where is None else f"\nWHERE {self.where_statement}"
        return f"DELETE FROM {self.table}{where_section};"

    def where(self, where: Where | Condition) -> DeleteFrom:
        """
        A method to attach WHERE clauses onto the DELETE FROM statement

        :param where: The WHERE clause to add to the statement
        :return: A mutated version of this statement with the extended WHERE clause
        """

        if self.where_statement is None:
            where.register(self)
            self.where_statement = where
        else:
            self.where_statement &= where
        return self
