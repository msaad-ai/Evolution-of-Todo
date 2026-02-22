"""
Task API endpoints for CRUD operations.
"""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from src.database import get_db
from src.models.task import Task
from src.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from src.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/api/users/{user_id}/tasks", tags=["tasks"])


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: int,
    task_data: TaskCreate,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new task for the authenticated user.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot create tasks for other users"
        )

    # Create new task
    task = Task(
        user_id=str(current_user),  # Store as string in database
        title=task_data.title,
        description=task_data.description
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.get("", response_model=list[TaskResponse])
def get_tasks(
    user_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks for the authenticated user.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot access other users' tasks"
        )

    # Query all tasks for authenticated user
    statement = select(Task).where(Task.user_id == str(current_user))
    tasks = db.exec(statement).all()

    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    user_id: int,
    task_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a single task by ID.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot access other users' tasks"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == str(current_user)
    )
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    user_id: int,
    task_id: int,
    task_data: TaskUpdate,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update an existing task.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot update other users' tasks"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == str(current_user)
    )
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update task fields
    task.title = task_data.title
    task.description = task_data.description
    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: int,
    task_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a task.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot delete other users' tasks"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == str(current_user)
    )
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Delete task
    db.delete(task)
    db.commit()

    return None


@router.patch("/{task_id}/complete", response_model=TaskResponse)
def toggle_complete(
    user_id: int,
    task_id: int,
    current_user: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Toggle task completion status.
    """
    # Verify user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot modify other users' tasks"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == str(current_user)
    )
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Toggle completion status
    task.completed = not task.completed
    task.updated_at = datetime.utcnow()

    db.add(task)
    db.commit()
    db.refresh(task)

    return task
