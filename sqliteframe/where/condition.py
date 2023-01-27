from __future__ import annotations
from .comparisons import Comparisons
from .conjunctions import Conjunctions
if False:
    from ..table import Column
    from .where import Where


class Condition:
    def __init__(self, left: Column, comparator: Comparisons, right: Column | object):
        self.left = left
        self.comparator = comparator
        self.right = right

    def __bool__(self) -> bool:  # Needed for __contains__ checks
        return False

    def __str__(self) -> str:
        column_t = type(self.left)  # Because importing Column properly would cause a circular import
        right = f"{self.right.table}.{self.right.name}" if isinstance(self.right, column_t) else \
            self.left.type.encode(self.right)
        return f"{self.left.table}.{self.left.name} {self.comparator.value} {right}"

    def __or__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.AND)

    def combine(self, other: object, conjunction: Conjunctions) -> Where:
        from .where import Where  # TODO: Clean Up Improper Import
        if not (isinstance(other, Condition) or isinstance(other, Where)):
            raise TypeError(f"Cannot join Condition with type '{type(other)}'") from None
        return Where(self, conjunction.value, other)
