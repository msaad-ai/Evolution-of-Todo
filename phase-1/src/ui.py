"""
UI module for the Todo Console Application.
Handles menu display, user input capture, and output formatting.
"""

from typing import Optional
from rich.console import Console
from rich.table import Table
from rich.text import Text
from rich.prompt import Prompt
from rich.panel import Panel
from rich import print
import sys


def display_menu():
    """Display the main menu options to the user."""
    print("\n")
    print(Panel("[bold blue]TODO CONSOLE APPLICATION[/bold blue]", expand=False))
    table = Table(show_header=False, box=None)
    table.add_column(style="cyan", width=2)
    table.add_column(style="white")

    table.add_row("[bold yellow]1.[/bold yellow]", "[bold white]Add Task[/bold white]")
    table.add_row("[bold yellow]2.[/bold yellow]", "[bold white]View All Tasks[/bold white]")
    table.add_row("[bold yellow]3.[/bold yellow]", "[bold white]Update Task[/bold white]")
    table.add_row("[bold yellow]4.[/bold yellow]", "[bold white]Delete Task[/bold white]")
    table.add_row("[bold yellow]5.[/bold yellow]", "[bold white]Toggle Task Status[/bold white]")
    table.add_row("[bold yellow]6.[/bold yellow]", "[bold white]Exit[/bold white]")

    print(table)
    print("-" * 50)


def get_user_choice() -> str:
    """
    Get the user's menu choice.

    Returns:
        str: The user's choice as a string
    """
    try:
        choice = Prompt.ask("[bold green]Enter your choice (1-6)[/bold green]", default="")
        return choice.strip()
    except KeyboardInterrupt:
        print("\n\n[bold red]Exiting application...[/bold red]")
        return "6"  # Return exit choice
    except EOFError:
        print("\n\n[bold red]Exiting application...[/bold red]")
        return "6"  # Return exit choice


def get_task_input(is_update: bool = False) -> tuple:
    """
    Get task details from user input.

    Args:
        is_update (bool): Whether this is for updating (makes title optional)

    Returns:
        tuple: (title: str or None, description: str or None)
    """
    print("\n[bold magenta]--- Task Details ---[/bold magenta]")

    if not is_update:
        title = Prompt.ask("[bold cyan]Enter task title (required)[/bold cyan]")
        if not title:
            raise ValueError("Task title cannot be empty")
    else:
        title = Prompt.ask("[bold cyan]Enter new task title (leave blank to keep current)[/bold cyan]", default="")
        title = title if title else None

    description = Prompt.ask("[bold cyan]Enter task description (optional, press Enter to skip)[/bold cyan]", default="")
    description = description if description else None

    return title, description


def get_task_id(prompt: str = "Enter task ID: ") -> int:
    """
    Get a task ID from user input with validation.

    Args:
        prompt (str): The prompt to display to the user

    Returns:
        int: The validated task ID
    """
    original_prompt = prompt
    while True:
        try:
            task_id_str = Prompt.ask(f"[bold yellow]{original_prompt}[/bold yellow]", default="")
            task_id = int(task_id_str)
            if task_id <= 0:
                print("[bold red]Task ID must be a positive integer. Please try again.[/bold red]")
                continue
            return task_id
        except ValueError:
            print("[bold red]Invalid input. Please enter a valid integer for the task ID.[/bold red]")
        except KeyboardInterrupt:
            print("\n[bold yellow]Operation cancelled.[/bold yellow]")
            return -1  # Return -1 to indicate cancellation
        except EOFError:
            print("\n[bold yellow]Operation cancelled.[/bold yellow]")
            return -1  # Return -1 to indicate cancellation


def display_tasks(tasks):
    """
    Display a list of tasks in a formatted manner.

    Args:
        tasks: List of task objects to display
    """
    if not tasks:
        print("\n[bold yellow]No tasks found.[/bold yellow]")
        return

    table = Table(title="[bold green]Your Tasks[/bold green]", show_header=True, header_style="bold blue")
    table.add_column("ID", style="dim", width=5)
    table.add_column("Status", width=12)
    table.add_column("Title", width=30)
    table.add_column("Description", width=40)

    for task in tasks:
        status = "[x] Done" if getattr(task, 'completed', False) else "[ ] Pending"
        status_style = "green" if getattr(task, 'completed', False) else "yellow"
        title = getattr(task, 'title', 'No Title')
        description = getattr(task, 'description', '') or ''

        # Truncate title and description if too long
        title_truncated = title[:28] + ".." if len(title) > 28 else title
        desc_truncated = description[:38] + ".." if len(description) > 38 else description

        table.add_row(
            str(getattr(task, 'id', 'N/A')),
            f"[{status_style}]{status}[/{status_style}]",
            title_truncated,
            desc_truncated
        )

    print("\n")
    print(table)


def display_success(message: str):
    """
    Display a success message.

    Args:
        message (str): The success message to display
    """
    print(f"\n[bold green]SUCCESS: {message}[/bold green]")


def display_error(message: str):
    """
    Display an error message.

    Args:
        message (str): The error message to display
    """
    print(f"\n[bold red]ERROR: {message}[/bold red]")


def display_info(message: str):
    """
    Display an informational message.

    Args:
        message (str): The info message to display
    """
    print(f"\n[bold blue]ℹ {message}[/bold blue]")