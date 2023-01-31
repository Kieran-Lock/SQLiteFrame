from __future__ import annotations
from typing import Callable
from abc import ABC, abstractmethod
from ..result import Result
if False:
    from ..table import Column
    from ..database import Database


class Statement(ABC):
    INDETERMINATE = lambda: "Indeterminate"

    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: []):
        self.database = database
        self.yield_column_factory = yield_column_factory

    def __str__(self) -> str:
        return self.build_sql()

    @abstractmethod
    def build_sql(self) -> str:
        return ""

    def execute(self) -> Result:
        yield_columns = self.yield_column_factory()
        return Result(yield_columns, self.database.execute(self),
                      indeterminate=self.yield_column_factory is self.__class__.INDETERMINATE)
