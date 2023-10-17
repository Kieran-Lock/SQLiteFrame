"""
The module containing the Comparisons enum, designed to make the API for WHERE clauses more declarative.
"""

from enum import Enum


class Comparisons(Enum):
    """
    An Enum which declares each of the valid comparisons that can be used in an SQLiteFrame WHERE clause.
    """

    EQUAL = "="
    NOT_EQUAL = "!="
    GREATER = ">"
    GREATER_EQUAL = ">="
    LESS = "<"
    LESS_EQUAL = "<="
    IN = "IN"
    LIKE = "LIKE"
    BETWEEN = "BETWEEN"
