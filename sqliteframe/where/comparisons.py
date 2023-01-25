from enum import Enum


class Comparisons(Enum):
    EQUAL = "="
    NOT_EQUAL = "!="
    GREATER = ">"
    GREATER_EQUAL = ">="
    LESS = "<"
    LESS_EQUAL = "<="
    IN = "IN"
    LIKE = "LIKE"
    BETWEEN = "BETWEEN"
