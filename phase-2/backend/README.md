# Phase-2 Backend - FastAPI Todo API

JWT-secured REST API for multi-user todo application built with FastAPI, SQLModel, and Neon PostgreSQL.

## Features

- RESTful API with 6 endpoints (CRUD + completion toggle)
- JWT authentication with Better Auth integration
- User isolation (each user sees only their tasks)
- SQLModel ORM with Neon Serverless PostgreSQL
- Automatic API documentation (Swagger UI)
- CORS configured for local development

## Prerequisites

- Python 3.11 or higher
- Neon PostgreSQL account ([sign up](https://neon.tech/))
- Shared BETTER_AUTH_SECRET (must match frontend)

## Installation

1. **Create virtual environment:**
   ```bash
   python -m venv venv

   # Activate (Windows)
   venv\Scripts\activate

   # Activate (Linux/Mac)
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   # Copy example file
   cp .env.example .env

   # Edit .env and add your values:
   # - DATABASE_URL: Your Neon PostgreSQL connection string
   # - BETTER_AUTH_SECRET: Shared secret (min 32 characters, must match frontend)
   ```

## Running the Server

```bash
# Development mode with auto-reload
uvicorn src.main:app --reload --port 8000

# Production mode
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /health` - Check API health (no auth required)

### Task Operations (all require JWT authentication)
- `GET /api/{user_id}/tasks` - List all tasks for user
- `POST /api/{user_id}/tasks` - Create new task
- `GET /api/{user_id}/tasks/{id}` - Get single task
- `PUT /api/{user_id}/tasks/{id}` - Update task
- `DELETE /api/{user_id}/tasks/{id}` - Delete task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion

### Authentication
All task endpoints require:
- `Authorization: Bearer <jwt_token>` header
- `user_id` in URL must match authenticated user from token

### Error Responses
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - user_id mismatch
- `404 Not Found` - Task not found or doesn't belong to user

## Project Structure

```
backend/
├── src/
│   ├── main.py              # FastAPI app entrypoint
│   ├── config.py            # Environment configuration
│   ├── database.py          # SQLModel engine and session
│   ├── models/
│   │   ├── __init__.py
│   │   └── task.py          # Task SQLModel
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── task.py          # Pydantic request/response schemas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── health.py        # Health check endpoint
│   │   └── tasks.py         # Task CRUD endpoints
│   └── auth/
│       ├── __init__.py
│       └── jwt_handler.py   # JWT verification
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

## Database Schema

**tasks** table:
- `id` (INTEGER, PRIMARY KEY) - Auto-generated task ID
- `user_id` (VARCHAR(255), INDEXED) - Owner's user ID from Better Auth
- `title` (VARCHAR(255), NOT NULL) - Task title
- `description` (TEXT, NULLABLE) - Optional description
- `completed` (BOOLEAN, DEFAULT FALSE) - Completion status
- `created_at` (TIMESTAMP, DEFAULT NOW) - Creation timestamp
- `updated_at` (TIMESTAMP, DEFAULT NOW) - Last update timestamp

## Development

### Database Initialization

The database tables are automatically created on application startup using SQLModel's `create_all()` method.

### Testing

```bash
# Run tests (when implemented)
pytest

# Run with coverage
pytest --cov=src
```

## Security Notes

- Never commit `.env` file (already in .gitignore)
- Use strong BETTER_AUTH_SECRET (min 32 characters)
- BETTER_AUTH_SECRET must match frontend exactly
- Use HTTPS in production
- Rotate secrets regularly in production

## Troubleshooting

**Connection refused to database:**
- Verify DATABASE_URL in `.env` file
- Check Neon database is active
- Ensure connection string format is correct

**Invalid token errors:**
- Verify BETTER_AUTH_SECRET matches frontend
- Check token is being sent in Authorization header
- Ensure token format is "Bearer <token>"

**Import errors:**
- Activate virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`
