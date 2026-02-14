# Data Model: Full-Stack Web Todo Application

**Date**: 2026-02-13
**Feature**: 001-fullstack-todo

## Overview

This document defines the data model for the todo application. The design prioritizes simplicity, user isolation, and alignment with the 5 core features.

## Entities

### Task

**Purpose**: Represents a single todo item owned by a user

**Storage**: PostgreSQL table via SQLModel ORM

**Schema**:

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Integer | Primary Key, Auto-increment | Unique task identifier |
| user_id | String(255) | Not Null, Indexed | Owner's user ID from Better Auth |
| title | String(255) | Not Null | Task title/summary |
| description | Text | Nullable | Optional detailed description |
| completed | Boolean | Not Null, Default: False | Completion status |
| created_at | DateTime | Not Null, Default: now() | Creation timestamp |
| updated_at | DateTime | Not Null, Default: now(), Auto-update | Last modification timestamp |

**Indexes**:
- Primary: `id` (auto-created)
- Secondary: `user_id` (for fast user-specific queries)
- Composite: `(user_id, created_at DESC)` (optional, for sorted listing)

**Relationships**:
- None (user data managed by Better Auth, not in our database)

**Validation Rules**:
- `title`: 1-255 characters, required
- `description`: 0-10000 characters, optional
- `user_id`: Must match authenticated user from JWT
- `completed`: Boolean only (true/false)

**State Transitions**:
```
[Created] → completed=False
    ↓
[Active] ← → [Completed]
    ↓           ↓
[Updated]   [Updated]
    ↓           ↓
[Deleted]   [Deleted]
```

**Business Rules**:
1. User can only access their own tasks (enforced by user_id filter)
2. Task title is required, description is optional
3. Completion status can be toggled multiple times
4. Timestamps are automatically managed
5. Soft delete not required (hard delete is acceptable)

## SQLModel Definition

```python
from datetime import datetime
from typing import Optional
from sqlmodel import Field, SQLModel

class Task(SQLModel, table=True):
    """Task model for todo items"""
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, max_length=255)
    title: str = Field(max_length=255)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## Pydantic Schemas (Request/Response)

### TaskCreate (POST request body)
```python
from pydantic import BaseModel, Field

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=10000)
```

### TaskUpdate (PUT request body)
```python
class TaskUpdate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=10000)
```

### TaskResponse (API response)
```python
class TaskResponse(BaseModel):
    id: int
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

## Database Operations

### Create Task
```python
def create_task(db: Session, user_id: str, task_data: TaskCreate) -> Task:
    task = Task(
        user_id=user_id,
        title=task_data.title,
        description=task_data.description
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
```

### Get Tasks (List)
```python
def get_tasks(db: Session, user_id: str) -> list[Task]:
    return db.query(Task).filter(Task.user_id == user_id).all()
```

### Get Task (Single)
```python
def get_task(db: Session, user_id: str, task_id: int) -> Optional[Task]:
    return db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == user_id
    ).first()
```

### Update Task
```python
def update_task(db: Session, user_id: str, task_id: int, task_data: TaskUpdate) -> Optional[Task]:
    task = get_task(db, user_id, task_id)
    if not task:
        return None

    task.title = task_data.title
    task.description = task_data.description
    task.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(task)
    return task
```

### Toggle Completion
```python
def toggle_completion(db: Session, user_id: str, task_id: int) -> Optional[Task]:
    task = get_task(db, user_id, task_id)
    if not task:
        return None

    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(task)
    return task
```

### Delete Task
```python
def delete_task(db: Session, user_id: str, task_id: int) -> bool:
    task = get_task(db, user_id, task_id)
    if not task:
        return False

    db.delete(task)
    db.commit()
    return True
```

## Migration Strategy

### Phase-II (Simple)
Use SQLModel's `create_all()` method:

```python
from sqlmodel import create_engine, SQLModel
from src.models.task import Task

engine = create_engine(DATABASE_URL)
SQLModel.metadata.create_all(engine)
```

### Future (Production)
Use Alembic for versioned migrations:
- Track schema changes
- Rollback capability
- Data migrations
- Multi-environment support

## Data Integrity

### Constraints
- Primary key ensures unique task IDs
- Not null constraints on required fields
- Index on user_id for query performance
- Foreign key to users table (future enhancement)

### Concurrency
- Optimistic locking via updated_at timestamp
- Database-level ACID guarantees
- Connection pooling for concurrent requests

### Data Validation
- Pydantic schemas validate input before database
- SQLModel validates types at ORM level
- Database constraints as final safety net

## Performance Considerations

### Query Optimization
- Index on user_id (most common filter)
- Limit result sets (pagination if needed)
- Select only needed columns (avoid SELECT *)

### Scalability
- Stateless API (horizontal scaling)
- Connection pooling (reuse connections)
- Async queries (non-blocking I/O)

### Monitoring
- Track query execution time
- Monitor connection pool usage
- Alert on slow queries (>100ms)

## Security

### User Isolation
- Every query filters by authenticated user_id
- No cross-user data access possible
- 403 Forbidden if user_id mismatch

### SQL Injection Prevention
- SQLModel uses parameterized queries
- No raw SQL concatenation
- Pydantic validates input types

### Data Privacy
- User_id is opaque identifier (not email)
- No PII in task data (user controls content)
- Timestamps for audit trail

## Testing Data

### Test Fixtures
```python
# User A tasks
task_a1 = Task(user_id="user_a", title="Buy groceries", completed=False)
task_a2 = Task(user_id="user_a", title="Walk dog", completed=True)

# User B tasks
task_b1 = Task(user_id="user_b", title="Finish report", completed=False)
```

### Test Scenarios
1. User A creates task → only User A can see it
2. User A updates task → User B cannot access it
3. User A deletes task → User B unaffected
4. User A toggles completion → state persists
5. Database restart → all tasks remain
