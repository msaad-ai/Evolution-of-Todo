"""
JWT token generation utilities.
"""
from datetime import datetime, timedelta
from jose import jwt
from src.config import BETTER_AUTH_SECRET


def create_access_token(user_id: int, email: str, expires_delta: timedelta = None) -> str:
    """
    Create a JWT access token for a user.

    Args:
        user_id: User ID to encode in token
        email: User email to encode in token
        expires_delta: Optional expiration time delta (default: 7 days)

    Returns:
        Encoded JWT token string
    """
    if expires_delta is None:
        expires_delta = timedelta(days=7)

    expire = datetime.utcnow() + expires_delta

    payload = {
        "sub": str(user_id),  # Subject (user ID)
        "email": email,
        "iat": datetime.utcnow(),  # Issued at
        "exp": expire  # Expiration
    }

    encoded_jwt = jwt.encode(payload, BETTER_AUTH_SECRET, algorithm="HS256")
    return encoded_jwt
