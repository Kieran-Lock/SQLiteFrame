from sqlite3 import Binary
from .type import Type


class Blob(Type[memoryview, bytes]):
    def sql_name(self) -> str:
        return "BLOB"

    def decode(self, encoded: memoryview) -> bytes:
        return str(encoded).encode()

    def encode(self, decoded: bytes) -> memoryview:
        return Binary(decoded)

    def default_suggestion(self, encoded: memoryview) -> str:
        return f"bf\"{encoded.tobytes()}\""
