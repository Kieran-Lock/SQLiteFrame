from ..types import Type


class UnknownType(Type[NotImplemented, NotImplemented]):
    def encode(self, decoded: NotImplemented) -> NotImplemented:
        return NotImplemented

    def decode(self, encoded: NotImplemented) -> NotImplemented:
        return NotImplemented

    def default_suggestion(self, encoded: NotImplemented) -> str:
        return "<UnknownType>"

    def sql_name(self) -> str:
        return NotImplemented
