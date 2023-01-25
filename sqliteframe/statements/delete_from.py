from __future__ import annotations
from .statement import Statement
from ..where import Where, Condition
if False:
    from ..table import Table


class DeleteFrom(Statement):
    def __init__(self, table: Table):
        super().__init__(table)
        self.where_statement = None

    def build_sql(self) -> str:
        where_section = "" if self.where is None else f"\nWHERE {self.where_statement}"
        return f"DELETE FROM {self.table}{where_section};"

    def where(self, where: Where | Condition) -> DeleteFrom:
        if self.where_statement is None:
            self.where_statement = where
        else:
            self.where_statement &= where
        return self
