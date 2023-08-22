"""
The module containing the Conjunctions enum, designed to make the API for WHERE clauses more declarative.
"""

from enum import Enum


class Conjunctions(Enum):
    """
    An Enum which declares each of the valid conjunctions that can be used in an SQLiteFrame WHERE clause.
    """

    OR = "OR"
    AND = "AND"
