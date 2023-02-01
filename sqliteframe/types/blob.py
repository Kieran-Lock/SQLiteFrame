from sqlite3 import Binary
from .type import Type


class Blob(Type[Binary, bytes]):
    def sql_name(self) -> str:
        return "BLOB"

    def decode(self, encoded: Binary) -> bytes:
        return str(encoded).encode()

    def encode(self, decoded: bytes) -> Binary:
        return Binary(decoded)
