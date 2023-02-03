from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Literal

if False:
    from ..statements import Statement


class Parameterized(ABC):
    def __init__(self):
        self.parameters = []

    def parameter(self, parameter: object) -> Literal["?"]:
        self.parameters.append(parameter)
        return "?"

    @abstractmethod
    def build_sql(self) -> str:
        return ""

    def __str__(self) -> str:
        return self.build_sql()

    def register(self, statement: Statement) -> None:
        statement.register_parameterized(self)
