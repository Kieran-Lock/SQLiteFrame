from datetime import date
from .type import Type


class Date(Type[int, date]):
    def sql_name(self) -> str:
        return "DATE"

    def decode(self, encoded: int) -> date:
        return date.fromordinal(encoded)

    def encode(self, decoded: date) -> int:
        return decoded.toordinal()

    def default_suggestion(self, encoded: int) -> str:
        return f"date({date.fromordinal(encoded).isoformat().replace('-', ', ')})"
