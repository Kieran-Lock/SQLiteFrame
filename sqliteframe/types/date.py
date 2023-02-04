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
        iso_formatted = date.fromordinal(int(encoded)).isoformat()
        joined = ", ".join(number.lstrip("0") for number in iso_formatted.split("-"))
        return f"date({joined})"
