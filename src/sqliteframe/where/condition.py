"""
The module containing the logic for creating individual conditions in a WHERE clause.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .comparisons import Comparisons
from .conjunctions import Conjunctions
from ..parameterized import Parameterized
if TYPE_CHECKING:
    from ..entity import Column
    from .where import Where


class Condition(Parameterized):
    """
    The class that defines all logic for simple conditions in WHERE clauses (e.g. Column1 == "Some String")
    """

    def __init__(self, left: Column, comparator: Comparisons, right: Column | object):
        """
        :param left: The left segment of the condition, which can only be a column
        :param comparator: The comparator (e.g. '==') that is used in the condition
        :param right: The right segment of the condition, which can be a column or some data
        """
        self.left = left
        self.comparator = comparator
        self.right = right
        self._parameters = []

    @property
    def parameters(self) -> list[object]:
        return self._parameters

    def __bool__(self) -> bool:
        """
        Conditions always evaluate to false, in order to be compatible with __contains__ checks.

        :return: Always false
        """
        return False

    def __or__(self, other: object) -> Where:
        """
        Combines this condition with another condition or WHERE statement using bitwise OR syntax.

        Whether the passed object is a Condition object and Where object is an implementation detail.

        :param other: The condition or where object to combine with
        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator
        """

        return self.combine(other, Conjunctions.OR)

    def __and__(self, other: object) -> Where:
        """
        Combines this condition with another condition or WHERE statement using bitwise AND syntax.

        Whether the passed object is a Condition object and Where object is an implementation detail.

        :param other: The condition or where object to combine with
        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator
        """

        return self.combine(other, Conjunctions.AND)

    def combine(self, other: object, conjunction: Conjunctions) -> Where:
        """
        An internal, generalized method to combine this condition with another, with any conjunction.

        :param other: The condition or where object to combine with
        :param conjunction: The conjunction to combine with
        :return: A where statement object with the relevant combined functionality
        """

        from .where import Where
        if not (isinstance(other, Condition) or isinstance(other, Where)):
            raise TypeError(f"Cannot join Condition with type '{type(other)}'") from None
        return Where(self, conjunction.value, other)

    def build_sql(self) -> str:
        from ..entity import Column
        right = f"{self.right.table}.{self.right.name}" if isinstance(self.right, Column) else \
            self.parameter(self.left.type.encode(self.right))
        return f"{self.left.table}.{self.left.name} {self.comparator.value} {right}"
