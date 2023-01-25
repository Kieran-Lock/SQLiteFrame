from .type import Type


class Null(Type[str, None]):
    def sql_name(self) -> str:
        return "NULL"

    def decode(self, encoded: str) -> None:
        return

    def encode(self, decoded: None) -> str:
        return "NULL"
