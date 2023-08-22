"""
The module containing logic for DROP TABLE statements.
"""

from __future__ import annotations
from .statement import Statement
if False:
    from ..entity import Entity


class DropTable(Statement):
    """
    The class containing the logic for building and executing DROP TABLE statements with SQLiteFrame.
    """

    def __init__(self, table: Entity):
        """
        :param table: The table this query is associated with
        """
        super().__init__(table.database)
        self.table = table

    def build_sql(self) -> str:
        return f"DROP TABLE IF EXISTS {self.table};"
