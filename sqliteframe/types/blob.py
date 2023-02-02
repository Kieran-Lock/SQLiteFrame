from .type import Type


class Blob(Type[bytes, bytes]):
    def sql_name(self) -> str:
        return "BLOB"

    def decode(self, encoded: bytes) -> bytes:
        return encoded

    def encode(self, decoded: bytes) -> bytes:
        return decoded

    def default_suggestion(self, encoded: bytes) -> str:
        return f"b\"{encoded[2:-1]}\""
