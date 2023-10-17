"""
The module containing logic for SELECT statements.
"""

from __future__ import annotations
from typing import TYPE_CHECKING
from .statement import Statement
from ..wildcards import Wildcards
from ..order_by import OrderBy, OrderTypes
from ..where import Where, Condition
from ..join import Join, JoinTypes
if TYPE_CHECKING:
    from ..entity import Column, Entity


class Select(Statement):
    """
    The class containing the logic for building and executing SELECT statements with SQLiteFrame.
    """

    def __init__(self, table: Entity, columns: list[Column | Wildcards], distinct: bool = False):
        """
        :param table: The table this query is associated with
        :param columns: The column(s) to select from
        :param distinct: Whether to select only non-duplicate (distinct) values
        """
        super().__init__(table.database, yield_column_factory=lambda: self.columns)
        self.table = table
        if not filter(lambda column: column not in [wildcard.value for wildcard in Wildcards],
                      set(columns) - set(self.table.columns)):
            columns = set(sorted(columns, key=lambda column: self.table.columns.index(column)))
        self.passed_columns = columns
        self.columns = self.table.columns if Wildcards.All in columns else self.passed_columns[:]
        self.distinct = distinct
        self.where_statement = None
        self.join_statements = []
        self.order_by_statement = None

    def build_sql(self) -> str:
        distinct_section = " DISTINCT" if self.distinct else ""
        columns_section = ", ".join(map(lambda column: column.name, self.columns))
        join_section = ("\n" + "\n".join(map(str, self.join_statements))) if self.join_statements else ""
        where_section = "" if self.where_statement is None else f"\nWHERE {self.where_statement}"
        order_by_section = "" if self.order_by_statement is None else f"\n{self.order_by_statement}"
        return f"SELECT{distinct_section} {columns_section}\n" \
               f"FROM {self.table}{join_section}{where_section}{order_by_section};"

    def where(self, where: Where | Condition) -> Select:
        """
        A method to attach WHERE clauses onto the SELECT statement

        :param where: The WHERE clause to add to the statement
        :return: A mutated version of this statement with the extended WHERE clause
        """

        if self.where_statement is None:
            where.register(self)
            self.where_statement = where
        else:
            self.where_statement &= where
        return self

    def join(self, table: Entity, where: Where | Condition, join_type: JoinTypes = JoinTypes.INNER) -> Select:
        """
        A method to attach JOIN clauses onto the SELECT statement.

        :param table: The table to join with
        :param where: The WHERE clause to add to the statement
        :param join_type: The way in which the tables should be joined
        :return: A mutated version of this statement with the extended WHERE clause
        """

        if Wildcards.All in self.passed_columns:
            self.columns = self.columns + table.columns if join_type == JoinTypes.LEFT else table.columns + self.columns
        else:
            joined_columns = table.sort_columns(set(self.columns) - set(self.table.columns),
                                                base_columns_override=self.passed_columns)
            original_columns = self.table.sort_columns(set(self.columns) - set(joined_columns),
                                                       base_columns_override=self.passed_columns)
            self.columns = joined_columns + original_columns if join_type == JoinTypes.LEFT else \
                original_columns + joined_columns
        self.join_statements.append(Join(table, where, join_type))
        return self

    def order_by(self, column: Column,
                 order_types: OrderTypes | tuple[OrderTypes, ...] = OrderTypes.ASCENDING) -> Select:
        """
        A method to attach ORDER BY clauses onto the SELECT statement.

        :param column: The target column to order by
        :param order_types: The way in which the results should be ordered
        :return: A mutated version of this statement with the extended ORDER BY clause
        """
        self.order_by_statement = OrderBy(column, order_types)
        return self
