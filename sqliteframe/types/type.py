"""
The logic for creating types compatible with SQLiteFrame.
"""

from abc import ABC, abstractmethod
from typing import Generic, TypeVar, get_args, Literal, Callable, ClassVar, Optional
from dataclasses import dataclass
from functools import wraps


EncodedT = TypeVar("EncodedT")
DecodedT = TypeVar("DecodedT")


@dataclass(eq=True, slots=True)
class Type(Generic[EncodedT, DecodedT], ABC):
    """
    The class involved in creating interfaces for managing column types in SQLiteFrame.
    """

    NULL: ClassVar[Literal["NULL"]] = "NULL"
    primary_key: bool = False
    nullable: bool = False
    default: Optional[DecodedT] = None

    def __post_init__(self):
        """
        Manages / wraps the encoding and decoding processes for columns that are nullable and have defaults.

        This method runs immediately after initialization, as per dataclasses implementation of __post_init__.
        """
        if self.nullable:
            self.encode = self.nullable_encode(self.encode)
            self.decode = self.nullable_decode(self.decode)
        if self.default is not None:
            self.encode = self.default_encode(self.encode)

    @abstractmethod
    def sql_name(self) -> str:
        """
        Dynamically defines the name given to this type when it is used in SQL queries.

        :return: The name of this type as valid SQL
        """

        return ""

    @abstractmethod
    def encode(self, decoded: DecodedT) -> EncodedT:
        """
        The method that encodes a Python type into its corresponding SQLite format, before it is stored.

        :param decoded: The non-encoded data as a Python type
        :return: The encoded type ready for storage with SQLite
        """

        return

    @abstractmethod
    def decode(self, encoded: EncodedT) -> DecodedT:
        """
        The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.

        :param encoded: The encoded data retrieved from the database
        :return: The decoded data as the expected Python type it was given to SQLiteFrame as
        """

        return

    @property
    def encoded_type(self) -> type:
        """
        Gets the encoded type of this class via some implementation details of Python's generics.
        """

        return get_args(self.__class__.__orig_bases__[0])[0]

    @property
    def decoded_type(self) -> type:
        """
        Gets the decoded type of this class via some implementation details of Python's generics.
        """

        return get_args(self.__class__.__orig_bases__[0])[1]

    def __hash__(self) -> int:
        """
        Defines the hash for any SQLiteFrame type.

        :return: The hash of objects of this type
        """

        return hash(str(self))

    def default_encode(self, f: Callable) -> Callable:
        @wraps(f)
        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal["NULL"]:
            if decoded is None:
                return f(self.default)
            return f(decoded)

        return wrapper

    @staticmethod
    def nullable_encode(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal["NULL"]:
            if decoded is None:
                return "NULL"
            return f(decoded)
        return wrapper

    @staticmethod
    def nullable_decode(f: Callable) -> Callable:
        @wraps(f)
        def wrapper(encoded: EncodedT | None) -> DecodedT | None:
            if encoded is None:
                return
            return f(encoded)
        return wrapper

    @abstractmethod
    def default_suggestion(self, encoded: EncodedT) -> str:
        """
        Uses when suggesting schemas, to show the suggested way of defining a default value for a column.

        :param encoded: The found default data encoded in the column.
        :return: A string that can be written in a suggested schema as-returned
        """

        return ""
