from __future__ import annotations
from .statement import Statement
if False:
    from typing import TypeVar
    from ..table import Column, Table
    ColumnT = TypeVar("ColumnT", bound=Column)


class InsertInto(Statement):
    def __init__(self, table: Table, data: dict[ColumnT, ColumnT.type.decoded_type]):
        super().__init__(table)
        self.data = data.items()

    def build_sql(self) -> str:
        columns_section = ", ".join(column.name for column, _ in self.data)
        values_section = ", ".join(str(column.type.encode(value)) for column, value in self.data)
        return f"INSERT INTO {self.table} ({columns_section})\nVALUES ({values_section});"
