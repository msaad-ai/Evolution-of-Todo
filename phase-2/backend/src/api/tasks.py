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

router = APIRouter(prefix="/api/{user_id}/tasks", tags=["tasks"])


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    user_id: str,
    task_data: TaskCreate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new task for the authenticated user.

    Args:
        user_id: User ID from URL path
        task_data: Task creation data (title, description)
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        TaskResponse: Created task with all fields

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Create new task
    task = Task(
        user_id=current_user,
        title=task_data.title,
        description=task_data.description
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a task.

    Args:
        user_id: User ID from URL path
        task_id: Task ID
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        None (204 No Content)

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
        HTTPException: 404 if task not found or doesn't belong to user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == current_user
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


@router.get("", response_model=list[TaskResponse])
def get_tasks(
    user_id: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks for the authenticated user.

    Args:
        user_id: User ID from URL path
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        list[TaskResponse]: List of all tasks for the user

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query all tasks for authenticated user
    statement = select(Task).where(Task.user_id == current_user)
    tasks = db.exec(statement).all()

    return tasks


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a single task by ID.

    Args:
        user_id: User ID from URL path
        task_id: Task ID
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        TaskResponse: Task details

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
        HTTPException: 404 if task not found or doesn't belong to user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == current_user
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
    user_id: str,
    task_id: int,
    task_data: TaskUpdate,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update an existing task.

    Args:
        user_id: User ID from URL path
        task_id: Task ID
        task_data: Updated task data (title, description)
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        TaskResponse: Updated task

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
        HTTPException: 404 if task not found or doesn't belong to user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == current_user
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
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a task.

    Args:
        user_id: User ID from URL path
        task_id: Task ID
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        None (204 No Content)

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
        HTTPException: 404 if task not found or doesn't belong to user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == current_user
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
    user_id: str,
    task_id: int,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Toggle task completion status.

    Args:
        user_id: User ID from URL path
        task_id: Task ID
        current_user: Authenticated user ID from JWT token
        db: Database session

    Returns:
        TaskResponse: Updated task with toggled completion status

    Raises:
        HTTPException: 403 if user_id doesn't match authenticated user
        HTTPException: 404 if task not found or doesn't belong to user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query task by ID and user_id
    statement = select(Task).where(
        Task.id == task_id,
        Task.user_id == current_user
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
