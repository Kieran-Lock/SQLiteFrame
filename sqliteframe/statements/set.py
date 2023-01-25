from __future__ import annotations
from .statement import Statement
from ..where import Where
if False:
    from typing import TypeVar
    from ..table import Column, Table
    ColumnT = TypeVar("ColumnT", bound=Column)


class Set(Statement):
    def __init__(self, table: Table, data: dict[ColumnT, ColumnT.type.decoded_type]):
        super().__init__(table)
        self.data = data.items()
        self.where_statement = None

    def where(self, where: Where) -> Set:
        self.where_statement = where
        return self

    def build_sql(self) -> str:
        set_section = ", ".join(f"{column.name} = {column.type.encode(value)}" for column, value in self.data)
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        return f"UPDATE {self.table}\nSET {set_section}{where_section};"
