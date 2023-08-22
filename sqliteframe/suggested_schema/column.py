"""
The module containing logic for columns when suggesting schemas.
"""

from sqliteframe import FKRestraints, Types
from .unknown_type import UnknownType


class Column:
    """
    The class representing columns when suggesting schemas from pre-existing databases.
    """

    TYPES_DICTIONARY = {**{sql_type.sql_name(): sql_type for sql_type in
                           [sql_type.value() for sql_type in Types]}, **{"": Types.Blob.value()}}  # No type --> BLOB
    FK_RESTRAINTS = {restraint.value: restraint.name for restraint in FKRestraints}

    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, primary_key: bool):
        """
        :param name: The name of the column
        :param sql_type: The type of the column as a valid SQL string
        :param not_null: Whether the column is not null
        :param default: What the default for the column is
        :param primary_key: Whether the column is a primary key column
        """

        self.name = name
        self.type = self.__class__.TYPES_DICTIONARY.get(sql_type)
        if self.type is None:
            self.type = UnknownType()
        self.is_nullable = not not_null
        self.default = default
        self.is_primary_key = primary_key
        self.type_details = self.get_type_details()

    def __str__(self) -> str:
        """
        Converts all the necessary data from this class into a string, used when writing the suggested schema.

        :return: The string representation of the column, used when writing the suggested schema
        """

        return f"{self.name} = {self.type.__class__.__name__}{self.type_details}"

    def get_type_details(self) -> str:
        """
        A method used when writing the suggested schema, which retrieves all the type details as a formatted string.

        :return: All the type details stored in this class as a formatted string
        """

        if self.default is None and not (self.is_nullable or self.is_primary_key):
            return ""
        nullable = "nullable=True" if self.is_nullable else ""
        default = "" if self.default is None else f"default={self.type.default_suggestion(self.default)}"
        primary_key = "primary_key=True" if self.is_primary_key else ""
        return f"({', '.join(filter(bool, (nullable, default, primary_key)))})"
