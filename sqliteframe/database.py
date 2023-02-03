from typing import Optional, Generator
from dataclasses import dataclass, field
from contextlib import contextmanager
from sqlite3 import connect, Cursor, Connection
from .table import Table
from .statements import Statement, Pragma
from .pragma import PragmaStatements
from .result import Result


@dataclass(eq=True, slots=True)
class Database:
    path: str
    output: bool = False
    foreign_keys: bool = True
    tables: set[Table] = field(init=False, default_factory=set)
    db_connection: Optional[Connection] = field(init=False, default=None)
    cursor: Optional[Cursor] = field(init=False, default=None)
    connections: bool = field(init=False, default=0)

    def add_table(self, table: Table):
        self.tables.add(table)

    @property
    def connected(self) -> bool:
        return self.connections > 0

    @property
    def foreign_keys_enabled(self) -> bool:
        if not self.connected:
            raise RuntimeError(f"Could not check FK status without a pre-established connection") from None
        return bool(Pragma(self, PragmaStatements.FOREIGN_KEYS).execute())

    def enable_foreign_keys(self) -> Result:
        if not self.connected:
            raise RuntimeError(f"Could not enable FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value="ON")))

    def disable_foreign_keys(self) -> Result:
        if not self.connected:
            raise RuntimeError(f"Could not disabled FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value="OFF")))

    def connect(self) -> Connection:
        if self.connected:
            self.connections += 1
            return self.db_connection
        self.db_connection = connect(self.path)
        self.connections += 1
        self.cursor = self.db_connection.cursor()
        if self.foreign_keys:
            self.enable_foreign_keys()
        return self.db_connection

    def disconnect(self) -> None:
        if not self.connected:
            raise RuntimeError(f"Could not disconnect without a pre-established connection") from None#
        self.connections -= 1
        if not self.connected:
            self.db_connection.close()
            self.db_connection = None

    def commit(self) -> None:
        if not self.connected:
            raise RuntimeError("Could not commit without first being connected") from None
        self.db_connection.commit()

    @contextmanager
    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:
        self.connect()
        try:
            yield self.db_connection
        finally:
            if commit:
                self.commit()
            self.disconnect()

    def execute(self, statement: Statement | str, query_parameters: Optional[list[object]] = None) -> Cursor:
        to_execute = str(statement)
        if query_parameters is None:
            query_parameters = statement.query_parameters if isinstance(statement, Statement) else []
        if not self.connected:
            statement = statement if isinstance(statement, str) else f"'{statement.__class__.__name__}' statement"
            raise RuntimeError(
                f"Could not execute {statement} without connection") from None
        if self.output:
            print(statement)
        print("EXECUTING with:", query_parameters)
        return self.cursor.execute(to_execute, query_parameters)
