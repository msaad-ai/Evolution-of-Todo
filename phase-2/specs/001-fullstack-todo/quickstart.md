# Quickstart Guide: Full-Stack Web Todo Application

**Date**: 2026-02-13
**Feature**: 001-fullstack-todo

## Overview

This guide walks you through setting up and running the full-stack todo application locally.

## Prerequisites

### Required Software
- **Node.js**: 18.x or higher ([download](https://nodejs.org/))
- **Python**: 3.11 or higher ([download](https://www.python.org/))
- **Git**: For version control
- **Code Editor**: VS Code recommended

### Required Accounts
- **Neon**: Free PostgreSQL database ([signup](https://neon.tech/))

### Verify Installation
```bash
node --version    # Should be v18.x or higher
python --version  # Should be 3.11.x or higher
git --version     # Any recent version
```

## Initial Setup

### 1. Clone Repository (if not already done)
```bash
git clone <repository-url>
cd Hackathon-2-todo-app/phase-2
```

### 2. Create Neon Database

1. Sign up at [neon.tech](https://neon.tech/)
2. Create a new project
3. Copy the connection string (format: `postgresql://user:pass@host/db`)
4. Save for environment setup

### 3. Generate Shared Secret

Generate a secure secret for JWT signing:

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Save this secret - you'll use it in both frontend and backend.

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create `.env` file in `backend/` directory:

```bash
# backend/.env
DATABASE_URL=postgresql://user:pass@host/db
BETTER_AUTH_SECRET=your-generated-secret-here
```

**Important**: Replace with your actual Neon connection string and generated secret.

### 5. Initialize Database

```bash
# Run database initialization (creates tables)
python -m src.database
```

### 6. Start Backend Server

```bash
# Development mode with auto-reload
uvicorn src.main:app --reload --port 8000
```

**Verify**: Open http://localhost:8000/health - should return `{"status":"healthy"}`

## Frontend Setup

### 1. Navigate to Frontend Directory

Open a new terminal window:

```bash
cd phase-2/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local` file in `frontend/` directory:

```bash
# frontend/.env.local
BETTER_AUTH_SECRET=your-generated-secret-here
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Important**: Use the SAME secret as backend.

### 4. Start Frontend Server

```bash
npm run dev
```

**Verify**: Open http://localhost:3000 - should see landing page

## First Run

### 1. Create User Account

1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Enter email and password
4. Submit form

### 2. Sign In

1. Use the credentials you just created
2. You should be redirected to `/tasks` dashboard

### 3. Create Your First Task

1. Enter task title (e.g., "Buy groceries")
2. Optionally add description
3. Click "Add Task"
4. Task should appear in the list

### 4. Test Features

- ✅ **Add Task**: Create multiple tasks
- ✅ **View Tasks**: See all your tasks in the list
- ✅ **Mark Complete**: Click checkbox to toggle completion
- ✅ **Edit Task**: Click edit button, modify title/description
- ✅ **Delete Task**: Click delete button to remove task

### 5. Test User Isolation

1. Sign out
2. Create a second user account
3. Sign in with new account
4. Verify you see NO tasks from first user
5. Create tasks for second user
6. Sign out and sign back in as first user
7. Verify you only see first user's tasks

## Development Workflow

### Running Both Services

**Terminal 1 (Backend)**:
```bash
cd phase-2/backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn src.main:app --reload --port 8000
```

**Terminal 2 (Frontend)**:
```bash
cd phase-2/frontend
npm run dev
```

### Stopping Services

- **Backend**: Press `Ctrl+C` in terminal
- **Frontend**: Press `Ctrl+C` in terminal

### Restarting After Changes

- **Backend**: Auto-reloads with `--reload` flag
- **Frontend**: Auto-reloads with Next.js dev server

## Testing

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
**Solution**: Activate virtual environment and install dependencies
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**Problem**: `Connection refused` to database
**Solution**: Check DATABASE_URL in `.env` file, verify Neon database is active

**Problem**: `Invalid token` errors
**Solution**: Verify BETTER_AUTH_SECRET matches in both frontend and backend `.env` files

### Frontend Issues

**Problem**: `Module not found` errors
**Solution**: Install dependencies
```bash
npm install
```

**Problem**: `CORS` errors in browser console
**Solution**: Verify backend CORS middleware allows `http://localhost:3000`

**Problem**: `401 Unauthorized` on API requests
**Solution**: Check that JWT token is being sent in Authorization header

### Database Issues

**Problem**: Tables not created
**Solution**: Run database initialization script
```bash
cd backend
python -m src.database
```

**Problem**: Connection timeout to Neon
**Solution**: Check internet connection, verify Neon project is not suspended

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Neon PostgreSQL connection string | postgresql://user:pass@host/db |
| BETTER_AUTH_SECRET | JWT signing secret (min 32 chars) | abc123...xyz789 |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| BETTER_AUTH_SECRET | JWT signing secret (MUST match backend) | abc123...xyz789 |
| NEXT_PUBLIC_API_URL | Backend API base URL | http://localhost:8000 |

## API Documentation

Once backend is running, view interactive API docs:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Project Structure

```
phase-2/
├── backend/
│   ├── src/              # Source code
│   ├── tests/            # Backend tests
│   ├── .env              # Backend environment (create this)
│   └── requirements.txt  # Python dependencies
│
├── frontend/
│   ├── src/              # Source code
│   ├── tests/            # Frontend tests
│   ├── .env.local        # Frontend environment (create this)
│   └── package.json      # Node dependencies
│
└── specs/                # Documentation
```

## Next Steps

After successful setup:

1. ✅ Both services running
2. ✅ User signup/signin working
3. ✅ All 5 features working (Add, View, Edit, Delete, Complete)
4. ✅ User isolation verified
5. ✅ Data persists in Neon

You're ready to proceed with `/sp.tasks` to generate implementation tasks!

## Common Commands

### Backend
```bash
# Start server
uvicorn src.main:app --reload --port 8000

# Run tests
pytest

# Run specific test
pytest tests/test_tasks.py

# Check code style
black src/
flake8 src/
```

### Frontend
```bash
# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Check types
npm run type-check

# Lint code
npm run lint
```

## Support

If you encounter issues not covered here:

1. Check error messages carefully
2. Verify environment variables are set correctly
3. Ensure both services are running
4. Check browser console for frontend errors
5. Check terminal output for backend errors

## Security Notes

- **Never commit `.env` or `.env.local` files** (already in .gitignore)
- **Use strong passwords** for user accounts
- **Keep BETTER_AUTH_SECRET secure** (min 32 characters)
- **Use HTTPS in production** (not HTTP)
- **Rotate secrets regularly** in production
