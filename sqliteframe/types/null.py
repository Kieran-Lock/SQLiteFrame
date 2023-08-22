"""
SQLiteFrame's implementation for storing NULLs, used in nullable columns.
"""

from .type import Type


class Null(Type[str, None]):
    """
    The class containing logic for storing NULL, making use of SQLite's NULL and Python's None singleton.
    """

    def sql_name(self) -> str:
        return "NULL"

    def decode(self, encoded: str) -> None:
        return

    def encode(self, decoded: None) -> str:
        return "NULL"

    def default_suggestion(self, encoded: str) -> str:
        return "None"
