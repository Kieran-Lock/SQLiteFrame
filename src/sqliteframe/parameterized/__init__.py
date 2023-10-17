"""
A subpackage containing logic for parameterized queries.

This ensures that variable statements that are executed are automatically sanitized
by SQLite, preventing vulnerability to SQL injection attacks in your programs.
"""

from .parameterized import Parameterized
