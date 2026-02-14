"""
Pydantic schemas for Task API requests and responses.
"""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    """
    Schema for creating a new task.

    Attributes:
        title: Task title (1-255 characters, required)
        description: Optional detailed description (max 10000 characters)
    """
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=10000)


class TaskUpdate(BaseModel):
    """
    Schema for updating an existing task.

    Attributes:
        title: Updated task title (1-255 characters, required)
        description: Updated description (max 10000 characters, optional)
    """
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=10000)


class TaskResponse(BaseModel):
    """
    Schema for task API responses.

    Attributes:
        id: Task identifier
        user_id: Owner's user ID
        title: Task title
        description: Task description (optional)
        completed: Completion status
        created_at: Creation timestamp
        updated_at: Last modification timestamp
    """
    id: int
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
