from __future__ import annotations
from .statement import Statement
from sqliteframe.wildcards.wildcards import Wildcards
from ..where import Where, Condition
from ..join import Join, JoinTypes

if False:
    from ..table import Column, Table


class Select(Statement):
    def __init__(self, table: Table, columns: list[Column | Wildcards], distinct: bool = False):
        super().__init__(table, yield_column_factory=lambda: self.columns)
        if not filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],
                      set(columns) - set(self.table.columns)):
            columns = set(sorted(columns, key=lambda column: self.table.columns.index(column)))
        self.passed_columns = columns
        self.columns = self.table.columns if Wildcards.All in columns else self.passed_columns[:]
        self.distinct = distinct
        self.where_statement = None
        self.join_statements = []

    def build_sql(self) -> str:
        distinct_section = " DISTINCT" if self.distinct else ""
        columns_section = ", ".join(map(lambda column: column.name, self.columns))
        join_section = ("\n" + "\n".join(map(str, self.join_statements))) if self.join_statements else ""
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        return f"SELECT{distinct_section} {columns_section}\nFROM {self.table}{join_section}{where_section};"

    def where(self, where: Where | Condition) -> Select:
        if self.where_statement is None:
            self.where_statement = where
        else:
            self.where_statement &= where
        return self

    def join(self, table: Table, where: Where | Condition, join_type: JoinTypes = JoinTypes.INNER) -> Select:
        if Wildcards.All in self.passed_columns:
            self.columns = self.columns + table.columns if join_type == JoinTypes.LEFT else table.columns + self.columns
        else:
            joined_columns = set(self.columns) - set(self.table.columns)
            original_columns = set(self.columns) - joined_columns
            self.columns = table.sort_columns(joined_columns) + self.table.sort_columns(original_columns) if \
                join_type == JoinTypes.LEFT else \
                self.table.sort_columns(original_columns) + table.sort_columns(joined_columns)
        self.join_statements.append(Join(table, where, join_type))
        return self
