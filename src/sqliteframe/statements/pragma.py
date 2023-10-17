"""
The module containing logic for PRAGMA statements.
"""

from __future__ import annotations
from typing import Optional, TYPE_CHECKING
from .statement import Statement
from ..pragma import PragmaStatements, PragmaTypes
if TYPE_CHECKING:
    from ..database import Database


class Pragma(Statement):
    """
    The class containing the logic for building and executing PRAGMA statements with SQLiteFrame.
    """

    def __init__(self, database: Database, pragma_statement: PragmaStatements,
                 pragma_value: Optional[str] = None, pragma_type: PragmaTypes = PragmaTypes.SET):
        """
        :param database: The database this statement is associated with
        :param pragma_statement: The type of PRAGMA statement to execute
        :param pragma_value: The value associated with the PRAGMA statement
        :param pragma_type: The structure of the PRAGMA statement
        """
        super().__init__(database, indeterminate_yield=pragma_type != PragmaTypes.QUERY)
        self.statement = pragma_statement
        self.value = pragma_value
        self.type = pragma_type
        if self.value is None and self.type != PragmaTypes.QUERY:
            raise ValueError("PRAGMA statement cannot have no value when using QUERY mode") from None

    def build_sql(self) -> str:
        return f"PRAGMA {self.statement.value}{self.type.value(self.value)};"
