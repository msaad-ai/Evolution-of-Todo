"""
User schemas for request/response validation.
"""
from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    """
    Schema for user registration request.
    """
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "securepassword123"
            }
        }


class UserLogin(BaseModel):
    """
    Schema for user login request.
    """
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "securepassword123"
            }
        }


class UserResponse(BaseModel):
    """
    Schema for user response (without password).
    """
    id: int
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "user@example.com"
            }
        }


class TokenResponse(BaseModel):
    """
    Schema for authentication token response.
    """
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": 1,
                    "email": "user@example.com"
                }
            }
        }
