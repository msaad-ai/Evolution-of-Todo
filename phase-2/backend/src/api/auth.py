"""
Authentication API endpoints for user registration and login.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.database import get_db
from src.models.user import User
from src.schemas.user import UserRegister, UserLogin, TokenResponse, UserResponse
from src.auth.password import hash_password, verify_password
from src.auth.token import create_access_token

router = APIRouter(prefix="/api/auth", tags=["authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Register a new user.

    Args:
        user_data: User registration data (email, password)
        db: Database session

    Returns:
        TokenResponse: Access token and user information

    Raises:
        HTTPException: 400 if user already exists
    """
    # Check if user already exists
    statement = select(User).where(User.email == user_data.email)
    existing_user = db.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    # Hash password
    hashed_password = hash_password(user_data.password)

    # Create new user
    new_user = User(
        email=user_data.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate access token
    access_token = create_access_token(new_user.id, new_user.email)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(id=new_user.id, email=new_user.email)
    )


@router.post("/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Login an existing user.

    Args:
        user_data: User login data (email, password)
        db: Database session

    Returns:
        TokenResponse: Access token and user information

    Raises:
        HTTPException: 401 if credentials are invalid
    """
    # Find user by email
    statement = select(User).where(User.email == user_data.email)
    user = db.exec(statement).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate access token
    access_token = create_access_token(user.id, user.email)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(id=user.id, email=user.email)
    )
