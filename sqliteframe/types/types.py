"""
The module containing each of the different default types in SQLiteFrame as an Enum.
"""

from enum import Enum
from .blob import Blob
from .boolean import Boolean
from .date import Date
from .float import Float
from .integer import Integer
from .string import String
from .time import Time


Types = Enum("Types", {sql_type.__name__: sql_type for sql_type in (
    Blob, Boolean, Date, Float, Integer, String, Time)})
