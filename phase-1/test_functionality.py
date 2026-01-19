#!/usr/bin/env python3
"""
Test script to verify the Todo CLI functionality with rich styling
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from main import main
from services import TaskService
from ui import display_tasks, display_success, display_error, display_info
from rich import print

def test_functionality():
    print("[bold green]Testing Todo CLI functionality with rich styling...[/bold green]")

    # Test TaskService functionality
    service = TaskService()

    # Add a test task
    task = service.create_task("Test task", "This is a test")
    print(f"[green]Created task: {task.title}[/green]")

    # List tasks
    tasks = service.list_tasks()
    print(f"[green]Retrieved {len(tasks)} tasks[/green]")

    # Display tasks with rich formatting
    display_tasks(tasks)

    # Update task
    updated_task = service.update_task(task.id, title="Updated test task")
    print(f"[green]Updated task: {updated_task.title}[/green]")

    # Toggle status
    toggled_task = service.toggle_task_status(task.id)
    print(f"[green]Toggled task status: {toggled_task.completed}[/green]")

    # Delete task
    service.delete_task(task.id)
    print("[green]Deleted task[/green]")

    print("[bold blue]All functionality tests passed![/bold blue]")

if __name__ == "__main__":
    test_functionality()