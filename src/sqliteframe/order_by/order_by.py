"""
The module containing the logic for ORDER BY clauses.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .order_types import OrderTypes
if TYPE_CHECKING:
    from sqliteframe.entity import Column


class OrderBy:
    """
    The class containing the implementation for ORDER BY clauses.
    """

    def __init__(self, column: Column, order_types: OrderTypes | tuple[OrderTypes, ...]):
        """
        :param column: The target column to order by
        :param order_types: The order type(s) to order by
        """
        self.column = column
        self.order_types = (order_types, ) if isinstance(order_types, OrderTypes) else order_types
        if (OrderTypes.ASCENDING in self.order_types and OrderTypes.DESCENDING in self.order_types) or (
                OrderTypes.NULLS_FIRST in self.order_types and OrderTypes.NULLS_LAST in self.order_types):
            raise ValueError("SQL query cannot contain conflicting order by statement") from None

    def __str__(self) -> str:
        """
        The string representation for this clause, used when it is being executed.

        :return: The valid SQL string representing this clause
        """

        order_type_section = " ".join(map(lambda order_type: order_type.value, self.order_types))
        return f"ORDER BY {self.column.table}.{self.column.name} {order_type_section}"
