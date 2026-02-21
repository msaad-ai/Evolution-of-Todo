"""
Database module for SQLModel engine and session management.
"""
from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
from src.config import DATABASE_URL
from src.models.task import Task  # Import to register table
from src.models.user import User  # Import to register table

# Create SQLModel engine with appropriate settings
connect_args = {}
if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    echo=False,  # Disable SQL logging for production
    pool_pre_ping=True,  # Verify connections before using
    connect_args=connect_args
)


def create_db_and_tables():
    """
    Create all database tables defined in SQLModel models.
    """
    SQLModel.metadata.create_all(engine)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency function to get database session.

    Yields:
        SQLModel database session
    """
    with Session(engine) as session:
        yield session
