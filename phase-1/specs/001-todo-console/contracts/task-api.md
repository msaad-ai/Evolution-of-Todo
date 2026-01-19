# API Contracts: Todo Console Application

## Task Operations

### Add Task
- **Operation**: Create a new task
- **Input**: title (required string), description (optional string)
- **Output**: task object with id, title, description, completed
- **Validation**: title must be non-empty
- **Errors**: ValidationError if title is empty

### List Tasks
- **Operation**: Retrieve all tasks
- **Input**: none
- **Output**: array of task objects
- **Sorting**: By ID ascending

### Update Task
- **Operation**: Modify existing task
- **Input**: id (required int), title (optional string), description (optional string)
- **Output**: updated task object
- **Validation**: task with id must exist
- **Errors**: NotFoundError if task doesn't exist

### Delete Task
- **Operation**: Remove task by ID
- **Input**: id (required int)
- **Output**: success boolean
- **Validation**: task with id must exist
- **Errors**: NotFoundError if task doesn't exist

### Toggle Task Status
- **Operation**: Switch completion status
- **Input**: id (required int)
- **Output**: updated task object
- **Validation**: task with id must exist
- **Errors**: NotFoundError if task doesn't exist