from .type import Type


class Boolean(Type[int, bool]):
    def sql_name(self) -> str:
        return "BOOLEAN"

    def decode(self, encoded: int) -> bool:
        return bool(encoded)

    def encode(self, decoded: bool) -> int:
        return 1 if decoded else 0
