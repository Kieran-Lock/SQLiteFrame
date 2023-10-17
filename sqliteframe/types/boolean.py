"""
The module containing logic for boolean types.
"""

from .type import Type


class Boolean(Type[int, bool]):
    """
    Converts boolean to an integer (0 or 1), and stores as an SQLite NUMERIC, via type affinity.
    """

    def sql_name(self) -> str:
        return "BOOLEAN"

    def decode(self, encoded: int) -> bool:
        return bool(encoded)

    def encode(self, decoded: bool) -> int:
        return 1 if decoded else 0

    def default_suggestion(self, encoded: int) -> str:
        return str(bool(encoded))

    def default_declaration(self, decoded: bool) -> str:
        return super().default_declaration(decoded)
