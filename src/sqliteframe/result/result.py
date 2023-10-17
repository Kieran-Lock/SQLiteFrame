"""
A module containing the logic for SQLiteFrame Result objects.
"""

from __future__ import annotations
from typing import Iterator, TypeVar, TYPE_CHECKING
from sqlite3 import Cursor
if TYPE_CHECKING:
    from sqliteframe.entity import Column
    ColumnT = TypeVar("ColumnT", bound=Column)


class Result:
    """
    The class that contains result data from any executed SQLiteFrame queries.
    """

    UNKNOWN_COLUMN = "?"

    def __init__(self, columns: list[Column], result: Cursor, indeterminate: bool = False):
        self.columns = columns
        self.result = result
        self.indeterminate_columns = indeterminate

    def __iter__(self) -> Iterator[dict[ColumnT, ColumnT.type.decoded_type] | tuple]:
        """
        Allows for records to be accessed from a Result via simple iteration (e.g. for record in result).

        :return: An iterator containing each record, usually as a mapping ({column: data})
        """
        for record in self.result:
            if self.indeterminate_columns:
                yield record
            else:
                yield {column: column.type.decode(field) for column, field in zip(self.columns, record)}
