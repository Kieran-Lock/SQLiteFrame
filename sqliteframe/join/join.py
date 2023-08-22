"""
The module containing the logic for JOIN clauses.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .join_types import JoinTypes
from ..where import Condition, Where
if TYPE_CHECKING:
    from sqliteframe.entity import Entity


class Join:
    """
    The class containing the implementation for JOIN clauses.
    """

    def __init__(self, table: Entity, where: Where | Condition, join_type: JoinTypes):
        """
        :param table: The table being joined
        :param where: The conditions under which this join statement is used
        :param join_type: The way in which the table is joined
        """
        super().__init__()
        self.table = table
        self.where = where
        self.join_type = join_type

    def __str__(self) -> str:
        """
        The string representation for this clause, used when it is being executed.

        :return: The valid SQL string representing this clause
        """

        return f"{self.join_type.value} JOIN {self.table} ON {self.where}"
