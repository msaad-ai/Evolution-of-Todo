"""
Database module for SQLModel engine and session management.
"""
from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
from src.config import DATABASE_URL

# Create SQLModel engine
engine = create_engine(
    DATABASE_URL,
    echo=True,  # Log SQL queries (disable in production)
    pool_pre_ping=True,  # Verify connections before using
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
        Session: SQLModel database session
    """
    with Session(engine) as session:
        yield session
