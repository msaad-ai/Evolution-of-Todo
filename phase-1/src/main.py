"""
Main entry point for the Todo Console Application.
Implements the main execution loop and orchestrates the application flow.
"""

from services import TaskService
from ui import (
    display_menu, get_user_choice, get_task_input, get_task_id,
    display_tasks, display_success, display_error, display_info, Prompt
)
from rich import print


def main():
    """Main application loop."""
    print("[bold blue]Welcome to the Todo Console Application![/bold blue]")
    print("[bold cyan]Manage your tasks efficiently with this simple CLI tool.[/bold cyan]")

    task_service = TaskService()

    while True:
        try:
            display_menu()
            choice = get_user_choice()

            if choice == "1":
                # Add Task
                try:
                    title, description = get_task_input()
                    task = task_service.create_task(title, description)
                    display_success(f"Task '{task.title}' added successfully with ID {task.id}")
                except ValueError as e:
                    display_error(str(e))
                except KeyboardInterrupt:
                    display_info("Task addition cancelled.")
                except Exception as e:
                    display_error(f"Failed to add task: {str(e)}")

            elif choice == "2":
                # View All Tasks
                try:
                    tasks = task_service.list_tasks()
                    display_tasks(tasks)
                except Exception as e:
                    display_error(f"Failed to list tasks: {str(e)}")

            elif choice == "3":
                # Update Task
                try:
                    task_id = get_task_id("Enter ID of task to update: ")
                    if task_id == -1:  # User cancelled
                        continue

                    # Check if task exists
                    try:
                        current_task = task_service.get_task(task_id)
                        print(f"[bold white]Current task: {current_task}[/bold white]")
                    except ValueError:
                        display_error(f"No task found with ID {task_id}")
                        continue

                    title, description = get_task_input(is_update=True)

                    # Prepare update parameters
                    update_params = {}
                    if title is not None:
                        update_params['title'] = title
                    if description is not None:
                        update_params['description'] = description

                    if not update_params:
                        display_info("No changes made (no new values provided)")
                        continue

                    updated_task = task_service.update_task(
                        task_id,
                        title=update_params.get('title'),
                        description=update_params.get('description')
                    )
                    display_success(f"Task ID {task_id} updated successfully")
                except ValueError as e:
                    display_error(str(e))
                except KeyboardInterrupt:
                    display_info("Task update cancelled.")
                except Exception as e:
                    display_error(f"Failed to update task: {str(e)}")

            elif choice == "4":
                # Delete Task
                try:
                    task_id = get_task_id("Enter ID of task to delete: ")
                    if task_id == -1:  # User cancelled
                        continue

                    # Check if task exists
                    try:
                        current_task = task_service.get_task(task_id)
                        print(f"[bold yellow]About to delete task: {current_task}[/bold yellow]")

                        confirm = Prompt.ask("[bold red]Are you sure you want to delete task?[/bold red]", choices=["y", "n", "yes", "no"], default="n").strip().lower()
                        if confirm not in ['y', 'yes']:
                            display_info("Task deletion cancelled.")
                            continue
                    except ValueError:
                        display_error(f"No task found with ID {task_id}")
                        continue

                    task_service.delete_task(task_id)
                    display_success(f"Task ID {task_id} deleted successfully")
                except ValueError as e:
                    display_error(str(e))
                except KeyboardInterrupt:
                    display_info("Task deletion cancelled.")
                except Exception as e:
                    display_error(f"Failed to delete task: {str(e)}")

            elif choice == "5":
                # Toggle Task Status
                try:
                    task_id = get_task_id("Enter ID of task to toggle status: ")
                    if task_id == -1:  # User cancelled
                        continue

                    # Check if task exists
                    try:
                        current_task = task_service.get_task(task_id)
                        print(f"[bold white]Current task: {current_task}[/bold white]")
                    except ValueError:
                        display_error(f"No task found with ID {task_id}")
                        continue

                    updated_task = task_service.toggle_task_status(task_id)
                    new_status = "completed" if updated_task.completed else "incomplete"
                    display_success(f"Task ID {task_id} marked as {new_status}")
                except ValueError as e:
                    display_error(str(e))
                except KeyboardInterrupt:
                    display_info("Task status toggle cancelled.")
                except Exception as e:
                    display_error(f"Failed to toggle task status: {str(e)}")

            elif choice == "6":
                # Exit
                print("\n[bold green]Thank you for using the Todo Console Application![/bold green]")
                print("[bold green]Goodbye![/bold green]")
                break

            else:
                display_error("Invalid choice. Please enter a number between 1 and 6.")

        except KeyboardInterrupt:
            print("\n\n[bold red]Received interrupt signal. Exiting...[/bold red]")
            break
        except Exception as e:
            display_error(f"An unexpected error occurred: {str(e)}")
            print("[yellow]Please try again or contact support if the issue persists.[/yellow]")


if __name__ == "__main__":
    main()