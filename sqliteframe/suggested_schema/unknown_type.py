"""
The module containing the logic for the unknown type, only used when generating a suggested schema.
"""

from ..types import Type


class UnknownType(Type[NotImplemented, NotImplemented]):
    """
    The class representing an unknown type that can not be decoded when suggesting a schema.
    """

    def encode(self, decoded: NotImplemented) -> NotImplemented:
        return NotImplemented

    def decode(self, encoded: NotImplemented) -> NotImplemented:
        return NotImplemented

    def default_suggestion(self, encoded: NotImplemented) -> str:
        return "<UnknownType>"

    def sql_name(self) -> str:
        return NotImplemented
