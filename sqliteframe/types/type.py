from abc import ABC, abstractmethod
from typing import Generic, TypeVar, get_args, Literal, Callable, ClassVar
from dataclasses import dataclass
from functools import wraps


EncodedT = TypeVar("EncodedT")
DecodedT = TypeVar("DecodedT")


# noinspection PyUnresolvedReferences
@dataclass(eq=True, slots=True)
class Type(Generic[EncodedT, DecodedT], ABC):
    NULL: ClassVar[Literal["NULL"]] = "NULL"
    primary_key: bool = False
    nullable: bool = False

    def __post_init__(self):
        if self.nullable:
            self.encode = self.nullable_encode(self.encode)
            self.decode = self.nullable_decode(self.decode)

    @abstractmethod
    def sql_name(self) -> str:
        return ""

    @abstractmethod
    def encode(self, decoded: DecodedT) -> EncodedT:
        return

    @abstractmethod
    def decode(self, encoded: EncodedT) -> DecodedT:
        return

    @property
    def encoded_type(self):
        return get_args(self.__class__.__orig_bases__[0])[0]

    @property
    def decoded_type(self):
        return get_args(self.__class__.__orig_bases__[0])[1]

    def __hash__(self):
        return hash(str(self))

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
