"""
The module containing the OrderTypes Enum.
"""

from enum import Enum


class OrderTypes(Enum):
    """
    The different ways in which selected data can be ordered before it is returned to the user.
    """

    NULLS_FIRST = "NULLS FIRST"
    NULLS_LAST = "NULLS LAST"
    ASCENDING = "ASC"
    DESCENDING = "DESC"
