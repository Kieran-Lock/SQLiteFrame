from __future__ import annotations
from .where import Where
from .condition import Condition
if False:
    from ..table import Table


class Join:
    def __init__(self, table: Table, where: Where | Condition):
        self.table = table
        self.where = where

    def __str__(self) -> str:
        return f"{self.table} ON {self.where}"
