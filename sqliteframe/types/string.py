"""
SQLiteFrame's implementation of storing strings in databases.
"""

from .type import Type


class String(Type[str, str]):
    """
    The class containing the logic for converting between SQLite's TEXT and Python's str types.
    """

    def sql_name(self) -> str:
        return "TEXT"

    def decode(self, encoded: str) -> str:
        return encoded

    def encode(self, decoded: str) -> str:
        return f"\"{decoded}\""

    def default_suggestion(self, encoded: str) -> str:
        return f"{encoded}"
