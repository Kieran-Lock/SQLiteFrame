"""
The logic for generating an entire suggested schema.
"""

from sqliteframe import Database
from sqlite3 import Cursor
from .table import Table


class Schema:
    """
    The class containing all the logic for generating a suggested schema from a pre-existing SQlite database.
    """

    def __init__(self, database: Database):
        """
        :param database: The database the schema is should be generated from
        """
        self.database = database
        with database.connection():
            self.tables = self.create_tables()

    def create_tables(self) -> list[Table]:
        """
        Generates the relevant tables for the suggested schema

        :return: A list of generated tables
        """

        return [Table(self.database, table[0]) for table in [*self.get_table_names()]]

    def get_table_names(self) -> Cursor:
        """
        Gets each of the table names from the database by executing a special SQL commands which accesses metadata.

        :return: The cursor returned by sqlite3 after executing the relevant query
        """
        return self.database.execute("SELECT tbl_name FROM sqlite_master WHERE type=\"entity\";")

    def __str__(self) -> str:
        return "from sqliteframe import Database, entity\n\n\n" + ("database = Database(\"<database_name>.db\")\n\n\n"
                                                                   "\n\n\n").join(map(str, self.tables)) + "\n"
