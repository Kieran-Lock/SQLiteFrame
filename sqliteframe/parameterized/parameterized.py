"""
The module containing the logic behind Parameterized clauses.
"""

from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Literal, TYPE_CHECKING
if TYPE_CHECKING:
    from ..statements import Statement


class Parameterized(ABC):
    """
    The class containing the logic behind Parameterized clauses.

    Parameterized clauses are essentially clauses that may require use parameter sanitization, such as WHERE clauses.
    These are needed to transfer the parameters to the base statement while preserved their order,
    so that they can be passed to the internal sqlite3 engine in the correct order during execution,
    maintaining safety from SQL injection attacks.
    """
    def parameter(self, parameter: object) -> Literal["?"]:
        """
        Registers a parameter with the clause, and converts it into a "?" string literal for use in the query.

        :param parameter: The data to register as a parameter
        :return: A "?" string literal
        """
        self.parameters.append(parameter)
        return "?"

    @property
    @abstractmethod
    def parameters(self) -> list[object]:
        """
        The parameters of this parameterized clause as an abstract property.

        :return: The list of parameters
        """
        return []

    @abstractmethod
    def build_sql(self) -> str:
        """
        Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.

        :return: The valid SQL string representing this clause
        """
        return ""

    def __str__(self) -> str:
        """
        The string representation for this clause, used when it is being executed.

        :return: The valid SQL string representing this clause
        """
        return self.build_sql()

    def register(self, statement: Statement) -> None:
        """
        Registers each of the parameters of this clause with a given base statement.

        :param statement: The base statement this clause is a part of
        """
        statement.register_parameterized(self)
