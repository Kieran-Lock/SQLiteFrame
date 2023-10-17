"""
The module containing logic for foreign key columns when suggesting schemas.
"""

from ..foreign_key import Restraints
from .column import Column


class FKColumn(Column):
    """
    The class representing foreign key columns when suggesting schemas from pre-existing databases.
    """

    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, _: bool,
                 ref_table: str, on_update: str, on_delete: str):
        """
        :param name: The name of the column
        :param sql_type: The type of the column as a valid SQL string
        :param not_null: Whether the column is not null
        :param default: What the default for the column is
        :param _: Whether the column is a primary key column - this is unused and should always be false
        :param ref_table: The table this column links to
        :param on_update: The declared mode for cascading when this column is updated
        :param on_delete: The declared mode for cascading when this column is deleted
        """

        self.ref_table = ref_table
        self.on_update = on_update
        self.on_delete = on_delete
        super().__init__(name, sql_type, not_null, default, False)

    def __str__(self) -> str:
        return f"{self.name} = ForeignKey({self.type_details})"

    def get_type_details(self) -> str:
        nullable = "nullable=True" if self.is_nullable else ""
        default = "" if self.default is None else f"default={self.type.default_suggestion(self.default)}"
        on_update = "" if self.on_update == Restraints.CASCADE.value else \
            f"on_update=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_update)}"
        on_delete = "" if self.on_delete == Restraints.RESTRICT.value else \
            f"on_delete=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_delete)}"
        seperator = ", " if any(filter(bool, (nullable, default, on_update, on_delete))) else ""
        return f"{self.ref_table}{seperator}{', '.join(filter(bool, (nullable, default, on_update, on_delete)))}"
