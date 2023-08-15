from __future__ import annotations
from functools import cached_property
from typing import Callable, Literal
from abc import ABC, abstractmethod
from ..result import Result
from ..parameterized import Parameterized
if False:
    from ..entity import Column
    from ..database import Database


class Statement(ABC):
    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: [],
                 indeterminate_yield: bool = False):
        self.database = database
        self.yield_column_factory = yield_column_factory
        self.indeterminate_yield = indeterminate_yield
        self.parameters = []
        self.parameterizeds = []

    def __str__(self) -> str:
        return self.build_sql()

    @property
    def query_parameters(self) -> list[object]:
        return self.parameters + [parameter for extension in self.parameterizeds for parameter in extension.parameters]

    @abstractmethod
    def build_sql(self) -> str:
        return ""

    def execute(self) -> Result:
        return Result(self.yield_column_factory(), self.database.execute(self), indeterminate=self.indeterminate_yield)

    def register_parameterized(self, parameterized: Parameterized) -> None:
        self.parameterizeds.append(parameterized)

    def parameter(self, parameter: object) -> Literal["?"]:
        self.parameters.append(parameter)
        return "?"
