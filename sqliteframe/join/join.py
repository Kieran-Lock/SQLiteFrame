from __future__ import annotations
from .join_types import JoinTypes
from ..where import Condition, Where
if False:
    from sqliteframe.table import Table


class Join:
    def __init__(self, table: Table, where: Where | Condition, join_type: JoinTypes):
        self.table = table
        self.where = where
        self.join_type = join_type

    def __str__(self) -> str:
        return f"{self.join_type.value} JOIN {self.table} ON {self.where}"
