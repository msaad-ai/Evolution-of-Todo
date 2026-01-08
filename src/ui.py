"""
UI module for the Todo Console Application.
Handles menu display, user input capture, and output formatting.
"""

from typing import Optional


def display_menu():
    """Display the main menu options to the user."""
    print("\n" + "="*40)
    print("         TODO CONSOLE APPLICATION")
    print("="*40)
    print("1. Add Task")
    print("2. View All Tasks")
    print("3. Update Task")
    print("4. Delete Task")
    print("5. Toggle Task Status")
    print("6. Exit")
    print("-"*40)


def get_user_choice() -> str:
    """
    Get the user's menu choice.

    Returns:
        str: The user's choice as a string
    """
    try:
        choice = input("Enter your choice (1-6): ").strip()
        return choice
    except KeyboardInterrupt:
        print("\n\nExiting application...")
        return "6"  # Return exit choice
    except EOFError:
        print("\n\nExiting application...")
        return "6"  # Return exit choice


def get_task_input(is_update: bool = False) -> tuple:
    """
    Get task details from user input.

    Args:
        is_update (bool): Whether this is for updating (makes title optional)

    Returns:
        tuple: (title: str or None, description: str or None)
    """
    print("\n--- Task Details ---")

    if not is_update:
        title = input("Enter task title (required): ").strip()
        if not title:
            raise ValueError("Task title cannot be empty")
    else:
        title_input = input("Enter new task title (leave blank to keep current): ").strip()
        title = title_input if title_input else None

    description_input = input("Enter task description (optional, press Enter to skip): ").strip()
    description = description_input if description_input else None

    return title, description


def get_task_id(prompt: str = "Enter task ID: ") -> int:
    """
    Get a task ID from user input with validation.

    Args:
        prompt (str): The prompt to display to the user

    Returns:
        int: The validated task ID
    """
    while True:
        try:
            task_id_str = input(prompt).strip()
            task_id = int(task_id_str)
            if task_id <= 0:
                print("Task ID must be a positive integer. Please try again.")
                continue
            return task_id
        except ValueError:
            print("Invalid input. Please enter a valid integer for the task ID.")
        except KeyboardInterrupt:
            print("\nOperation cancelled.")
            return -1  # Return -1 to indicate cancellation
        except EOFError:
            print("\nOperation cancelled.")
            return -1  # Return -1 to indicate cancellation


def display_tasks(tasks):
    """
    Display a list of tasks in a formatted manner.

    Args:
        tasks: List of task objects to display
    """
    if not tasks:
        print("\nNo tasks found.")
        return

    print(f"\n{'ID':<4} {'Status':<8} {'Title':<20} {'Description'}")
    print("-" * 60)

    for task in tasks:
        status = "✓ Done" if getattr(task, 'completed', False) else "○ Pending"
        title = getattr(task, 'title', 'No Title')
        description = getattr(task, 'description', '') or ''

        # Truncate title and description if too long
        title_truncated = title[:18] + ".." if len(title) > 18 else title
        desc_truncated = description[:20] + ".." if len(description) > 20 else description

        print(f"{getattr(task, 'id', 'N/A'):<4} {status:<8} {title_truncated:<20} {desc_truncated}")


def display_success(message: str):
    """
    Display a success message.

    Args:
        message (str): The success message to display
    """
    print(f"\n✓ {message}")


def display_error(message: str):
    """
    Display an error message.

    Args:
        message (str): The error message to display
    """
    print(f"\n✗ Error: {message}")


def display_info(message: str):
    """
    Display an informational message.

    Args:
        message (str): The info message to display
    """
    print(f"\nℹ {message}")