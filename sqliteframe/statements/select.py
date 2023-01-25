from __future__ import annotations
from .statement import Statement
from ..where import Where
if False:
    from ..table import Column, Table


class Select(Statement):
    def __init__(self, table: Table, columns: list[Column], distinct: bool = False):
        super().__init__(table, yield_columns=columns)
        self.columns = columns
        self.distinct = distinct
        self.where_statement = None

    def build_sql(self) -> str:
        distinct_section = " DISTINCT" if self.distinct else ""
        columns_section = ", ".join(column.name for column in self.columns)
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        return f"SELECT{distinct_section} {columns_section}\nFROM {self.table}{where_section};"

    def where(self, where: Where) -> Select:
        if self.where_statement is None:
            self.where_statement = where
        else:
            self.where_statement &= where
        return self
