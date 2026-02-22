---
id: 1
title: "create-fullstack-todo-app-spec"
stage: "spec"
date_iso: "2026-02-09"
surface: "agent"
model: "Claude Sonnet 4.5"
feature: "fullstack-todo"
branch: "001-fullstack-todo"
user: "user"
command: "/sp.specify"
labels:
  - "specification"
  - "todo-app"
  - "authentication"
  - "fullstack"
links:
  spec: "specs/phase-2-full-spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/phase-2-full-spec.md"
  - "specs/checklists/requirements.md"
  - "phase-2/CLAUDE.md"
  - "phase-2/frontend/CLAUDE.md"
  - "phase-2/backend/CLAUDE.md"
  - "phase-2/README.md"
tests_yaml:
  - "Specification quality validation completed"
  - "Template structure compliance verified"
  - "All mandatory sections present"
prompt_text: "# Phase II — Full-Stack Todo Web Application (FULL SPEC)

## 1) Objective
Using Claude Code + Spec-Kit Plus, transform the Phase-I console todo app into a modern multi-user web application with persistent storage.

This phase must be implemented strictly via Spec-Driven Development:
Spec → Plan → Tasks → Implement → Verify
No manual coding allowed.

Phase-I is frozen and must not be modified.

---

## 2) Tech Stack (Hard Requirement)
Frontend:
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS

Backend:
- Python FastAPI

ORM:
- SQLModel

Database:
- Neon Serverless PostgreSQL

Authentication:
- Better Auth (Next.js)
- JWT tokens shared with FastAPI

Spec-Driven:
- Claude Code + Spec-Kit Plus

---

## 3) Monorepo Folder Structure (Mandatory)
Phase-II must be isolated inside:

phase-2/
  specs/
    phase-2-full-spec.md
  frontend/
  backend/
  .spec-kit/
  CLAUDE.md
  README.md

Additionally:
- phase-2/frontend/CLAUDE.md must exist
- phase-2/backend/CLAUDE.md must exist

---

## 4) Core Features (Basic Level) — MUST WORK
Phase-II must implement all 5 basic todo features end-to-end via UI and API:

1. Add Task
2. Delete Task
3. Update Task
4. View Task List
5. Mark Task as Complete (toggle)

All tasks must be persistent in Neon Postgres.

---

## 5) Authentication Requirements (Better Auth + JWT)
Authentication must be implemented using Better Auth in Next.js.

### Mandatory behavior:
- Users must be able to Sign Up and Sign In.
- Better Auth must be configured to issue JWT tokens.
- The frontend must attach JWT to every API request:
  Authorization: Bearer <token>

### Shared secret:
Both frontend and backend MUST use the same secret:
- BETTER_AUTH_SECRET

### Backend security requirements:
- Backend must verify JWT signature for every request.
- Backend must decode JWT and extract user identity.
- Backend must enforce user isolation:
  - users can only see their own tasks
  - users can only modify their own tasks

---

## 6) REST API Endpoints (Must Match Exactly)
All endpoints MUST exist and behave correctly.

### Base:
All routes are under `/api/`

### Security rule:
All endpoints require valid JWT token.
- Missing token => 401 Unauthorized
- Invalid token => 401 Unauthorized
- If URL user_id != authenticated user => 403 Forbidden

### Endpoints:

GET /api/{user_id}/tasks
- List all tasks for authenticated user
- Returns only tasks belonging to that user

POST /api/{user_id}/tasks
- Create a new task for that user

GET /api/{user_id}/tasks/{id}
- Get task details (must be owned by user)

PUT /api/{user_id}/tasks/{id}
- Update a task (title, description)

DELETE /api/{user_id}/tasks/{id}
- Delete a task

PATCH /api/{user_id}/tasks/{id}/complete
- Toggle completion status

---

## 7) Database Schema (Neon Postgres + SQLModel)
The database must be Neon Serverless PostgreSQL.

Use SQLModel for all database operations.

### Table: tasks
Fields:
- id: integer primary key
- user_id: string (required, indexed)
- title: string (required, 1-200 chars)
- description: text (optional, max 1000 chars)
- completed: boolean (default false)
- created_at: timestamp
- updated_at: timestamp

### Rules:
- All tasks must always store the authenticated user's user_id.
- All queries must filter by user_id.
- Ownership must be enforced at DB query level.

---

## 8) Frontend UI Requirements (Next.js)
The frontend must be responsive and clean.

### Pages:
- `/`
  - landing page
  - buttons: Sign Up / Sign In

- `/signup`
  - email + password form
  - create account

- `/signin`
  - email + password form
  - login

- `/tasks`
  - authenticated dashboard
  - show tasks list
  - create task form
  - edit task
  - delete task
  - toggle completion
  - logout button

### UI components:
Each task item must show:
- title
- description (if any)
- completed status
- buttons: edit, delete, toggle complete

### UX requirements:
- Loading states
- Error handling for API + auth errors
- Mobile-friendly layout

---

## 9) Backend Requirements (FastAPI)
The backend must:
- Expose all endpoints exactly as specified.
- Validate JWT on every request.
- Extract authenticated user id from JWT.
- Enforce that URL user_id matches JWT user.
- Enforce ownership for every task operation.
- Use SQLModel for all DB interactions.
- Return correct HTTP status codes.

---

## 10) Environment Variables (Mandatory)
### Frontend (.env)
- BETTER_AUTH_SECRET=...
- NEXT_PUBLIC_API_URL=http://localhost:8000

### Backend (.env)
- DATABASE_URL=postgresql+psycopg://...
- BETTER_AUTH_SECRET=...   (same value as frontend)

---

## 11) Definition of Done (Phase-II Completion Checklist)
Phase-II is considered complete ONLY when:

- Both services run locally:
  - frontend on localhost (Next.js)
  - backend on localhost:8000 (FastAPI)

- Authentication works:
  - signup works
  - signin works
  - logout works

- JWT security works:
  - missing token => 401
  - invalid token => 401
  - mismatched user_id => 403

- All 5 features work end-to-end:
  - Add task
  - View tasks
  - Update task
  - Delete task
  - Toggle complete

- Neon DB persistence works:
  - tasks remain after restart
"
response_text: "Successfully created comprehensive specification for the Full-Stack Todo Web Application following the template structure. Created the main spec file at specs/phase-2-full-spec.md with proper sections: User Scenarios & Testing, Requirements (Functional Requirements and Key Entities), and Success Criteria. Created quality checklist at specs/checklists/requirements.md to validate specification completeness. Generated CLAUDE.md files for phase-2, frontend, and backend directories as required by the specification. Created directory structure and README.md file. All requirements were validated and the specification is ready for the planning phase (/sp.plan)."
outcome: "Specification successfully created and validated following SDD methodology. Ready to proceed to planning phase."
evaluation: "The specification meets all template requirements with properly formatted sections, clear user scenarios with acceptance criteria, testable functional requirements, and measurable success criteria. Quality validation checklist confirms completeness."
---

# Prompt History Record: Create Full-Stack Todo App Specification

## Summary
Created comprehensive specification for the Full-Stack Todo Web Application following template structure.

## Details
- **Stage**: spec
- **Date**: 2026-02-09
- **Surface**: agent
- **Model**: Claude Sonnet 4.5
- **Feature**: fullstack-todo
- **Branch**: 001-fullstack-todo
- **Command**: /sp.specify

## Files Created/Modified
- specs/phase-2-full-spec.md
- specs/checklists/requirements.md
- phase-2/CLAUDE.md
- phase-2/frontend/CLAUDE.md
- phase-2/backend/CLAUDE.md
- phase-2/README.md

## Tests Performed
- Specification quality validation completed
- Template structure compliance verified
- All mandatory sections present

## Original Prompt
[Full prompt text included above]

## Response Summary
Successfully created comprehensive specification for the Full-Stack Todo Web Application following the template structure. Created the main spec file at specs/phase-2-full-spec.md with proper sections: User Scenarios & Testing, Requirements (Functional Requirements and Key Entities), and Success Criteria. Created quality checklist at specs/checklists/requirements.md to validate specification completeness. Generated CLAUDE.md files for phase-2, frontend, and backend directories as required by the specification. Created directory structure and README.md file. All requirements were validated and the specification is ready for the planning phase (/sp.plan).

## Outcome
Specification successfully created and validated following SDD methodology. Ready to proceed to planning phase.

## Evaluation
The specification meets all template requirements with properly formatted sections, clear user scenarios with acceptance criteria, testable functional requirements, and measurable success criteria. Quality validation checklist confirms completeness.