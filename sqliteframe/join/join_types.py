from enum import Enum


class JoinTypes(Enum):
    INNER = "INNER"
    LEFT = "LEFT"
    CROSS = "CROSS"
