from typing import Optional
from .statement import Statement
from ..pragma import PragmaStatements, PragmaStates


class Pragma(Statement):
    def __init__(self, pragma_statement: PragmaStatements, pragma_state: Optional[PragmaStates] = None):
        self.statement = pragma_statement
        self.state = pragma_state

    def build_sql(self) -> str:
        return f"PRAGMA {self.statement.value} = {self.state.value};"
