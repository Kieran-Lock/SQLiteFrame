<a id="readme-top"></a> 



<!-- PROJECT SUMMARY -->
<br />
<div align="center">
  <img src="https://i.imgur.com/ryp9aJT.gif" alt="Logo">
  <br />
  
  <p align="center">
    A lightweight, zero-dependency ORM for SQLite in Python
    <br />
    <a href="https://sqliteframe-documentation.vercel.app/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#about-the-project">About the Project</a>
    ·
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#basic-usage">Basic Usage</a>
    ·
    <a href="https://sqliteframe-documentation.vercel.app/">Documentation</a>
    ·
    <a href="https://github.com/Kieran-Lock/SQLiteFrame/blob/master/LICENSE">License</a>
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About the Project
SQLiteFrame is an SQLite ORM for python, designed to be as lightweight, intuitive, and simple to use as possible.  
It is designed to closely mimic SQL syntax whilst remaining as pythonic as possible to save developers valuable time _(and brain cells)_ when interacting with SQLite databases, by building reusable SQLite query objects using method-chaining, and abstracting away SQLite's connection and cursor system with a single context manager.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

SQLiteFrame is available on [PyPI](https://pypi.org/project/SQLiteFrame). Simply install the package into your project environment with PIP:
```
pip install SQLiteFrame
```

To install specific previous versions, take a look at the [version history](https://github.com/Kieran-Lock/SQLiteFrame/releases), locate the version tag `(vX.Y.Z)`, and run:
```
pip install SQLiteFrame==X.Y.Z
```

SQLiteFrame has **ZERO** external dependencies - it uses only the standard library's `sqlite3` to execute SQLite commands.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- BASIC USAGE EXAMPLES -->
## Basic Usage

### Creating a table
To create a table, use the template below. This will automatically run the CreateTable SQLite command for you:
```py
from sqliteframe import Database, table, String, Integer, Boolean
from pathlib import Path


database = Database(Path("<database_path>.db"), output=False)  # When the output parameter is True, the formed SQL query will be outputted into the console as a string every time a query is executed


@table(database)
class TableName:
    primary_key_field = String(primary_key=True)
    second_column = Integer
    third_column = Boolean(nullable=True)
```

### Inserting Data
To insert data into an existing table, use the following query template:
```py
insert_statement = TableName.insert_into({
    TableName.primary_key_field: "PrimaryKey1",
    TableName.second_column: 1_000,
    TableName.third_column: True
})
insert_statement.execute()
```

### Fetching / Selecting Data
Fetching / selecting data from an existing table with pre-inserted data is done as below:
```py
select_statement = TableName.select(TableName.second_column, TableName.third_column)
select_statement.execute()
```

### Linking Tables (Foreign Keys)
Linking tables can be done with Foreign Keys in SQLiteFrame:
```py
from sqliteframe import Database, table, String, Integer, Boolean, ForeignKey
from pathlib import Path


database = Database(Path("<database_path>.db"), output=False)


@table(database)
class FirstTableName:
    primary_key_field = String(primary_key=True)
    second_column = Integer
    third_column = Boolean(nullable=True)


@table(database)
class SecondTableName:
    primary_key_field = Integer(primary_key=True)
    second_column = Boolean(nullable=True)
    third_column = String
    foreign_key_column = ForeignKey(FirstTableName)  # This column now references the primary key of the FirstTableName entity, and will infer its type
```

### Complex Data Fetching / Selection
To build more complex select queries, you can use `join`, `where`, and `order by`:
```py
from sqliteframe import JoinTypes, OrderTypes


select_statement = FirstTableName.select(SecondTableName.second_column, FirstTableName.third_column).join(
    SecondTableName, SecondTableName.foreign_key_column == FirstTableName.primary_key_field, join_type=JoinTypes.LEFT
).where(
    SecondTableName.third_column == "Criteria"
).order_by(
    FirstTableName.second_column, (OrderTypes.DESCENDING, OrderTypes.NULLS_FIRST)
)
select_statement.execute()
```

### Editing Data
To edit pre-inserted data, a `set` query can be used:
```py
set_statement = FirstTableName.set({
    TableName.second_column: 10_000,
    TableName.third_column: None  # This column is nullable, and so this is acceptable
}).where(
    (Person.primary_key_column == "PrimaryKey1") & (Person.second_column > 500)  # Brackets are ESSENTIAL with complex where clauses, as these statements use bitwise operators, which often have unexpected operator precedence
)
set_statement.execute()
```
_NOTE: The where clause can be emitted from this statement, but this would update **every** record in the target table._

### Deleting Data
To delete pre-inserted table data, use the `delete_from` query:
```py
delete_statement = TableName.delete_from().where(
    (TableName.second_column <= 250)
)
delete_statement.execute()
```
_NOTE: The where clause can be emitted from this statement, but this would delete **every** record in the target table._

### Dropping Tables
Dropping tables does not delete the table reference from python - just in the SQL. Tables which others tables depend on / reference cannot be deleted by default to maintain referential integrity. This behaviour can be changed when defining the referencing foreign key column.  
  
To entirely drop (delete) an existing table, use the `drop_table` statement:
```py
SecondTableName.drop_table().execute()  # This entity is dropped first as it depends on the FirstTableName entity
FirstTableName.drop_table().execute()  # Cannot drop this entity until the SecondTableName entity is dropped
```

_For more examples and specific detail, please refer to the [Documentation](https://sqliteframe-documentation.vercel.app/)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](https://github.com/Kieran-Lock/SQLiteFrame/blob/master/LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
