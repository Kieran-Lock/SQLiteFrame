from __future__ import annotations
from dataclasses import dataclass, field
from ..types import Type
from ..where import Comparisons, Condition
from ..foreign_key import ForeignKey
if False:
    from .table import Table


@dataclass(frozen=True, slots=True)
class Column:
    table: Table = field(repr=False)
    name: str
    type: Type | ForeignKey

    @property
    def is_primary_key(self) -> bool:
        return self.type.primary_key

    @property
    def is_nullable(self) -> bool:
        return self.type.nullable

    @property
    def is_foreign_key(self):
        return isinstance(self.type, ForeignKey)

    def __str__(self) -> str:
        primary_key = " PRIMARY KEY" if self.is_primary_key else ""
        not_null = "" if self.is_nullable else " NOT NULL"
        if self.is_foreign_key:
            return str(self.type)
        return f"{self.type.sql_name()}{primary_key}{not_null}"

    def __eq__(self, other: object) -> Condition:
        return Condition(self, Comparisons.EQUAL, other)

    def __ne__(self, other: object, **kwargs) -> Condition:
        return Condition(self, Comparisons.NOT_EQUAL, other)

    def __gt__(self, other: object) -> Condition:
        return Condition(self, Comparisons.GREATER, other)

    def __ge__(self, other: object) -> Condition:
        return Condition(self, Comparisons.GREATER_EQUAL, other)

    def __lt__(self, other: object) -> Condition:
        return Condition(self, Comparisons.LESS, other)

    def __le__(self, other: object) -> Condition:
        return Condition(self, Comparisons.LESS_EQUAL, other)

    def __neg__(self) -> Condition:
        if not issubclass(self.type.decoded_type, bool):
            raise TypeError("Cannot run __bool__ on non-boolean column")
        return Condition(self, Comparisons.EQUAL, 0)

    def __pos__(self) -> Condition:
        if not issubclass(self.type.decoded_type, bool):
            raise TypeError("Cannot run __bool__ on non-boolean column")
        return Condition(self, Comparisons.EQUAL, 1)

    def __contains__(self, item: object):
        if isinstance(item, range):
            pass
