# TaskForge - Organize smarter. Build better habits.

A modern full-stack productivity application with Next.js frontend, FastAPI backend, and Neon PostgreSQL database.

## Overview

TaskForge is your personal productivity companion that helps you create, manage, and complete tasks with ease:
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + SQLModel + Neon PostgreSQL
- **Authentication**: JWT-based authentication with user isolation
- **Features**: Add, View, Edit, Delete, and Mark Complete tasks

## Tech Stack

- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS, Better Auth
- **Backend**: Python FastAPI, SQLModel, python-jose
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT token-based with user isolation

## Project Structure

```
phase-2/
├── backend/              # FastAPI REST API
│   ├── src/             # Source code
│   ├── requirements.txt # Python dependencies
│   ├── .env.example     # Environment template
│   └── README.md        # Backend documentation
├── frontend/            # Next.js web application
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   ├── lib/            # Utilities and API client
│   ├── package.json    # Node dependencies
│   └── README.md       # Frontend documentation
├── specs/              # Specification documents
│   └── 001-fullstack-todo/
│       ├── spec.md     # Feature requirements
│       ├── plan.md     # Implementation plan
│       ├── tasks.md    # Task breakdown
│       └── contracts/  # API specifications
└── README.md           # This file
```

## Quick Start

### Prerequisites

1. **Neon PostgreSQL**: Sign up at [neon.tech](https://neon.tech/) and create a database
2. **Node.js 18+**: For frontend
3. **Python 3.11+**: For backend

### Setup

#### 1. Generate Shared Secret
```bash
openssl rand -base64 32
```

#### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env: Add DATABASE_URL and BETTER_AUTH_SECRET
uvicorn src.main:app --reload --port 8000
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local: Add BETTER_AUTH_SECRET and NEXT_PUBLIC_API_URL
npm run dev
```

### Access
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## Features

The application implements 5 core todo features:
1. ✅ **Add Task** - Create tasks with title and description
2. ✅ **View Task List** - See all your tasks
3. ✅ **Update Task** - Edit task details
4. ✅ **Delete Task** - Remove tasks with confirmation
5. ✅ **Mark Complete** - Toggle completion status

## Authentication

- User registration and sign-in with email/password
- JWT token-based authentication
- User isolation - users can only see/manage their own tasks
- Automatic redirect on authentication errors

## API Endpoints

All endpoints secured with JWT authentication:
- `GET /health` - Health check (no auth)
- `GET /api/{user_id}/tasks` - List tasks for user
- `POST /api/{user_id}/tasks` - Create new task
- `GET /api/{user_id}/tasks/{id}` - Get specific task
- `PUT /api/{user_id}/tasks/{id}` - Update task
- `DELETE /api/{user_id}/tasks/{id}` - Delete task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion

## Testing User Isolation

1. Create User A and add 3 tasks
2. Sign out and create User B with 2 tasks
3. Verify User B cannot see User A's tasks
4. Sign back in as User A
5. Verify User A still sees only their 3 tasks

## Documentation

- **Backend**: See `backend/README.md` for detailed backend setup
- **Frontend**: See `frontend/README.md` for detailed frontend setup
- **Specification**: See `specs/001-fullstack-todo/spec.md`
- **Implementation Plan**: See `specs/001-fullstack-todo/plan.md`
- **Tasks**: See `specs/001-fullstack-todo/tasks.md`

## Security Notes

⚠️ **Important:**
- Never commit `.env` or `.env.local` files
- BETTER_AUTH_SECRET must be min 32 characters
- BETTER_AUTH_SECRET must match exactly between frontend and backend
- Use HTTPS in production

## Troubleshooting

**Backend connection issues:**
- Verify DATABASE_URL in `.env`
- Check Neon database is active

**Frontend CORS errors:**
- Verify backend CORS allows http://localhost:3000
- Check backend is running on port 8000

**Authentication errors:**
- Verify BETTER_AUTH_SECRET matches in both services
- Try signing out and signing in again

For detailed troubleshooting, see individual service README files.