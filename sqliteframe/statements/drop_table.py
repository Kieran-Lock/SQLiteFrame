from __future__ import annotations
from .statement import Statement
if False:
    from ..table import Table


class DropTable(Statement):
    def __init__(self, table: Table):
        super().__init__(table)

    def build_sql(self) -> str:
        return f"DROP TABLE IF EXISTS {self.table};"
