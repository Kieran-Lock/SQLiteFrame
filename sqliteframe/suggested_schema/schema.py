from sqliteframe import Database
from sqlite3 import Cursor
from .table import Table

class Schema:
    def __init__(self, database: Database):
        self.database = database
        with database.connection():
            self.tables = self.create_tables()

    def create_tables(self):
        return [Table(self.database, table[0]) for table in [*self.get_table_names()]]

    def get_table_names(self) -> Cursor:
        return self.database.execute("SELECT tbl_name FROM sqlite_master WHERE type=\"table\";")

    def __str__(self) -> str:
        return "from sqliteframe import ...\n\n\n" + "database = Database(\"...\")\n\n\n" + \
            "\n\n\n".join(map(str, self.tables)) + "\n"
