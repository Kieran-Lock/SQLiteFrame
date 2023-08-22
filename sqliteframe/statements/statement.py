"""
The module containing logic for statements in SQLiteFrame.
"""

from __future__ import annotations
from typing import Callable, Literal, TYPE_CHECKING
from abc import ABC, abstractmethod
from ..result import Result
from ..parameterized import Parameterized
if TYPE_CHECKING:
    from ..entity import Column
    from ..database import Database


class Statement(ABC):
    """
    The abstract base class defining how statements should be structured in SQLiteFrame.
    """

    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: [],
                 indeterminate_yield: bool = False):
        """
        :param database: The database this statement is associated with
        :param yield_column_factory: A factory method to get the columns this statement will return data for
        :param indeterminate_yield: Whether columns cannot be assigned to the result of the statement
        """
        self.database = database
        self.yield_column_factory = yield_column_factory
        self.indeterminate_yield = indeterminate_yield
        self.parameters = []
        self.parameterizeds = []

    def __str__(self) -> str:
        """
        The string representation for this statement, used when it is being executed.

        :return: The valid SQL string representing this statement
        """

        return self.build_sql()

    @property
    def query_parameters(self) -> list[object]:
        """
        Gets the query parameters from this statement when executing the statement in a manner safe from SQL injection.

        This is involved in the usage of query parameters.

        :return: The query parameters from this statement
        """

        return self.parameters + [parameter for extension in self.parameterizeds for parameter in extension.parameters]

    @abstractmethod
    def build_sql(self) -> str:
        """
        Builds a valid SQL string representing this statement, used when executing this statement.

        :return: The valid SQL string representing this statement
        """

        return ""

    def execute(self) -> Result:
        """
        Executes this statement, and returns a corresponding result.

        :return: A result object which handles all SQLiteFrame query results independently
        """

        return Result(self.yield_column_factory(), self.database.execute(self), indeterminate=self.indeterminate_yield)

    def register_parameterized(self, parameterized: Parameterized) -> None:
        """
        Registers the query parameters from any subclauses with the statement for execution in order.

        :param parameterized: The parameterized object, such as a WHERE clause
        """

        self.parameterizeds.append(parameterized)

    def parameter(self, parameter: object) -> Literal["?"]:
        """
        Registers a query parameter for this statement, and replaces it with a literal "?" for direct use in queries.

        :param parameter: The parameter to register
        :return: A "?" string literal for drop-in replacement when building queries
        """

        self.parameters.append(parameter)
        return "?"
