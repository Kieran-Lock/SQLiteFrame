from __future__ import annotations
from .statement import Statement
from .wildcards import Wildcards
from ..where import Where, Join, Condition

if False:
    from ..table import Column, Table


class Select(Statement):
    def __init__(self, table: Table, columns: list[Column], distinct: bool = False):
        super().__init__(table, yield_columns=columns)
        if not filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],
                      set(columns) - set(self.table.columns)):
            columns = set(sorted(columns, key=lambda column: self.table.columns.index(column)))
        self.columns = columns
        self.distinct = distinct
        self.where_statement = None
        self.join_statements = []

    def build_sql(self) -> str:
        distinct_section = " DISTINCT" if self.distinct else ""
        columns_section = ", ".join(column if column in [wildcard.value for wildcard in Wildcards]
                                    else column.name for column in self.columns)
        join_section = ("\nINNER JOIN " + "\n".join(map(str, self.join_statements))) if self.join_statements else ""
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        return f"SELECT{distinct_section} {columns_section}\nFROM {self.table}{join_section}{where_section};"

    def where(self, where: Where | Condition) -> Select:
        if self.where_statement is None:
            self.where_statement = where
        else:
            self.where_statement &= where
        return self

    def join(self, table: Table, where: Where | Condition) -> Select:
        joined_columns = set(filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],
                                    set(self.columns) - set(self.table.columns)))
        original_columns = set(self.columns) - joined_columns
        for col in joined_columns:
            print(joined_columns, col, type(col), sep=" OMEGALUL ")
            break
        self.columns = list(sorted(original_columns, key=lambda column: self.table.columns.index(column))) + list(
            sorted(joined_columns, key=lambda column: column.table.columns.index(column)))
        self.join_statements.append(Join(table, where))
        return self
