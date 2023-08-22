"""
The module containing the logic involved in building WHERE clauses in complex queries.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .conjunctions import Conjunctions
from ..parameterized import Parameterized
if TYPE_CHECKING:
    from .condition import Condition


class Where(Parameterized):
    """
    The class containing all the logic for WHERE clauses in complex queries.
    """

    def __init__(self, *syntax: Condition | Conjunctions):
        """
        :param syntax: The ordered conditions and conjunctions involved in the WHERE clause
        """

        self.syntax = ["(", *syntax, ")"]

    @property
    def parameters(self) -> list[object]:
        from .condition import Condition
        return [condition for parameters in map(lambda condition: condition.parameters, filter(
            lambda syntax: isinstance(syntax, Condition), self.syntax)) for condition in parameters]

    def build_sql(self) -> str:
        syntax = map(lambda part: part.value if isinstance(part, Conjunctions) else str(part), self.syntax)
        return " ".join(syntax).replace("( ", "(").replace(" )", ")")

    def __or__(self, other: Where | Condition) -> Where:
        """
        Combines this WHERE statement with another condition or WHERE statement using bitwise OR syntax.

        Whether the passed object is a Condition object and Where object is an implementation detail.

        :param other: The condition or where object to combine with
        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator
        """

        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: Where | Condition) -> Where:
        """
        Combines this WHERE statement with another condition or WHERE statement using bitwise AND syntax.

        Whether the passed object is a Condition object and Where object is an implementation detail.

        :param other: The condition or where object to combine with
        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator
        """

        return self.combine(other, Conjunctions.AND)

    def combine(self, other: Where | Condition, conjunction: Conjunctions) -> Where:
        """
        An internal, generalized method to combine this WHERE clause via mutation, using any conjunction.

        :param other: The condition or where object to combine with
        :param conjunction: The conjunction to combine with
        :return: A where statement object with the relevant combined functionality
        """

        from .condition import Condition
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
