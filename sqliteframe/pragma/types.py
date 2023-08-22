"""
The module containing the logic behind PRAGMA statement types
"""

from typing import Callable
from enum import Enum


class CallableTypesValue:
    """
    A simple wrapper for callables, used to dynamically generated PRAGMA statements depending on a specified format.
    """

    def __init__(self, f: Callable[[str], str]):
        """
        :param f: The callable to wrap
        """

        self.f = f

    def __call__(self, value: str) -> str:
        """
        Builds the end of the PRAGMA statement.

        :param value: The value to embed in the PRAGMA statement
        :return: The end of the PRAGMA statement
        """

        return self.f(value)


class Types(Enum):
    """
    An Enum containing each of the possible PRAGMA statement types that can be executed in SQLiteFrame.
    """

    QUERY = CallableTypesValue(lambda _: "")
    SET = CallableTypesValue(lambda value: f" = {value}")
    CALL = CallableTypesValue(lambda value: f"({value})")
