"""
The logic for suggesting a table when generating a suggested schema.
"""

from typing import Generator
from sqliteframe import Pragma, PragmaStatements, PragmaTypes, Database
from .column import Column
from .fk_column import FKColumn


class Table:
    """
    The class containing all the logic for suggesting how to create a table when suggesting a schema.
    """

    def __init__(self, database: Database, name: str):
        """
        :param database: The database this table is a part of
        :param name: The name of the table
        """

        self.database = database
        self.name = name
        with self.database.connection():
            self.columns = [*sorted(self.get_columns(), key=lambda column: not column.is_primary_key)]

    def __str__(self) -> str:
        """
        Converts the data from this class into the relevant Python syntax to create a table.

        :return: The string that defines a table in a schema (using a decorated class)
        """

        columns = "\n\t".join(map(str, self.columns))
        return f"@table(database)\nclass {self.name}:\n\t{columns}"

    def get_columns(self) -> Generator[Column, None, None]:
        """
        Gets each of the columns from the table.

        :return: Each column in the table (as a generator)
        """

        foreign_keys = self.get_foreign_keys()
        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)
        for column in statement.execute():
            if column[1] in foreign_keys:  # 1:Name
                yield FKColumn(*column[1:], *foreign_keys.get(column[1]))
            else:
                yield Column(*column[1:])

    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:
        """
        Gets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.

        :return: The relevant data for the foreign key column
        """

        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)
        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}
