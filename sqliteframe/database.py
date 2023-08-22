"""
A module containing the logic behind database connections and execution.
"""

from typing import Optional, Generator
from dataclasses import dataclass, field
from contextlib import contextmanager
from sqlite3 import connect, Cursor, Connection
from pathlib import Path
from .entity import Entity
from .statements import Statement, Pragma
from .pragma import PragmaStatements
from .result import Result


@dataclass(eq=True, slots=True)
class Database:
    """
    A class representing entire SQLite databases, which may include many tables.

    This class is the main controller for interacting with SQLiteFrame, allowing users
    to create and connect to databases with a pure Python API, and execute statements.

    :param path: The path at which the SQLite database file should be saved
    :param output: Whether any statements executed in a connection to this database should be output in the console
    :param foreign_keys: Whether to enable foreign key relations in this database initially
    """

    path: Path
    output: bool = False
    foreign_keys: bool = True
    tables: set[Entity] = field(init=False, default_factory=set)
    db_connection: Optional[Connection] = field(init=False, default=None)
    cursor: Optional[Cursor] = field(init=False, default=None)
    connections: list[bool] = field(init=False, default_factory=list)

    def add_table(self, table: Entity) -> None:
        """
        Registers a table with the database.

        :param table: The table to add to the database
        """

        self.tables.add(table)

    @property
    def commit_mode(self) -> bool:
        """
        Gets the currently selected commit mode for the database.

        :return: Whether automatic commits are currently enabled
        """

        return self.connections[-1]

    @property
    def connected(self) -> bool:
        """
        Determines whether the database has any active connections.

        :return: Whether there are any active connections to the database
        """

        return bool(self.connections)

    @property
    def foreign_keys_enabled(self) -> bool:
        """
        Checks whether foreign key relations are enabled for this database.

        :return: Whether foreign key relations are enabled
        :raise RuntimeError: If there is no active connection to the database
        """

        if not self.connected:
            raise RuntimeError(f"Could not check FK status without a pre-established connection") from None
        return bool(Pragma(self, PragmaStatements.FOREIGN_KEYS).execute())

    def enable_foreign_keys(self) -> Result:
        """
        Enables foreign key relations for this database, by issuing PRAGMA statement.

        :return: The result from the executed PRAGMA statement
        :raise RuntimeError: If there is no active connection to the database
        """

        if not self.connected:
            raise RuntimeError(f"Could not enable FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value="ON")))

    def disable_foreign_keys(self) -> Result:
        """
        Disables foreign key relations for this database, by issuing PRAGMA statement.

        :return: The result from the executed PRAGMA statement
        :raise RuntimeError: If there is no active connection to the database
        """

        if not self.connected:
            raise RuntimeError(f"Could not disabled FKs without a pre-established connection") from None
        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value="OFF")))

    def connect(self, commit: bool = True) -> Connection:
        """
        Connects to the database.

        If a connection is already active, a new one will not be created - however,
        the commit mode will still be updated.

        :param commit: Whether to commit to the database automatically when the connection is terminated
        :return: An internal SQLite Connection object representing the connection
        """

        if self.connected:
            self.connections.append(commit)
            return self.db_connection
        self.db_connection = connect(str(self.path.resolve()))
        self.connections.append(commit)
        self.cursor = self.db_connection.cursor()
        if self.foreign_keys:
            self.enable_foreign_keys()
        return self.db_connection

    def disconnect(self) -> None:
        """
        Closes an active connection to the database.

        :raise RuntimeError: When no connection is already established and a disconnect is attempted
        """

        if not self.connected:
            raise RuntimeError(f"Could not disconnect without a pre-established connection") from None
        self.connections.pop()
        if not self.connected:
            self.db_connection.close()
            self.db_connection = None

    def commit(self) -> None:
        """
        Commits any unsaved changes to the database.

        :raise RuntimeError: If there is no active connection to the database
        """

        if not self.connected:
            raise RuntimeError("Could not commit without first being connected") from None
        self.db_connection.commit()

    @contextmanager
    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:
        """
        A context manager to open a connection for the duration of a defined with context block.

        :param commit: Whether to commit to the database automatically when the connection is terminated
        :return: The internally created SQLite Connection object
        """
        self.connect(commit=commit)
        try:
            yield self.db_connection
        finally:
            if self.commit_mode:
                self.commit()
            self.disconnect()

    def execute(self, statement: Statement | str, query_parameters: Optional[list[object]] = None) -> Cursor:
        """
        Executes an SQLite statement, with an active connection to the database.

        An SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.
        Statements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing
        a valid SQLite statement - this can be useful for testing, and quick / lightweight commands.

        :param statement: The statement to execute
        :param query_parameters: Any parameterized query parameters to add to the query for sanitization
        :return: The internally created SQLite Cursor object
        :raise RuntimeError: When no connection is already established and a disconnect is attempted
        """

        to_execute = str(statement)
        if query_parameters is None:
            query_parameters = statement.query_parameters if isinstance(statement, Statement) else []
        if not self.connected:
            statement = statement if isinstance(statement, str) else f"'{statement.__class__.__name__}' statement"
            raise RuntimeError(
                f"Could not execute {statement} without connection") from None
        if self.output:
            print(statement)
        return self.cursor.execute(to_execute, query_parameters)
