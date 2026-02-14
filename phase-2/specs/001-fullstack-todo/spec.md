# Feature Specification: Full-Stack Web Todo Application

**Feature ID**: 001-fullstack-todo
**Branch**: 001-fullstack-todo
**Date**: 2026-02-13
**Status**: Planning

## Overview

Transform the Phase-I console todo app into a modern multi-user full-stack web application with persistent storage, authentication, and a REST API.

## Goals

Build a multi-user web todo app with:
- Next.js frontend (App Router)
- FastAPI backend
- SQLModel ORM
- Neon Postgres persistence
- Better Auth signup/signin
- JWT-secured REST API

## Requirements

### Functional Requirements

#### Core Features (Must Have)
1. **Add Task**: Users can create new tasks with title and optional description
2. **Delete Task**: Users can delete their own tasks
3. **Update Task**: Users can edit task title and description
4. **View Task List**: Users can see all their tasks
5. **Mark Complete**: Users can toggle task completion status

#### Authentication Requirements
- Users must sign up with email/password
- Users must sign in to access their tasks
- Each user only sees their own tasks
- JWT tokens secure all API requests

### Technical Requirements

#### Backend (FastAPI)
- REST API with SQLModel ORM
- Neon Serverless PostgreSQL database
- JWT verification middleware
- Required endpoints:
  - `GET /api/{user_id}/tasks` - List all tasks for user
  - `POST /api/{user_id}/tasks` - Create new task
  - `GET /api/{user_id}/tasks/{id}` - Get single task
  - `PUT /api/{user_id}/tasks/{id}` - Update task
  - `DELETE /api/{user_id}/tasks/{id}` - Delete task
  - `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion

#### Frontend (Next.js)
- Next.js 16+ with App Router
- TypeScript
- Tailwind CSS for styling
- Better Auth integration
- Pages required:
  - `/` - Landing page
  - `/signup` - User registration
  - `/signin` - User login
  - `/tasks` - Task dashboard (protected)

#### Database Schema
Tasks table must include:
- `id` (int, primary key)
- `user_id` (string, indexed)
- `title` (string, required)
- `description` (text, optional)
- `completed` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Security Requirements

- All API endpoints require valid JWT token
- Missing/invalid token returns 401 Unauthorized
- `user_id` in URL must match authenticated user (403 Forbidden if mismatch)
- Passwords hashed by Better Auth
- Environment variables for secrets (BETTER_AUTH_SECRET, DATABASE_URL)

### Quality Gates

Phase-II is complete only if:
- Both services run locally
- Signup/signin works
- JWT-secured API works
- Each user only sees their own tasks
- All 5 features work end-to-end via UI
- Neon DB persists tasks across restarts

## Constraints

### Non-Negotiables
- Do not modify Phase-1 folder (frozen)
- No manual coding (all via Claude Code + Spec-Kit Plus)
- Follow Spec → Plan → Tasks → Implement → Verify sequence
- Use Better Auth (no substitutions)
- Use exact endpoint contract specified

### Out of Scope
- Advanced features (filters, tags, priorities, due dates)
- Real-time updates
- Mobile apps
- Email verification
- Password reset
- Social login
- Task sharing between users

## Success Criteria

1. User A can sign up, create tasks, and see only their tasks
2. User B can sign up, create tasks, and see only their tasks
3. Tasks persist in Neon database across server restarts
4. All 5 core features work through web UI
5. API returns proper HTTP status codes (401, 403, 404, etc.)
6. Frontend handles authentication errors gracefully

## Dependencies

- Neon Serverless PostgreSQL account
- Node.js 18+ for Next.js
- Python 3.11+ for FastAPI
- Better Auth library
- SQLModel library
- JWT library (PyJWT)

## Risks

1. **Better Auth JWT integration**: May require custom configuration to work with FastAPI
2. **CORS configuration**: Frontend and backend on different ports locally
3. **Environment variable management**: Shared secret between services
4. **Database migrations**: Simple create_all approach may not scale
