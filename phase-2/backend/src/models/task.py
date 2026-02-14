"""
Task model for todo items.
"""
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    """
    Task model representing a todo item.

    Attributes:
        id: Unique task identifier (auto-generated)
        user_id: Owner's user ID from Better Auth (indexed for fast queries)
        title: Task title/summary (required)
        description: Optional detailed description
        completed: Completion status (default: False)
        created_at: Creation timestamp (auto-generated)
        updated_at: Last modification timestamp (auto-updated)
    """
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, max_length=255)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
