from typing import Generator
from sqliteframe import Pragma, PragmaStatements, PragmaTypes, Database, FKRestraints, Types
from sqlite3 import Cursor


class SuggestedColumn:
    TYPES_DICTIONARY = {**{sql_type.sql_name(): sql_type for sql_type in
                           [sql_type.value() for sql_type in Types]}, **{"": Types.Blob.value()}}  # No type --> BLOB
    FK_RESTRAINTS = {restraint.value: restraint.name for restraint in FKRestraints}

    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, primary_key: bool):
        self.name = name
        self.type = self.__class__.TYPES_DICTIONARY.get(sql_type)
        print("Found:", self.type, type(self.type), repr(sql_type))
        if self.type is None:
            self.type = f"<{sql_type}>"
        self.is_nullable = not not_null
        self.default = default
        self.is_primary_key = primary_key
        self.type_details = self.get_type_details()

    def __str__(self) -> str:
        return f"{self.name} = {self.type.__class__.__name__}{self.type_details}"

    def get_type_details(self) -> str:
        if self.default is None and not (self.is_nullable or self.is_primary_key):
            return ""
        nullable = "nullable=True" if self.is_nullable else ""
        default = "" if self.default is None else f"default={self.default}"
        primary_key = "primary_key=True" if self.is_primary_key else ""
        return f"({', '.join(filter(bool, (nullable, default, primary_key)))})"


class SuggestedFKColumn(SuggestedColumn):
    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, _: bool,
                 ref_table: str, on_update: str, on_delete: str):
        self.ref_table = ref_table
        self.on_update = on_update
        self.on_delete = on_delete
        super().__init__(name, sql_type, not_null, default, False)

    def __str__(self) -> str:
        return f"{self.name} = ForeignKey({self.type_details})"

    def get_type_details(self) -> str:
        nullable = "nullable=True" if self.is_nullable else ""
        default = "" if self.default is None else f"default={self.default}"  # Likely not formatted at the moment
        on_update = "" if self.on_update == FKRestraints.CASCADE.value else \
            f"on_update=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_update)}"
        on_delete = "" if self.on_delete == FKRestraints.RESTRICT.value else \
            f"on_delete=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_delete)}"
        seperator = ", " if any(filter(bool, (nullable, default, on_update, on_delete))) else ""
        return f"{self.ref_table}{seperator}{', '.join(filter(bool, (nullable, default, on_update, on_delete)))}"


class SuggestedTable:
    def __init__(self, database: Database, name: str):
        self.database = database
        self.name = name
        with self.database.connection():
            self.columns = [*sorted(self.get_columns(), key=lambda column: not column.is_primary_key)]

    def __str__(self) -> str:
        columns = "\n\t".join(map(str, self.columns))
        return f"@Table(database)\nclass {self.name}:\n\t{columns}"

    def get_columns(self) -> Generator[SuggestedColumn, None, None]:
        foreign_keys = self.get_foreign_keys()
        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)
        for column in statement.execute():
            if column[1] in foreign_keys:  # 1:Name
                yield SuggestedFKColumn(*[*column[1:], *foreign_keys.get(column[1])])
            else:
                print(column)
                yield SuggestedColumn(*column[1:])

    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:
        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)
        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}  # 2:Table, 3:Name, 5:On Update, 6:On Delete


class SuggestedSchema:
    def __init__(self, database: Database):
        self.database = database
        with database.connection():
            self.tables = self.create_tables()

    def create_tables(self):
        return [SuggestedTable(self.database, table[0]) for table in [*self.get_table_names()]]

    def get_table_names(self) -> Cursor:
        return self.database.execute("SELECT tbl_name FROM sqlite_master WHERE type=\"table\";")

    def __str__(self) -> str:
        return "\n\n\n".join(map(str, self.tables)) + "\n"


suggested_schema = SuggestedSchema(
    Database(r"D:/Applications/Installers/Racing League Tools/user/databases/TestLeague.db", output=True))
with open("suggested.py", "w+") as f:
    f.write(str(suggested_schema))
