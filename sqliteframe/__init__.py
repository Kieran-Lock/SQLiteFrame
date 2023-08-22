"""
SQLiteFrame is a lightweight, zero-dependency ORM for SQLite in Python.

SQLiteFrame is an SQLite ORM for python, designed to be as lightweight, intuitive, and simple to use as possible.
It is designed to closely mimic SQL syntax whilst remaining as pythonic as possible
to save developers valuable time (and brain cells) when interacting with SQLite databases,
by building reusable SQLite query objects using method-chaining, and abstracting away
SQLite's connection and cursor system with a single context manager.
"""

from .database import Database
from .entity import table
from .types import Integer, String, Type, Boolean, Date, Time, Blob, Float, Types
from .wildcards import Wildcards
from .foreign_key import ForeignKey, Restraints as FKRestraints
from .result import Result
from .join import JoinTypes
from .order_by import OrderTypes
from .statements import Pragma
from .pragma import PragmaTypes, PragmaStatements
from .suggested_schema import SuggestedSchema
from .parameterized import Parameterized
