"""
The module containing the Wildcards enum, designed to make the API for general queries more declarative.
"""

from enum import Enum


class Wildcards(Enum):
    """
    An Enum which declares all the wildcards that can be used in a valid SQLiteFrame query.
    """

    All = "*"
