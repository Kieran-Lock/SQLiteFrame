from sqliteframe import FKRestraints, Types
from .unknown_type import UnknownType


class Column:
    TYPES_DICTIONARY = {**{sql_type.sql_name(): sql_type for sql_type in
                           [sql_type.value() for sql_type in Types]}, **{"": Types.Blob.value()}}  # No type --> BLOB
    FK_RESTRAINTS = {restraint.value: restraint.name for restraint in FKRestraints}

    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, primary_key: bool):
        self.name = name
        self.type = self.__class__.TYPES_DICTIONARY.get(sql_type)
        if self.type is None:
            self.type = UnknownType()
        self.is_nullable = not not_null
        self.default = default
        self.is_primary_key = primary_key
        self.type_details = self.get_type_details()

    def __str__(self) -> str:
        return f"{self.name} = {self.type.__class__.__name__}{self.type_details}"

    def get_type_details(self) -> str:
        if self.default is None and not (self.is_nullable or self.is_primary_key):
            return ""
        nullable = "nullable=True" if self.is_nullable else ""
        default = "" if self.default is None else f"default={self.default}"
        primary_key = "primary_key=True" if self.is_primary_key else ""
        return f"({', '.join(filter(bool, (nullable, default, primary_key)))})"
