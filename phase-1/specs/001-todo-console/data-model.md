# Data Model: Todo Console Application

## Task Entity

### Fields
- **id** (int): Unique identifier for the task, auto-generated sequentially
- **title** (str): Required title of the task, non-empty string
- **description** (str): Optional description of the task, nullable string
- **completed** (bool): Status indicator, defaults to False (Incomplete)

### Validation Rules
- **id**: Must be a positive integer, unique within the system
- **title**: Required field, must be a non-empty string (length > 0)
- **description**: Optional field, if provided must be a valid string
- **completed**: Boolean value, either True (Complete) or False (Incomplete)

### State Transitions
- **Incomplete → Complete**: When user marks task as complete
- **Complete → Incomplete**: When user marks task as incomplete

### Relationships
- None (standalone entity for Phase I)

## In-Memory Storage Structure
- **tasks** (dict): Dictionary with integer keys (task IDs) and Task objects as values
- **next_id** (int): Counter for generating sequential task IDs, starts at 1