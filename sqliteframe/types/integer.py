from .type import Type


class Integer(Type[int, int]):
    def sql_name(self) -> str:
        return "INTEGER"

    def decode(self, encoded: int) -> int:
        return encoded

    def encode(self, decoded: int) -> int:
        return decoded

    def default_suggestion(self, encoded: int) -> str:
        return str(encoded)
