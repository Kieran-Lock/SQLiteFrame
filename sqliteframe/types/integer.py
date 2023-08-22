"""
The logic for storing integers with SQLiteFrame.
"""

from .type import Type


class Integer(Type[int, int]):
    """
    The class which stores integers, converting between SQLite's INTEGER and Python's int types.
    """

    def sql_name(self) -> str:
        return "INTEGER"

    def decode(self, encoded: int) -> int:
        return encoded

    def encode(self, decoded: int) -> int:
        return decoded

    def default_suggestion(self, encoded: int) -> str:
        return str(encoded)
