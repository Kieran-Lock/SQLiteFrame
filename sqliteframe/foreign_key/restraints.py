from enum import Enum


class Restraints(Enum):
    SET_NULL = "SET NULL"
    SET_DEFAULT = "SET DEFAULT"
    RESTRICT = "RESTRICT"
    CASCADE = "CASCADE"
