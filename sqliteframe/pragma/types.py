from typing import Callable
from enum import Enum


class CallableTypesValue:
    def __init__(self, f: Callable[[str], str]):
        self.f = f

    def __call__(self, value: str) -> str:
        return self.f(value)


class Types(Enum):
    QUERY = CallableTypesValue(lambda _: "")
    SET = CallableTypesValue(lambda value: f" = {value}")
    CALL = CallableTypesValue(lambda value: f"({value})")
