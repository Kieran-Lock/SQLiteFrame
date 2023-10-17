"""
The module containing the Restraints Enum.
"""

from enum import Enum


class Restraints(Enum):
    """
    The available restraints that can be placed on a foreign key column on-creation.

    These restraints will be checked whenever this column is edited or deleted,
    and are used to maintain referential integrity in a relational database.
    """

    SET_NULL = "SET NULL"
    SET_DEFAULT = "SET DEFAULT"
    RESTRICT = "RESTRICT"
    CASCADE = "CASCADE"
    NO_ACTION = "NO ACTION"
