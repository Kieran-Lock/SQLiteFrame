from __future__ import annotations
from functools import cached_property
from typing import TypeVar, Optional, Callable
from .restraints import Restraints
from ..types import Type
if False:
    from ..table import Table, Column


EncodedT = TypeVar("EncodedT")
DecodedT = TypeVar("DecodedT")


class ForeignKey(Type[EncodedT, DecodedT]):
    def __init__(self, table: Table | Callable[[], Table], default: Optional[DecodedT] = None,
                 on_update: Restraints = Restraints.CASCADE, on_delete: Restraints = Restraints.RESTRICT,
                 nullable: bool = False):
        self._table = table
        self.on_update = on_update
        self.on_delete = on_delete
        super().__init__(nullable=nullable, default=default)

    @cached_property
    def table(self) -> Table:
        from ..table import Table
        if not isinstance(self._table, Table):
            return self._table()
        return self._table

    @cached_property
    def foreign_column(self) -> Column:
        return list(filter(lambda column: column.is_primary_key, self.table.columns))[0]

    def sql_name(self) -> str:
        return self.foreign_column.type.sql_name()

    def encode(self, decoded: DecodedT) -> EncodedT:
        return self.foreign_column.type.encode(decoded)

    def decode(self, encoded: EncodedT) -> DecodedT:
        return self.foreign_column.type.decode(encoded)

    @property
    def encoded_type(self):
        return self.foreign_column.type.encoded_type

    @property
    def decoded_type(self):
        return self.foreign_column.type.decoded_type

    def sql_restraint(self, column: Column) -> str:
        return f"FOREIGN KEY ({column.name}) REFERENCES {self.table} ({self.foreign_column.name})\n" \
               f"\tON UPDATE {self.on_update.value}\n\tON DELETE {self.on_delete.value}"

    def __str__(self):
        not_null = "" if self.nullable else " NOT NULL"
        return f"{self.sql_name()}{not_null}"

    def default_suggestion(self, encoded: EncodedT) -> str:
        return "ForeignKey"
