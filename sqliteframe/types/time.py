"""
The logic for storing times in SQLiteFrame.
"""

from datetime import time
from .type import Type


class Time(Type[str, time]):
    """
    For storing times, by converting between SQLite's NUMERIC type and Python's datetime time type.
    """

    def sql_name(self) -> str:
        return "TIME"

    def decode(self, encoded: str) -> time:
        return time.fromisoformat(encoded)

    def encode(self, decoded: time) -> str:
        return f"\"{decoded.isoformat()}\""

    def default_suggestion(self, encoded: str) -> str:
        return f"time.fromisoformat({encoded})"
