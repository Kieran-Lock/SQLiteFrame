from .type import Type


class String(Type[str, str]):
    def sql_name(self) -> str:
        return "TEXT"

    def decode(self, encoded: str) -> str:
        return encoded

    def encode(self, decoded: str) -> str:
        return f"\"{decoded}\""
