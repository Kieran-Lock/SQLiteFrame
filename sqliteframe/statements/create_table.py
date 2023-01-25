from __future__ import annotations
from .statement import Statement
if False:
    from ..table import Column, Table


class CreateTable(Statement):
    def __init__(self, table: Table, columns: list[Column]):
        super().__init__(table)
        self.columns = columns
        self.foreign_key_columns = list(filter(lambda column: column.is_foreign_key, self.columns))

    def build_sql(self) -> str:
        columns_section = "\n".join(f"\t{column.name} {column}," for column in self.columns)
        if not self.foreign_key_columns:
            columns_section = columns_section[:-1]
        foreign_key_section = ("\n\n\t" if self.foreign_key_columns else "") + "\n".join(
            column.type.sql_restraint(column).replace("\n", "\n\t") for column in self.foreign_key_columns)
        return f"CREATE TABLE IF NOT EXISTS {self.table} (\n{columns_section}{foreign_key_section}\n);"
