from __future__ import annotations
from typing import Optional
from abc import ABC, abstractmethod
from .result import Result
if False:
    from ..table import Table, Column


class Statement(ABC):
    def __init__(self, table: Table, yield_columns: Optional[list[Column]] = None):
        self.table = table
        self.yield_columns = [] if yield_columns is None else yield_columns

    def __str__(self) -> str:
        return self.build_sql()

    @abstractmethod
    def build_sql(self) -> str:
        return ""

    def execute(self) -> Result:
        return Result(self.yield_columns, self.table.database.execute(self))
