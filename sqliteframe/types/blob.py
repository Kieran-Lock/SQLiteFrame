from .type import Type


class Blob(Type[str, bytes]):
    def sql_name(self) -> str:
        return "BLOB"

    def decode(self, encoded: str) -> bytes:
        return encoded.encode()

    def encode(self, decoded: bytes) -> str:
        return f"\"{decoded.decode()}\""

    def default_suggestion(self, encoded: bytes) -> str:
        return f"b{encoded}"
