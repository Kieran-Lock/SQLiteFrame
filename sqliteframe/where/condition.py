from __future__ import annotations
from .comparisons import Comparisons
from .conjunctions import Conjunctions
if False:
    from ..table import Column
    from .where import Where


class Condition:
    def __init__(self, column: Column, comparator: Comparisons, data: object):
        self.column = column
        self.comparator = comparator
        self.data = data

    def __str__(self) -> str:
        return f"{self.column.name} {self.comparator.value} {self.column.type.encode(self.data)}"

    def __or__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.AND)

    def combine(self, other: object, conjunction: Conjunctions) -> Where:
        from .where import Where  # TODO: Clean Up Improper Import
        if not (isinstance(other, Condition) or isinstance(other, Where)):
            raise TypeError(f"Cannot join Condition with type '{type(other)}'") from None
        return Where(self, conjunction.value, other)
