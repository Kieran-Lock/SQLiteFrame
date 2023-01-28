from __future__ import annotations
from .order_types import OrderTypes
if False:
    from sqliteframe.table import Column


class OrderBy:
    def __init__(self, column: Column, order_types: OrderTypes | tuple[OrderTypes, ...]):
        self.column = column
        self.order_types = (order_types, ) if isinstance(order_types, OrderTypes) else order_types
        if (OrderTypes.ASCENDING in self.order_types and OrderTypes.DESCENDING in self.order_types) or (
                OrderTypes.NULLS_FIRST in self.order_types and OrderTypes.NULLS_LAST in self.order_types):
            raise ValueError("SQL query cannot contain conflicting order by statement") from None

    def __str__(self) -> str:
        order_type_section = " ".join(map(lambda order_type: order_type.value, self.order_types))
        return f"ORDER BY {self.column.table}.{self.column.name} {order_type_section}"
