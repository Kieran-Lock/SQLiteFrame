from datetime import time
from .type import Type


class Time(Type[str, time]):
    def sql_name(self) -> str:
        return "TIME"

    def decode(self, encoded: str) -> time:
        return time.fromisoformat(encoded)

    def encode(self, decoded: time) -> str:
        return f"\"{decoded.isoformat()}\""
