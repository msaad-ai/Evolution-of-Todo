"""
Task data model for the Todo Console Application.
Defines the Task entity with validation rules.
"""

class Task:
    """
    Represents a user's todo item with properties:
    ID (unique identifier), Title (required string),
    Description (optional string), Status (boolean - complete/incomplete)
    """

    def __init__(self, task_id, title, description=None, completed=False):
        """
        Initialize a Task object.

        Args:
            task_id (int): Unique identifier for the task
            title (str): Required title of the task
            description (str, optional): Optional description of the task
            completed (bool): Status indicator, defaults to False (Incomplete)
        """
        self.id = self._validate_id(task_id)
        self.title = self._validate_title(title)
        self.description = self._validate_description(description)
        self.completed = self._validate_completed(completed)

    def _validate_id(self, task_id):
        """Validate that the ID is a positive integer."""
        if not isinstance(task_id, int) or task_id <= 0:
            raise ValueError(f"Task ID must be a positive integer, got {task_id}")
        return task_id

    def _validate_title(self, title):
        """Validate that the title is a non-empty string."""
        if not isinstance(title, str):
            raise ValueError(f"Task title must be a string, got {type(title)}")
        if not title.strip():
            raise ValueError("Task title cannot be empty")
        return title.strip()

    def _validate_description(self, description):
        """Validate that the description is a string if provided."""
        if description is not None and not isinstance(description, str):
            raise ValueError(f"Task description must be a string or None, got {type(description)}")
        return description

    def _validate_completed(self, completed):
        """Validate that completed is a boolean."""
        if not isinstance(completed, bool):
            raise ValueError(f"Task completed status must be a boolean, got {type(completed)}")
        return completed

    def to_dict(self):
        """Convert the task to a dictionary representation."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

    def __str__(self):
        """String representation of the task."""
        status = "✓" if self.completed else "○"
        desc = f" - {self.description}" if self.description else ""
        return f"[{status}] {self.id}. {self.title}{desc}"

    def __repr__(self):
        """Developer-friendly representation of the task."""
        return f"Task(id={self.id}, title='{self.title}', description='{self.description}', completed={self.completed})"