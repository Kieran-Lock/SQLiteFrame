"""
The module containing the logic for SQLiteFrame columns.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from dataclasses import dataclass, field
from ..types import Type
from ..where import Comparisons, Condition
from ..foreign_key import ForeignKey
if TYPE_CHECKING:
    from .entity import Entity


@dataclass(frozen=True, slots=True)
class Column:
    """
    The implementation for SQLiteFrame columns.
    """

    table: Entity = field(repr=False)
    name: str
    type: Type | ForeignKey

    @property
    def is_primary_key(self) -> bool:
        """
        Determines whether this column is a primary key column.

        :return: Whether this column is a primary key column
        """
        return self.type.primary_key

    @property
    def is_nullable(self) -> bool:
        """
        Determines whether this column is nullable.

        :return: Whether this column is nullable
        """
        return self.type.nullable

    @property
    def is_foreign_key(self) -> bool:
        """
        Determines whether this column is a foreign key column.

        :return: Whether this column is a foreign key column
        """
        return isinstance(self.type, ForeignKey)

    @property
    def default(self) -> object | None:
        """
        Gets the default value of this column - None is returned if no default exists.

        :return: The default value of this column
        """
        return self.type.default

    def __str__(self) -> str:
        """
        The string representation for this column, used when it is being executed.

        :return: The valid SQL string representing this column
        """

        primary_key = " PRIMARY KEY" if self.is_primary_key else ""
        not_null = "" if self.is_nullable else " NOT NULL"
        default = "" if self.default is None else f" DEFAULT {self.type.encode(self.default)}"
        if self.is_foreign_key:
            return str(self.type)
        return f"{self.type.sql_name()}{primary_key}{not_null}{default}"

    def __eq__(self, other: object) -> Condition:
        """
        Column == Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.EQUAL, other)

    def __ne__(self, other: object, **kwargs) -> Condition:
        """
        Column != Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.NOT_EQUAL, other)

    def __gt__(self, other: object) -> Condition:
        """
        Column > Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.GREATER, other)

    def __ge__(self, other: object) -> Condition:
        """
        Column >= Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.GREATER_EQUAL, other)

    def __lt__(self, other: object) -> Condition:
        """
        Column < Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.LESS, other)

    def __le__(self, other: object) -> Condition:
        """
        Column <= Other

        :param other: The right-side item to generate a Condition object from
        :return: The Condition object representing this condition
        """
        return Condition(self, Comparisons.LESS_EQUAL, other)

    def __neg__(self) -> Condition:
        """
        -Column

        Checks whether this column is false.

        :return: The Condition object representing this condition
        """
        if not issubclass(self.type.decoded_type, bool):
            raise TypeError("Cannot run __bool__ on non-boolean column")
        return Condition(self, Comparisons.EQUAL, 0)

    def __pos__(self) -> Condition:
        """
        +Column

        Checks whether this column is true.

        :return: The Condition object representing this condition
        """
        if not issubclass(self.type.decoded_type, bool):
            raise TypeError("Cannot run __bool__ on non-boolean column")
        return Condition(self, Comparisons.EQUAL, 1)
