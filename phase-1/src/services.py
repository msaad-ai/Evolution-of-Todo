"""
Task service layer for the Todo Console Application.
Implements all core operations with in-memory storage.
"""

from models import Task
from typing import Dict, List, Optional


class TaskService:
    """
    Service class to manage tasks with in-memory storage.
    Implements all required operations: create, list, update, delete, toggle.
    """

    def __init__(self):
        """Initialize the task service with empty storage."""
        self.tasks: Dict[int, Task] = {}
        self.next_id: int = 1

    def create_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Create a new task with required title and optional description.

        Args:
            title (str): Required title of the task
            description (str, optional): Optional description of the task

        Returns:
            Task: The created task object with assigned ID and default status

        Raises:
            ValueError: If title is empty
        """
        # Validate title is not empty
        if not title or not title.strip():
            raise ValueError("Task title cannot be empty")

        # Create task with new ID
        task_id = self.next_id
        self.next_id += 1

        task = Task(task_id, title, description, completed=False)
        self.tasks[task_id] = task

        return task

    def list_tasks(self) -> List[Task]:
        """
        Retrieve all tasks sorted by ID ascending.

        Returns:
            List[Task]: List of all tasks sorted by ID
        """
        return sorted(self.tasks.values(), key=lambda x: x.id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Task:
        """
        Update an existing task with new title or description.

        Args:
            task_id (int): ID of the task to update
            title (str, optional): New title for the task
            description (str, optional): New description for the task

        Returns:
            Task: The updated task object

        Raises:
            ValueError: If task with given ID doesn't exist
        """
        if task_id not in self.tasks:
            raise ValueError(f"Task with ID {task_id} does not exist")

        task = self.tasks[task_id]

        # Update fields if provided
        if title is not None:
            task.title = task._validate_title(title)
        if description is not None:
            task.description = task._validate_description(description)

        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Delete a task by its ID.

        Args:
            task_id (int): ID of the task to delete

        Returns:
            bool: True if task was deleted, False if task didn't exist

        Raises:
            ValueError: If task with given ID doesn't exist
        """
        if task_id not in self.tasks:
            raise ValueError(f"Task with ID {task_id} does not exist")

        del self.tasks[task_id]
        return True

    def toggle_task_status(self, task_id: int) -> Task:
        """
        Toggle the completion status of a task.

        Args:
            task_id (int): ID of the task to toggle

        Returns:
            Task: The updated task object with toggled status

        Raises:
            ValueError: If task with given ID doesn't exist
        """
        if task_id not in self.tasks:
            raise ValueError(f"Task with ID {task_id} does not exist")

        task = self.tasks[task_id]
        task.completed = not task.completed
        return task

    def get_task(self, task_id: int) -> Task:
        """
        Get a specific task by its ID.

        Args:
            task_id (int): ID of the task to retrieve

        Returns:
            Task: The task object

        Raises:
            ValueError: If task with given ID doesn't exist
        """
        if task_id not in self.tasks:
            raise ValueError(f"Task with ID {task_id} does not exist")

        return self.tasks[task_id]