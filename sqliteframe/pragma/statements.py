"""
The module containing the different PRAGMA statements that can be executed.
"""

from enum import Enum


class Statements(Enum):
    """
    An Enum containing each of the PRAGMA statements that can be executed in SQLiteFrame.
    """

    FOREIGN_KEYS = "foreign_keys"
    TABLE_INFO = "table_info"
    FOREIGN_KEY_LIST = "foreign_key_list"
