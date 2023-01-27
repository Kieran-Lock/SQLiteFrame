from __future__ import annotations
from typing import Iterator
from sqlite3 import Cursor
if False:
    from typing import TypeVar
    from sqliteframe.table import Column
    ColumnT = TypeVar("ColumnT", bound=Column)


class Result:
    def __init__(self, columns: list[Column], result: Cursor):
        self.columns = columns
        self.result = result

    def __iter__(self) -> Iterator[dict[ColumnT, ColumnT.type.decoded_type]]:
        for record in self.result:
            yield {column: column.type.decode(field) for column, field in zip(self.columns, record)}
