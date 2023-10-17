"""
A module that provides tooling to preserve member order within classes.
"""


class PreserveOrderMeta(type):
    """
    A metaclass that attaches an ordered dictionary of class members to the class.

    This metaclass can be used to opt-in to SQLiteFrame behaviour that preserves the order of the class members, so that created tables follow the exact order declared in the Python schema.
    """
    
    def __new__(cls, name: str, bases: tuple, attrs: dict):
         return type.__new__(cls, name, bases, {**attrs, "__ordered_members__": attrs})


class PreserveOrder(metaclass=PreserveOrderMeta):
    """
    A helper class that implements the PreserveOrderMeta metaclass, which allows for SQLiteFrame to preserve the order of declared columns in the table that inherits from this class.
    """
