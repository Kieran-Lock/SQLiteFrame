from __future__ import annotations
from .conjunctions import Conjunctions
if False:
    from .condition import Condition


class Where:
    def __init__(self, *syntax: Condition | Conjunctions):
        self.syntax = ["(", *syntax, ")"]

    def __str__(self):
        syntax = self.syntax
        print(syntax)
        print("POO POO")
        return " ".join(syntax).replace("( ", "(").replace(" )", ")")

    def __or__(self, other: object):
        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: object):
        return self.combine(other, Conjunctions.AND)

    def combine(self, other: object, conjunction: Conjunctions):
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
