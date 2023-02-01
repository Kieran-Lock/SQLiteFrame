from .type import Type


class Float(Type[float, float]):
    def sql_name(self) -> str:
        return "REAL"

    def decode(self, encoded: float) -> float:
        return encoded

    def encode(self, decoded: float) -> float:
        return decoded
