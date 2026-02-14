"""
Authentication package initialization.
"""
from src.auth.jwt_handler import get_current_user

__all__ = ["get_current_user"]
