"""
JWT authentication handler for verifying tokens and extracting user information.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from src.config import BETTER_AUTH_SECRET

# HTTPBearer security scheme for extracting JWT from Authorization header
security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> int:
    """
    Verify JWT token and extract authenticated user ID.

    This dependency function:
    1. Extracts the JWT token from the Authorization header
    2. Verifies the token signature using BETTER_AUTH_SECRET
    3. Extracts the user_id from the token's "sub" claim
    4. Returns the user_id for use in protected endpoints

    Args:
        credentials: HTTP Bearer credentials containing the JWT token

    Returns:
        int: Authenticated user ID from token's "sub" claim

    Raises:
        HTTPException: 401 Unauthorized if token is missing, invalid, or expired
    """
    token = credentials.credentials

    try:
        # Decode and verify JWT token
        payload = jwt.decode(
            token,
            BETTER_AUTH_SECRET,
            algorithms=["HS256"]
        )

        # Extract user_id from "sub" claim
        user_id_str: str = payload.get("sub")

        if user_id_str is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user ID",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Convert to integer
        user_id = int(user_id_str)
        return user_id

    except (JWTError, ValueError) as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
