from enum import Enum


class OrderTypes(Enum):
    NULLS_FIRST = "NULLS FIRST"
    NULLS_LAST = "NULLS LAST"
    ASCENDING = "ASC"
    DESCENDING = "DESC"
