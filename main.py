from sqliteframe import Pragma, PragmaStatements, PragmaTypes
from schema import database


with database.connection():
    tables = [table[0] for table in database.execute("SELECT tbl_name FROM sqlite_master WHERE type=\"table\";")]
    for table in tables:
        print(f"For table: {table}")
        statement = Pragma(database, PragmaStatements.TABLE_INFO, table, PragmaTypes.CALL)
        for data in statement.execute():
            print(data)
        print()
