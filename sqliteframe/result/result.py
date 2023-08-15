from __future__ import annotations
from typing import Iterator
from sqlite3 import Cursor
from itertools import repeat
if False:
    from typing import TypeVar
    from sqliteframe.entity import Column
    ColumnT = TypeVar("ColumnT", bound=Column)


class Result:
    UNKNOWN_COLUMN = "?"

    def __init__(self, columns: list[Column], result: Cursor, indeterminate: bool = False):
        self.columns = columns
        self.result = result
        self.indeterminate_columns = indeterminate

    def __iter__(self) -> Iterator[dict[ColumnT, ColumnT.type.decoded_type] | tuple]:
        for record in self.result:
            if self.indeterminate_columns:
                yield record
            else:
                yield {column: column.type.decode(field) for column, field in zip(self.columns, record)}
