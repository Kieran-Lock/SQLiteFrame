from __future__ import annotations
from .comparisons import Comparisons
from .conjunctions import Conjunctions
from ..parameterized import Parameterized

if False:
    from ..entity import Column
    from .where import Where


class Condition(Parameterized):
    def __init__(self, left: Column, comparator: Comparisons, right: Column | object):
        self.left = left
        self.comparator = comparator
        self.right = right
        self._parameters = []

    @property
    def parameters(self) -> list[object]:
        return self._parameters

    def __bool__(self) -> bool:  # Needed for __contains__ checks
        return False

    def __or__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: object) -> Where:
        return self.combine(other, Conjunctions.AND)

    def combine(self, other: object, conjunction: Conjunctions) -> Where:
        from .where import Where
        if not (isinstance(other, Condition) or isinstance(other, Where)):
            raise TypeError(f"Cannot join Condition with type '{type(other)}'") from None
        return Where(self, conjunction.value, other)

    def build_sql(self) -> str:
        from ..entity import Column
        right = f"{self.right.table}.{self.right.name}" if isinstance(self.right, Column) else \
            self.parameter(self.left.type.encode(self.right))
        return f"{self.left.table}.{self.left.name} {self.comparator.value} {right}"
