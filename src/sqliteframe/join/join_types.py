"""
The module containing the JoinTypes Enum.
"""

from enum import Enum


class JoinTypes(Enum):
    """
    The different ways in which a table can be joined to another in a JOIN clause.
    """

    INNER = "INNER"
    LEFT = "LEFT"
    CROSS = "CROSS"
