from __future__ import annotations
from .statement import Statement
if False:
    from ..entity import Entity


class DropTable(Statement):
    def __init__(self, table: Entity):
        super().__init__(table.database)
        self.table = table

    def build_sql(self) -> str:
        return f"DROP TABLE IF EXISTS {self.table};"
