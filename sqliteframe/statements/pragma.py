from __future__ import annotations
from typing import Optional
from .statement import Statement
from ..pragma import PragmaStatements, PragmaTypes
if False:
    from ..database import Database


class Pragma(Statement):
    def __init__(self, database: Database, pragma_statement: PragmaStatements,
                 pragma_value: Optional[str] = None, pragma_type: PragmaTypes = PragmaTypes.SET):
        super().__init__(database, indeterminate_yield=pragma_type != PragmaTypes.QUERY)
        self.statement = pragma_statement
        self.value = pragma_value
        self.type = pragma_type
        if self.value is None and self.type != PragmaTypes.QUERY:
            raise ValueError("PRAGMA statement cannot have no value when using QUERY mode") from None

    def build_sql(self) -> str:
        return f"PRAGMA {self.statement.value}{self.type.value(self.value)};"
