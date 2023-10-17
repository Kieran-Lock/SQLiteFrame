"""
The module containing logic for foreign keys.
"""

from __future__ import annotations
from functools import cached_property
from typing import TypeVar, Optional, Callable, TYPE_CHECKING
from .restraints import Restraints
from ..types import Type
if TYPE_CHECKING:
    from ..entity import Entity, Column


EncodedT = TypeVar("EncodedT")
DecodedT = TypeVar("DecodedT")


class ForeignKey(Type[EncodedT, DecodedT]):
    """
    The implementation for foreign keys.

    Inheritance from Type is an implementation detail - most of the Type implementations are delegated
    to an internal reference to this column's actual type.
    """

    def __init__(self, table: Entity | Callable[[], Entity], default: Optional[DecodedT] = None,
                 on_update: Restraints = Restraints.CASCADE, on_delete: Restraints = Restraints.RESTRICT,
                 nullable: bool = False):
        """
        :param table: The table this column is a part of
        :param default: The default value of this column
        :param on_update: The on update restraint of this column
        :param on_delete: The on delete restraint of this column
        :param nullable: Whether this column is nullable
        """
        self._table = table
        self.on_update = on_update
        self.on_delete = on_delete
        super().__init__(nullable=nullable, default=default)

    @cached_property
    def table(self) -> Entity:
        """
        A lazy cached property to get the table this column is a part of.

        :return: The table this column is a part of
        """
        from ..entity import Entity
        if not isinstance(self._table, Entity):
            return self._table()
        return self._table

    @cached_property
    def foreign_column(self) -> Column:
        """
        A cached property to get the primary key column of the table this foreign key references.

        :return: The primary key column of the table this foreign key references
        """
        return next(filter(lambda column: column.is_primary_key, self.table.columns))

    def sql_name(self) -> str:
        return self.foreign_column.type.sql_name()

    def encode(self, decoded: DecodedT) -> EncodedT:
        return self.foreign_column.type.encode(decoded)

    def decode(self, encoded: EncodedT) -> DecodedT:
        return self.foreign_column.type.decode(encoded)

    @property
    def encoded_type(self) -> type:
        return self.foreign_column.type.encoded_type

    @property
    def decoded_type(self) -> type:
        return self.foreign_column.type.decoded_type

    def sql_restraint(self, column: Column) -> str:
        """
        Builds the SQL for this column's restraints when updating and deleting this column.

        :param column: The column to define as foreign
        :return: A valid SQL string to be used in a CREATE TABLE statement
        """
        return f"FOREIGN KEY ({column.name}) REFERENCES {self.table} ({self.foreign_column.name})\n" \
               f"\tON UPDATE {self.on_update.value}\n\tON DELETE {self.on_delete.value}"

    def __str__(self) -> str:
        """
        The string representation for this column, used when it is being executed.

        :return: The valid SQL string representing this column
        """

        not_null = "" if self.nullable else " NOT NULL"
        return f"{self.sql_name()}{not_null}"

    def default_suggestion(self, encoded: EncodedT) -> str:
        return "ForeignKey"

    def default_declaration(self, decoded: DecodedT) -> str:
        return super().default_declaration(decoded)
