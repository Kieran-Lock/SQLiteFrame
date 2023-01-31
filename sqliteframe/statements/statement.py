from __future__ import annotations
from typing import Callable
from abc import ABC, abstractmethod
from ..result import Result
if False:
    from ..table import Column
    from ..database import Database


class Statement(ABC):
    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: []):
        self.database = database
        self.yield_column_factory = yield_column_factory

    def __str__(self) -> str:
        return self.build_sql()

    @abstractmethod
    def build_sql(self) -> str:
        return ""

    def execute(self) -> Result:
        return Result(self.yield_column_factory(), self.database.execute(self))
