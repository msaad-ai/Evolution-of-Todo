# Todo Console Application

A Python-based command-line Todo application that stores all data in memory. This application provides menu-driven interaction for CRUD operations on tasks with status tracking.

## Setup

1. Ensure Python 3.8+ is installed on your system
2. Clone or download the repository
3. Navigate to the project directory

## Running the Application

```bash
cd src
python main.py
```

## Using the Application

1. The application will display a menu with available options
2. Select an option by entering the corresponding number
3. Follow the prompts to provide required information

### Available Operations

- **Add Task**: Enter a title (required) and description (optional)
- **View Tasks**: Display all tasks with ID, title, description, and status
- **Update Task**: Modify title or description by providing the task ID
- **Delete Task**: Remove a task by providing the task ID
- **Toggle Task Status**: Change completion status by providing the task ID
- **Exit**: Quit the application

## Example Workflow

1. Start the application
2. Choose "Add Task" to create a new task
3. Enter "Buy groceries" as the title and "Milk, bread, eggs" as the description
4. Choose "View Tasks" to see your task list
5. Use other options to manage your tasks
6. Choose "Exit" when finished

## Architecture

The application follows a clean architecture pattern with:

- **Domain Layer**: Task entity (in `models.py`)
- **Service Layer**: Task management logic (in `services.py`)
- **Interface Layer**: Console I/O (in `ui.py`)

All data is stored in-memory only, as per Phase I requirements.