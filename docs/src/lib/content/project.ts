import {parseProject} from "$lib/utils/parsing";

export const project = parseProject({
    "component": "Package",
    "meta": {
        "searchCategory": "package",
        "name": "sqliteframe",
        "source": "\"\"\"\nSQLiteFrame is a lightweight, zero-dependency ORM for SQLite in Python.\n\nSQLiteFrame is an SQLite ORM for python, designed to be as lightweight, intuitive, and simple to use as possible.\nIt is designed to closely mimic SQL syntax whilst remaining as pythonic as possible\nto save developers valuable time (and brain cells) when interacting with SQLite databases,\nby building reusable SQLite query objects using method-chaining, and abstracting away\nSQLite's connection and cursor system with a single context manager.\n\"\"\"\n\nfrom .database import Database\nfrom .entity import table\nfrom .types import Integer, String, Type, Boolean, Date, Time, Blob, Float, Types\nfrom .wildcards import Wildcards\nfrom .foreign_key import ForeignKey, Restraints as FKRestraints\nfrom .result import Result\nfrom .join import JoinTypes\nfrom .order_by import OrderTypes\nfrom .statements import Pragma\nfrom .pragma import PragmaTypes, PragmaStatements\nfrom .suggested_schema import SuggestedSchema\nfrom .parameterized import Parameterized\n",
        "shortDescription": "SQLiteFrame is a lightweight, zero-dependency ORM for SQLite in Python.",
        "longDescription": "SQLiteFrame is an SQLite ORM for python, designed to be as lightweight, intuitive, and simple to use as possible.\nIt is designed to closely mimic SQL syntax whilst remaining as pythonic as possible\nto save developers valuable time (and brain cells) when interacting with SQLite databases,\nby building reusable SQLite query objects using method-chaining, and abstracting away\nSQLite's connection and cursor system with a single context manager.",
        "deprecations": [],
        "examples": [],
        "links": [],
        "notes": [],
        "searchTerms": "sqliteframe\nSQLiteFrame is a lightweight, zero-dependency ORM for SQLite in Python.\nSQLiteFrame is an SQLite ORM for python, designed to be as lightweight, intuitive, and simple to use as possible.\nIt is designed to closely mimic SQL syntax whilst remaining as pythonic as possible\nto save developers valuable time (and brain cells) when interacting with SQLite databases,\nby building reusable SQLite query objects using method-chaining, and abstracting away\nSQLite's connection and cursor system with a single context manager."
    },
    "children": {
        "Sub-Packages": [
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "entity",
                    "source": "\"\"\"\nA subpackage containing the logic behind tables and table columns.\n\"\"\"\n\nfrom .entity import Entity, table\nfrom .column import Column\n",
                    "shortDescription": "A subpackage containing the logic behind tables and table columns.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "entity\nA subpackage containing the logic behind tables and table columns.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "column",
                                "source": "\"\"\"\nThe module containing the logic for SQLiteFrame columns.\n\"\"\"\n\nfrom __future__ import annotations\nfrom dataclasses import dataclass, field\nfrom ..types import Type\nfrom ..where import Comparisons, Condition\nfrom ..foreign_key import ForeignKey\nif False:\n    from .entity import Entity\n\n\n@dataclass(frozen=True, slots=True)\nclass Column:\n    \"\"\"\n    The implementation for SQLiteFrame columns.\n    \"\"\"\n\n    table: Entity = field(repr=False)\n    name: str\n    type: Type | ForeignKey\n\n    @property\n    def is_primary_key(self) -> bool:\n        \"\"\"\n        Determines whether this column is a primary key column.\n\n        :return: Whether this column is a primary key column\n        \"\"\"\n        return self.type.primary_key\n\n    @property\n    def is_nullable(self) -> bool:\n        \"\"\"\n        Determines whether this column is nullable.\n\n        :return: Whether this column is nullable\n        \"\"\"\n        return self.type.nullable\n\n    @property\n    def is_foreign_key(self) -> bool:\n        \"\"\"\n        Determines whether this column is a foreign key column.\n\n        :return: Whether this column is a foreign key column\n        \"\"\"\n        return isinstance(self.type, ForeignKey)\n\n    @property\n    def default(self) -> object | None:\n        \"\"\"\n        Gets the default value of this column - None is returned if no default exists.\n\n        :return: The default value of this column\n        \"\"\"\n        return self.type.default\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this column, used when it is being executed.\n\n        :return: The valid SQL string representing this column\n        \"\"\"\n\n        primary_key = \" PRIMARY KEY\" if self.is_primary_key else \"\"\n        not_null = \"\" if self.is_nullable else \" NOT NULL\"\n        default = \"\" if self.default is None else f\" DEFAULT {self.type.encode(self.default)}\"\n        if self.is_foreign_key:\n            return str(self.type)\n        return f\"{self.type.sql_name()}{primary_key}{not_null}{default}\"\n\n    def __eq__(self, other: object) -> Condition:\n        \"\"\"\n        Column == Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.EQUAL, other)\n\n    def __ne__(self, other: object, **kwargs) -> Condition:\n        \"\"\"\n        Column != Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.NOT_EQUAL, other)\n\n    def __gt__(self, other: object) -> Condition:\n        \"\"\"\n        Column > Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.GREATER, other)\n\n    def __ge__(self, other: object) -> Condition:\n        \"\"\"\n        Column >= Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.GREATER_EQUAL, other)\n\n    def __lt__(self, other: object) -> Condition:\n        \"\"\"\n        Column < Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.LESS, other)\n\n    def __le__(self, other: object) -> Condition:\n        \"\"\"\n        Column <= Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.LESS_EQUAL, other)\n\n    def __neg__(self) -> Condition:\n        \"\"\"\n        -Column\n\n        Checks whether this column is false.\n\n        :return: The Condition object representing this condition\n        \"\"\"\n        if not issubclass(self.type.decoded_type, bool):\n            raise TypeError(\"Cannot run __bool__ on non-boolean column\")\n        return Condition(self, Comparisons.EQUAL, 0)\n\n    def __pos__(self) -> Condition:\n        \"\"\"\n        +Column\n\n        Checks whether this column is true.\n\n        :return: The Condition object representing this condition\n        \"\"\"\n        if not issubclass(self.type.decoded_type, bool):\n            raise TypeError(\"Cannot run __bool__ on non-boolean column\")\n        return Condition(self, Comparisons.EQUAL, 1)\n",
                                "shortDescription": "The module containing the logic for SQLiteFrame columns.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "column\nThe module containing the logic for SQLiteFrame columns.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Column",
                                            "source": "@dataclass(frozen=True, slots=True)\nclass Column:\n    \"\"\"\n    The implementation for SQLiteFrame columns.\n    \"\"\"\n\n    table: Entity = field(repr=False)\n    name: str\n    type: Type | ForeignKey\n\n    @property\n    def is_primary_key(self) -> bool:\n        \"\"\"\n        Determines whether this column is a primary key column.\n\n        :return: Whether this column is a primary key column\n        \"\"\"\n        return self.type.primary_key\n\n    @property\n    def is_nullable(self) -> bool:\n        \"\"\"\n        Determines whether this column is nullable.\n\n        :return: Whether this column is nullable\n        \"\"\"\n        return self.type.nullable\n\n    @property\n    def is_foreign_key(self) -> bool:\n        \"\"\"\n        Determines whether this column is a foreign key column.\n\n        :return: Whether this column is a foreign key column\n        \"\"\"\n        return isinstance(self.type, ForeignKey)\n\n    @property\n    def default(self) -> object | None:\n        \"\"\"\n        Gets the default value of this column - None is returned if no default exists.\n\n        :return: The default value of this column\n        \"\"\"\n        return self.type.default\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this column, used when it is being executed.\n\n        :return: The valid SQL string representing this column\n        \"\"\"\n\n        primary_key = \" PRIMARY KEY\" if self.is_primary_key else \"\"\n        not_null = \"\" if self.is_nullable else \" NOT NULL\"\n        default = \"\" if self.default is None else f\" DEFAULT {self.type.encode(self.default)}\"\n        if self.is_foreign_key:\n            return str(self.type)\n        return f\"{self.type.sql_name()}{primary_key}{not_null}{default}\"\n\n    def __eq__(self, other: object) -> Condition:\n        \"\"\"\n        Column == Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.EQUAL, other)\n\n    def __ne__(self, other: object, **kwargs) -> Condition:\n        \"\"\"\n        Column != Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.NOT_EQUAL, other)\n\n    def __gt__(self, other: object) -> Condition:\n        \"\"\"\n        Column > Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.GREATER, other)\n\n    def __ge__(self, other: object) -> Condition:\n        \"\"\"\n        Column >= Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.GREATER_EQUAL, other)\n\n    def __lt__(self, other: object) -> Condition:\n        \"\"\"\n        Column < Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.LESS, other)\n\n    def __le__(self, other: object) -> Condition:\n        \"\"\"\n        Column <= Other\n\n        :param other: The right-side item to generate a Condition object from\n        :return: The Condition object representing this condition\n        \"\"\"\n        return Condition(self, Comparisons.LESS_EQUAL, other)\n\n    def __neg__(self) -> Condition:\n        \"\"\"\n        -Column\n\n        Checks whether this column is false.\n\n        :return: The Condition object representing this condition\n        \"\"\"\n        if not issubclass(self.type.decoded_type, bool):\n            raise TypeError(\"Cannot run __bool__ on non-boolean column\")\n        return Condition(self, Comparisons.EQUAL, 0)\n\n    def __pos__(self) -> Condition:\n        \"\"\"\n        +Column\n\n        Checks whether this column is true.\n\n        :return: The Condition object representing this condition\n        \"\"\"\n        if not issubclass(self.type.decoded_type, bool):\n            raise TypeError(\"Cannot run __bool__ on non-boolean column\")\n        return Condition(self, Comparisons.EQUAL, 1)\n",
                                            "signature": "(table: 'Entity', name: 'str', type: 'Type | ForeignKey') -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": null,
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "name",
                                                        "description": null,
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "type",
                                                        "description": null,
                                                        "annotation": "Type | ForeignKey",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The implementation for SQLiteFrame columns.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Column\nThe implementation for SQLiteFrame columns.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": []
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "entity",
                                "source": "\"\"\"\nThe module containing the logic for entities (tables) in SQLiteFrame\n\"\"\"\n\nfrom __future__ import annotations\nfrom typing import TypeVar, Literal, Iterable, Optional, Callable, Iterator\nfrom pprint import pformat\nfrom inspect import getmembers, isroutine\nfrom .column import Column\nfrom ..types import Type\nfrom ..statements import InsertInto, Set, CreateTable, Select, DeleteFrom, DropTable\nfrom ..wildcards import Wildcards\nfrom ..foreign_key import ForeignKey\nif False:\n    from ..database import Database\n\n\nTableT = TypeVar(\"TableT\")\nColumnT = TypeVar(\"ColumnT\", bound=Column)\n\n\ndef table(database: Database, auto_create: bool = True) -> Callable[[type[TableT]], Entity | TableT]:\n    \"\"\"\n    The decorator used to declare a table in a schema.\n\n    :param database: The database the table belongs to\n    :param auto_create: Whether the table should be created in the database automatically, after it is declared\n    :return: A wrapper function to convert a valid class into an Entity\n    \"\"\"\n\n    def wrapper(table_: type[TableT]) -> Entity | type[TableT]:\n        \"\"\"\n        The wrapper method in the decorator, which returns an Entity from a valid class.\n\n        :param table_: The class to convert\n        :return: An entity object with all the declared data\n        \"\"\"\n\n        return Entity(table_, database, auto_create=auto_create)\n    return wrapper\n\n\nclass Entity:\n    \"\"\"\n    The class containing the logic for Entities in SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table_: Type[TableT], database: Database, auto_create: bool = True):\n        \"\"\"\n        :param table_: The decorated table class\n        :param database: The database the table belongs to\n        :param auto_create: Whether the table should be created in the database automatically, after it is declared\n        \"\"\"\n        self.database = database\n        self.auto_create = auto_create\n        self.table_name = None\n        self.columns = []\n        self.integrate_with_structure(table_)\n\n    def integrate_with_structure(self, table_: Type[TableT]) -> None:\n        \"\"\"\n        Creates and registers the table with the database as necessary and declared.\n\n        :param table_: The decorated table class\n        \"\"\"\n\n        self.database.add_table(self)\n        self.table_name = table_.__name__\n        for column in self.extract_columns(table_):\n            if hasattr(self, column.name):\n                raise NameError(f\"Column name '{column.name}' cannot exist within a table\") from None\n            setattr(self, column.name, column)\n            self.columns.append(column)\n        if self.auto_create:\n            with self.database.connection():\n                try:\n                    self.create_table().execute()\n                except NameError:\n                    raise ValueError(\"Cannot lazy-load foreign key with auto_create=True\") from None\n\n    def __repr__(self) -> str:\n        \"\"\"\n        An internal string representation of the table.\n\n        :return: The columns of this table formatted as a string\n        \"\"\"\n        return pformat(self.columns)\n\n    def __str__(self) -> str:\n        \"\"\"\n        A string representation of the table.\n\n        :return: The name of the table\n        \"\"\"\n        return self.table_name\n\n    def extract_columns(self, table_: Type[TableT]) -> Iterator[Column]:\n        \"\"\"\n        Extracts the declared columns from a valid class definition of a class in the schema.\n\n        :param table_: The decorated table class\n        :return: A generator which iterates each of the created Column objects\n        \"\"\"\n\n        column_information = list(filter(lambda member: not member[0].startswith(\"__\"),\n                                         getmembers(table_, lambda member: not isroutine(member))))\n        for name, column in column_information:\n            yield self.amend_column(name, column)\n\n    def amend_column(self, column_name: str, column_type: Type | type | ForeignKey) -> Column:\n        \"\"\"\n        Converts a column as defined in the schema into a valid Column object.\n\n        :param column_name: The defined name of the column\n        :param column_type: The defined type of the column\n        :return: The valid column object to be used by SQLiteFrame\n        \"\"\"\n        if isinstance(column_type, type):  # Plain Key\n            column_type = column_type()\n        return Column(self, column_name, column_type)\n\n    def sort_columns(self, columns: Iterable[Column | Wildcards],\n                     base_columns_override: Optional[list[Column]] = None) -> list[Column]:\n        \"\"\"\n        Returns the given columns in the correct order as per the schema.\n\n        This is used in SELECT statements to ensure that the column order\n        matches with the order of columns in the returned data.\n\n        :param columns: The columns to sort\n        :param base_columns_override: An override mechanism for the columns to base the ordering off of\n        :return: The sorted list of columns\n        \"\"\"\n        base_columns = self.columns if base_columns_override is None else base_columns_override\n        if Wildcards.All in columns:\n            return base_columns\n        return sorted(columns, key=lambda column: base_columns.index(column))\n\n    def set(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> Set:\n        \"\"\"\n        Create a SET statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: A Set statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        return Set(self, data)\n\n    def insert_into(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> InsertInto:\n        \"\"\"\n        Create an INSERT INTO statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: An InsertInto statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        for column in set(self.columns) - set(data):\n            if not column.is_nullable and column.default is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n            data[column] = None\n        return InsertInto(self, data)\n\n    def select(self, *columns: Column | Literal[Wildcards.All], distinct: bool = False) -> Select:\n        \"\"\"\n        Create an SELECT statement which runs on this table.\n\n        :param columns: The column(s) to select\n        :param distinct: Whether to select only distinct (non-duplicate) data\n        :return: A Select statement object, which can be operated on further.\n        \"\"\"\n\n        if Wildcards.All in columns:\n            columns = [Wildcards.All]\n        return Select(self, list(columns), distinct=distinct)\n\n    def delete_from(self) -> DeleteFrom:\n        \"\"\"\n        Create an DELETE FROM statement which runs on this table.\n\n        :return: A DeleteFrom statement object, which can be operated on further.\n        \"\"\"\n\n        return DeleteFrom(self)\n\n    def drop_table(self) -> DropTable:\n        \"\"\"\n        Create an DROP TABLE statement which runs on this table.\n\n        :return: A DropTable statement object, which can be operated on further.\n        \"\"\"\n\n        return DropTable(self)\n\n    def __getitem__(self, item: ColumnT.type.decoded_type) -> ColumnT.type.decoded_type:\n        \"\"\"\n        Entity[data] --> data\n\n        This is method which serves only to create a more declarative API - it can be used when inserting\n        or setting data into a foreign key column, to explicitly show which table the data being input\n        is intended to be coming from.\n\n        :param item: The data in the primary key column of this table\n        :return: The same data input as a parameter\n        \"\"\"\n\n        return item\n\n    def create_table(self) -> CreateTable:\n        \"\"\"\n        Create an CREATE TABLE statement which runs on this table.\n\n        :return: A CreateTable statement object, which can be operated on further.\n        \"\"\"\n        return CreateTable(self, self.columns)\n",
                                "shortDescription": "The module containing the logic for entities (tables) in SQLiteFrame",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "entity\nThe module containing the logic for entities (tables) in SQLiteFrame\nNone",
                                "globalVariables": [
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "ColumnT",
                                            "annotation": null,
                                            "value": "~ColumnT"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "TableT",
                                            "annotation": null,
                                            "value": "~TableT"
                                        },
                                        "children": {}
                                    }
                                ]
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Entity",
                                            "source": "class Entity:\n    \"\"\"\n    The class containing the logic for Entities in SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table_: Type[TableT], database: Database, auto_create: bool = True):\n        \"\"\"\n        :param table_: The decorated table class\n        :param database: The database the table belongs to\n        :param auto_create: Whether the table should be created in the database automatically, after it is declared\n        \"\"\"\n        self.database = database\n        self.auto_create = auto_create\n        self.table_name = None\n        self.columns = []\n        self.integrate_with_structure(table_)\n\n    def integrate_with_structure(self, table_: Type[TableT]) -> None:\n        \"\"\"\n        Creates and registers the table with the database as necessary and declared.\n\n        :param table_: The decorated table class\n        \"\"\"\n\n        self.database.add_table(self)\n        self.table_name = table_.__name__\n        for column in self.extract_columns(table_):\n            if hasattr(self, column.name):\n                raise NameError(f\"Column name '{column.name}' cannot exist within a table\") from None\n            setattr(self, column.name, column)\n            self.columns.append(column)\n        if self.auto_create:\n            with self.database.connection():\n                try:\n                    self.create_table().execute()\n                except NameError:\n                    raise ValueError(\"Cannot lazy-load foreign key with auto_create=True\") from None\n\n    def __repr__(self) -> str:\n        \"\"\"\n        An internal string representation of the table.\n\n        :return: The columns of this table formatted as a string\n        \"\"\"\n        return pformat(self.columns)\n\n    def __str__(self) -> str:\n        \"\"\"\n        A string representation of the table.\n\n        :return: The name of the table\n        \"\"\"\n        return self.table_name\n\n    def extract_columns(self, table_: Type[TableT]) -> Iterator[Column]:\n        \"\"\"\n        Extracts the declared columns from a valid class definition of a class in the schema.\n\n        :param table_: The decorated table class\n        :return: A generator which iterates each of the created Column objects\n        \"\"\"\n\n        column_information = list(filter(lambda member: not member[0].startswith(\"__\"),\n                                         getmembers(table_, lambda member: not isroutine(member))))\n        for name, column in column_information:\n            yield self.amend_column(name, column)\n\n    def amend_column(self, column_name: str, column_type: Type | type | ForeignKey) -> Column:\n        \"\"\"\n        Converts a column as defined in the schema into a valid Column object.\n\n        :param column_name: The defined name of the column\n        :param column_type: The defined type of the column\n        :return: The valid column object to be used by SQLiteFrame\n        \"\"\"\n        if isinstance(column_type, type):  # Plain Key\n            column_type = column_type()\n        return Column(self, column_name, column_type)\n\n    def sort_columns(self, columns: Iterable[Column | Wildcards],\n                     base_columns_override: Optional[list[Column]] = None) -> list[Column]:\n        \"\"\"\n        Returns the given columns in the correct order as per the schema.\n\n        This is used in SELECT statements to ensure that the column order\n        matches with the order of columns in the returned data.\n\n        :param columns: The columns to sort\n        :param base_columns_override: An override mechanism for the columns to base the ordering off of\n        :return: The sorted list of columns\n        \"\"\"\n        base_columns = self.columns if base_columns_override is None else base_columns_override\n        if Wildcards.All in columns:\n            return base_columns\n        return sorted(columns, key=lambda column: base_columns.index(column))\n\n    def set(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> Set:\n        \"\"\"\n        Create a SET statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: A Set statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        return Set(self, data)\n\n    def insert_into(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> InsertInto:\n        \"\"\"\n        Create an INSERT INTO statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: An InsertInto statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        for column in set(self.columns) - set(data):\n            if not column.is_nullable and column.default is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n            data[column] = None\n        return InsertInto(self, data)\n\n    def select(self, *columns: Column | Literal[Wildcards.All], distinct: bool = False) -> Select:\n        \"\"\"\n        Create an SELECT statement which runs on this table.\n\n        :param columns: The column(s) to select\n        :param distinct: Whether to select only distinct (non-duplicate) data\n        :return: A Select statement object, which can be operated on further.\n        \"\"\"\n\n        if Wildcards.All in columns:\n            columns = [Wildcards.All]\n        return Select(self, list(columns), distinct=distinct)\n\n    def delete_from(self) -> DeleteFrom:\n        \"\"\"\n        Create an DELETE FROM statement which runs on this table.\n\n        :return: A DeleteFrom statement object, which can be operated on further.\n        \"\"\"\n\n        return DeleteFrom(self)\n\n    def drop_table(self) -> DropTable:\n        \"\"\"\n        Create an DROP TABLE statement which runs on this table.\n\n        :return: A DropTable statement object, which can be operated on further.\n        \"\"\"\n\n        return DropTable(self)\n\n    def __getitem__(self, item: ColumnT.type.decoded_type) -> ColumnT.type.decoded_type:\n        \"\"\"\n        Entity[data] --> data\n\n        This is method which serves only to create a more declarative API - it can be used when inserting\n        or setting data into a foreign key column, to explicitly show which table the data being input\n        is intended to be coming from.\n\n        :param item: The data in the primary key column of this table\n        :return: The same data input as a parameter\n        \"\"\"\n\n        return item\n\n    def create_table(self) -> CreateTable:\n        \"\"\"\n        Create an CREATE TABLE statement which runs on this table.\n\n        :return: A CreateTable statement object, which can be operated on further.\n        \"\"\"\n        return CreateTable(self, self.columns)\n",
                                            "signature": "(table_: 'Type[TableT]', database: 'Database', auto_create: 'bool' = True)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table_",
                                                        "description": "The decorated table class",
                                                        "annotation": "Type[TableT]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database the table belongs to",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "auto_create",
                                                        "description": "Whether the table should be created in the database automatically, after it is declared",
                                                        "annotation": "bool",
                                                        "default": "True",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for Entities in SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Entity\nThe class containing the logic for Entities in SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "integrate_with_structure",
                                                        "source": "    def integrate_with_structure(self, table_: Type[TableT]) -> None:\n        \"\"\"\n        Creates and registers the table with the database as necessary and declared.\n\n        :param table_: The decorated table class\n        \"\"\"\n\n        self.database.add_table(self)\n        self.table_name = table_.__name__\n        for column in self.extract_columns(table_):\n            if hasattr(self, column.name):\n                raise NameError(f\"Column name '{column.name}' cannot exist within a table\") from None\n            setattr(self, column.name, column)\n            self.columns.append(column)\n        if self.auto_create:\n            with self.database.connection():\n                try:\n                    self.create_table().execute()\n                except NameError:\n                    raise ValueError(\"Cannot lazy-load foreign key with auto_create=True\") from None\n",
                                                        "signature": "(self, table_: 'Type[TableT]') -> 'None'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "table_",
                                                                    "description": "The decorated table class",
                                                                    "annotation": "Type[TableT]",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "Creates and registers the table with the database as necessary and declared.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "integrate_with_structure\nCreates and registers the table with the database as necessary and declared.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "extract_columns",
                                                        "source": "    def extract_columns(self, table_: Type[TableT]) -> Iterator[Column]:\n        \"\"\"\n        Extracts the declared columns from a valid class definition of a class in the schema.\n\n        :param table_: The decorated table class\n        :return: A generator which iterates each of the created Column objects\n        \"\"\"\n\n        column_information = list(filter(lambda member: not member[0].startswith(\"__\"),\n                                         getmembers(table_, lambda member: not isroutine(member))))\n        for name, column in column_information:\n            yield self.amend_column(name, column)\n",
                                                        "signature": "(self, table_: 'Type[TableT]') -> 'Iterator[Column]'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "table_",
                                                                    "description": "The decorated table class",
                                                                    "annotation": "Type[TableT]",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A generator which iterates each of the created Column objects",
                                                                    "annotation": "Iterator[Column]"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Extracts the declared columns from a valid class definition of a class in the schema.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": true,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "extract_columns\nExtracts the declared columns from a valid class definition of a class in the schema.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "amend_column",
                                                        "source": "    def amend_column(self, column_name: str, column_type: Type | type | ForeignKey) -> Column:\n        \"\"\"\n        Converts a column as defined in the schema into a valid Column object.\n\n        :param column_name: The defined name of the column\n        :param column_type: The defined type of the column\n        :return: The valid column object to be used by SQLiteFrame\n        \"\"\"\n        if isinstance(column_type, type):  # Plain Key\n            column_type = column_type()\n        return Column(self, column_name, column_type)\n",
                                                        "signature": "(self, column_name: 'str', column_type: 'Type | type | ForeignKey') -> 'Column'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "column_name",
                                                                    "description": "The defined name of the column",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "column_type",
                                                                    "description": "The defined type of the column",
                                                                    "annotation": "Type | type | ForeignKey",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid column object to be used by SQLiteFrame",
                                                                    "annotation": "Column"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Converts a column as defined in the schema into a valid Column object.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "amend_column\nConverts a column as defined in the schema into a valid Column object.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sort_columns",
                                                        "source": "    def sort_columns(self, columns: Iterable[Column | Wildcards],\n                     base_columns_override: Optional[list[Column]] = None) -> list[Column]:\n        \"\"\"\n        Returns the given columns in the correct order as per the schema.\n\n        This is used in SELECT statements to ensure that the column order\n        matches with the order of columns in the returned data.\n\n        :param columns: The columns to sort\n        :param base_columns_override: An override mechanism for the columns to base the ordering off of\n        :return: The sorted list of columns\n        \"\"\"\n        base_columns = self.columns if base_columns_override is None else base_columns_override\n        if Wildcards.All in columns:\n            return base_columns\n        return sorted(columns, key=lambda column: base_columns.index(column))\n",
                                                        "signature": "(self, columns: 'Iterable[Column | Wildcards]', base_columns_override: 'Optional[list[Column]]' = None) -> 'list[Column]'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "columns",
                                                                    "description": "The columns to sort",
                                                                    "annotation": "Iterable[Column | Wildcards]",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "base_columns_override",
                                                                    "description": "An override mechanism for the columns to base the ordering off of",
                                                                    "annotation": "Optional[list[Column]]",
                                                                    "default": "None",
                                                                    "isOptional": true
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The sorted list of columns",
                                                                    "annotation": "list[Column]"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Returns the given columns in the correct order as per the schema.",
                                                        "longDescription": "This is used in SELECT statements to ensure that the column order\nmatches with the order of columns in the returned data.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sort_columns\nReturns the given columns in the correct order as per the schema.\nThis is used in SELECT statements to ensure that the column order\nmatches with the order of columns in the returned data."
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "set",
                                                        "source": "    def set(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> Set:\n        \"\"\"\n        Create a SET statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: A Set statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        return Set(self, data)\n",
                                                        "signature": "(self, data: 'dict[ColumnT, ColumnT.type.decoded_type]') -> 'Set'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "data",
                                                                    "description": "The data to set into this table as a valid mapping",
                                                                    "annotation": "dict[ColumnT, ColumnT.type.decoded_type]",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A Set statement object, which can be operated on further.",
                                                                    "annotation": "Set"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create a SET statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "set\nCreate a SET statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "insert_into",
                                                        "source": "    def insert_into(self, data: dict[ColumnT, ColumnT.type.decoded_type]) -> InsertInto:\n        \"\"\"\n        Create an INSERT INTO statement which runs on this table.\n\n        :param data: The data to set into this table as a valid mapping\n        :return: An InsertInto statement object, which can be operated on further.\n        \"\"\"\n\n        for column in data:\n            if not column.is_nullable and data[column] is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n        for column in set(self.columns) - set(data):\n            if not column.is_nullable and column.default is None:\n                raise ValueError(f\"Non-nullable column '{column.name}' passed NULL\") from None\n            data[column] = None\n        return InsertInto(self, data)\n",
                                                        "signature": "(self, data: 'dict[ColumnT, ColumnT.type.decoded_type]') -> 'InsertInto'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "data",
                                                                    "description": "The data to set into this table as a valid mapping",
                                                                    "annotation": "dict[ColumnT, ColumnT.type.decoded_type]",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "An InsertInto statement object, which can be operated on further.",
                                                                    "annotation": "InsertInto"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create an INSERT INTO statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "insert_into\nCreate an INSERT INTO statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "select",
                                                        "source": "    def select(self, *columns: Column | Literal[Wildcards.All], distinct: bool = False) -> Select:\n        \"\"\"\n        Create an SELECT statement which runs on this table.\n\n        :param columns: The column(s) to select\n        :param distinct: Whether to select only distinct (non-duplicate) data\n        :return: A Select statement object, which can be operated on further.\n        \"\"\"\n\n        if Wildcards.All in columns:\n            columns = [Wildcards.All]\n        return Select(self, list(columns), distinct=distinct)\n",
                                                        "signature": "(self, *columns: 'Column | Literal[Wildcards.All]', distinct: 'bool' = False) -> 'Select'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "columns",
                                                                    "description": "The column(s) to select",
                                                                    "annotation": "Column | Literal[Wildcards.All]",
                                                                    "default": null,
                                                                    "isOptional": true
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "distinct",
                                                                    "description": "Whether to select only distinct (non-duplicate) data",
                                                                    "annotation": "bool",
                                                                    "default": "False",
                                                                    "isOptional": true
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A Select statement object, which can be operated on further.",
                                                                    "annotation": "Select"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create an SELECT statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "select\nCreate an SELECT statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "delete_from",
                                                        "source": "    def delete_from(self) -> DeleteFrom:\n        \"\"\"\n        Create an DELETE FROM statement which runs on this table.\n\n        :return: A DeleteFrom statement object, which can be operated on further.\n        \"\"\"\n\n        return DeleteFrom(self)\n",
                                                        "signature": "(self) -> 'DeleteFrom'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A DeleteFrom statement object, which can be operated on further.",
                                                                    "annotation": "DeleteFrom"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create an DELETE FROM statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "delete_from\nCreate an DELETE FROM statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "drop_table",
                                                        "source": "    def drop_table(self) -> DropTable:\n        \"\"\"\n        Create an DROP TABLE statement which runs on this table.\n\n        :return: A DropTable statement object, which can be operated on further.\n        \"\"\"\n\n        return DropTable(self)\n",
                                                        "signature": "(self) -> 'DropTable'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A DropTable statement object, which can be operated on further.",
                                                                    "annotation": "DropTable"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create an DROP TABLE statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "drop_table\nCreate an DROP TABLE statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "create_table",
                                                        "source": "    def create_table(self) -> CreateTable:\n        \"\"\"\n        Create an CREATE TABLE statement which runs on this table.\n\n        :return: A CreateTable statement object, which can be operated on further.\n        \"\"\"\n        return CreateTable(self, self.columns)\n",
                                                        "signature": "(self) -> 'CreateTable'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A CreateTable statement object, which can be operated on further.",
                                                                    "annotation": "CreateTable"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Create an CREATE TABLE statement which runs on this table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "create_table\nCreate an CREATE TABLE statement which runs on this table.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": [
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "table",
                                            "source": "def table(database: Database, auto_create: bool = True) -> Callable[[type[TableT]], Entity | TableT]:\n    \"\"\"\n    The decorator used to declare a table in a schema.\n\n    :param database: The database the table belongs to\n    :param auto_create: Whether the table should be created in the database automatically, after it is declared\n    :return: A wrapper function to convert a valid class into an Entity\n    \"\"\"\n\n    def wrapper(table_: type[TableT]) -> Entity | type[TableT]:\n        \"\"\"\n        The wrapper method in the decorator, which returns an Entity from a valid class.\n\n        :param table_: The class to convert\n        :return: An entity object with all the declared data\n        \"\"\"\n\n        return Entity(table_, database, auto_create=auto_create)\n    return wrapper\n",
                                            "signature": "(database: 'Database', auto_create: 'bool' = True) -> 'Callable[[type[TableT]], Entity | TableT]'",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database the table belongs to",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "auto_create",
                                                        "description": "Whether the table should be created in the database automatically, after it is declared",
                                                        "annotation": "bool",
                                                        "default": "True",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "A wrapper function to convert a valid class into an Entity",
                                                        "annotation": "Callable[[type[TableT]], Entity | TableT]"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The decorator used to declare a table in a schema.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "table\nThe decorator used to declare a table in a schema.\nNone"
                                        },
                                        "children": {}
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "foreign_key",
                    "source": "\"\"\"\nA subpackage containing all foreign key logic, for linking tables in relational databases.\n\"\"\"\n\nfrom .foreign_key import ForeignKey\nfrom .restraints import Restraints\n",
                    "shortDescription": "A subpackage containing all foreign key logic, for linking tables in relational databases.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "foreign_key\nA subpackage containing all foreign key logic, for linking tables in relational databases.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "foreign_key",
                                "source": "\"\"\"\nThe module containing logic for foreign keys.\n\"\"\"\n\nfrom __future__ import annotations\nfrom functools import cached_property\nfrom typing import TypeVar, Optional, Callable\nfrom .restraints import Restraints\nfrom ..types import Type\nif False:\n    from ..entity import Entity, Column\n\n\nEncodedT = TypeVar(\"EncodedT\")\nDecodedT = TypeVar(\"DecodedT\")\n\n\nclass ForeignKey(Type[EncodedT, DecodedT]):\n    \"\"\"\n    The implementation for foreign keys.\n\n    Inheritance from Type is an implementation detail - most of the Type implementations are delegated\n    to an internal reference to this column's actual type.\n    \"\"\"\n\n    def __init__(self, table: Entity | Callable[[], Entity], default: Optional[DecodedT] = None,\n                 on_update: Restraints = Restraints.CASCADE, on_delete: Restraints = Restraints.RESTRICT,\n                 nullable: bool = False):\n        \"\"\"\n        :param table: The table this column is a part of\n        :param default: The default value of this column\n        :param on_update: The on update restraint of this column\n        :param on_delete: The on delete restraint of this column\n        :param nullable: Whether this column is nullable\n        \"\"\"\n        self._table = table\n        self.on_update = on_update\n        self.on_delete = on_delete\n        super().__init__(nullable=nullable, default=default)\n\n    @cached_property\n    def table(self) -> Entity:\n        \"\"\"\n        A lazy cached property to get the table this column is a part of.\n\n        :return: The table this column is a part of\n        \"\"\"\n        from ..entity import Entity\n        if not isinstance(self._table, Entity):\n            return self._table()\n        return self._table\n\n    @cached_property\n    def foreign_column(self) -> Column:\n        \"\"\"\n        A cached property to get the primary key column of the table this foreign key references.\n\n        :return: The primary key column of the table this foreign key references\n        \"\"\"\n        return next(filter(lambda column: column.is_primary_key, self.table.columns))\n\n    def sql_name(self) -> str:\n        return self.foreign_column.type.sql_name()\n\n    def encode(self, decoded: DecodedT) -> EncodedT:\n        return self.foreign_column.type.encode(decoded)\n\n    def decode(self, encoded: EncodedT) -> DecodedT:\n        return self.foreign_column.type.decode(encoded)\n\n    @property\n    def encoded_type(self) -> type:\n        return self.foreign_column.type.encoded_type\n\n    @property\n    def decoded_type(self) -> type:\n        return self.foreign_column.type.decoded_type\n\n    def sql_restraint(self, column: Column) -> str:\n        \"\"\"\n        Builds the SQL for this column's restraints when updating and deleting this column.\n\n        :param column: The column to define as foreign\n        :return: A valid SQL string to be used in a CREATE TABLE statement\n        \"\"\"\n        return f\"FOREIGN KEY ({column.name}) REFERENCES {self.table} ({self.foreign_column.name})\\n\" \\\n               f\"\\tON UPDATE {self.on_update.value}\\n\\tON DELETE {self.on_delete.value}\"\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this column, used when it is being executed.\n\n        :return: The valid SQL string representing this column\n        \"\"\"\n\n        not_null = \"\" if self.nullable else \" NOT NULL\"\n        return f\"{self.sql_name()}{not_null}\"\n\n    def default_suggestion(self, encoded: EncodedT) -> str:\n        return \"ForeignKey\"\n",
                                "shortDescription": "The module containing logic for foreign keys.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "foreign_key\nThe module containing logic for foreign keys.\nNone",
                                "globalVariables": [
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "DecodedT",
                                            "annotation": null,
                                            "value": "~DecodedT"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "EncodedT",
                                            "annotation": null,
                                            "value": "~EncodedT"
                                        },
                                        "children": {}
                                    }
                                ]
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "ForeignKey",
                                            "source": "class ForeignKey(Type[EncodedT, DecodedT]):\n    \"\"\"\n    The implementation for foreign keys.\n\n    Inheritance from Type is an implementation detail - most of the Type implementations are delegated\n    to an internal reference to this column's actual type.\n    \"\"\"\n\n    def __init__(self, table: Entity | Callable[[], Entity], default: Optional[DecodedT] = None,\n                 on_update: Restraints = Restraints.CASCADE, on_delete: Restraints = Restraints.RESTRICT,\n                 nullable: bool = False):\n        \"\"\"\n        :param table: The table this column is a part of\n        :param default: The default value of this column\n        :param on_update: The on update restraint of this column\n        :param on_delete: The on delete restraint of this column\n        :param nullable: Whether this column is nullable\n        \"\"\"\n        self._table = table\n        self.on_update = on_update\n        self.on_delete = on_delete\n        super().__init__(nullable=nullable, default=default)\n\n    @cached_property\n    def table(self) -> Entity:\n        \"\"\"\n        A lazy cached property to get the table this column is a part of.\n\n        :return: The table this column is a part of\n        \"\"\"\n        from ..entity import Entity\n        if not isinstance(self._table, Entity):\n            return self._table()\n        return self._table\n\n    @cached_property\n    def foreign_column(self) -> Column:\n        \"\"\"\n        A cached property to get the primary key column of the table this foreign key references.\n\n        :return: The primary key column of the table this foreign key references\n        \"\"\"\n        return next(filter(lambda column: column.is_primary_key, self.table.columns))\n\n    def sql_name(self) -> str:\n        return self.foreign_column.type.sql_name()\n\n    def encode(self, decoded: DecodedT) -> EncodedT:\n        return self.foreign_column.type.encode(decoded)\n\n    def decode(self, encoded: EncodedT) -> DecodedT:\n        return self.foreign_column.type.decode(encoded)\n\n    @property\n    def encoded_type(self) -> type:\n        return self.foreign_column.type.encoded_type\n\n    @property\n    def decoded_type(self) -> type:\n        return self.foreign_column.type.decoded_type\n\n    def sql_restraint(self, column: Column) -> str:\n        \"\"\"\n        Builds the SQL for this column's restraints when updating and deleting this column.\n\n        :param column: The column to define as foreign\n        :return: A valid SQL string to be used in a CREATE TABLE statement\n        \"\"\"\n        return f\"FOREIGN KEY ({column.name}) REFERENCES {self.table} ({self.foreign_column.name})\\n\" \\\n               f\"\\tON UPDATE {self.on_update.value}\\n\\tON DELETE {self.on_delete.value}\"\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this column, used when it is being executed.\n\n        :return: The valid SQL string representing this column\n        \"\"\"\n\n        not_null = \"\" if self.nullable else \" NOT NULL\"\n        return f\"{self.sql_name()}{not_null}\"\n\n    def default_suggestion(self, encoded: EncodedT) -> str:\n        return \"ForeignKey\"\n",
                                            "signature": "(table: 'Entity | Callable[[], Entity]', default: 'Optional[DecodedT]' = None, on_update: 'Restraints' = <Restraints.CASCADE: 'CASCADE'>, on_delete: 'Restraints' = <Restraints.RESTRICT: 'RESTRICT'>, nullable: 'bool' = False)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this column is a part of",
                                                        "annotation": "Entity | Callable[[], Entity]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "default",
                                                        "description": "The default value of this column",
                                                        "annotation": "Optional[DecodedT]",
                                                        "default": "None",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "on_update",
                                                        "description": "The on update restraint of this column",
                                                        "annotation": "Restraints",
                                                        "default": "Restraints.CASCADE",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "on_delete",
                                                        "description": "The on delete restraint of this column",
                                                        "annotation": "Restraints",
                                                        "default": "Restraints.RESTRICT",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "nullable",
                                                        "description": "Whether this column is nullable",
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The implementation for foreign keys.",
                                            "longDescription": "Inheritance from Type is an implementation detail - most of the Type implementations are delegated\nto an internal reference to this column's actual type.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "ForeignKey\nThe implementation for foreign keys.\nInheritance from Type is an implementation detail - most of the Type implementations are delegated\nto an internal reference to this column's actual type.",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return self.foreign_column.type.sql_name()\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: DecodedT) -> EncodedT:\n        return self.foreign_column.type.encode(decoded)\n",
                                                        "signature": "(self, decoded: 'DecodedT') -> 'EncodedT'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "DecodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "EncodedT"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: EncodedT) -> DecodedT:\n        return self.foreign_column.type.decode(encoded)\n",
                                                        "signature": "(self, encoded: 'EncodedT') -> 'DecodedT'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "EncodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "DecodedT"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_restraint",
                                                        "source": "    def sql_restraint(self, column: Column) -> str:\n        \"\"\"\n        Builds the SQL for this column's restraints when updating and deleting this column.\n\n        :param column: The column to define as foreign\n        :return: A valid SQL string to be used in a CREATE TABLE statement\n        \"\"\"\n        return f\"FOREIGN KEY ({column.name}) REFERENCES {self.table} ({self.foreign_column.name})\\n\" \\\n               f\"\\tON UPDATE {self.on_update.value}\\n\\tON DELETE {self.on_delete.value}\"\n",
                                                        "signature": "(self, column: 'Column') -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "column",
                                                                    "description": "The column to define as foreign",
                                                                    "annotation": "Column",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A valid SQL string to be used in a CREATE TABLE statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds the SQL for this column's restraints when updating and deleting this column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_restraint\nBuilds the SQL for this column's restraints when updating and deleting this column.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: EncodedT) -> str:\n        return \"ForeignKey\"\n",
                                                        "signature": "(self, encoded: 'EncodedT') -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "EncodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "restraints",
                                "source": "\"\"\"\nThe module containing the Restraints Enum.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass Restraints(Enum):\n    \"\"\"\n    The available restraints that can be placed on a foreign key column on-creation.\n\n    These restraints will be checked whenever this column is edited or deleted,\n    and are used to maintain referential integrity in a relational database.\n    \"\"\"\n\n    SET_NULL = \"SET NULL\"\n    SET_DEFAULT = \"SET DEFAULT\"\n    RESTRICT = \"RESTRICT\"\n    CASCADE = \"CASCADE\"\n    NO_ACTION = \"NO ACTION\"\n",
                                "shortDescription": "The module containing the Restraints Enum.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "restraints\nThe module containing the Restraints Enum.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Restraints",
                                            "source": "class Restraints(Enum):\n    \"\"\"\n    The available restraints that can be placed on a foreign key column on-creation.\n\n    These restraints will be checked whenever this column is edited or deleted,\n    and are used to maintain referential integrity in a relational database.\n    \"\"\"\n\n    SET_NULL = \"SET NULL\"\n    SET_DEFAULT = \"SET DEFAULT\"\n    RESTRICT = \"RESTRICT\"\n    CASCADE = \"CASCADE\"\n    NO_ACTION = \"NO ACTION\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The available restraints that can be placed on a foreign key column on-creation.",
                                            "longDescription": "These restraints will be checked whenever this column is edited or deleted,\nand are used to maintain referential integrity in a relational database.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Restraints\nThe available restraints that can be placed on a foreign key column on-creation.\nThese restraints will be checked whenever this column is edited or deleted,\nand are used to maintain referential integrity in a relational database.",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "CASCADE",
                                                        "annotation": null,
                                                        "value": "Restraints.CASCADE"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "NO_ACTION",
                                                        "annotation": null,
                                                        "value": "Restraints.NO_ACTION"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "RESTRICT",
                                                        "annotation": null,
                                                        "value": "Restraints.RESTRICT"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "SET_DEFAULT",
                                                        "annotation": null,
                                                        "value": "Restraints.SET_DEFAULT"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "SET_NULL",
                                                        "annotation": null,
                                                        "value": "Restraints.SET_NULL"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "join",
                    "source": "\"\"\"\nA subpackage containing logic for SQL statements that include JOIN clauses.\n\"\"\"\n\nfrom .join import Join\nfrom .join_types import JoinTypes\n",
                    "shortDescription": "A subpackage containing logic for SQL statements that include JOIN clauses.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "join\nA subpackage containing logic for SQL statements that include JOIN clauses.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "join",
                                "source": "\"\"\"\nThe module containing the logic for JOIN clauses.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .join_types import JoinTypes\nfrom ..where import Condition, Where\nif False:\n    from sqliteframe.entity import Entity\n\n\nclass Join:\n    \"\"\"\n    The class containing the implementation for JOIN clauses.\n    \"\"\"\n\n    def __init__(self, table: Entity, where: Where | Condition, join_type: JoinTypes):\n        \"\"\"\n        :param table: The table being joined\n        :param where: The conditions under which this join statement is used\n        :param join_type: The way in which the table is joined\n        \"\"\"\n        super().__init__()\n        self.table = table\n        self.where = where\n        self.join_type = join_type\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n\n        return f\"{self.join_type.value} JOIN {self.table} ON {self.where}\"\n",
                                "shortDescription": "The module containing the logic for JOIN clauses.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "join\nThe module containing the logic for JOIN clauses.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Join",
                                            "source": "class Join:\n    \"\"\"\n    The class containing the implementation for JOIN clauses.\n    \"\"\"\n\n    def __init__(self, table: Entity, where: Where | Condition, join_type: JoinTypes):\n        \"\"\"\n        :param table: The table being joined\n        :param where: The conditions under which this join statement is used\n        :param join_type: The way in which the table is joined\n        \"\"\"\n        super().__init__()\n        self.table = table\n        self.where = where\n        self.join_type = join_type\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n\n        return f\"{self.join_type.value} JOIN {self.table} ON {self.where}\"\n",
                                            "signature": "(table: 'Entity', where: 'Where | Condition', join_type: 'JoinTypes')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table being joined",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "where",
                                                        "description": "The conditions under which this join statement is used",
                                                        "annotation": "Where | Condition",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "join_type",
                                                        "description": "The way in which the table is joined",
                                                        "annotation": "JoinTypes",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the implementation for JOIN clauses.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Join\nThe class containing the implementation for JOIN clauses.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": []
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "join_types",
                                "source": "\"\"\"\nThe module containing the JoinTypes Enum.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass JoinTypes(Enum):\n    \"\"\"\n    The different ways in which a table can be joined to another in a JOIN clause.\n    \"\"\"\n\n    INNER = \"INNER\"\n    LEFT = \"LEFT\"\n    CROSS = \"CROSS\"\n",
                                "shortDescription": "The module containing the JoinTypes Enum.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "join_types\nThe module containing the JoinTypes Enum.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "JoinTypes",
                                            "source": "class JoinTypes(Enum):\n    \"\"\"\n    The different ways in which a table can be joined to another in a JOIN clause.\n    \"\"\"\n\n    INNER = \"INNER\"\n    LEFT = \"LEFT\"\n    CROSS = \"CROSS\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The different ways in which a table can be joined to another in a JOIN clause.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "JoinTypes\nThe different ways in which a table can be joined to another in a JOIN clause.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "CROSS",
                                                        "annotation": null,
                                                        "value": "JoinTypes.CROSS"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "INNER",
                                                        "annotation": null,
                                                        "value": "JoinTypes.INNER"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "LEFT",
                                                        "annotation": null,
                                                        "value": "JoinTypes.LEFT"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "order_by",
                    "source": "\"\"\"\nA subpackage containing logic for SQL statements that include ORDER BY clauses.\n\"\"\"\n\nfrom .order_by import OrderBy\nfrom .order_types import OrderTypes\n",
                    "shortDescription": "A subpackage containing logic for SQL statements that include ORDER BY clauses.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "order_by\nA subpackage containing logic for SQL statements that include ORDER BY clauses.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "order_by",
                                "source": "\"\"\"\nThe module containing the logic for ORDER BY clauses.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .order_types import OrderTypes\nif False:\n    from sqliteframe.entity import Column\n\n\nclass OrderBy:\n    \"\"\"\n    The class containing the implementation for ORDER BY clauses.\n    \"\"\"\n\n    def __init__(self, column: Column, order_types: OrderTypes | tuple[OrderTypes, ...]):\n        \"\"\"\n        :param column: The target column to order by\n        :param order_types: The order type(s) to order by\n        \"\"\"\n        self.column = column\n        self.order_types = (order_types, ) if isinstance(order_types, OrderTypes) else order_types\n        if (OrderTypes.ASCENDING in self.order_types and OrderTypes.DESCENDING in self.order_types) or (\n                OrderTypes.NULLS_FIRST in self.order_types and OrderTypes.NULLS_LAST in self.order_types):\n            raise ValueError(\"SQL query cannot contain conflicting order by statement\") from None\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n\n        order_type_section = \" \".join(map(lambda order_type: order_type.value, self.order_types))\n        return f\"ORDER BY {self.column.table}.{self.column.name} {order_type_section}\"\n",
                                "shortDescription": "The module containing the logic for ORDER BY clauses.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "order_by\nThe module containing the logic for ORDER BY clauses.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "OrderBy",
                                            "source": "class OrderBy:\n    \"\"\"\n    The class containing the implementation for ORDER BY clauses.\n    \"\"\"\n\n    def __init__(self, column: Column, order_types: OrderTypes | tuple[OrderTypes, ...]):\n        \"\"\"\n        :param column: The target column to order by\n        :param order_types: The order type(s) to order by\n        \"\"\"\n        self.column = column\n        self.order_types = (order_types, ) if isinstance(order_types, OrderTypes) else order_types\n        if (OrderTypes.ASCENDING in self.order_types and OrderTypes.DESCENDING in self.order_types) or (\n                OrderTypes.NULLS_FIRST in self.order_types and OrderTypes.NULLS_LAST in self.order_types):\n            raise ValueError(\"SQL query cannot contain conflicting order by statement\") from None\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n\n        order_type_section = \" \".join(map(lambda order_type: order_type.value, self.order_types))\n        return f\"ORDER BY {self.column.table}.{self.column.name} {order_type_section}\"\n",
                                            "signature": "(column: 'Column', order_types: 'OrderTypes | tuple[OrderTypes, ...]')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "column",
                                                        "description": "The target column to order by",
                                                        "annotation": "Column",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "order_types",
                                                        "description": "The order type(s) to order by",
                                                        "annotation": "OrderTypes | tuple[OrderTypes, ...]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the implementation for ORDER BY clauses.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "OrderBy\nThe class containing the implementation for ORDER BY clauses.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": []
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "order_types",
                                "source": "\"\"\"\nThe module containing the OrderTypes Enum.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass OrderTypes(Enum):\n    \"\"\"\n    The different ways in which selected data can be ordered before it is returned to the user.\n    \"\"\"\n\n    NULLS_FIRST = \"NULLS FIRST\"\n    NULLS_LAST = \"NULLS LAST\"\n    ASCENDING = \"ASC\"\n    DESCENDING = \"DESC\"\n",
                                "shortDescription": "The module containing the OrderTypes Enum.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "order_types\nThe module containing the OrderTypes Enum.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "OrderTypes",
                                            "source": "class OrderTypes(Enum):\n    \"\"\"\n    The different ways in which selected data can be ordered before it is returned to the user.\n    \"\"\"\n\n    NULLS_FIRST = \"NULLS FIRST\"\n    NULLS_LAST = \"NULLS LAST\"\n    ASCENDING = \"ASC\"\n    DESCENDING = \"DESC\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The different ways in which selected data can be ordered before it is returned to the user.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "OrderTypes\nThe different ways in which selected data can be ordered before it is returned to the user.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "ASCENDING",
                                                        "annotation": null,
                                                        "value": "OrderTypes.ASCENDING"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "DESCENDING",
                                                        "annotation": null,
                                                        "value": "OrderTypes.DESCENDING"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "NULLS_FIRST",
                                                        "annotation": null,
                                                        "value": "OrderTypes.NULLS_FIRST"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "NULLS_LAST",
                                                        "annotation": null,
                                                        "value": "OrderTypes.NULLS_LAST"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "parameterized",
                    "source": "\"\"\"\nA subpackage containing logic for parameterized queries.\n\nThis ensures that variable statements that are executed are automatically sanitized\nby SQLite, preventing vulnerability to SQL injection attacks in your programs.\n\"\"\"\n\nfrom .parameterized import Parameterized\n",
                    "shortDescription": "A subpackage containing logic for parameterized queries.",
                    "longDescription": "This ensures that variable statements that are executed are automatically sanitized\nby SQLite, preventing vulnerability to SQL injection attacks in your programs.",
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "parameterized\nA subpackage containing logic for parameterized queries.\nThis ensures that variable statements that are executed are automatically sanitized\nby SQLite, preventing vulnerability to SQL injection attacks in your programs."
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "parameterized",
                                "source": "\"\"\"\nThe module containing the logic behind Parameterized clauses.\n\"\"\"\n\nfrom __future__ import annotations\nfrom abc import ABC, abstractmethod\nfrom typing import Literal\n\nif False:\n    from ..statements import Statement\n\n\nclass Parameterized(ABC):\n    \"\"\"\n    The class containing the logic behind Parameterized clauses.\n\n    Parameterized clauses are essentially clauses that may require use parameter sanitization, such as WHERE clauses.\n    These are needed to transfer the parameters to the base statement while preserved their order,\n    so that they can be passed to the internal sqlite3 engine in the correct order during execution,\n    maintaining safety from SQL injection attacks.\n    \"\"\"\n    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a parameter with the clause, and converts it into a \"?\" string literal for use in the query.\n\n        :param parameter: The data to register as a parameter\n        :return: A \"?\" string literal\n        \"\"\"\n        self.parameters.append(parameter)\n        return \"?\"\n\n    @property\n    @abstractmethod\n    def parameters(self) -> list[object]:\n        \"\"\"\n        The parameters of this parameterized clause as an abstract property.\n\n        :return: The list of parameters\n        \"\"\"\n        return []\n\n    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n        return \"\"\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n        return self.build_sql()\n\n    def register(self, statement: Statement) -> None:\n        \"\"\"\n        Registers each of the parameters of this clause with a given base statement.\n\n        :param statement: The base statement this clause is a part of\n        \"\"\"\n        statement.register_parameterized(self)\n",
                                "shortDescription": "The module containing the logic behind Parameterized clauses.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "parameterized\nThe module containing the logic behind Parameterized clauses.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Parameterized",
                                            "source": "class Parameterized(ABC):\n    \"\"\"\n    The class containing the logic behind Parameterized clauses.\n\n    Parameterized clauses are essentially clauses that may require use parameter sanitization, such as WHERE clauses.\n    These are needed to transfer the parameters to the base statement while preserved their order,\n    so that they can be passed to the internal sqlite3 engine in the correct order during execution,\n    maintaining safety from SQL injection attacks.\n    \"\"\"\n    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a parameter with the clause, and converts it into a \"?\" string literal for use in the query.\n\n        :param parameter: The data to register as a parameter\n        :return: A \"?\" string literal\n        \"\"\"\n        self.parameters.append(parameter)\n        return \"?\"\n\n    @property\n    @abstractmethod\n    def parameters(self) -> list[object]:\n        \"\"\"\n        The parameters of this parameterized clause as an abstract property.\n\n        :return: The list of parameters\n        \"\"\"\n        return []\n\n    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n        return \"\"\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this clause, used when it is being executed.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n        return self.build_sql()\n\n    def register(self, statement: Statement) -> None:\n        \"\"\"\n        Registers each of the parameters of this clause with a given base statement.\n\n        :param statement: The base statement this clause is a part of\n        \"\"\"\n        statement.register_parameterized(self)\n",
                                            "signature": "()",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic behind Parameterized clauses.",
                                            "longDescription": "Parameterized clauses are essentially clauses that may require use parameter sanitization, such as WHERE clauses.\nThese are needed to transfer the parameters to the base statement while preserved their order,\nso that they can be passed to the internal sqlite3 engine in the correct order during execution,\nmaintaining safety from SQL injection attacks.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": true,
                                            "searchTerms": "Parameterized\nThe class containing the logic behind Parameterized clauses.\nParameterized clauses are essentially clauses that may require use parameter sanitization, such as WHERE clauses.\nThese are needed to transfer the parameters to the base statement while preserved their order,\nso that they can be passed to the internal sqlite3 engine in the correct order during execution,\nmaintaining safety from SQL injection attacks.",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "parameter",
                                                        "source": "    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a parameter with the clause, and converts it into a \"?\" string literal for use in the query.\n\n        :param parameter: The data to register as a parameter\n        :return: A \"?\" string literal\n        \"\"\"\n        self.parameters.append(parameter)\n        return \"?\"\n",
                                                        "signature": "(self, parameter: 'object') -> \"Literal['?']\"",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "parameter",
                                                                    "description": "The data to register as a parameter",
                                                                    "annotation": "object",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A \"?\" string literal",
                                                                    "annotation": "Literal['?']"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Registers a parameter with the clause, and converts it into a \"?\" string literal for use in the query.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "parameter\nRegisters a parameter with the clause, and converts it into a \"?\" string literal for use in the query.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\n\n        :return: The valid SQL string representing this clause\n        \"\"\"\n        return \"\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this clause",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "register",
                                                        "source": "    def register(self, statement: Statement) -> None:\n        \"\"\"\n        Registers each of the parameters of this clause with a given base statement.\n\n        :param statement: The base statement this clause is a part of\n        \"\"\"\n        statement.register_parameterized(self)\n",
                                                        "signature": "(self, statement: 'Statement') -> 'None'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "statement",
                                                                    "description": "The base statement this clause is a part of",
                                                                    "annotation": "Statement",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "Registers each of the parameters of this clause with a given base statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "register\nRegisters each of the parameters of this clause with a given base statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "pragma",
                    "source": "\"\"\"\nA subpackage containing logic for SQLite PRAGMA commands.\n\"\"\"\n\nfrom .statements import Statements as PragmaStatements\nfrom .types import Types as PragmaTypes\n",
                    "shortDescription": "A subpackage containing logic for SQLite PRAGMA commands.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "pragma\nA subpackage containing logic for SQLite PRAGMA commands.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "statements",
                                "source": "\"\"\"\nThe module containing the different PRAGMA statements that can be executed.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass Statements(Enum):\n    \"\"\"\n    An Enum containing each of the PRAGMA statements that can be executed in SQLiteFrame.\n    \"\"\"\n\n    FOREIGN_KEYS = \"foreign_keys\"\n    TABLE_INFO = \"table_info\"\n    FOREIGN_KEY_LIST = \"foreign_key_list\"\n",
                                "shortDescription": "The module containing the different PRAGMA statements that can be executed.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "statements\nThe module containing the different PRAGMA statements that can be executed.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Statements",
                                            "source": "class Statements(Enum):\n    \"\"\"\n    An Enum containing each of the PRAGMA statements that can be executed in SQLiteFrame.\n    \"\"\"\n\n    FOREIGN_KEYS = \"foreign_keys\"\n    TABLE_INFO = \"table_info\"\n    FOREIGN_KEY_LIST = \"foreign_key_list\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "An Enum containing each of the PRAGMA statements that can be executed in SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Statements\nAn Enum containing each of the PRAGMA statements that can be executed in SQLiteFrame.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "FOREIGN_KEYS",
                                                        "annotation": null,
                                                        "value": "Statements.FOREIGN_KEYS"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "FOREIGN_KEY_LIST",
                                                        "annotation": null,
                                                        "value": "Statements.FOREIGN_KEY_LIST"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "TABLE_INFO",
                                                        "annotation": null,
                                                        "value": "Statements.TABLE_INFO"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "types",
                                "source": "\"\"\"\nThe module containing the logic behind PRAGMA statement types\n\"\"\"\n\nfrom typing import Callable\nfrom enum import Enum\n\n\nclass CallableTypesValue:\n    \"\"\"\n    A simple wrapper for callables, used to dynamically generated PRAGMA statements depending on a specified format.\n    \"\"\"\n\n    def __init__(self, f: Callable[[str], str]):\n        \"\"\"\n        :param f: The callable to wrap\n        \"\"\"\n\n        self.f = f\n\n    def __call__(self, value: str) -> str:\n        \"\"\"\n        Builds the end of the PRAGMA statement.\n\n        :param value: The value to embed in the PRAGMA statement\n        :return: The end of the PRAGMA statement\n        \"\"\"\n\n        return self.f(value)\n\n\nclass Types(Enum):\n    \"\"\"\n    An Enum containing each of the possible PRAGMA statement types that can be executed in SQLiteFrame.\n    \"\"\"\n\n    QUERY = CallableTypesValue(lambda _: \"\")\n    SET = CallableTypesValue(lambda value: f\" = {value}\")\n    CALL = CallableTypesValue(lambda value: f\"({value})\")\n",
                                "shortDescription": "The module containing the logic behind PRAGMA statement types",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "types\nThe module containing the logic behind PRAGMA statement types\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "CallableTypesValue",
                                            "source": "class CallableTypesValue:\n    \"\"\"\n    A simple wrapper for callables, used to dynamically generated PRAGMA statements depending on a specified format.\n    \"\"\"\n\n    def __init__(self, f: Callable[[str], str]):\n        \"\"\"\n        :param f: The callable to wrap\n        \"\"\"\n\n        self.f = f\n\n    def __call__(self, value: str) -> str:\n        \"\"\"\n        Builds the end of the PRAGMA statement.\n\n        :param value: The value to embed in the PRAGMA statement\n        :return: The end of the PRAGMA statement\n        \"\"\"\n\n        return self.f(value)\n",
                                            "signature": "(f: Callable[[str], str])",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "f",
                                                        "description": "The callable to wrap",
                                                        "annotation": "typing.Callable[[str], str]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "A simple wrapper for callables, used to dynamically generated PRAGMA statements depending on a specified format.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "CallableTypesValue\nA simple wrapper for callables, used to dynamically generated PRAGMA statements depending on a specified format.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": []
                                        }
                                    },
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Types",
                                            "source": "class Types(Enum):\n    \"\"\"\n    An Enum containing each of the possible PRAGMA statement types that can be executed in SQLiteFrame.\n    \"\"\"\n\n    QUERY = CallableTypesValue(lambda _: \"\")\n    SET = CallableTypesValue(lambda value: f\" = {value}\")\n    CALL = CallableTypesValue(lambda value: f\"({value})\")\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "An Enum containing each of the possible PRAGMA statement types that can be executed in SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Types\nAn Enum containing each of the possible PRAGMA statement types that can be executed in SQLiteFrame.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "CALL",
                                                        "annotation": null,
                                                        "value": "Types.CALL"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "QUERY",
                                                        "annotation": null,
                                                        "value": "Types.QUERY"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "SET",
                                                        "annotation": null,
                                                        "value": "Types.SET"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "result",
                    "source": "\"\"\"\nA subpackage containing logic for the results of any executed SQL statements.\n\"\"\"\n\nfrom .result import Result\n",
                    "shortDescription": "A subpackage containing logic for the results of any executed SQL statements.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "result\nA subpackage containing logic for the results of any executed SQL statements.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "result",
                                "source": "\"\"\"\nA module containing the logic for SQLiteFrame Result objects.\n\"\"\"\n\nfrom __future__ import annotations\nfrom typing import Iterator\nfrom sqlite3 import Cursor\nif False:\n    from typing import TypeVar\n    from sqliteframe.entity import Column\n    ColumnT = TypeVar(\"ColumnT\", bound=Column)\n\n\nclass Result:\n    \"\"\"\n    The class that contains result data from any executed SQLiteFrame queries.\n    \"\"\"\n\n    UNKNOWN_COLUMN = \"?\"\n\n    def __init__(self, columns: list[Column], result: Cursor, indeterminate: bool = False):\n        self.columns = columns\n        self.result = result\n        self.indeterminate_columns = indeterminate\n\n    def __iter__(self) -> Iterator[dict[ColumnT, ColumnT.type.decoded_type] | tuple]:\n        \"\"\"\n        Allows for records to be accessed from a Result via simple iteration (e.g. for record in result).\n\n        :return: An iterator containing each record, usually as a mapping ({column: data})\n        \"\"\"\n        for record in self.result:\n            if self.indeterminate_columns:\n                yield record\n            else:\n                yield {column: column.type.decode(field) for column, field in zip(self.columns, record)}\n",
                                "shortDescription": "A module containing the logic for SQLiteFrame Result objects.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "result\nA module containing the logic for SQLiteFrame Result objects.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Result",
                                            "source": "class Result:\n    \"\"\"\n    The class that contains result data from any executed SQLiteFrame queries.\n    \"\"\"\n\n    UNKNOWN_COLUMN = \"?\"\n\n    def __init__(self, columns: list[Column], result: Cursor, indeterminate: bool = False):\n        self.columns = columns\n        self.result = result\n        self.indeterminate_columns = indeterminate\n\n    def __iter__(self) -> Iterator[dict[ColumnT, ColumnT.type.decoded_type] | tuple]:\n        \"\"\"\n        Allows for records to be accessed from a Result via simple iteration (e.g. for record in result).\n\n        :return: An iterator containing each record, usually as a mapping ({column: data})\n        \"\"\"\n        for record in self.result:\n            if self.indeterminate_columns:\n                yield record\n            else:\n                yield {column: column.type.decode(field) for column, field in zip(self.columns, record)}\n",
                                            "signature": "(columns: 'list[Column]', result: 'Cursor', indeterminate: 'bool' = False)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "columns",
                                                        "description": null,
                                                        "annotation": "list[Column]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "result",
                                                        "description": null,
                                                        "annotation": "Cursor",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "indeterminate",
                                                        "description": null,
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class that contains result data from any executed SQLiteFrame queries.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Result\nThe class that contains result data from any executed SQLiteFrame queries.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": []
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "statements",
                    "source": "\"\"\"\nA subpackage containing the logic behind each of the core statements that can be executed in SQLiteFrame.\n\"\"\"\n\nfrom .create_table import CreateTable\nfrom .insert_into import InsertInto\nfrom .select import Select\nfrom .set import Set\nfrom .statement import Statement\nfrom .delete_from import DeleteFrom\nfrom .drop_table import DropTable\nfrom .pragma import Pragma\n",
                    "shortDescription": "A subpackage containing the logic behind each of the core statements that can be executed in SQLiteFrame.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "statements\nA subpackage containing the logic behind each of the core statements that can be executed in SQLiteFrame.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "create_table",
                                "source": "\"\"\"\nThe module containing logic for CREATE TABLE statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nif False:\n    from ..entity import Column, Entity\n\n\nclass CreateTable(Statement):\n    \"\"\"\n    The class containing the logic for building and executing CREATE TABLE statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, columns: list[Column]):\n        \"\"\"\n\n        :param table: The table this query is associated with\n        :param columns: The columns the table being created should have\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.columns = columns\n        self.foreign_key_columns = list(filter(lambda column: column.is_foreign_key, self.columns))\n\n    def build_sql(self) -> str:\n        columns_section = \"\\n\".join(f\"\\t{column.name} {column},\" for column in self.columns)\n        if not self.foreign_key_columns:\n            columns_section = columns_section[:-1]\n        foreign_key_section = (\"\\n\\n\\t\" if self.foreign_key_columns else \"\") + \"\\n\".join(\n            column.type.sql_restraint(column).replace(\"\\n\", \"\\n\\t\") for column in self.foreign_key_columns)\n        return f\"CREATE TABLE IF NOT EXISTS {self.table} (\\n{columns_section}{foreign_key_section}\\n);\"\n",
                                "shortDescription": "The module containing logic for CREATE TABLE statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "create_table\nThe module containing logic for CREATE TABLE statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "CreateTable",
                                            "source": "class CreateTable(Statement):\n    \"\"\"\n    The class containing the logic for building and executing CREATE TABLE statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, columns: list[Column]):\n        \"\"\"\n\n        :param table: The table this query is associated with\n        :param columns: The columns the table being created should have\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.columns = columns\n        self.foreign_key_columns = list(filter(lambda column: column.is_foreign_key, self.columns))\n\n    def build_sql(self) -> str:\n        columns_section = \"\\n\".join(f\"\\t{column.name} {column},\" for column in self.columns)\n        if not self.foreign_key_columns:\n            columns_section = columns_section[:-1]\n        foreign_key_section = (\"\\n\\n\\t\" if self.foreign_key_columns else \"\") + \"\\n\".join(\n            column.type.sql_restraint(column).replace(\"\\n\", \"\\n\\t\") for column in self.foreign_key_columns)\n        return f\"CREATE TABLE IF NOT EXISTS {self.table} (\\n{columns_section}{foreign_key_section}\\n);\"\n",
                                            "signature": "(table: 'Entity', columns: 'list[Column]')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "columns",
                                                        "description": "The columns the table being created should have",
                                                        "annotation": "list[Column]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing CREATE TABLE statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "CreateTable\nThe class containing the logic for building and executing CREATE TABLE statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        columns_section = \"\\n\".join(f\"\\t{column.name} {column},\" for column in self.columns)\n        if not self.foreign_key_columns:\n            columns_section = columns_section[:-1]\n        foreign_key_section = (\"\\n\\n\\t\" if self.foreign_key_columns else \"\") + \"\\n\".join(\n            column.type.sql_restraint(column).replace(\"\\n\", \"\\n\\t\") for column in self.foreign_key_columns)\n        return f\"CREATE TABLE IF NOT EXISTS {self.table} (\\n{columns_section}{foreign_key_section}\\n);\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "delete_from",
                                "source": "\"\"\"\nThe module containing logic for DELETE FROM statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nfrom ..where import Where, Condition\nif False:\n    from ..entity import Entity\n\n\nclass DeleteFrom(Statement):\n    \"\"\"\n    The class containing the logic for building and executing DELETE FROM statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity):\n        \"\"\"\n        :param table: The table this query is associated with\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.where_statement = None\n\n    def build_sql(self) -> str:\n        where_section = \"\" if self.where is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"DELETE FROM {self.table}{where_section};\"\n\n    def where(self, where: Where | Condition) -> DeleteFrom:\n        \"\"\"\n        A method to attach WHERE clauses onto the DELETE FROM statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n",
                                "shortDescription": "The module containing logic for DELETE FROM statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "delete_from\nThe module containing logic for DELETE FROM statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "DeleteFrom",
                                            "source": "class DeleteFrom(Statement):\n    \"\"\"\n    The class containing the logic for building and executing DELETE FROM statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity):\n        \"\"\"\n        :param table: The table this query is associated with\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.where_statement = None\n\n    def build_sql(self) -> str:\n        where_section = \"\" if self.where is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"DELETE FROM {self.table}{where_section};\"\n\n    def where(self, where: Where | Condition) -> DeleteFrom:\n        \"\"\"\n        A method to attach WHERE clauses onto the DELETE FROM statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n",
                                            "signature": "(table: 'Entity')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing DELETE FROM statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "DeleteFrom\nThe class containing the logic for building and executing DELETE FROM statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        where_section = \"\" if self.where is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"DELETE FROM {self.table}{where_section};\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "where",
                                                        "source": "    def where(self, where: Where | Condition) -> DeleteFrom:\n        \"\"\"\n        A method to attach WHERE clauses onto the DELETE FROM statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n",
                                                        "signature": "(self, where: 'Where | Condition') -> 'DeleteFrom'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "where",
                                                                    "description": "The WHERE clause to add to the statement",
                                                                    "annotation": "Where | Condition",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A mutated version of this statement with the extended WHERE clause",
                                                                    "annotation": "DeleteFrom"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method to attach WHERE clauses onto the DELETE FROM statement",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "where\nA method to attach WHERE clauses onto the DELETE FROM statement\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "drop_table",
                                "source": "\"\"\"\nThe module containing logic for DROP TABLE statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nif False:\n    from ..entity import Entity\n\n\nclass DropTable(Statement):\n    \"\"\"\n    The class containing the logic for building and executing DROP TABLE statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity):\n        \"\"\"\n        :param table: The table this query is associated with\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n\n    def build_sql(self) -> str:\n        return f\"DROP TABLE IF EXISTS {self.table};\"\n",
                                "shortDescription": "The module containing logic for DROP TABLE statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "drop_table\nThe module containing logic for DROP TABLE statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "DropTable",
                                            "source": "class DropTable(Statement):\n    \"\"\"\n    The class containing the logic for building and executing DROP TABLE statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity):\n        \"\"\"\n        :param table: The table this query is associated with\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n\n    def build_sql(self) -> str:\n        return f\"DROP TABLE IF EXISTS {self.table};\"\n",
                                            "signature": "(table: 'Entity')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing DROP TABLE statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "DropTable\nThe class containing the logic for building and executing DROP TABLE statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        return f\"DROP TABLE IF EXISTS {self.table};\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "insert_into",
                                "source": "\"\"\"\nThe module containing logic for INSERT INTO statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nif False:\n    from typing import TypeVar\n    from ..entity import Column, Entity\n    ColumnT = TypeVar(\"ColumnT\", bound=Column)\n\n\nclass InsertInto(Statement):\n    \"\"\"\n    The class containing the logic for building and executing INSERT INTO statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param data: A mapping of the column and corresponding data to insert into the given table\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.data = data.items()\n\n    def build_sql(self) -> str:\n        columns_section = \", \".join(column.name for column, _ in self.data)\n        values_section = \", \".join(self.parameter(column.type.encode(value)) for column, value in self.data)\n        return f\"INSERT INTO {self.table} ({columns_section})\\nVALUES ({values_section});\"\n",
                                "shortDescription": "The module containing logic for INSERT INTO statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "insert_into\nThe module containing logic for INSERT INTO statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "InsertInto",
                                            "source": "class InsertInto(Statement):\n    \"\"\"\n    The class containing the logic for building and executing INSERT INTO statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param data: A mapping of the column and corresponding data to insert into the given table\n        \"\"\"\n        super().__init__(table.database)\n        self.table = table\n        self.data = data.items()\n\n    def build_sql(self) -> str:\n        columns_section = \", \".join(column.name for column, _ in self.data)\n        values_section = \", \".join(self.parameter(column.type.encode(value)) for column, value in self.data)\n        return f\"INSERT INTO {self.table} ({columns_section})\\nVALUES ({values_section});\"\n",
                                            "signature": "(table: 'Entity', data: 'dict[ColumnT, ColumnT.type.decoded_type]')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "data",
                                                        "description": "A mapping of the column and corresponding data to insert into the given table",
                                                        "annotation": "dict[ColumnT, ColumnT.type.decoded_type]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing INSERT INTO statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "InsertInto\nThe class containing the logic for building and executing INSERT INTO statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        columns_section = \", \".join(column.name for column, _ in self.data)\n        values_section = \", \".join(self.parameter(column.type.encode(value)) for column, value in self.data)\n        return f\"INSERT INTO {self.table} ({columns_section})\\nVALUES ({values_section});\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "pragma",
                                "source": "\"\"\"\nThe module containing logic for PRAGMA statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom typing import Optional\nfrom .statement import Statement\nfrom ..pragma import PragmaStatements, PragmaTypes\nif False:\n    from ..database import Database\n\n\nclass Pragma(Statement):\n    \"\"\"\n    The class containing the logic for building and executing PRAGMA statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, database: Database, pragma_statement: PragmaStatements,\n                 pragma_value: Optional[str] = None, pragma_type: PragmaTypes = PragmaTypes.SET):\n        \"\"\"\n        :param database: The database this statement is associated with\n        :param pragma_statement: The type of PRAGMA statement to execute\n        :param pragma_value: The value associated with the PRAGMA statement\n        :param pragma_type: The structure of the PRAGMA statement\n        \"\"\"\n        super().__init__(database, indeterminate_yield=pragma_type != PragmaTypes.QUERY)\n        self.statement = pragma_statement\n        self.value = pragma_value\n        self.type = pragma_type\n        if self.value is None and self.type != PragmaTypes.QUERY:\n            raise ValueError(\"PRAGMA statement cannot have no value when using QUERY mode\") from None\n\n    def build_sql(self) -> str:\n        return f\"PRAGMA {self.statement.value}{self.type.value(self.value)};\"\n",
                                "shortDescription": "The module containing logic for PRAGMA statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "pragma\nThe module containing logic for PRAGMA statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Pragma",
                                            "source": "class Pragma(Statement):\n    \"\"\"\n    The class containing the logic for building and executing PRAGMA statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, database: Database, pragma_statement: PragmaStatements,\n                 pragma_value: Optional[str] = None, pragma_type: PragmaTypes = PragmaTypes.SET):\n        \"\"\"\n        :param database: The database this statement is associated with\n        :param pragma_statement: The type of PRAGMA statement to execute\n        :param pragma_value: The value associated with the PRAGMA statement\n        :param pragma_type: The structure of the PRAGMA statement\n        \"\"\"\n        super().__init__(database, indeterminate_yield=pragma_type != PragmaTypes.QUERY)\n        self.statement = pragma_statement\n        self.value = pragma_value\n        self.type = pragma_type\n        if self.value is None and self.type != PragmaTypes.QUERY:\n            raise ValueError(\"PRAGMA statement cannot have no value when using QUERY mode\") from None\n\n    def build_sql(self) -> str:\n        return f\"PRAGMA {self.statement.value}{self.type.value(self.value)};\"\n",
                                            "signature": "(database: 'Database', pragma_statement: 'PragmaStatements', pragma_value: 'Optional[str]' = None, pragma_type: 'PragmaTypes' = <Types.SET: <sqliteframe.pragma.types.CallableTypesValue object at 0x0000024C8B291610>>)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database this statement is associated with",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "pragma_statement",
                                                        "description": "The type of PRAGMA statement to execute",
                                                        "annotation": "PragmaStatements",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "pragma_value",
                                                        "description": "The value associated with the PRAGMA statement",
                                                        "annotation": "Optional[str]",
                                                        "default": "None",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "pragma_type",
                                                        "description": "The structure of the PRAGMA statement",
                                                        "annotation": "PragmaTypes",
                                                        "default": "Types.SET",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing PRAGMA statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Pragma\nThe class containing the logic for building and executing PRAGMA statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        return f\"PRAGMA {self.statement.value}{self.type.value(self.value)};\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "select",
                                "source": "\"\"\"\nThe module containing logic for SELECT statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nfrom ..wildcards import Wildcards\nfrom ..order_by import OrderBy, OrderTypes\nfrom ..where import Where, Condition\nfrom ..join import Join, JoinTypes\nif False:\n    from ..entity import Column, Entity\n\n\nclass Select(Statement):\n    \"\"\"\n    The class containing the logic for building and executing SELECT statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, columns: list[Column | Wildcards], distinct: bool = False):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param columns: The column(s) to select from\n        :param distinct: Whether to select only non-duplicate (distinct) values\n        \"\"\"\n        super().__init__(table.database, yield_column_factory=lambda: self.columns)\n        self.table = table\n        if not filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],\n                      set(columns) - set(self.table.columns)):\n            columns = set(sorted(columns, key=lambda column: self.table.columns.index(column)))\n        self.passed_columns = columns\n        self.columns = self.table.columns if Wildcards.All in columns else self.passed_columns[:]\n        self.distinct = distinct\n        self.where_statement = None\n        self.join_statements = []\n        self.order_by_statement = None\n\n    def build_sql(self) -> str:\n        distinct_section = \" DISTINCT\" if self.distinct else \"\"\n        columns_section = \", \".join(map(lambda column: column.name, self.columns))\n        join_section = (\"\\n\" + \"\\n\".join(map(str, self.join_statements))) if self.join_statements else \"\"\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        order_by_section = \"\" if self.order_by_statement is None else f\"\\n{self.order_by_statement}\"\n        return f\"SELECT{distinct_section} {columns_section}\\n\" \\\n               f\"FROM {self.table}{join_section}{where_section}{order_by_section};\"\n\n    def where(self, where: Where | Condition) -> Select:\n        \"\"\"\n        A method to attach WHERE clauses onto the SELECT statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n\n    def join(self, table: Entity, where: Where | Condition, join_type: JoinTypes = JoinTypes.INNER) -> Select:\n        \"\"\"\n        A method to attach JOIN clauses onto the SELECT statement.\n\n        :param table: The table to join with\n        :param where: The WHERE clause to add to the statement\n        :param join_type: The way in which the tables should be joined\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if Wildcards.All in self.passed_columns:\n            self.columns = self.columns + table.columns if join_type == JoinTypes.LEFT else table.columns + self.columns\n        else:\n            joined_columns = table.sort_columns(set(self.columns) - set(self.table.columns),\n                                                base_columns_override=self.passed_columns)\n            original_columns = self.table.sort_columns(set(self.columns) - set(joined_columns),\n                                                       base_columns_override=self.passed_columns)\n            self.columns = joined_columns + original_columns if join_type == JoinTypes.LEFT else \\\n                original_columns + joined_columns\n        self.join_statements.append(Join(table, where, join_type))\n        return self\n\n    def order_by(self, column: Column,\n                 order_types: OrderTypes | tuple[OrderTypes, ...] = OrderTypes.ASCENDING) -> Select:\n        \"\"\"\n        A method to attach ORDER BY clauses onto the SELECT statement.\n\n        :param column: The target column to order by\n        :param order_types: The way in which the results should be ordered\n        :return: A mutated version of this statement with the extended ORDER BY clause\n        \"\"\"\n        self.order_by_statement = OrderBy(column, order_types)\n        return self\n",
                                "shortDescription": "The module containing logic for SELECT statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "select\nThe module containing logic for SELECT statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Select",
                                            "source": "class Select(Statement):\n    \"\"\"\n    The class containing the logic for building and executing SELECT statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, columns: list[Column | Wildcards], distinct: bool = False):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param columns: The column(s) to select from\n        :param distinct: Whether to select only non-duplicate (distinct) values\n        \"\"\"\n        super().__init__(table.database, yield_column_factory=lambda: self.columns)\n        self.table = table\n        if not filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],\n                      set(columns) - set(self.table.columns)):\n            columns = set(sorted(columns, key=lambda column: self.table.columns.index(column)))\n        self.passed_columns = columns\n        self.columns = self.table.columns if Wildcards.All in columns else self.passed_columns[:]\n        self.distinct = distinct\n        self.where_statement = None\n        self.join_statements = []\n        self.order_by_statement = None\n\n    def build_sql(self) -> str:\n        distinct_section = \" DISTINCT\" if self.distinct else \"\"\n        columns_section = \", \".join(map(lambda column: column.name, self.columns))\n        join_section = (\"\\n\" + \"\\n\".join(map(str, self.join_statements))) if self.join_statements else \"\"\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        order_by_section = \"\" if self.order_by_statement is None else f\"\\n{self.order_by_statement}\"\n        return f\"SELECT{distinct_section} {columns_section}\\n\" \\\n               f\"FROM {self.table}{join_section}{where_section}{order_by_section};\"\n\n    def where(self, where: Where | Condition) -> Select:\n        \"\"\"\n        A method to attach WHERE clauses onto the SELECT statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n\n    def join(self, table: Entity, where: Where | Condition, join_type: JoinTypes = JoinTypes.INNER) -> Select:\n        \"\"\"\n        A method to attach JOIN clauses onto the SELECT statement.\n\n        :param table: The table to join with\n        :param where: The WHERE clause to add to the statement\n        :param join_type: The way in which the tables should be joined\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if Wildcards.All in self.passed_columns:\n            self.columns = self.columns + table.columns if join_type == JoinTypes.LEFT else table.columns + self.columns\n        else:\n            joined_columns = table.sort_columns(set(self.columns) - set(self.table.columns),\n                                                base_columns_override=self.passed_columns)\n            original_columns = self.table.sort_columns(set(self.columns) - set(joined_columns),\n                                                       base_columns_override=self.passed_columns)\n            self.columns = joined_columns + original_columns if join_type == JoinTypes.LEFT else \\\n                original_columns + joined_columns\n        self.join_statements.append(Join(table, where, join_type))\n        return self\n\n    def order_by(self, column: Column,\n                 order_types: OrderTypes | tuple[OrderTypes, ...] = OrderTypes.ASCENDING) -> Select:\n        \"\"\"\n        A method to attach ORDER BY clauses onto the SELECT statement.\n\n        :param column: The target column to order by\n        :param order_types: The way in which the results should be ordered\n        :return: A mutated version of this statement with the extended ORDER BY clause\n        \"\"\"\n        self.order_by_statement = OrderBy(column, order_types)\n        return self\n",
                                            "signature": "(table: 'Entity', columns: 'list[Column | Wildcards]', distinct: 'bool' = False)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "columns",
                                                        "description": "The column(s) to select from",
                                                        "annotation": "list[Column | Wildcards]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "distinct",
                                                        "description": "Whether to select only non-duplicate (distinct) values",
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing SELECT statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Select\nThe class containing the logic for building and executing SELECT statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        distinct_section = \" DISTINCT\" if self.distinct else \"\"\n        columns_section = \", \".join(map(lambda column: column.name, self.columns))\n        join_section = (\"\\n\" + \"\\n\".join(map(str, self.join_statements))) if self.join_statements else \"\"\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        order_by_section = \"\" if self.order_by_statement is None else f\"\\n{self.order_by_statement}\"\n        return f\"SELECT{distinct_section} {columns_section}\\n\" \\\n               f\"FROM {self.table}{join_section}{where_section}{order_by_section};\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "where",
                                                        "source": "    def where(self, where: Where | Condition) -> Select:\n        \"\"\"\n        A method to attach WHERE clauses onto the SELECT statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n",
                                                        "signature": "(self, where: 'Where | Condition') -> 'Select'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "where",
                                                                    "description": "The WHERE clause to add to the statement",
                                                                    "annotation": "Where | Condition",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A mutated version of this statement with the extended WHERE clause",
                                                                    "annotation": "Select"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method to attach WHERE clauses onto the SELECT statement",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "where\nA method to attach WHERE clauses onto the SELECT statement\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "join",
                                                        "source": "    def join(self, table: Entity, where: Where | Condition, join_type: JoinTypes = JoinTypes.INNER) -> Select:\n        \"\"\"\n        A method to attach JOIN clauses onto the SELECT statement.\n\n        :param table: The table to join with\n        :param where: The WHERE clause to add to the statement\n        :param join_type: The way in which the tables should be joined\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if Wildcards.All in self.passed_columns:\n            self.columns = self.columns + table.columns if join_type == JoinTypes.LEFT else table.columns + self.columns\n        else:\n            joined_columns = table.sort_columns(set(self.columns) - set(self.table.columns),\n                                                base_columns_override=self.passed_columns)\n            original_columns = self.table.sort_columns(set(self.columns) - set(joined_columns),\n                                                       base_columns_override=self.passed_columns)\n            self.columns = joined_columns + original_columns if join_type == JoinTypes.LEFT else \\\n                original_columns + joined_columns\n        self.join_statements.append(Join(table, where, join_type))\n        return self\n",
                                                        "signature": "(self, table: 'Entity', where: 'Where | Condition', join_type: 'JoinTypes' = <JoinTypes.INNER: 'INNER'>) -> 'Select'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "table",
                                                                    "description": "The table to join with",
                                                                    "annotation": "Entity",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "where",
                                                                    "description": "The WHERE clause to add to the statement",
                                                                    "annotation": "Where | Condition",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "join_type",
                                                                    "description": "The way in which the tables should be joined",
                                                                    "annotation": "JoinTypes",
                                                                    "default": "JoinTypes.INNER",
                                                                    "isOptional": true
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A mutated version of this statement with the extended WHERE clause",
                                                                    "annotation": "Select"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method to attach JOIN clauses onto the SELECT statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "join\nA method to attach JOIN clauses onto the SELECT statement.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "order_by",
                                                        "source": "    def order_by(self, column: Column,\n                 order_types: OrderTypes | tuple[OrderTypes, ...] = OrderTypes.ASCENDING) -> Select:\n        \"\"\"\n        A method to attach ORDER BY clauses onto the SELECT statement.\n\n        :param column: The target column to order by\n        :param order_types: The way in which the results should be ordered\n        :return: A mutated version of this statement with the extended ORDER BY clause\n        \"\"\"\n        self.order_by_statement = OrderBy(column, order_types)\n        return self\n",
                                                        "signature": "(self, column: 'Column', order_types: 'OrderTypes | tuple[OrderTypes, ...]' = <OrderTypes.ASCENDING: 'ASC'>) -> 'Select'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "column",
                                                                    "description": "The target column to order by",
                                                                    "annotation": "Column",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "order_types",
                                                                    "description": "The way in which the results should be ordered",
                                                                    "annotation": "OrderTypes | tuple[OrderTypes, ...]",
                                                                    "default": "OrderTypes.ASCENDING",
                                                                    "isOptional": true
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A mutated version of this statement with the extended ORDER BY clause",
                                                                    "annotation": "Select"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method to attach ORDER BY clauses onto the SELECT statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "order_by\nA method to attach ORDER BY clauses onto the SELECT statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "set",
                                "source": "\"\"\"\nThe module containing logic for SET statements.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .statement import Statement\nfrom ..where import Where\nif False:\n    from typing import TypeVar\n    from ..entity import Column, Entity\n    ColumnT = TypeVar(\"ColumnT\", bound=Column)\n\n\nclass Set(Statement):\n    \"\"\"\n    The class containing the logic for building and executing SET statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param data: A mapping of the column and corresponding data to set in the given table\n        \"\"\"\n\n        super().__init__(table.database)\n        self.table = table\n        self.data = data.items()\n        self.where_statement = None\n\n    def where(self, where: Where) -> Set:\n        \"\"\"\n        A method to attach WHERE clauses onto the SET statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n\n    def build_sql(self) -> str:\n        set_section = \", \".join(f\"{column.name} = {self.parameter(column.type.encode(value))}\"\n                                for column, value in self.data)\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"UPDATE {self.table}\\nSET {set_section}{where_section};\"\n",
                                "shortDescription": "The module containing logic for SET statements.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "set\nThe module containing logic for SET statements.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Set",
                                            "source": "class Set(Statement):\n    \"\"\"\n    The class containing the logic for building and executing SET statements with SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, table: Entity, data: dict[ColumnT, ColumnT.type.decoded_type]):\n        \"\"\"\n        :param table: The table this query is associated with\n        :param data: A mapping of the column and corresponding data to set in the given table\n        \"\"\"\n\n        super().__init__(table.database)\n        self.table = table\n        self.data = data.items()\n        self.where_statement = None\n\n    def where(self, where: Where) -> Set:\n        \"\"\"\n        A method to attach WHERE clauses onto the SET statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n\n    def build_sql(self) -> str:\n        set_section = \", \".join(f\"{column.name} = {self.parameter(column.type.encode(value))}\"\n                                for column, value in self.data)\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"UPDATE {self.table}\\nSET {set_section}{where_section};\"\n",
                                            "signature": "(table: 'Entity', data: 'dict[ColumnT, ColumnT.type.decoded_type]')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table this query is associated with",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "data",
                                                        "description": "A mapping of the column and corresponding data to set in the given table",
                                                        "annotation": "dict[ColumnT, ColumnT.type.decoded_type]",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for building and executing SET statements with SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Set\nThe class containing the logic for building and executing SET statements with SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "where",
                                                        "source": "    def where(self, where: Where) -> Set:\n        \"\"\"\n        A method to attach WHERE clauses onto the SET statement\n\n        :param where: The WHERE clause to add to the statement\n        :return: A mutated version of this statement with the extended WHERE clause\n        \"\"\"\n\n        if self.where_statement is None:\n            where.register(self)\n            self.where_statement = where\n        else:\n            self.where_statement &= where\n        return self\n",
                                                        "signature": "(self, where: 'Where') -> 'Set'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "where",
                                                                    "description": "The WHERE clause to add to the statement",
                                                                    "annotation": "Where",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A mutated version of this statement with the extended WHERE clause",
                                                                    "annotation": "Set"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method to attach WHERE clauses onto the SET statement",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "where\nA method to attach WHERE clauses onto the SET statement\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        set_section = \", \".join(f\"{column.name} = {self.parameter(column.type.encode(value))}\"\n                                for column, value in self.data)\n        where_section = \"\" if self.where_statement is None else f\"\\nWHERE {self.where_statement}\"\n        return f\"UPDATE {self.table}\\nSET {set_section}{where_section};\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "statement",
                                "source": "\"\"\"\nThe module containing logic for statements in SQLiteFrame.\n\"\"\"\n\nfrom __future__ import annotations\nfrom typing import Callable, Literal\nfrom abc import ABC, abstractmethod\nfrom ..result import Result\nfrom ..parameterized import Parameterized\nif False:\n    from ..entity import Column\n    from ..database import Database\n\n\nclass Statement(ABC):\n    \"\"\"\n    The abstract base class defining how statements should be structured in SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: [],\n                 indeterminate_yield: bool = False):\n        \"\"\"\n        :param database: The database this statement is associated with\n        :param yield_column_factory: A factory method to get the columns this statement will return data for\n        :param indeterminate_yield: Whether columns cannot be assigned to the result of the statement\n        \"\"\"\n        self.database = database\n        self.yield_column_factory = yield_column_factory\n        self.indeterminate_yield = indeterminate_yield\n        self.parameters = []\n        self.parameterizeds = []\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this statement, used when it is being executed.\n\n        :return: The valid SQL string representing this statement\n        \"\"\"\n\n        return self.build_sql()\n\n    @property\n    def query_parameters(self) -> list[object]:\n        \"\"\"\n        Gets the query parameters from this statement when executing the statement in a manner safe from SQL injection.\n\n        This is involved in the usage of query parameters.\n\n        :return: The query parameters from this statement\n        \"\"\"\n\n        return self.parameters + [parameter for extension in self.parameterizeds for parameter in extension.parameters]\n\n    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this statement, used when executing this statement.\n\n        :return: The valid SQL string representing this statement\n        \"\"\"\n\n        return \"\"\n\n    def execute(self) -> Result:\n        \"\"\"\n        Executes this statement, and returns a corresponding result.\n\n        :return: A result object which handles all SQLiteFrame query results independently\n        \"\"\"\n\n        return Result(self.yield_column_factory(), self.database.execute(self), indeterminate=self.indeterminate_yield)\n\n    def register_parameterized(self, parameterized: Parameterized) -> None:\n        \"\"\"\n        Registers the query parameters from any subclauses with the statement for execution in order.\n\n        :param parameterized: The parameterized object, such as a WHERE clause\n        \"\"\"\n\n        self.parameterizeds.append(parameterized)\n\n    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a query parameter for this statement, and replaces it with a literal \"?\" for direct use in queries.\n\n        :param parameter: The parameter to register\n        :return: A \"?\" string literal for drop-in replacement when building queries\n        \"\"\"\n\n        self.parameters.append(parameter)\n        return \"?\"\n",
                                "shortDescription": "The module containing logic for statements in SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "statement\nThe module containing logic for statements in SQLiteFrame.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Statement",
                                            "source": "class Statement(ABC):\n    \"\"\"\n    The abstract base class defining how statements should be structured in SQLiteFrame.\n    \"\"\"\n\n    def __init__(self, database: Database, yield_column_factory: Callable[[], list[Column]] = lambda: [],\n                 indeterminate_yield: bool = False):\n        \"\"\"\n        :param database: The database this statement is associated with\n        :param yield_column_factory: A factory method to get the columns this statement will return data for\n        :param indeterminate_yield: Whether columns cannot be assigned to the result of the statement\n        \"\"\"\n        self.database = database\n        self.yield_column_factory = yield_column_factory\n        self.indeterminate_yield = indeterminate_yield\n        self.parameters = []\n        self.parameterizeds = []\n\n    def __str__(self) -> str:\n        \"\"\"\n        The string representation for this statement, used when it is being executed.\n\n        :return: The valid SQL string representing this statement\n        \"\"\"\n\n        return self.build_sql()\n\n    @property\n    def query_parameters(self) -> list[object]:\n        \"\"\"\n        Gets the query parameters from this statement when executing the statement in a manner safe from SQL injection.\n\n        This is involved in the usage of query parameters.\n\n        :return: The query parameters from this statement\n        \"\"\"\n\n        return self.parameters + [parameter for extension in self.parameterizeds for parameter in extension.parameters]\n\n    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this statement, used when executing this statement.\n\n        :return: The valid SQL string representing this statement\n        \"\"\"\n\n        return \"\"\n\n    def execute(self) -> Result:\n        \"\"\"\n        Executes this statement, and returns a corresponding result.\n\n        :return: A result object which handles all SQLiteFrame query results independently\n        \"\"\"\n\n        return Result(self.yield_column_factory(), self.database.execute(self), indeterminate=self.indeterminate_yield)\n\n    def register_parameterized(self, parameterized: Parameterized) -> None:\n        \"\"\"\n        Registers the query parameters from any subclauses with the statement for execution in order.\n\n        :param parameterized: The parameterized object, such as a WHERE clause\n        \"\"\"\n\n        self.parameterizeds.append(parameterized)\n\n    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a query parameter for this statement, and replaces it with a literal \"?\" for direct use in queries.\n\n        :param parameter: The parameter to register\n        :return: A \"?\" string literal for drop-in replacement when building queries\n        \"\"\"\n\n        self.parameters.append(parameter)\n        return \"?\"\n",
                                            "signature": "(database: 'Database', yield_column_factory: 'Callable[[], list[Column]]' = <function Statement.<lambda> at 0x0000024C8BF65800>, indeterminate_yield: 'bool' = False)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database this statement is associated with",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "yield_column_factory",
                                                        "description": "A factory method to get the columns this statement will return data for",
                                                        "annotation": "Callable[[], list[Column]]",
                                                        "default": "<function Statement.<lambda> at 0x0000024C8BF65800>",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "indeterminate_yield",
                                                        "description": "Whether columns cannot be assigned to the result of the statement",
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The abstract base class defining how statements should be structured in SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": true,
                                            "searchTerms": "Statement\nThe abstract base class defining how statements should be structured in SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    @abstractmethod\n    def build_sql(self) -> str:\n        \"\"\"\n        Builds a valid SQL string representing this statement, used when executing this statement.\n\n        :return: The valid SQL string representing this statement\n        \"\"\"\n\n        return \"\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this statement",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this statement, used when executing this statement.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this statement, used when executing this statement.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "execute",
                                                        "source": "    def execute(self) -> Result:\n        \"\"\"\n        Executes this statement, and returns a corresponding result.\n\n        :return: A result object which handles all SQLiteFrame query results independently\n        \"\"\"\n\n        return Result(self.yield_column_factory(), self.database.execute(self), indeterminate=self.indeterminate_yield)\n",
                                                        "signature": "(self) -> 'Result'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A result object which handles all SQLiteFrame query results independently",
                                                                    "annotation": "Result"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Executes this statement, and returns a corresponding result.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "execute\nExecutes this statement, and returns a corresponding result.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "register_parameterized",
                                                        "source": "    def register_parameterized(self, parameterized: Parameterized) -> None:\n        \"\"\"\n        Registers the query parameters from any subclauses with the statement for execution in order.\n\n        :param parameterized: The parameterized object, such as a WHERE clause\n        \"\"\"\n\n        self.parameterizeds.append(parameterized)\n",
                                                        "signature": "(self, parameterized: 'Parameterized') -> 'None'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "parameterized",
                                                                    "description": "The parameterized object, such as a WHERE clause",
                                                                    "annotation": "Parameterized",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "Registers the query parameters from any subclauses with the statement for execution in order.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "register_parameterized\nRegisters the query parameters from any subclauses with the statement for execution in order.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "parameter",
                                                        "source": "    def parameter(self, parameter: object) -> Literal[\"?\"]:\n        \"\"\"\n        Registers a query parameter for this statement, and replaces it with a literal \"?\" for direct use in queries.\n\n        :param parameter: The parameter to register\n        :return: A \"?\" string literal for drop-in replacement when building queries\n        \"\"\"\n\n        self.parameters.append(parameter)\n        return \"?\"\n",
                                                        "signature": "(self, parameter: 'object') -> \"Literal['?']\"",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "parameter",
                                                                    "description": "The parameter to register",
                                                                    "annotation": "object",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A \"?\" string literal for drop-in replacement when building queries",
                                                                    "annotation": "Literal['?']"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Registers a query parameter for this statement, and replaces it with a literal \"?\" for direct use in queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "parameter\nRegisters a query parameter for this statement, and replaces it with a literal \"?\" for direct use in queries.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "suggested_schema",
                    "source": "\"\"\"\nA subpackage containing logic for suggesting schemas for working with already-created SQLite databases.\n\"\"\"\n\nfrom .schema import Schema as SuggestedSchema\n",
                    "shortDescription": "A subpackage containing logic for suggesting schemas for working with already-created SQLite databases.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "suggested_schema\nA subpackage containing logic for suggesting schemas for working with already-created SQLite databases.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "column",
                                "source": "\"\"\"\nThe module containing logic for columns when suggesting schemas.\n\"\"\"\n\nfrom sqliteframe import FKRestraints, Types\nfrom .unknown_type import UnknownType\n\n\nclass Column:\n    \"\"\"\n    The class representing columns when suggesting schemas from pre-existing databases.\n    \"\"\"\n\n    TYPES_DICTIONARY = {**{sql_type.sql_name(): sql_type for sql_type in\n                           [sql_type.value() for sql_type in Types]}, **{\"\": Types.Blob.value()}}  # No type --> BLOB\n    FK_RESTRAINTS = {restraint.value: restraint.name for restraint in FKRestraints}\n\n    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, primary_key: bool):\n        \"\"\"\n        :param name: The name of the column\n        :param sql_type: The type of the column as a valid SQL string\n        :param not_null: Whether the column is not null\n        :param default: What the default for the column is\n        :param primary_key: Whether the column is a primary key column\n        \"\"\"\n\n        self.name = name\n        self.type = self.__class__.TYPES_DICTIONARY.get(sql_type)\n        if self.type is None:\n            self.type = UnknownType()\n        self.is_nullable = not not_null\n        self.default = default\n        self.is_primary_key = primary_key\n        self.type_details = self.get_type_details()\n\n    def __str__(self) -> str:\n        \"\"\"\n        Converts all the necessary data from this class into a string, used when writing the suggested schema.\n\n        :return: The string representation of the column, used when writing the suggested schema\n        \"\"\"\n\n        return f\"{self.name} = {self.type.__class__.__name__}{self.type_details}\"\n\n    def get_type_details(self) -> str:\n        \"\"\"\n        A method used when writing the suggested schema, which retrieves all the type details as a formatted string.\n\n        :return: All the type details stored in this class as a formatted string\n        \"\"\"\n\n        if self.default is None and not (self.is_nullable or self.is_primary_key):\n            return \"\"\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        primary_key = \"primary_key=True\" if self.is_primary_key else \"\"\n        return f\"({', '.join(filter(bool, (nullable, default, primary_key)))})\"\n",
                                "shortDescription": "The module containing logic for columns when suggesting schemas.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "column\nThe module containing logic for columns when suggesting schemas.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Column",
                                            "source": "class Column:\n    \"\"\"\n    The class representing columns when suggesting schemas from pre-existing databases.\n    \"\"\"\n\n    TYPES_DICTIONARY = {**{sql_type.sql_name(): sql_type for sql_type in\n                           [sql_type.value() for sql_type in Types]}, **{\"\": Types.Blob.value()}}  # No type --> BLOB\n    FK_RESTRAINTS = {restraint.value: restraint.name for restraint in FKRestraints}\n\n    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, primary_key: bool):\n        \"\"\"\n        :param name: The name of the column\n        :param sql_type: The type of the column as a valid SQL string\n        :param not_null: Whether the column is not null\n        :param default: What the default for the column is\n        :param primary_key: Whether the column is a primary key column\n        \"\"\"\n\n        self.name = name\n        self.type = self.__class__.TYPES_DICTIONARY.get(sql_type)\n        if self.type is None:\n            self.type = UnknownType()\n        self.is_nullable = not not_null\n        self.default = default\n        self.is_primary_key = primary_key\n        self.type_details = self.get_type_details()\n\n    def __str__(self) -> str:\n        \"\"\"\n        Converts all the necessary data from this class into a string, used when writing the suggested schema.\n\n        :return: The string representation of the column, used when writing the suggested schema\n        \"\"\"\n\n        return f\"{self.name} = {self.type.__class__.__name__}{self.type_details}\"\n\n    def get_type_details(self) -> str:\n        \"\"\"\n        A method used when writing the suggested schema, which retrieves all the type details as a formatted string.\n\n        :return: All the type details stored in this class as a formatted string\n        \"\"\"\n\n        if self.default is None and not (self.is_nullable or self.is_primary_key):\n            return \"\"\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        primary_key = \"primary_key=True\" if self.is_primary_key else \"\"\n        return f\"({', '.join(filter(bool, (nullable, default, primary_key)))})\"\n",
                                            "signature": "(name: str, sql_type: str, not_null: bool, default: object, primary_key: bool)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "name",
                                                        "description": "The name of the column",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "sql_type",
                                                        "description": "The type of the column as a valid SQL string",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "not_null",
                                                        "description": "Whether the column is not null",
                                                        "annotation": "bool",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "default",
                                                        "description": "What the default for the column is",
                                                        "annotation": "object",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "primary_key",
                                                        "description": "Whether the column is a primary key column",
                                                        "annotation": "bool",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class representing columns when suggesting schemas from pre-existing databases.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Column\nThe class representing columns when suggesting schemas from pre-existing databases.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "get_type_details",
                                                        "source": "    def get_type_details(self) -> str:\n        \"\"\"\n        A method used when writing the suggested schema, which retrieves all the type details as a formatted string.\n\n        :return: All the type details stored in this class as a formatted string\n        \"\"\"\n\n        if self.default is None and not (self.is_nullable or self.is_primary_key):\n            return \"\"\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        primary_key = \"primary_key=True\" if self.is_primary_key else \"\"\n        return f\"({', '.join(filter(bool, (nullable, default, primary_key)))})\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "All the type details stored in this class as a formatted string",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method used when writing the suggested schema, which retrieves all the type details as a formatted string.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "get_type_details\nA method used when writing the suggested schema, which retrieves all the type details as a formatted string.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "fk_column",
                                "source": "\"\"\"\nThe module containing logic for foreign key columns when suggesting schemas.\n\"\"\"\n\nfrom ..foreign_key import Restraints\nfrom .column import Column\n\n\nclass FKColumn(Column):\n    \"\"\"\n    The class representing foreign key columns when suggesting schemas from pre-existing databases.\n    \"\"\"\n\n    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, _: bool,\n                 ref_table: str, on_update: str, on_delete: str):\n        \"\"\"\n        :param name: The name of the column\n        :param sql_type: The type of the column as a valid SQL string\n        :param not_null: Whether the column is not null\n        :param default: What the default for the column is\n        :param _: Whether the column is a primary key column - this is unused and should always be false\n        :param ref_table: The table this column links to\n        :param on_update: The declared mode for cascading when this column is updated\n        :param on_delete: The declared mode for cascading when this column is deleted\n        \"\"\"\n\n        self.ref_table = ref_table\n        self.on_update = on_update\n        self.on_delete = on_delete\n        super().__init__(name, sql_type, not_null, default, False)\n\n    def __str__(self) -> str:\n        return f\"{self.name} = ForeignKey({self.type_details})\"\n\n    def get_type_details(self) -> str:\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        on_update = \"\" if self.on_update == Restraints.CASCADE.value else \\\n            f\"on_update=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_update)}\"\n        on_delete = \"\" if self.on_delete == Restraints.RESTRICT.value else \\\n            f\"on_delete=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_delete)}\"\n        seperator = \", \" if any(filter(bool, (nullable, default, on_update, on_delete))) else \"\"\n        return f\"{self.ref_table}{seperator}{', '.join(filter(bool, (nullable, default, on_update, on_delete)))}\"\n",
                                "shortDescription": "The module containing logic for foreign key columns when suggesting schemas.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "fk_column\nThe module containing logic for foreign key columns when suggesting schemas.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "FKColumn",
                                            "source": "class FKColumn(Column):\n    \"\"\"\n    The class representing foreign key columns when suggesting schemas from pre-existing databases.\n    \"\"\"\n\n    def __init__(self, name: str, sql_type: str, not_null: bool, default: object, _: bool,\n                 ref_table: str, on_update: str, on_delete: str):\n        \"\"\"\n        :param name: The name of the column\n        :param sql_type: The type of the column as a valid SQL string\n        :param not_null: Whether the column is not null\n        :param default: What the default for the column is\n        :param _: Whether the column is a primary key column - this is unused and should always be false\n        :param ref_table: The table this column links to\n        :param on_update: The declared mode for cascading when this column is updated\n        :param on_delete: The declared mode for cascading when this column is deleted\n        \"\"\"\n\n        self.ref_table = ref_table\n        self.on_update = on_update\n        self.on_delete = on_delete\n        super().__init__(name, sql_type, not_null, default, False)\n\n    def __str__(self) -> str:\n        return f\"{self.name} = ForeignKey({self.type_details})\"\n\n    def get_type_details(self) -> str:\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        on_update = \"\" if self.on_update == Restraints.CASCADE.value else \\\n            f\"on_update=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_update)}\"\n        on_delete = \"\" if self.on_delete == Restraints.RESTRICT.value else \\\n            f\"on_delete=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_delete)}\"\n        seperator = \", \" if any(filter(bool, (nullable, default, on_update, on_delete))) else \"\"\n        return f\"{self.ref_table}{seperator}{', '.join(filter(bool, (nullable, default, on_update, on_delete)))}\"\n",
                                            "signature": "(name: str, sql_type: str, not_null: bool, default: object, _: bool, ref_table: str, on_update: str, on_delete: str)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "name",
                                                        "description": "The name of the column",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "sql_type",
                                                        "description": "The type of the column as a valid SQL string",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "not_null",
                                                        "description": "Whether the column is not null",
                                                        "annotation": "bool",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "default",
                                                        "description": "What the default for the column is",
                                                        "annotation": "object",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "_",
                                                        "description": "Whether the column is a primary key column - this is unused and should always be false",
                                                        "annotation": "bool",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "ref_table",
                                                        "description": "The table this column links to",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "on_update",
                                                        "description": "The declared mode for cascading when this column is updated",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "on_delete",
                                                        "description": "The declared mode for cascading when this column is deleted",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class representing foreign key columns when suggesting schemas from pre-existing databases.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "FKColumn\nThe class representing foreign key columns when suggesting schemas from pre-existing databases.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "get_type_details",
                                                        "source": "    def get_type_details(self) -> str:\n        nullable = \"nullable=True\" if self.is_nullable else \"\"\n        default = \"\" if self.default is None else f\"default={self.type.default_suggestion(self.default)}\"\n        on_update = \"\" if self.on_update == Restraints.CASCADE.value else \\\n            f\"on_update=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_update)}\"\n        on_delete = \"\" if self.on_delete == Restraints.RESTRICT.value else \\\n            f\"on_delete=FKRestraints.{self.__class__.FK_RESTRAINTS.get(self.on_delete)}\"\n        seperator = \", \" if any(filter(bool, (nullable, default, on_update, on_delete))) else \"\"\n        return f\"{self.ref_table}{seperator}{', '.join(filter(bool, (nullable, default, on_update, on_delete)))}\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "All the type details stored in this class as a formatted string",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "A method used when writing the suggested schema, which retrieves all the type details as a formatted string.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "get_type_details\nA method used when writing the suggested schema, which retrieves all the type details as a formatted string.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "schema",
                                "source": "\"\"\"\nThe logic for generating an entire suggested schema.\n\"\"\"\n\nfrom sqliteframe import Database\nfrom sqlite3 import Cursor\nfrom .table import Table\n\n\nclass Schema:\n    \"\"\"\n    The class containing all the logic for generating a suggested schema from a pre-existing SQlite database.\n    \"\"\"\n\n    def __init__(self, database: Database):\n        \"\"\"\n        :param database: The database the schema is should be generated from\n        \"\"\"\n        self.database = database\n        with database.connection():\n            self.tables = self.create_tables()\n\n    def create_tables(self) -> list[Table]:\n        \"\"\"\n        Generates the relevant tables for the suggested schema\n\n        :return: A list of generated tables\n        \"\"\"\n\n        return [Table(self.database, table[0]) for table in [*self.get_table_names()]]\n\n    def get_table_names(self) -> Cursor:\n        \"\"\"\n        Gets each of the table names from the database by executing a special SQL commands which accesses metadata.\n\n        :return: The cursor returned by sqlite3 after executing the relevant query\n        \"\"\"\n        return self.database.execute(\"SELECT tbl_name FROM sqlite_master WHERE type=\\\"entity\\\";\")\n\n    def __str__(self) -> str:\n        return \"from sqliteframe import Database, entity\\n\\n\\n\" + (\"database = Database(\\\"<database_name>.db\\\")\\n\\n\\n\"\n                                                                   \"\\n\\n\\n\").join(map(str, self.tables)) + \"\\n\"\n",
                                "shortDescription": "The logic for generating an entire suggested schema.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "schema\nThe logic for generating an entire suggested schema.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Schema",
                                            "source": "class Schema:\n    \"\"\"\n    The class containing all the logic for generating a suggested schema from a pre-existing SQlite database.\n    \"\"\"\n\n    def __init__(self, database: Database):\n        \"\"\"\n        :param database: The database the schema is should be generated from\n        \"\"\"\n        self.database = database\n        with database.connection():\n            self.tables = self.create_tables()\n\n    def create_tables(self) -> list[Table]:\n        \"\"\"\n        Generates the relevant tables for the suggested schema\n\n        :return: A list of generated tables\n        \"\"\"\n\n        return [Table(self.database, table[0]) for table in [*self.get_table_names()]]\n\n    def get_table_names(self) -> Cursor:\n        \"\"\"\n        Gets each of the table names from the database by executing a special SQL commands which accesses metadata.\n\n        :return: The cursor returned by sqlite3 after executing the relevant query\n        \"\"\"\n        return self.database.execute(\"SELECT tbl_name FROM sqlite_master WHERE type=\\\"entity\\\";\")\n\n    def __str__(self) -> str:\n        return \"from sqliteframe import Database, entity\\n\\n\\n\" + (\"database = Database(\\\"<database_name>.db\\\")\\n\\n\\n\"\n                                                                   \"\\n\\n\\n\").join(map(str, self.tables)) + \"\\n\"\n",
                                            "signature": "(database: sqliteframe.database.Database)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database the schema is should be generated from",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing all the logic for generating a suggested schema from a pre-existing SQlite database.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Schema\nThe class containing all the logic for generating a suggested schema from a pre-existing SQlite database.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "create_tables",
                                                        "source": "    def create_tables(self) -> list[Table]:\n        \"\"\"\n        Generates the relevant tables for the suggested schema\n\n        :return: A list of generated tables\n        \"\"\"\n\n        return [Table(self.database, table[0]) for table in [*self.get_table_names()]]\n",
                                                        "signature": "(self) -> list[sqliteframe.suggested_schema.table.Table]",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A list of generated tables",
                                                                    "annotation": "list[sqliteframe.suggested_schema.table.Table]"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Generates the relevant tables for the suggested schema",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "create_tables\nGenerates the relevant tables for the suggested schema\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "get_table_names",
                                                        "source": "    def get_table_names(self) -> Cursor:\n        \"\"\"\n        Gets each of the table names from the database by executing a special SQL commands which accesses metadata.\n\n        :return: The cursor returned by sqlite3 after executing the relevant query\n        \"\"\"\n        return self.database.execute(\"SELECT tbl_name FROM sqlite_master WHERE type=\\\"entity\\\";\")\n",
                                                        "signature": "(self) -> sqlite3.Cursor",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The cursor returned by sqlite3 after executing the relevant query",
                                                                    "annotation": "Cursor"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Gets each of the table names from the database by executing a special SQL commands which accesses metadata.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "get_table_names\nGets each of the table names from the database by executing a special SQL commands which accesses metadata.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "table",
                                "source": "\"\"\"\nThe logic for suggesting a table when generating a suggested schema.\n\"\"\"\n\nfrom typing import Generator\nfrom sqliteframe import Pragma, PragmaStatements, PragmaTypes, Database\nfrom .column import Column\nfrom .fk_column import FKColumn\n\n\nclass Table:\n    \"\"\"\n    The class containing all the logic for suggesting how to create a table when suggesting a schema.\n    \"\"\"\n\n    def __init__(self, database: Database, name: str):\n        \"\"\"\n        :param database: The database this table is a part of\n        :param name: The name of the table\n        \"\"\"\n\n        self.database = database\n        self.name = name\n        with self.database.connection():\n            self.columns = [*sorted(self.get_columns(), key=lambda column: not column.is_primary_key)]\n\n    def __str__(self) -> str:\n        \"\"\"\n        Converts the data from this class into the relevant Python syntax to create a table.\n\n        :return: The string that defines a table in a schema (using a decorated class)\n        \"\"\"\n\n        columns = \"\\n\\t\".join(map(str, self.columns))\n        return f\"@table(database)\\nclass {self.name}:\\n\\t{columns}\"\n\n    def get_columns(self) -> Generator[Column, None, None]:\n        \"\"\"\n        Gets each of the columns from the table.\n\n        :return: Each column in the table (as a generator)\n        \"\"\"\n\n        foreign_keys = self.get_foreign_keys()\n        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)\n        for column in statement.execute():\n            if column[1] in foreign_keys:  # 1:Name\n                yield FKColumn(*column[1:], *foreign_keys.get(column[1]))\n            else:\n                yield Column(*column[1:])\n\n    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:\n        \"\"\"\n        Gets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.\n\n        :return: The relevant data for the foreign key column\n        \"\"\"\n\n        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)\n        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}\n",
                                "shortDescription": "The logic for suggesting a table when generating a suggested schema.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "table\nThe logic for suggesting a table when generating a suggested schema.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Table",
                                            "source": "class Table:\n    \"\"\"\n    The class containing all the logic for suggesting how to create a table when suggesting a schema.\n    \"\"\"\n\n    def __init__(self, database: Database, name: str):\n        \"\"\"\n        :param database: The database this table is a part of\n        :param name: The name of the table\n        \"\"\"\n\n        self.database = database\n        self.name = name\n        with self.database.connection():\n            self.columns = [*sorted(self.get_columns(), key=lambda column: not column.is_primary_key)]\n\n    def __str__(self) -> str:\n        \"\"\"\n        Converts the data from this class into the relevant Python syntax to create a table.\n\n        :return: The string that defines a table in a schema (using a decorated class)\n        \"\"\"\n\n        columns = \"\\n\\t\".join(map(str, self.columns))\n        return f\"@table(database)\\nclass {self.name}:\\n\\t{columns}\"\n\n    def get_columns(self) -> Generator[Column, None, None]:\n        \"\"\"\n        Gets each of the columns from the table.\n\n        :return: Each column in the table (as a generator)\n        \"\"\"\n\n        foreign_keys = self.get_foreign_keys()\n        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)\n        for column in statement.execute():\n            if column[1] in foreign_keys:  # 1:Name\n                yield FKColumn(*column[1:], *foreign_keys.get(column[1]))\n            else:\n                yield Column(*column[1:])\n\n    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:\n        \"\"\"\n        Gets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.\n\n        :return: The relevant data for the foreign key column\n        \"\"\"\n\n        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)\n        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}\n",
                                            "signature": "(database: sqliteframe.database.Database, name: str)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "database",
                                                        "description": "The database this table is a part of",
                                                        "annotation": "Database",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "name",
                                                        "description": "The name of the table",
                                                        "annotation": "str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing all the logic for suggesting how to create a table when suggesting a schema.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Table\nThe class containing all the logic for suggesting how to create a table when suggesting a schema.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "get_columns",
                                                        "source": "    def get_columns(self) -> Generator[Column, None, None]:\n        \"\"\"\n        Gets each of the columns from the table.\n\n        :return: Each column in the table (as a generator)\n        \"\"\"\n\n        foreign_keys = self.get_foreign_keys()\n        statement = Pragma(self.database, PragmaStatements.TABLE_INFO, self.name, PragmaTypes.CALL)\n        for column in statement.execute():\n            if column[1] in foreign_keys:  # 1:Name\n                yield FKColumn(*column[1:], *foreign_keys.get(column[1]))\n            else:\n                yield Column(*column[1:])\n",
                                                        "signature": "(self) -> Generator[sqliteframe.suggested_schema.column.Column, NoneType, NoneType]",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "Each column in the table (as a generator)",
                                                                    "annotation": "typing.Generator[sqliteframe.suggested_schema.column.Column, NoneType, NoneType]"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Gets each of the columns from the table.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": true,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "get_columns\nGets each of the columns from the table.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "get_foreign_keys",
                                                        "source": "    def get_foreign_keys(self) -> dict[str, tuple[str, str, str, str]]:\n        \"\"\"\n        Gets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.\n\n        :return: The relevant data for the foreign key column\n        \"\"\"\n\n        statement = Pragma(self.database, PragmaStatements.FOREIGN_KEY_LIST, self.name, PragmaTypes.CALL)\n        return {key[3]: (key[2], *key[5:7]) for key in statement.execute()}\n",
                                                        "signature": "(self) -> dict[str, tuple[str, str, str, str]]",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The relevant data for the foreign key column",
                                                                    "annotation": "dict[str, tuple[str, str, str, str]]"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Gets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "get_foreign_keys\nGets the foreign key columns from this table as a mapping: {name: (table, on_update, on_delete)}.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "unknown_type",
                                "source": "\"\"\"\nThe module containing the logic for the unknown type, only used when generating a suggested schema.\n\"\"\"\n\nfrom ..types import Type\n\n\nclass UnknownType(Type[NotImplemented, NotImplemented]):\n    \"\"\"\n    The class representing an unknown type that can not be decoded when suggesting a schema.\n    \"\"\"\n\n    def encode(self, decoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n\n    def decode(self, encoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n\n    def default_suggestion(self, encoded: NotImplemented) -> str:\n        return \"<UnknownType>\"\n\n    def sql_name(self) -> str:\n        return NotImplemented\n",
                                "shortDescription": "The module containing the logic for the unknown type, only used when generating a suggested schema.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "unknown_type\nThe module containing the logic for the unknown type, only used when generating a suggested schema.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "UnknownType",
                                            "source": "class UnknownType(Type[NotImplemented, NotImplemented]):\n    \"\"\"\n    The class representing an unknown type that can not be decoded when suggesting a schema.\n    \"\"\"\n\n    def encode(self, decoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n\n    def decode(self, encoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n\n    def default_suggestion(self, encoded: NotImplemented) -> str:\n        return \"<UnknownType>\"\n\n    def sql_name(self) -> str:\n        return NotImplemented\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class representing an unknown type that can not be decoded when suggesting a schema.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "UnknownType\nThe class representing an unknown type that can not be decoded when suggesting a schema.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n",
                                                        "signature": "(self, decoded: NotImplemented) -> NotImplemented",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "NotImplemented",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "NotImplemented"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: NotImplemented) -> NotImplemented:\n        return NotImplemented\n",
                                                        "signature": "(self, encoded: NotImplemented) -> NotImplemented",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "NotImplemented",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "NotImplemented"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: NotImplemented) -> str:\n        return \"<UnknownType>\"\n",
                                                        "signature": "(self, encoded: NotImplemented) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "NotImplemented",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return NotImplemented\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "types",
                    "source": "\"\"\"\nA subpackage containing all the data type logic for SQLiteFrame, including conversions between Python and SQLite types.\n\"\"\"\n\nfrom .integer import Integer\nfrom .type import Type\nfrom .string import String\nfrom .boolean import Boolean\nfrom .date import Date\nfrom .time import Time\nfrom .null import Null\nfrom .blob import Blob\nfrom .float import Float\nfrom .types import Types\n",
                    "shortDescription": "A subpackage containing all the data type logic for SQLiteFrame, including conversions between Python and SQLite types.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "types\nA subpackage containing all the data type logic for SQLiteFrame, including conversions between Python and SQLite types.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "blob",
                                "source": "\"\"\"\nThe module containing logic for BLOB types.\n\"\"\"\n\nfrom .type import Type\n\n\nclass Blob(Type[str, bytes]):\n    \"\"\"\n    Large-Binary-Object-Type - Converts between SQLite BLOB and Python bytes.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"BLOB\"\n\n    def decode(self, encoded: str) -> bytes:\n        return encoded.encode()\n\n    def encode(self, decoded: bytes) -> str:\n        return f\"\\\"{decoded.decode()}\\\"\"\n\n    def default_suggestion(self, encoded: bytes) -> str:\n        return f\"b{encoded}\"\n",
                                "shortDescription": "The module containing logic for BLOB types.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "blob\nThe module containing logic for BLOB types.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Blob",
                                            "source": "class Blob(Type[str, bytes]):\n    \"\"\"\n    Large-Binary-Object-Type - Converts between SQLite BLOB and Python bytes.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"BLOB\"\n\n    def decode(self, encoded: str) -> bytes:\n        return encoded.encode()\n\n    def encode(self, decoded: bytes) -> str:\n        return f\"\\\"{decoded.decode()}\\\"\"\n\n    def default_suggestion(self, encoded: bytes) -> str:\n        return f\"b{encoded}\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Large-Binary-Object-Type - Converts between SQLite BLOB and Python bytes.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Blob\nLarge-Binary-Object-Type - Converts between SQLite BLOB and Python bytes.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"BLOB\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: str) -> bytes:\n        return encoded.encode()\n",
                                                        "signature": "(self, encoded: str) -> bytes",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "bytes"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: bytes) -> str:\n        return f\"\\\"{decoded.decode()}\\\"\"\n",
                                                        "signature": "(self, decoded: bytes) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "bytes",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: bytes) -> str:\n        return f\"b{encoded}\"\n",
                                                        "signature": "(self, encoded: bytes) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "bytes",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "boolean",
                                "source": "\"\"\"\nThe module containing logic for boolean types.\n\"\"\"\n\nfrom .type import Type\n\n\nclass Boolean(Type[int, bool]):\n    \"\"\"\n    Converts boolean to an integer (0 or 1), and stores as an SQLite NUMERIC, via type affinity.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"BOOLEAN\"\n\n    def decode(self, encoded: int) -> bool:\n        return bool(encoded)\n\n    def encode(self, decoded: bool) -> int:\n        return 1 if decoded else 0\n\n    def default_suggestion(self, encoded: int) -> str:\n        return str(bool(encoded))\n",
                                "shortDescription": "The module containing logic for boolean types.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "boolean\nThe module containing logic for boolean types.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Boolean",
                                            "source": "class Boolean(Type[int, bool]):\n    \"\"\"\n    Converts boolean to an integer (0 or 1), and stores as an SQLite NUMERIC, via type affinity.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"BOOLEAN\"\n\n    def decode(self, encoded: int) -> bool:\n        return bool(encoded)\n\n    def encode(self, decoded: bool) -> int:\n        return 1 if decoded else 0\n\n    def default_suggestion(self, encoded: int) -> str:\n        return str(bool(encoded))\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Converts boolean to an integer (0 or 1), and stores as an SQLite NUMERIC, via type affinity.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Boolean\nConverts boolean to an integer (0 or 1), and stores as an SQLite NUMERIC, via type affinity.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"BOOLEAN\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: int) -> bool:\n        return bool(encoded)\n",
                                                        "signature": "(self, encoded: int) -> bool",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "bool"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: bool) -> int:\n        return 1 if decoded else 0\n",
                                                        "signature": "(self, decoded: bool) -> int",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "bool",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "int"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: int) -> str:\n        return str(bool(encoded))\n",
                                                        "signature": "(self, encoded: int) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "date",
                                "source": "\"\"\"\nThe logic for storing dates in SQLiteFrame.\n\"\"\"\n\nfrom datetime import date\nfrom .type import Type\n\n\nclass Date(Type[int, date]):\n    \"\"\"\n    For storing dates, by converting between SQLite's NUMERIC type and Python's datetime date type.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"DATE\"\n\n    def decode(self, encoded: int) -> date:\n        return date.fromordinal(encoded)\n\n    def encode(self, decoded: date) -> int:\n        return decoded.toordinal()\n\n    def default_suggestion(self, encoded: int) -> str:\n        iso_formatted = date.fromordinal(int(encoded)).isoformat()\n        joined = \", \".join(number.lstrip(\"0\") for number in iso_formatted.split(\"-\"))\n        return f\"date({joined})\"\n",
                                "shortDescription": "The logic for storing dates in SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "date\nThe logic for storing dates in SQLiteFrame.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Date",
                                            "source": "class Date(Type[int, date]):\n    \"\"\"\n    For storing dates, by converting between SQLite's NUMERIC type and Python's datetime date type.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"DATE\"\n\n    def decode(self, encoded: int) -> date:\n        return date.fromordinal(encoded)\n\n    def encode(self, decoded: date) -> int:\n        return decoded.toordinal()\n\n    def default_suggestion(self, encoded: int) -> str:\n        iso_formatted = date.fromordinal(int(encoded)).isoformat()\n        joined = \", \".join(number.lstrip(\"0\") for number in iso_formatted.split(\"-\"))\n        return f\"date({joined})\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "For storing dates, by converting between SQLite's NUMERIC type and Python's datetime date type.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Date\nFor storing dates, by converting between SQLite's NUMERIC type and Python's datetime date type.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"DATE\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: int) -> date:\n        return date.fromordinal(encoded)\n",
                                                        "signature": "(self, encoded: int) -> datetime.date",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "date"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: date) -> int:\n        return decoded.toordinal()\n",
                                                        "signature": "(self, decoded: datetime.date) -> int",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "date",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "int"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: int) -> str:\n        iso_formatted = date.fromordinal(int(encoded)).isoformat()\n        joined = \", \".join(number.lstrip(\"0\") for number in iso_formatted.split(\"-\"))\n        return f\"date({joined})\"\n",
                                                        "signature": "(self, encoded: int) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "float",
                                "source": "\"\"\"\nThe logic for storing floats (floating point decimals) in SQLiteFrame.\n\"\"\"\n\nfrom .type import Type\n\n\nclass Float(Type[float, float]):\n    \"\"\"\n    Stores floats, converting between SQLite's REAL and Python's float types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"REAL\"\n\n    def decode(self, encoded: float) -> float:\n        return encoded\n\n    def encode(self, decoded: float) -> float:\n        return decoded\n\n    def default_suggestion(self, encoded: float) -> str:\n        return str(encoded)\n",
                                "shortDescription": "The logic for storing floats (floating point decimals) in SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "float\nThe logic for storing floats (floating point decimals) in SQLiteFrame.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Float",
                                            "source": "class Float(Type[float, float]):\n    \"\"\"\n    Stores floats, converting between SQLite's REAL and Python's float types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"REAL\"\n\n    def decode(self, encoded: float) -> float:\n        return encoded\n\n    def encode(self, decoded: float) -> float:\n        return decoded\n\n    def default_suggestion(self, encoded: float) -> str:\n        return str(encoded)\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Stores floats, converting between SQLite's REAL and Python's float types.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Float\nStores floats, converting between SQLite's REAL and Python's float types.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"REAL\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: float) -> float:\n        return encoded\n",
                                                        "signature": "(self, encoded: float) -> float",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "float",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "float"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: float) -> float:\n        return decoded\n",
                                                        "signature": "(self, decoded: float) -> float",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "float",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "float"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: float) -> str:\n        return str(encoded)\n",
                                                        "signature": "(self, encoded: float) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "float",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "integer",
                                "source": "\"\"\"\nThe logic for storing integers with SQLiteFrame.\n\"\"\"\n\nfrom .type import Type\n\n\nclass Integer(Type[int, int]):\n    \"\"\"\n    The class which stores integers, converting between SQLite's INTEGER and Python's int types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"INTEGER\"\n\n    def decode(self, encoded: int) -> int:\n        return encoded\n\n    def encode(self, decoded: int) -> int:\n        return decoded\n\n    def default_suggestion(self, encoded: int) -> str:\n        return str(encoded)\n",
                                "shortDescription": "The logic for storing integers with SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "integer\nThe logic for storing integers with SQLiteFrame.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Integer",
                                            "source": "class Integer(Type[int, int]):\n    \"\"\"\n    The class which stores integers, converting between SQLite's INTEGER and Python's int types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"INTEGER\"\n\n    def decode(self, encoded: int) -> int:\n        return encoded\n\n    def encode(self, decoded: int) -> int:\n        return decoded\n\n    def default_suggestion(self, encoded: int) -> str:\n        return str(encoded)\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class which stores integers, converting between SQLite's INTEGER and Python's int types.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Integer\nThe class which stores integers, converting between SQLite's INTEGER and Python's int types.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"INTEGER\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: int) -> int:\n        return encoded\n",
                                                        "signature": "(self, encoded: int) -> int",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "int"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: int) -> int:\n        return decoded\n",
                                                        "signature": "(self, decoded: int) -> int",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "int"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: int) -> str:\n        return str(encoded)\n",
                                                        "signature": "(self, encoded: int) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "int",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "null",
                                "source": "\"\"\"\nSQLiteFrame's implementation for storing NULLs, used in nullable columns.\n\"\"\"\n\nfrom .type import Type\n\n\nclass Null(Type[str, None]):\n    \"\"\"\n    The class containing logic for storing NULL, making use of SQLite's NULL and Python's None singleton.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"NULL\"\n\n    def decode(self, encoded: str) -> None:\n        return\n\n    def encode(self, decoded: None) -> str:\n        return \"NULL\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return \"None\"\n",
                                "shortDescription": "SQLiteFrame's implementation for storing NULLs, used in nullable columns.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "null\nSQLiteFrame's implementation for storing NULLs, used in nullable columns.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Null",
                                            "source": "class Null(Type[str, None]):\n    \"\"\"\n    The class containing logic for storing NULL, making use of SQLite's NULL and Python's None singleton.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"NULL\"\n\n    def decode(self, encoded: str) -> None:\n        return\n\n    def encode(self, decoded: None) -> str:\n        return \"NULL\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return \"None\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing logic for storing NULL, making use of SQLite's NULL and Python's None singleton.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Null\nThe class containing logic for storing NULL, making use of SQLite's NULL and Python's None singleton.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"NULL\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: str) -> None:\n        return\n",
                                                        "signature": "(self, encoded: str) -> None",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "None"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: None) -> str:\n        return \"NULL\"\n",
                                                        "signature": "(self, decoded: None) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "None",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: str) -> str:\n        return \"None\"\n",
                                                        "signature": "(self, encoded: str) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "string",
                                "source": "\"\"\"\nSQLiteFrame's implementation of storing strings in databases.\n\"\"\"\n\nfrom .type import Type\n\n\nclass String(Type[str, str]):\n    \"\"\"\n    The class containing the logic for converting between SQLite's TEXT and Python's str types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"TEXT\"\n\n    def decode(self, encoded: str) -> str:\n        return encoded\n\n    def encode(self, decoded: str) -> str:\n        return f\"\\\"{decoded}\\\"\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return f\"{encoded}\"\n",
                                "shortDescription": "SQLiteFrame's implementation of storing strings in databases.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "string\nSQLiteFrame's implementation of storing strings in databases.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "String",
                                            "source": "class String(Type[str, str]):\n    \"\"\"\n    The class containing the logic for converting between SQLite's TEXT and Python's str types.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"TEXT\"\n\n    def decode(self, encoded: str) -> str:\n        return encoded\n\n    def encode(self, decoded: str) -> str:\n        return f\"\\\"{decoded}\\\"\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return f\"{encoded}\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing the logic for converting between SQLite's TEXT and Python's str types.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "String\nThe class containing the logic for converting between SQLite's TEXT and Python's str types.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"TEXT\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: str) -> str:\n        return encoded\n",
                                                        "signature": "(self, encoded: str) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: str) -> str:\n        return f\"\\\"{decoded}\\\"\"\n",
                                                        "signature": "(self, decoded: str) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: str) -> str:\n        return f\"{encoded}\"\n",
                                                        "signature": "(self, encoded: str) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "time",
                                "source": "\"\"\"\nThe logic for storing times in SQLiteFrame.\n\"\"\"\n\nfrom datetime import time\nfrom .type import Type\n\n\nclass Time(Type[str, time]):\n    \"\"\"\n    For storing times, by converting between SQLite's NUMERIC type and Python's datetime time type.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"TIME\"\n\n    def decode(self, encoded: str) -> time:\n        return time.fromisoformat(encoded)\n\n    def encode(self, decoded: time) -> str:\n        return f\"\\\"{decoded.isoformat()}\\\"\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return f\"time.fromisoformat({encoded})\"\n",
                                "shortDescription": "The logic for storing times in SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "time\nThe logic for storing times in SQLiteFrame.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Time",
                                            "source": "class Time(Type[str, time]):\n    \"\"\"\n    For storing times, by converting between SQLite's NUMERIC type and Python's datetime time type.\n    \"\"\"\n\n    def sql_name(self) -> str:\n        return \"TIME\"\n\n    def decode(self, encoded: str) -> time:\n        return time.fromisoformat(encoded)\n\n    def encode(self, decoded: time) -> str:\n        return f\"\\\"{decoded.isoformat()}\\\"\"\n\n    def default_suggestion(self, encoded: str) -> str:\n        return f\"time.fromisoformat({encoded})\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "For storing times, by converting between SQLite's NUMERIC type and Python's datetime time type.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Time\nFor storing times, by converting between SQLite's NUMERIC type and Python's datetime time type.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    def sql_name(self) -> str:\n        return \"TIME\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    def decode(self, encoded: str) -> time:\n        return time.fromisoformat(encoded)\n",
                                                        "signature": "(self, encoded: str) -> datetime.time",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "time"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    def encode(self, decoded: time) -> str:\n        return f\"\\\"{decoded.isoformat()}\\\"\"\n",
                                                        "signature": "(self, decoded: datetime.time) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "time",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    def default_suggestion(self, encoded: str) -> str:\n        return f\"time.fromisoformat({encoded})\"\n",
                                                        "signature": "(self, encoded: str) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "str",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "type",
                                "source": "\"\"\"\nThe logic for creating types compatible with SQLiteFrame.\n\"\"\"\n\nfrom abc import ABC, abstractmethod\nfrom typing import Generic, TypeVar, get_args, Literal, Callable, ClassVar, Optional\nfrom dataclasses import dataclass\nfrom functools import wraps\n\n\nEncodedT = TypeVar(\"EncodedT\")\nDecodedT = TypeVar(\"DecodedT\")\n\n\n@dataclass(eq=True, slots=True)\nclass Type(Generic[EncodedT, DecodedT], ABC):\n    \"\"\"\n    The class involved in creating interfaces for managing column types in SQLiteFrame.\n    \"\"\"\n\n    NULL: ClassVar[Literal[\"NULL\"]] = \"NULL\"\n    primary_key: bool = False\n    nullable: bool = False\n    default: Optional[DecodedT] = None\n\n    def __post_init__(self):\n        \"\"\"\n        Manages / wraps the encoding and decoding processes for columns that are nullable and have defaults.\n\n        This method runs immediately after initialization, as per dataclasses implementation of __post_init__.\n        \"\"\"\n        if self.nullable:\n            self.encode = self.nullable_encode(self.encode)\n            self.decode = self.nullable_decode(self.decode)\n        if self.default is not None:\n            self.encode = self.default_encode(self.encode)\n\n    @abstractmethod\n    def sql_name(self) -> str:\n        \"\"\"\n        Dynamically defines the name given to this type when it is used in SQL queries.\n\n        :return: The name of this type as valid SQL\n        \"\"\"\n\n        return \"\"\n\n    @abstractmethod\n    def encode(self, decoded: DecodedT) -> EncodedT:\n        \"\"\"\n        The method that encodes a Python type into its corresponding SQLite format, before it is stored.\n\n        :param decoded: The non-encoded data as a Python type\n        :return: The encoded type ready for storage with SQLite\n        \"\"\"\n\n        return\n\n    @abstractmethod\n    def decode(self, encoded: EncodedT) -> DecodedT:\n        \"\"\"\n        The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\n\n        :param encoded: The encoded data retrieved from the database\n        :return: The decoded data as the expected Python type it was given to SQLiteFrame as\n        \"\"\"\n\n        return\n\n    @property\n    def encoded_type(self) -> type:\n        \"\"\"\n        Gets the encoded type of this class via some implementation details of Python's generics.\n        \"\"\"\n\n        return get_args(self.__class__.__orig_bases__[0])[0]\n\n    @property\n    def decoded_type(self) -> type:\n        \"\"\"\n        Gets the decoded type of this class via some implementation details of Python's generics.\n        \"\"\"\n\n        return get_args(self.__class__.__orig_bases__[0])[1]\n\n    def __hash__(self) -> int:\n        \"\"\"\n        Defines the hash for any SQLiteFrame type.\n\n        :return: The hash of objects of this type\n        \"\"\"\n\n        return hash(str(self))\n\n    def default_encode(self, f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return f(self.default)\n            return f(decoded)\n\n        return wrapper\n\n    @staticmethod\n    def nullable_encode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return \"NULL\"\n            return f(decoded)\n        return wrapper\n\n    @staticmethod\n    def nullable_decode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(encoded: EncodedT | None) -> DecodedT | None:\n            if encoded is None:\n                return\n            return f(encoded)\n        return wrapper\n\n    @abstractmethod\n    def default_suggestion(self, encoded: EncodedT) -> str:\n        \"\"\"\n        Uses when suggesting schemas, to show the suggested way of defining a default value for a column.\n\n        :param encoded: The found default data encoded in the column.\n        :return: A string that can be written in a suggested schema as-returned\n        \"\"\"\n\n        return \"\"\n",
                                "shortDescription": "The logic for creating types compatible with SQLiteFrame.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "type\nThe logic for creating types compatible with SQLiteFrame.\nNone",
                                "globalVariables": [
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "DecodedT",
                                            "annotation": null,
                                            "value": "~DecodedT"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Variable",
                                        "meta": {
                                            "name": "EncodedT",
                                            "annotation": null,
                                            "value": "~EncodedT"
                                        },
                                        "children": {}
                                    }
                                ]
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Type",
                                            "source": "@dataclass(eq=True, slots=True)\nclass Type(Generic[EncodedT, DecodedT], ABC):\n    \"\"\"\n    The class involved in creating interfaces for managing column types in SQLiteFrame.\n    \"\"\"\n\n    NULL: ClassVar[Literal[\"NULL\"]] = \"NULL\"\n    primary_key: bool = False\n    nullable: bool = False\n    default: Optional[DecodedT] = None\n\n    def __post_init__(self):\n        \"\"\"\n        Manages / wraps the encoding and decoding processes for columns that are nullable and have defaults.\n\n        This method runs immediately after initialization, as per dataclasses implementation of __post_init__.\n        \"\"\"\n        if self.nullable:\n            self.encode = self.nullable_encode(self.encode)\n            self.decode = self.nullable_decode(self.decode)\n        if self.default is not None:\n            self.encode = self.default_encode(self.encode)\n\n    @abstractmethod\n    def sql_name(self) -> str:\n        \"\"\"\n        Dynamically defines the name given to this type when it is used in SQL queries.\n\n        :return: The name of this type as valid SQL\n        \"\"\"\n\n        return \"\"\n\n    @abstractmethod\n    def encode(self, decoded: DecodedT) -> EncodedT:\n        \"\"\"\n        The method that encodes a Python type into its corresponding SQLite format, before it is stored.\n\n        :param decoded: The non-encoded data as a Python type\n        :return: The encoded type ready for storage with SQLite\n        \"\"\"\n\n        return\n\n    @abstractmethod\n    def decode(self, encoded: EncodedT) -> DecodedT:\n        \"\"\"\n        The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\n\n        :param encoded: The encoded data retrieved from the database\n        :return: The decoded data as the expected Python type it was given to SQLiteFrame as\n        \"\"\"\n\n        return\n\n    @property\n    def encoded_type(self) -> type:\n        \"\"\"\n        Gets the encoded type of this class via some implementation details of Python's generics.\n        \"\"\"\n\n        return get_args(self.__class__.__orig_bases__[0])[0]\n\n    @property\n    def decoded_type(self) -> type:\n        \"\"\"\n        Gets the decoded type of this class via some implementation details of Python's generics.\n        \"\"\"\n\n        return get_args(self.__class__.__orig_bases__[0])[1]\n\n    def __hash__(self) -> int:\n        \"\"\"\n        Defines the hash for any SQLiteFrame type.\n\n        :return: The hash of objects of this type\n        \"\"\"\n\n        return hash(str(self))\n\n    def default_encode(self, f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return f(self.default)\n            return f(decoded)\n\n        return wrapper\n\n    @staticmethod\n    def nullable_encode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return \"NULL\"\n            return f(decoded)\n        return wrapper\n\n    @staticmethod\n    def nullable_decode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(encoded: EncodedT | None) -> DecodedT | None:\n            if encoded is None:\n                return\n            return f(encoded)\n        return wrapper\n\n    @abstractmethod\n    def default_suggestion(self, encoded: EncodedT) -> str:\n        \"\"\"\n        Uses when suggesting schemas, to show the suggested way of defining a default value for a column.\n\n        :param encoded: The found default data encoded in the column.\n        :return: A string that can be written in a suggested schema as-returned\n        \"\"\"\n\n        return \"\"\n",
                                            "signature": "(primary_key: bool = False, nullable: bool = False, default: Optional[~DecodedT] = None) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "primary_key",
                                                        "description": null,
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "nullable",
                                                        "description": null,
                                                        "annotation": "bool",
                                                        "default": "False",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "default",
                                                        "description": null,
                                                        "annotation": "typing.Optional[~DecodedT]",
                                                        "default": "None",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class involved in creating interfaces for managing column types in SQLiteFrame.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": true,
                                            "searchTerms": "Type\nThe class involved in creating interfaces for managing column types in SQLiteFrame.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "sql_name",
                                                        "source": "    @abstractmethod\n    def sql_name(self) -> str:\n        \"\"\"\n        Dynamically defines the name given to this type when it is used in SQL queries.\n\n        :return: The name of this type as valid SQL\n        \"\"\"\n\n        return \"\"\n",
                                                        "signature": "(self) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The name of this type as valid SQL",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Dynamically defines the name given to this type when it is used in SQL queries.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "sql_name\nDynamically defines the name given to this type when it is used in SQL queries.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "encode",
                                                        "source": "    @abstractmethod\n    def encode(self, decoded: DecodedT) -> EncodedT:\n        \"\"\"\n        The method that encodes a Python type into its corresponding SQLite format, before it is stored.\n\n        :param decoded: The non-encoded data as a Python type\n        :return: The encoded type ready for storage with SQLite\n        \"\"\"\n\n        return\n",
                                                        "signature": "(self, decoded: ~DecodedT) -> ~EncodedT",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "decoded",
                                                                    "description": "The non-encoded data as a Python type",
                                                                    "annotation": "~DecodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The encoded type ready for storage with SQLite",
                                                                    "annotation": "~EncodedT"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that encodes a Python type into its corresponding SQLite format, before it is stored.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "encode\nThe method that encodes a Python type into its corresponding SQLite format, before it is stored.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "decode",
                                                        "source": "    @abstractmethod\n    def decode(self, encoded: EncodedT) -> DecodedT:\n        \"\"\"\n        The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\n\n        :param encoded: The encoded data retrieved from the database\n        :return: The decoded data as the expected Python type it was given to SQLiteFrame as\n        \"\"\"\n\n        return\n",
                                                        "signature": "(self, encoded: ~EncodedT) -> ~DecodedT",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The encoded data retrieved from the database",
                                                                    "annotation": "~EncodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The decoded data as the expected Python type it was given to SQLiteFrame as",
                                                                    "annotation": "~DecodedT"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "The method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "decode\nThe method that decodes data after retrieval into the format it was initially given to SQLiteFrame as.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_encode",
                                                        "source": "    def default_encode(self, f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return f(self.default)\n            return f(decoded)\n\n        return wrapper\n",
                                                        "signature": "(self, f: Callable) -> Callable",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "f",
                                                                    "description": null,
                                                                    "annotation": "typing.Callable",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "No description...",
                                                                    "annotation": "typing.Callable"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": null,
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_encode\n\n"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "nullable_encode",
                                                        "source": "    @staticmethod\n    def nullable_encode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(decoded: DecodedT | None) -> EncodedT | Literal[\"NULL\"]:\n            if decoded is None:\n                return \"NULL\"\n            return f(decoded)\n        return wrapper\n",
                                                        "signature": "(f: Callable) -> Callable",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "f",
                                                                    "description": null,
                                                                    "annotation": "typing.Callable",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "No description...",
                                                                    "annotation": "typing.Callable"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": null,
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "nullable_encode\n\n"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "nullable_decode",
                                                        "source": "    @staticmethod\n    def nullable_decode(f: Callable) -> Callable:\n        @wraps(f)\n        def wrapper(encoded: EncodedT | None) -> DecodedT | None:\n            if encoded is None:\n                return\n            return f(encoded)\n        return wrapper\n",
                                                        "signature": "(f: Callable) -> Callable",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "f",
                                                                    "description": null,
                                                                    "annotation": "typing.Callable",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "No description...",
                                                                    "annotation": "typing.Callable"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": null,
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "nullable_decode\n\n"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "default_suggestion",
                                                        "source": "    @abstractmethod\n    def default_suggestion(self, encoded: EncodedT) -> str:\n        \"\"\"\n        Uses when suggesting schemas, to show the suggested way of defining a default value for a column.\n\n        :param encoded: The found default data encoded in the column.\n        :return: A string that can be written in a suggested schema as-returned\n        \"\"\"\n\n        return \"\"\n",
                                                        "signature": "(self, encoded: ~EncodedT) -> str",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "encoded",
                                                                    "description": "The found default data encoded in the column.",
                                                                    "annotation": "~EncodedT",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A string that can be written in a suggested schema as-returned",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Uses when suggesting schemas, to show the suggested way of defining a default value for a column.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": true,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "default_suggestion\nUses when suggesting schemas, to show the suggested way of defining a default value for a column.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "types",
                                "source": "\"\"\"\nThe module containing each of the different default types in SQLiteFrame as an Enum.\n\"\"\"\n\nfrom enum import Enum\nfrom .blob import Blob\nfrom .boolean import Boolean\nfrom .date import Date\nfrom .float import Float\nfrom .integer import Integer\nfrom .string import String\nfrom .time import Time\n\n\nTypes = Enum(\"Types\", {sql_type.__name__: sql_type for sql_type in (\n    Blob, Boolean, Date, Float, Integer, String, Time)})\n",
                                "shortDescription": "The module containing each of the different default types in SQLiteFrame as an Enum.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "types\nThe module containing each of the different default types in SQLiteFrame as an Enum.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Types",
                                            "source": null,
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Create a collection of name/value pairs.",
                                            "longDescription": "Example enumeration:\n\n>>> class Color(Enum):\n...     RED = 1\n...     BLUE = 2\n...     GREEN = 3\n\nAccess them by:\n\n- attribute access::\n\n>>> Color.RED\n<Color.RED: 1>\n\n- value lookup:\n\n>>> Color(1)\n<Color.RED: 1>\n\n- name lookup:\n\n>>> Color['RED']\n<Color.RED: 1>\n\nEnumerations can be iterated over, and know how many members they have:\n\n>>> len(Color)\n3\n\n>>> list(Color)\n[<Color.RED: 1>, <Color.BLUE: 2>, <Color.GREEN: 3>]\n\nMethods can be added to enumerations, and members can have their own\nattributes -- see the documentation for details.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Types\nCreate a collection of name/value pairs.\nExample enumeration:\n\n>>> class Color(Enum):\n...     RED = 1\n...     BLUE = 2\n...     GREEN = 3\n\nAccess them by:\n\n- attribute access::\n\n>>> Color.RED\n<Color.RED: 1>\n\n- value lookup:\n\n>>> Color(1)\n<Color.RED: 1>\n\n- name lookup:\n\n>>> Color['RED']\n<Color.RED: 1>\n\nEnumerations can be iterated over, and know how many members they have:\n\n>>> len(Color)\n3\n\n>>> list(Color)\n[<Color.RED: 1>, <Color.BLUE: 2>, <Color.GREEN: 3>]\n\nMethods can be added to enumerations, and members can have their own\nattributes -- see the documentation for details.",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Blob",
                                                        "annotation": null,
                                                        "value": "Types.Blob"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Boolean",
                                                        "annotation": null,
                                                        "value": "Types.Boolean"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Date",
                                                        "annotation": null,
                                                        "value": "Types.Date"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Float",
                                                        "annotation": null,
                                                        "value": "Types.Float"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Integer",
                                                        "annotation": null,
                                                        "value": "Types.Integer"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "String",
                                                        "annotation": null,
                                                        "value": "Types.String"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "Time",
                                                        "annotation": null,
                                                        "value": "Types.Time"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "where",
                    "source": "\"\"\"\nA subpackage containing logic for SQL statements that include WHERE clauses.\n\"\"\"\n\nfrom .where import Where\nfrom .condition import Condition\nfrom .comparisons import Comparisons\n",
                    "shortDescription": "A subpackage containing logic for SQL statements that include WHERE clauses.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "where\nA subpackage containing logic for SQL statements that include WHERE clauses.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "comparisons",
                                "source": "\"\"\"\nThe module containing the Comparisons enum, designed to make the API for WHERE clauses more declarative.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass Comparisons(Enum):\n    \"\"\"\n    An Enum which declares each of the valid comparisons that can be used in an SQLiteFrame WHERE clause.\n    \"\"\"\n\n    EQUAL = \"=\"\n    NOT_EQUAL = \"!=\"\n    GREATER = \">\"\n    GREATER_EQUAL = \">=\"\n    LESS = \"<\"\n    LESS_EQUAL = \"<=\"\n    IN = \"IN\"\n    LIKE = \"LIKE\"\n    BETWEEN = \"BETWEEN\"\n",
                                "shortDescription": "The module containing the Comparisons enum, designed to make the API for WHERE clauses more declarative.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "comparisons\nThe module containing the Comparisons enum, designed to make the API for WHERE clauses more declarative.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Comparisons",
                                            "source": "class Comparisons(Enum):\n    \"\"\"\n    An Enum which declares each of the valid comparisons that can be used in an SQLiteFrame WHERE clause.\n    \"\"\"\n\n    EQUAL = \"=\"\n    NOT_EQUAL = \"!=\"\n    GREATER = \">\"\n    GREATER_EQUAL = \">=\"\n    LESS = \"<\"\n    LESS_EQUAL = \"<=\"\n    IN = \"IN\"\n    LIKE = \"LIKE\"\n    BETWEEN = \"BETWEEN\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "An Enum which declares each of the valid comparisons that can be used in an SQLiteFrame WHERE clause.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Comparisons\nAn Enum which declares each of the valid comparisons that can be used in an SQLiteFrame WHERE clause.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "BETWEEN",
                                                        "annotation": null,
                                                        "value": "Comparisons.BETWEEN"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "EQUAL",
                                                        "annotation": null,
                                                        "value": "Comparisons.EQUAL"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "GREATER",
                                                        "annotation": null,
                                                        "value": "Comparisons.GREATER"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "GREATER_EQUAL",
                                                        "annotation": null,
                                                        "value": "Comparisons.GREATER_EQUAL"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "IN",
                                                        "annotation": null,
                                                        "value": "Comparisons.IN"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "LESS",
                                                        "annotation": null,
                                                        "value": "Comparisons.LESS"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "LESS_EQUAL",
                                                        "annotation": null,
                                                        "value": "Comparisons.LESS_EQUAL"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "LIKE",
                                                        "annotation": null,
                                                        "value": "Comparisons.LIKE"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "NOT_EQUAL",
                                                        "annotation": null,
                                                        "value": "Comparisons.NOT_EQUAL"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "condition",
                                "source": "\"\"\"\nThe module containing the logic for creating individual conditions in a WHERE clause.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .comparisons import Comparisons\nfrom .conjunctions import Conjunctions\nfrom ..parameterized import Parameterized\n\nif False:\n    from ..entity import Column\n    from .where import Where\n\n\nclass Condition(Parameterized):\n    \"\"\"\n    The class that defines all logic for simple conditions in WHERE clauses (e.g. Column1 == \"Some String\")\n    \"\"\"\n\n    def __init__(self, left: Column, comparator: Comparisons, right: Column | object):\n        \"\"\"\n        :param left: The left segment of the condition, which can only be a column\n        :param comparator: The comparator (e.g. '==') that is used in the condition\n        :param right: The right segment of the condition, which can be a column or some data\n        \"\"\"\n        self.left = left\n        self.comparator = comparator\n        self.right = right\n        self._parameters = []\n\n    @property\n    def parameters(self) -> list[object]:\n        return self._parameters\n\n    def __bool__(self) -> bool:\n        \"\"\"\n        Conditions always evaluate to false, in order to be compatible with __contains__ checks.\n\n        :return: Always false\n        \"\"\"\n        return False\n\n    def __or__(self, other: object) -> Where:\n        \"\"\"\n        Combines this condition with another condition or WHERE statement using bitwise OR syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.OR)\n\n    def __and__(self, other: object) -> Where:\n        \"\"\"\n        Combines this condition with another condition or WHERE statement using bitwise AND syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.AND)\n\n    def combine(self, other: object, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this condition with another, with any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .where import Where\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        return Where(self, conjunction.value, other)\n\n    def build_sql(self) -> str:\n        from ..entity import Column\n        right = f\"{self.right.table}.{self.right.name}\" if isinstance(self.right, Column) else \\\n            self.parameter(self.left.type.encode(self.right))\n        return f\"{self.left.table}.{self.left.name} {self.comparator.value} {right}\"\n",
                                "shortDescription": "The module containing the logic for creating individual conditions in a WHERE clause.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "condition\nThe module containing the logic for creating individual conditions in a WHERE clause.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Condition",
                                            "source": "class Condition(Parameterized):\n    \"\"\"\n    The class that defines all logic for simple conditions in WHERE clauses (e.g. Column1 == \"Some String\")\n    \"\"\"\n\n    def __init__(self, left: Column, comparator: Comparisons, right: Column | object):\n        \"\"\"\n        :param left: The left segment of the condition, which can only be a column\n        :param comparator: The comparator (e.g. '==') that is used in the condition\n        :param right: The right segment of the condition, which can be a column or some data\n        \"\"\"\n        self.left = left\n        self.comparator = comparator\n        self.right = right\n        self._parameters = []\n\n    @property\n    def parameters(self) -> list[object]:\n        return self._parameters\n\n    def __bool__(self) -> bool:\n        \"\"\"\n        Conditions always evaluate to false, in order to be compatible with __contains__ checks.\n\n        :return: Always false\n        \"\"\"\n        return False\n\n    def __or__(self, other: object) -> Where:\n        \"\"\"\n        Combines this condition with another condition or WHERE statement using bitwise OR syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.OR)\n\n    def __and__(self, other: object) -> Where:\n        \"\"\"\n        Combines this condition with another condition or WHERE statement using bitwise AND syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.AND)\n\n    def combine(self, other: object, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this condition with another, with any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .where import Where\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        return Where(self, conjunction.value, other)\n\n    def build_sql(self) -> str:\n        from ..entity import Column\n        right = f\"{self.right.table}.{self.right.name}\" if isinstance(self.right, Column) else \\\n            self.parameter(self.left.type.encode(self.right))\n        return f\"{self.left.table}.{self.left.name} {self.comparator.value} {right}\"\n",
                                            "signature": "(left: 'Column', comparator: 'Comparisons', right: 'Column | object')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "left",
                                                        "description": "The left segment of the condition, which can only be a column",
                                                        "annotation": "Column",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "comparator",
                                                        "description": "The comparator (e.g. '==') that is used in the condition",
                                                        "annotation": "Comparisons",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "right",
                                                        "description": "The right segment of the condition, which can be a column or some data",
                                                        "annotation": "Column | object",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class that defines all logic for simple conditions in WHERE clauses (e.g. Column1 == \"Some String\")",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Condition\nThe class that defines all logic for simple conditions in WHERE clauses (e.g. Column1 == \"Some String\")\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "combine",
                                                        "source": "    def combine(self, other: object, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this condition with another, with any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .where import Where\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        return Where(self, conjunction.value, other)\n",
                                                        "signature": "(self, other: 'object', conjunction: 'Conjunctions') -> 'Where'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "other",
                                                                    "description": "The condition or where object to combine with",
                                                                    "annotation": "object",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "conjunction",
                                                                    "description": "The conjunction to combine with",
                                                                    "annotation": "Conjunctions",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A where statement object with the relevant combined functionality",
                                                                    "annotation": "Where"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "An internal, generalized method to combine this condition with another, with any conjunction.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "combine\nAn internal, generalized method to combine this condition with another, with any conjunction.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        from ..entity import Column\n        right = f\"{self.right.table}.{self.right.name}\" if isinstance(self.right, Column) else \\\n            self.parameter(self.left.type.encode(self.right))\n        return f\"{self.left.table}.{self.left.name} {self.comparator.value} {right}\"\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this clause",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "conjunctions",
                                "source": "\"\"\"\nThe module containing the Conjunctions enum, designed to make the API for WHERE clauses more declarative.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass Conjunctions(Enum):\n    \"\"\"\n    An Enum which declares each of the valid conjunctions that can be used in an SQLiteFrame WHERE clause.\n    \"\"\"\n\n    OR = \"OR\"\n    AND = \"AND\"\n",
                                "shortDescription": "The module containing the Conjunctions enum, designed to make the API for WHERE clauses more declarative.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "conjunctions\nThe module containing the Conjunctions enum, designed to make the API for WHERE clauses more declarative.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Conjunctions",
                                            "source": "class Conjunctions(Enum):\n    \"\"\"\n    An Enum which declares each of the valid conjunctions that can be used in an SQLiteFrame WHERE clause.\n    \"\"\"\n\n    OR = \"OR\"\n    AND = \"AND\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "An Enum which declares each of the valid conjunctions that can be used in an SQLiteFrame WHERE clause.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Conjunctions\nAn Enum which declares each of the valid conjunctions that can be used in an SQLiteFrame WHERE clause.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "AND",
                                                        "annotation": null,
                                                        "value": "Conjunctions.AND"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "OR",
                                                        "annotation": null,
                                                        "value": "Conjunctions.OR"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        },
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "where",
                                "source": "\"\"\"\nThe module containing the logic involved in building WHERE clauses in complex queries.\n\"\"\"\n\nfrom __future__ import annotations\nfrom .conjunctions import Conjunctions\nfrom ..parameterized import Parameterized\n\nif False:\n    from .condition import Condition\n\n\nclass Where(Parameterized):\n    \"\"\"\n    The class containing all the logic for WHERE clauses in complex queries.\n    \"\"\"\n\n    def __init__(self, *syntax: Condition | Conjunctions):\n        \"\"\"\n        :param syntax: The ordered conditions and conjunctions involved in the WHERE clause\n        \"\"\"\n\n        self.syntax = [\"(\", *syntax, \")\"]\n\n    @property\n    def parameters(self) -> list[object]:\n        from .condition import Condition\n        return [condition for parameters in map(lambda condition: condition.parameters, filter(\n            lambda syntax: isinstance(syntax, Condition), self.syntax)) for condition in parameters]\n\n    def build_sql(self) -> str:\n        syntax = map(lambda part: part.value if isinstance(part, Conjunctions) else str(part), self.syntax)\n        return \" \".join(syntax).replace(\"( \", \"(\").replace(\" )\", \")\")\n\n    def __or__(self, other: Where | Condition) -> Where:\n        \"\"\"\n        Combines this WHERE statement with another condition or WHERE statement using bitwise OR syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.OR)\n\n    def __and__(self, other: Where | Condition) -> Where:\n        \"\"\"\n        Combines this WHERE statement with another condition or WHERE statement using bitwise AND syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.AND)\n\n    def combine(self, other: Where | Condition, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this WHERE clause via mutation, using any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .condition import Condition\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        self.syntax.insert(0, \"(\")\n        self.syntax.append(\")\")\n        self.syntax.append(conjunction.value)\n        if isinstance(other, Condition):\n            self.syntax.append(other)\n            return self\n        self.syntax += other.syntax\n        return self\n",
                                "shortDescription": "The module containing the logic involved in building WHERE clauses in complex queries.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "where\nThe module containing the logic involved in building WHERE clauses in complex queries.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Where",
                                            "source": "class Where(Parameterized):\n    \"\"\"\n    The class containing all the logic for WHERE clauses in complex queries.\n    \"\"\"\n\n    def __init__(self, *syntax: Condition | Conjunctions):\n        \"\"\"\n        :param syntax: The ordered conditions and conjunctions involved in the WHERE clause\n        \"\"\"\n\n        self.syntax = [\"(\", *syntax, \")\"]\n\n    @property\n    def parameters(self) -> list[object]:\n        from .condition import Condition\n        return [condition for parameters in map(lambda condition: condition.parameters, filter(\n            lambda syntax: isinstance(syntax, Condition), self.syntax)) for condition in parameters]\n\n    def build_sql(self) -> str:\n        syntax = map(lambda part: part.value if isinstance(part, Conjunctions) else str(part), self.syntax)\n        return \" \".join(syntax).replace(\"( \", \"(\").replace(\" )\", \")\")\n\n    def __or__(self, other: Where | Condition) -> Where:\n        \"\"\"\n        Combines this WHERE statement with another condition or WHERE statement using bitwise OR syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an OR comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.OR)\n\n    def __and__(self, other: Where | Condition) -> Where:\n        \"\"\"\n        Combines this WHERE statement with another condition or WHERE statement using bitwise AND syntax.\n\n        Whether the passed object is a Condition object and Where object is an implementation detail.\n\n        :param other: The condition or where object to combine with\n        :return: A where statement object with the relevant functionality combining the parameter with an AND comparator\n        \"\"\"\n\n        return self.combine(other, Conjunctions.AND)\n\n    def combine(self, other: Where | Condition, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this WHERE clause via mutation, using any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .condition import Condition\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        self.syntax.insert(0, \"(\")\n        self.syntax.append(\")\")\n        self.syntax.append(conjunction.value)\n        if isinstance(other, Condition):\n            self.syntax.append(other)\n            return self\n        self.syntax += other.syntax\n        return self\n",
                                            "signature": "(*syntax: 'Condition | Conjunctions')",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "syntax",
                                                        "description": "The ordered conditions and conjunctions involved in the WHERE clause",
                                                        "annotation": "Condition | Conjunctions",
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "The class containing all the logic for WHERE clauses in complex queries.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Where\nThe class containing all the logic for WHERE clauses in complex queries.\nNone",
                                            "classVariables": []
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "build_sql",
                                                        "source": "    def build_sql(self) -> str:\n        syntax = map(lambda part: part.value if isinstance(part, Conjunctions) else str(part), self.syntax)\n        return \" \".join(syntax).replace(\"( \", \"(\").replace(\" )\", \")\")\n",
                                                        "signature": "(self) -> 'str'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "The valid SQL string representing this clause",
                                                                    "annotation": "str"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "Builds a valid SQL string representing this clause, used when executing the statement this clause is a part of.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "build_sql\nBuilds a valid SQL string representing this clause, used when executing the statement this clause is a part of.\nNone"
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "combine",
                                                        "source": "    def combine(self, other: Where | Condition, conjunction: Conjunctions) -> Where:\n        \"\"\"\n        An internal, generalized method to combine this WHERE clause via mutation, using any conjunction.\n\n        :param other: The condition or where object to combine with\n        :param conjunction: The conjunction to combine with\n        :return: A where statement object with the relevant combined functionality\n        \"\"\"\n\n        from .condition import Condition\n        if not (isinstance(other, Condition) or isinstance(other, Where)):\n            raise TypeError(f\"Cannot join Condition with type '{type(other)}'\") from None\n        self.syntax.insert(0, \"(\")\n        self.syntax.append(\")\")\n        self.syntax.append(conjunction.value)\n        if isinstance(other, Condition):\n            self.syntax.append(other)\n            return self\n        self.syntax += other.syntax\n        return self\n",
                                                        "signature": "(self, other: 'Where | Condition', conjunction: 'Conjunctions') -> 'Where'",
                                                        "parameters": [
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "self",
                                                                    "description": null,
                                                                    "annotation": null,
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "other",
                                                                    "description": "The condition or where object to combine with",
                                                                    "annotation": "Where | Condition",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            },
                                                            {
                                                                "component": "Parameter",
                                                                "meta": {
                                                                    "name": "conjunction",
                                                                    "description": "The conjunction to combine with",
                                                                    "annotation": "Conjunctions",
                                                                    "default": null,
                                                                    "isOptional": false
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "raises": [],
                                                        "returns": [
                                                            {
                                                                "component": "SubroutineReturn",
                                                                "meta": {
                                                                    "description": "A where statement object with the relevant combined functionality",
                                                                    "annotation": "Where"
                                                                },
                                                                "children": {}
                                                            }
                                                        ],
                                                        "shortDescription": "An internal, generalized method to combine this WHERE clause via mutation, using any conjunction.",
                                                        "longDescription": null,
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "combine\nAn internal, generalized method to combine this WHERE clause via mutation, using any conjunction.\nNone"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            },
            {
                "component": "Package",
                "meta": {
                    "searchCategory": "package",
                    "name": "wildcards",
                    "source": "\"\"\"\nA simple subpackage containing each of the wildcards that can be used when building SQL statements.\n\"\"\"\n\nfrom .wildcards import Wildcards\n",
                    "shortDescription": "A simple subpackage containing each of the wildcards that can be used when building SQL statements.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "wildcards\nA simple subpackage containing each of the wildcards that can be used when building SQL statements.\nNone"
                },
                "children": {
                    "Sub-Packages": [],
                    "Modules": [
                        {
                            "component": "Module",
                            "meta": {
                                "searchCategory": "module",
                                "name": "wildcards",
                                "source": "\"\"\"\nThe module containing the Wildcards enum, designed to make the API for general queries more declarative.\n\"\"\"\n\nfrom enum import Enum\n\n\nclass Wildcards(Enum):\n    \"\"\"\n    An Enum which declares all the wildcards that can be used in a valid SQLiteFrame query.\n    \"\"\"\n\n    All = \"*\"\n",
                                "shortDescription": "The module containing the Wildcards enum, designed to make the API for general queries more declarative.",
                                "longDescription": null,
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "searchTerms": "wildcards\nThe module containing the Wildcards enum, designed to make the API for general queries more declarative.\nNone",
                                "globalVariables": []
                            },
                            "children": {
                                "Classes": [
                                    {
                                        "component": "Class",
                                        "meta": {
                                            "searchCategory": "class",
                                            "name": "Wildcards",
                                            "source": "class Wildcards(Enum):\n    \"\"\"\n    An Enum which declares all the wildcards that can be used in a valid SQLiteFrame query.\n    \"\"\"\n\n    All = \"*\"\n",
                                            "signature": "(value, names=None, *, module=None, qualname=None, type=None, start=1, boundary=None)",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "args",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "kwargs",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "An Enum which declares all the wildcards that can be used in a valid SQLiteFrame query.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isAbstract": false,
                                            "searchTerms": "Wildcards\nAn Enum which declares all the wildcards that can be used in a valid SQLiteFrame query.\nNone",
                                            "classVariables": [
                                                {
                                                    "component": "Variable",
                                                    "meta": {
                                                        "name": "All",
                                                        "annotation": null,
                                                        "value": "Wildcards.All"
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        },
                                        "children": {
                                            "Methods": [
                                                {
                                                    "component": "Subroutine",
                                                    "meta": {
                                                        "searchCategory": "subroutine",
                                                        "name": "object",
                                                        "source": null,
                                                        "signature": "()",
                                                        "parameters": [],
                                                        "raises": [],
                                                        "returns": [],
                                                        "shortDescription": "The base class of the class hierarchy.",
                                                        "longDescription": "When called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any.",
                                                        "deprecations": [],
                                                        "examples": [],
                                                        "links": [],
                                                        "notes": [],
                                                        "isGenerator": false,
                                                        "isAsync": false,
                                                        "isAbstract": false,
                                                        "isLambda": false,
                                                        "isContextManager": false,
                                                        "searchTerms": "object\nThe base class of the class hierarchy.\nWhen called, it accepts no arguments and returns a new featureless\ninstance that has no instance attributes and cannot be given any."
                                                    },
                                                    "children": {}
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "Subroutines": []
                            }
                        }
                    ]
                }
            }
        ],
        "Modules": [
            {
                "component": "Module",
                "meta": {
                    "searchCategory": "module",
                    "name": "database",
                    "source": "\"\"\"\nA module containing the logic behind database connections and execution.\n\"\"\"\n\nfrom typing import Optional, Generator\nfrom dataclasses import dataclass, field\nfrom contextlib import contextmanager\nfrom sqlite3 import connect, Cursor, Connection\nfrom .entity import Entity\nfrom .statements import Statement, Pragma\nfrom .pragma import PragmaStatements\nfrom .result import Result\n\n\n@dataclass(eq=True, slots=True)\nclass Database:\n    \"\"\"\n    A class representing entire SQLite databases, which may include many tables.\n\n    This class is the main controller for interacting with SQLiteFrame, allowing users\n    to create and connect to databases with a pure Python API, and execute statements.\n\n    :param path: The path at which the SQLite database file should be saved\n    :param output: Whether any statements executed in a connection to this database should be output in the console\n    :param foreign_keys: Whether to enable foreign key relations in this database initially\n    \"\"\"\n\n    path: str\n    output: bool = False\n    foreign_keys: bool = True\n    tables: set[Entity] = field(init=False, default_factory=set)\n    db_connection: Optional[Connection] = field(init=False, default=None)\n    cursor: Optional[Cursor] = field(init=False, default=None)\n    connections: list[bool] = field(init=False, default_factory=list)\n\n    def add_table(self, table: Entity) -> None:\n        \"\"\"\n        Registers a table with the database.\n\n        :param table: The table to add to the database\n        \"\"\"\n\n        self.tables.add(table)\n\n    @property\n    def commit_mode(self) -> bool:\n        \"\"\"\n        Gets the currently selected commit mode for the database.\n\n        :return: Whether automatic commits are currently enabled\n        \"\"\"\n\n        return self.connections[-1]\n\n    @property\n    def connected(self) -> bool:\n        \"\"\"\n        Determines whether the database has any active connections.\n\n        :return: Whether there are any active connections to the database\n        \"\"\"\n\n        return bool(self.connections)\n\n    @property\n    def foreign_keys_enabled(self) -> bool:\n        \"\"\"\n        Checks whether foreign key relations are enabled for this database.\n\n        :return: Whether foreign key relations are enabled\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not check FK status without a pre-established connection\") from None\n        return bool(Pragma(self, PragmaStatements.FOREIGN_KEYS).execute())\n\n    def enable_foreign_keys(self) -> Result:\n        \"\"\"\n        Enables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not enable FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"ON\")))\n\n    def disable_foreign_keys(self) -> Result:\n        \"\"\"\n        Disables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disabled FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"OFF\")))\n\n    def connect(self, commit: bool = True) -> Connection:\n        \"\"\"\n        Connects to the database.\n\n        If a connection is already active, a new one will not be created - however,\n        the commit mode will still be updated.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: An internal SQLite Connection object representing the connection\n        \"\"\"\n\n        if self.connected:\n            self.connections.append(commit)\n            return self.db_connection\n        self.db_connection = connect(self.path)\n        self.connections.append(commit)\n        self.cursor = self.db_connection.cursor()\n        if self.foreign_keys:\n            self.enable_foreign_keys()\n        return self.db_connection\n\n    def disconnect(self) -> None:\n        \"\"\"\n        Closes an active connection to the database.\n\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disconnect without a pre-established connection\") from None\n        self.connections.pop()\n        if not self.connected:\n            self.db_connection.close()\n            self.db_connection = None\n\n    def commit(self) -> None:\n        \"\"\"\n        Commits any unsaved changes to the database.\n\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(\"Could not commit without first being connected\") from None\n        self.db_connection.commit()\n\n    @contextmanager\n    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:\n        \"\"\"\n        A context manager to open a connection for the duration of a defined with context block.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: The internally created SQLite Connection object\n        \"\"\"\n        self.connect(commit=commit)\n        try:\n            yield self.db_connection\n        finally:\n            if self.commit_mode:\n                self.commit()\n            self.disconnect()\n\n    def execute(self, statement: Statement | str, query_parameters: Optional[list[object]] = None) -> Cursor:\n        \"\"\"\n        Executes an SQLite statement, with an active connection to the database.\n\n        An SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.\n        Statements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing\n        a valid SQLite statement - this can be useful for testing, and quick / lightweight commands.\n\n        :param statement: The statement to execute\n        :param query_parameters: Any parameterized query parameters to add to the query for sanitization\n        :return: The internally created SQLite Cursor object\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        to_execute = str(statement)\n        if query_parameters is None:\n            query_parameters = statement.query_parameters if isinstance(statement, Statement) else []\n        if not self.connected:\n            statement = statement if isinstance(statement, str) else f\"'{statement.__class__.__name__}' statement\"\n            raise RuntimeError(\n                f\"Could not execute {statement} without connection\") from None\n        if self.output:\n            print(statement)\n        return self.cursor.execute(to_execute, query_parameters)\n",
                    "shortDescription": "A module containing the logic behind database connections and execution.",
                    "longDescription": null,
                    "deprecations": [],
                    "examples": [],
                    "links": [],
                    "notes": [],
                    "searchTerms": "database\nA module containing the logic behind database connections and execution.\nNone",
                    "globalVariables": []
                },
                "children": {
                    "Classes": [
                        {
                            "component": "Class",
                            "meta": {
                                "searchCategory": "class",
                                "name": "Database",
                                "source": "@dataclass(eq=True, slots=True)\nclass Database:\n    \"\"\"\n    A class representing entire SQLite databases, which may include many tables.\n\n    This class is the main controller for interacting with SQLiteFrame, allowing users\n    to create and connect to databases with a pure Python API, and execute statements.\n\n    :param path: The path at which the SQLite database file should be saved\n    :param output: Whether any statements executed in a connection to this database should be output in the console\n    :param foreign_keys: Whether to enable foreign key relations in this database initially\n    \"\"\"\n\n    path: str\n    output: bool = False\n    foreign_keys: bool = True\n    tables: set[Entity] = field(init=False, default_factory=set)\n    db_connection: Optional[Connection] = field(init=False, default=None)\n    cursor: Optional[Cursor] = field(init=False, default=None)\n    connections: list[bool] = field(init=False, default_factory=list)\n\n    def add_table(self, table: Entity) -> None:\n        \"\"\"\n        Registers a table with the database.\n\n        :param table: The table to add to the database\n        \"\"\"\n\n        self.tables.add(table)\n\n    @property\n    def commit_mode(self) -> bool:\n        \"\"\"\n        Gets the currently selected commit mode for the database.\n\n        :return: Whether automatic commits are currently enabled\n        \"\"\"\n\n        return self.connections[-1]\n\n    @property\n    def connected(self) -> bool:\n        \"\"\"\n        Determines whether the database has any active connections.\n\n        :return: Whether there are any active connections to the database\n        \"\"\"\n\n        return bool(self.connections)\n\n    @property\n    def foreign_keys_enabled(self) -> bool:\n        \"\"\"\n        Checks whether foreign key relations are enabled for this database.\n\n        :return: Whether foreign key relations are enabled\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not check FK status without a pre-established connection\") from None\n        return bool(Pragma(self, PragmaStatements.FOREIGN_KEYS).execute())\n\n    def enable_foreign_keys(self) -> Result:\n        \"\"\"\n        Enables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not enable FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"ON\")))\n\n    def disable_foreign_keys(self) -> Result:\n        \"\"\"\n        Disables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disabled FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"OFF\")))\n\n    def connect(self, commit: bool = True) -> Connection:\n        \"\"\"\n        Connects to the database.\n\n        If a connection is already active, a new one will not be created - however,\n        the commit mode will still be updated.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: An internal SQLite Connection object representing the connection\n        \"\"\"\n\n        if self.connected:\n            self.connections.append(commit)\n            return self.db_connection\n        self.db_connection = connect(self.path)\n        self.connections.append(commit)\n        self.cursor = self.db_connection.cursor()\n        if self.foreign_keys:\n            self.enable_foreign_keys()\n        return self.db_connection\n\n    def disconnect(self) -> None:\n        \"\"\"\n        Closes an active connection to the database.\n\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disconnect without a pre-established connection\") from None\n        self.connections.pop()\n        if not self.connected:\n            self.db_connection.close()\n            self.db_connection = None\n\n    def commit(self) -> None:\n        \"\"\"\n        Commits any unsaved changes to the database.\n\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(\"Could not commit without first being connected\") from None\n        self.db_connection.commit()\n\n    @contextmanager\n    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:\n        \"\"\"\n        A context manager to open a connection for the duration of a defined with context block.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: The internally created SQLite Connection object\n        \"\"\"\n        self.connect(commit=commit)\n        try:\n            yield self.db_connection\n        finally:\n            if self.commit_mode:\n                self.commit()\n            self.disconnect()\n\n    def execute(self, statement: Statement | str, query_parameters: Optional[list[object]] = None) -> Cursor:\n        \"\"\"\n        Executes an SQLite statement, with an active connection to the database.\n\n        An SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.\n        Statements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing\n        a valid SQLite statement - this can be useful for testing, and quick / lightweight commands.\n\n        :param statement: The statement to execute\n        :param query_parameters: Any parameterized query parameters to add to the query for sanitization\n        :return: The internally created SQLite Cursor object\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        to_execute = str(statement)\n        if query_parameters is None:\n            query_parameters = statement.query_parameters if isinstance(statement, Statement) else []\n        if not self.connected:\n            statement = statement if isinstance(statement, str) else f\"'{statement.__class__.__name__}' statement\"\n            raise RuntimeError(\n                f\"Could not execute {statement} without connection\") from None\n        if self.output:\n            print(statement)\n        return self.cursor.execute(to_execute, query_parameters)\n",
                                "signature": "(path: str, output: bool = False, foreign_keys: bool = True) -> None",
                                "parameters": [
                                    {
                                        "component": "Parameter",
                                        "meta": {
                                            "name": "self",
                                            "description": null,
                                            "annotation": null,
                                            "default": null,
                                            "isOptional": false
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Parameter",
                                        "meta": {
                                            "name": "path",
                                            "description": null,
                                            "annotation": "str",
                                            "default": null,
                                            "isOptional": false
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Parameter",
                                        "meta": {
                                            "name": "output",
                                            "description": null,
                                            "annotation": "bool",
                                            "default": "False",
                                            "isOptional": true
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Parameter",
                                        "meta": {
                                            "name": "foreign_keys",
                                            "description": null,
                                            "annotation": "bool",
                                            "default": "True",
                                            "isOptional": true
                                        },
                                        "children": {}
                                    }
                                ],
                                "shortDescription": "A class representing entire SQLite databases, which may include many tables.",
                                "longDescription": "This class is the main controller for interacting with SQLiteFrame, allowing users\nto create and connect to databases with a pure Python API, and execute statements.",
                                "deprecations": [],
                                "examples": [],
                                "links": [],
                                "notes": [],
                                "isAbstract": false,
                                "searchTerms": "Database\nA class representing entire SQLite databases, which may include many tables.\nThis class is the main controller for interacting with SQLiteFrame, allowing users\nto create and connect to databases with a pure Python API, and execute statements.",
                                "classVariables": []
                            },
                            "children": {
                                "Methods": [
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "add_table",
                                            "source": "    def add_table(self, table: Entity) -> None:\n        \"\"\"\n        Registers a table with the database.\n\n        :param table: The table to add to the database\n        \"\"\"\n\n        self.tables.add(table)\n",
                                            "signature": "(self, table: sqliteframe.entity.entity.Entity) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "table",
                                                        "description": "The table to add to the database",
                                                        "annotation": "Entity",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [],
                                            "returns": [],
                                            "shortDescription": "Registers a table with the database.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "add_table\nRegisters a table with the database.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "enable_foreign_keys",
                                            "source": "    def enable_foreign_keys(self) -> Result:\n        \"\"\"\n        Enables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not enable FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"ON\")))\n",
                                            "signature": "(self) -> sqliteframe.result.result.Result",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [
                                                {
                                                    "component": "Exception",
                                                    "meta": {
                                                        "name": "RuntimeError",
                                                        "description": "If there is no active connection to the database"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "The result from the executed PRAGMA statement",
                                                        "annotation": "Result"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Enables foreign key relations for this database, by issuing PRAGMA statement.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "enable_foreign_keys\nEnables foreign key relations for this database, by issuing PRAGMA statement.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "disable_foreign_keys",
                                            "source": "    def disable_foreign_keys(self) -> Result:\n        \"\"\"\n        Disables foreign key relations for this database, by issuing PRAGMA statement.\n\n        :return: The result from the executed PRAGMA statement\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disabled FKs without a pre-established connection\") from None\n        return Result([], self.execute(Pragma(self, PragmaStatements.FOREIGN_KEYS, pragma_value=\"OFF\")))\n",
                                            "signature": "(self) -> sqliteframe.result.result.Result",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [
                                                {
                                                    "component": "Exception",
                                                    "meta": {
                                                        "name": "RuntimeError",
                                                        "description": "If there is no active connection to the database"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "The result from the executed PRAGMA statement",
                                                        "annotation": "Result"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Disables foreign key relations for this database, by issuing PRAGMA statement.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "disable_foreign_keys\nDisables foreign key relations for this database, by issuing PRAGMA statement.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "connect",
                                            "source": "    def connect(self, commit: bool = True) -> Connection:\n        \"\"\"\n        Connects to the database.\n\n        If a connection is already active, a new one will not be created - however,\n        the commit mode will still be updated.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: An internal SQLite Connection object representing the connection\n        \"\"\"\n\n        if self.connected:\n            self.connections.append(commit)\n            return self.db_connection\n        self.db_connection = connect(self.path)\n        self.connections.append(commit)\n        self.cursor = self.db_connection.cursor()\n        if self.foreign_keys:\n            self.enable_foreign_keys()\n        return self.db_connection\n",
                                            "signature": "(self, commit: bool = True) -> sqlite3.Connection",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "commit",
                                                        "description": "Whether to commit to the database automatically when the connection is terminated",
                                                        "annotation": "bool",
                                                        "default": "True",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "An internal SQLite Connection object representing the connection",
                                                        "annotation": "Connection"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Connects to the database.",
                                            "longDescription": "If a connection is already active, a new one will not be created - however,\nthe commit mode will still be updated.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "connect\nConnects to the database.\nIf a connection is already active, a new one will not be created - however,\nthe commit mode will still be updated."
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "disconnect",
                                            "source": "    def disconnect(self) -> None:\n        \"\"\"\n        Closes an active connection to the database.\n\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(f\"Could not disconnect without a pre-established connection\") from None\n        self.connections.pop()\n        if not self.connected:\n            self.db_connection.close()\n            self.db_connection = None\n",
                                            "signature": "(self) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [
                                                {
                                                    "component": "Exception",
                                                    "meta": {
                                                        "name": "RuntimeError",
                                                        "description": "When no connection is already established and a disconnect is attempted"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "returns": [],
                                            "shortDescription": "Closes an active connection to the database.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "disconnect\nCloses an active connection to the database.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "commit",
                                            "source": "    def commit(self) -> None:\n        \"\"\"\n        Commits any unsaved changes to the database.\n\n        :raise RuntimeError: If there is no active connection to the database\n        \"\"\"\n\n        if not self.connected:\n            raise RuntimeError(\"Could not commit without first being connected\") from None\n        self.db_connection.commit()\n",
                                            "signature": "(self) -> None",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [
                                                {
                                                    "component": "Exception",
                                                    "meta": {
                                                        "name": "RuntimeError",
                                                        "description": "If there is no active connection to the database"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "returns": [],
                                            "shortDescription": "Commits any unsaved changes to the database.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "commit\nCommits any unsaved changes to the database.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "connection",
                                            "source": "    @contextmanager\n    def connection(self, commit: bool = True) -> Generator[Connection, None, None]:\n        \"\"\"\n        A context manager to open a connection for the duration of a defined with context block.\n\n        :param commit: Whether to commit to the database automatically when the connection is terminated\n        :return: The internally created SQLite Connection object\n        \"\"\"\n        self.connect(commit=commit)\n        try:\n            yield self.db_connection\n        finally:\n            if self.commit_mode:\n                self.commit()\n            self.disconnect()\n",
                                            "signature": "(self, commit: bool = True) -> Generator[sqlite3.Connection, NoneType, NoneType]",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "commit",
                                                        "description": "Whether to commit to the database automatically when the connection is terminated",
                                                        "annotation": "bool",
                                                        "default": "True",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "The internally created SQLite Connection object",
                                                        "annotation": "typing.Generator[sqlite3.Connection, NoneType, NoneType]"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "A context manager to open a connection for the duration of a defined with context block.",
                                            "longDescription": null,
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "connection\nA context manager to open a connection for the duration of a defined with context block.\nNone"
                                        },
                                        "children": {}
                                    },
                                    {
                                        "component": "Subroutine",
                                        "meta": {
                                            "searchCategory": "subroutine",
                                            "name": "execute",
                                            "source": "    def execute(self, statement: Statement | str, query_parameters: Optional[list[object]] = None) -> Cursor:\n        \"\"\"\n        Executes an SQLite statement, with an active connection to the database.\n\n        An SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.\n        Statements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing\n        a valid SQLite statement - this can be useful for testing, and quick / lightweight commands.\n\n        :param statement: The statement to execute\n        :param query_parameters: Any parameterized query parameters to add to the query for sanitization\n        :return: The internally created SQLite Cursor object\n        :raise RuntimeError: When no connection is already established and a disconnect is attempted\n        \"\"\"\n\n        to_execute = str(statement)\n        if query_parameters is None:\n            query_parameters = statement.query_parameters if isinstance(statement, Statement) else []\n        if not self.connected:\n            statement = statement if isinstance(statement, str) else f\"'{statement.__class__.__name__}' statement\"\n            raise RuntimeError(\n                f\"Could not execute {statement} without connection\") from None\n        if self.output:\n            print(statement)\n        return self.cursor.execute(to_execute, query_parameters)\n",
                                            "signature": "(self, statement: sqliteframe.statements.statement.Statement | str, query_parameters: Optional[list[object]] = None) -> sqlite3.Cursor",
                                            "parameters": [
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "self",
                                                        "description": null,
                                                        "annotation": null,
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "statement",
                                                        "description": "The statement to execute",
                                                        "annotation": "sqliteframe.statements.statement.Statement | str",
                                                        "default": null,
                                                        "isOptional": false
                                                    },
                                                    "children": {}
                                                },
                                                {
                                                    "component": "Parameter",
                                                    "meta": {
                                                        "name": "query_parameters",
                                                        "description": "Any parameterized query parameters to add to the query for sanitization",
                                                        "annotation": "typing.Optional[list[object]]",
                                                        "default": "None",
                                                        "isOptional": true
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "raises": [
                                                {
                                                    "component": "Exception",
                                                    "meta": {
                                                        "name": "RuntimeError",
                                                        "description": "When no connection is already established and a disconnect is attempted"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "returns": [
                                                {
                                                    "component": "SubroutineReturn",
                                                    "meta": {
                                                        "description": "The internally created SQLite Cursor object",
                                                        "annotation": "Cursor"
                                                    },
                                                    "children": {}
                                                }
                                            ],
                                            "shortDescription": "Executes an SQLite statement, with an active connection to the database.",
                                            "longDescription": "An SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.\nStatements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing\na valid SQLite statement - this can be useful for testing, and quick / lightweight commands.",
                                            "deprecations": [],
                                            "examples": [],
                                            "links": [],
                                            "notes": [],
                                            "isGenerator": false,
                                            "isAsync": false,
                                            "isAbstract": false,
                                            "isLambda": false,
                                            "isContextManager": false,
                                            "searchTerms": "execute\nExecutes an SQLite statement, with an active connection to the database.\nAn SQL-injection-safe method which sanitizes query variables using SQLite's parameterized queries.\nStatements can be constructed via SQLiteFrame's Statement wrappers, or via a plain string containing\na valid SQLite statement - this can be useful for testing, and quick / lightweight commands."
                                        },
                                        "children": {}
                                    }
                                ]
                            }
                        }
                    ],
                    "Subroutines": []
                }
            }
        ]
    }
})
