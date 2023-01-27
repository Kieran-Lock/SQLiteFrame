from typing import Optional, Generator
from dataclasses import dataclass, field
from contextlib import contextmanager
from sqlite3 import connect, Cursor, Connection
from .table import Table
from .statements import Statement, Pragma
from .pragma import PragmaStatements, PragmaStates
from .result import Result


@dataclass(eq=True, slots=True)
class Database:
    path: str
    output: bool = False
    foreign_keys: bool = True
    tables: set[Table] = field(init=False, default_factory=set)
    db_connection: Optional[Connection] = field(init=False, default=None)
    cursor: Optional[Cursor] = field(init=False, default=None)
    connected: bool = field(init=False, default=False)

    def add_table(self, table: Table):
        self.tables.add(table)

    @property
    def foreign_keys_enabled(self) -> bool:
        if not self.connected:
            raise RuntimeError(f"Could not check FK status without a pre-established connection") from None
        return bool(Pragma(PragmaStatements.FOREIGN_KEYS).execute())

    def enable_foreign_keys(self) -> Result:
        if not self.connected:
            raise RuntimeError(f"Could not enable FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(PragmaStatements.FOREIGN_KEYS, PragmaStates.ON)))

    def disable_foreign_keys(self) -> Result:
        if not self.connected:
            raise RuntimeError(f"Could not disabled FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(PragmaStatements.FOREIGN_KEYS, PragmaStates.OFF)))

    def connect(self) -> Connection:
        if self.connected:
            return self.db_connection
        self.db_connection = connect(self.path)
        self.connected = True
        self.cursor = self.db_connection.cursor()
        if self.foreign_keys:
            self.enable_foreign_keys()
        return self.db_connection

    def disconnect(self) -> None:
        if not self.connected:
            raise RuntimeError(f"Could not disconnect without a pre-established connection") from None
        self.db_connection.close()
        self.db_connection = None
        self.connected = False

    def commit(self) -> None:
        if not self.connected:
            raise RuntimeError("Could not commit without first being connected") from None
        self.db_connection.commit()

    @contextmanager
    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:
        if not self.connected:
            self.connect()
        try:
            yield self.db_connection
        finally:
            if commit:
                self.commit()
            if self.connected:
                self.disconnect()

    def execute(self, statement: Statement) -> Cursor:
        if not self.connected:
            raise RuntimeError(
                f"Could not execute '{statement.__class__.__name__}' statement without connection") from None
        if self.output:
            print(statement)
        return self.cursor.execute(str(statement))
