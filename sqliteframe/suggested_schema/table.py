from typing import Generator
from sqliteframe import Pragma, PragmaStatements, PragmaTypes, Database
from .column import Column
from .fk_column import FKColumn


class Table:
    def __init__(self, database: Database, name: str):
        self.database = database
        self.name = name
        with self.database.connection():
            self.columns = [*sorted(self.get_columns(), key=lambda column: not column.is_primary_key)]

    def __str__(self) -> str:
        columns = "\n\t".join(map(str, self.columns))
        return f"@Table(database)\nclass {self.name}:\n\t{columns}"

    def get_columns(self) -> Generator[Column, None, None]:
        foreign_keys = self.get_foreign_keys()
        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)
        for column in statement.execute():
            if column[1] in foreign_keys:  # 1:Name
                yield FKColumn(*column[1:], *foreign_keys.get(column[1]))
            else:
                yield Column(*column[1:])

    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:
        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)
        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}  # 2:Table, 3:Name, 5:On Update, 6:On Delete
