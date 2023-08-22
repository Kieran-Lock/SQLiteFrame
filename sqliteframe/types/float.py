"""
The logic for storing floats (floating point decimals) in SQLiteFrame.
"""

from .type import Type


class Float(Type[float, float]):
    """
    Stores floats, converting between SQLite's REAL and Python's float types.
    """

    def sql_name(self) -> str:
        return "REAL"

    def decode(self, encoded: float) -> float:
        return encoded

    def encode(self, decoded: float) -> float:
        return decoded

    def default_suggestion(self, encoded: float) -> str:
        return str(encoded)
