from __future__ import annotations
from .conjunctions import Conjunctions
from ..parameterized import Parameterized

if False:
    from .condition import Condition


class Where(Parameterized):
    def __init__(self, *syntax: Condition | Conjunctions):
        super().__init__()
        self.syntax = ["(", *syntax, ")"]
        self._parameters = []

    @property
    def parameters(self) -> list[object]:
        return [condition for parameters in map(lambda condition: condition.parameters, filter(
            lambda syntax: isinstance(syntax, Condition), self.syntax)) for condition in parameters]

    @parameters.setter
    def parameters(self, query_parameters: list[object]) -> None:
        self._parameters = query_parameters

    def build_sql(self) -> str:
        syntax = map(lambda part: part.value if isinstance(part, Conjunctions) else str(part), self.syntax)
        return " ".join(syntax).replace("( ", "(").replace(" )", ")")

    def __or__(self, other: Where | Condition) -> Where:
        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: Where | Condition) -> Where:
        return self.combine(other, Conjunctions.AND)

    def combine(self, other: Where | Condition, conjunction: Conjunctions) -> Where:
        from .condition import Condition  # TODO: Clean Up Improper Import
        if not (isinstance(other, Condition) or isinstance(other, Where)):
            raise TypeError(f"Cannot join Condition with type '{type(other)}'") from None
        self.syntax.insert(0, "(")
        self.syntax.append(")")
        self.syntax.append(conjunction.value)
        if isinstance(other, Condition):
            self.syntax.append(other)
            return self
        self.syntax += other.syntax
        return self
