# Implementation Plan: Full-Stack Web Todo Application

**Branch**: `001-fullstack-todo` | **Date**: 2026-02-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-fullstack-todo/spec.md`

## Summary

Build a multi-user web todo application with Next.js frontend, FastAPI backend, SQLModel ORM, Neon Postgres persistence, and Better Auth JWT-secured authentication. Transform Phase-I console app into a full-stack web application supporting the same 5 core features (Add, Delete, Update, View, Mark Complete) with user isolation and persistent storage.

## Technical Context

**Language/Version**: Python 3.11+ (backend), TypeScript/Node.js 18+ (frontend)
**Primary Dependencies**:
- Backend: FastAPI, SQLModel, PyJWT, python-jose, passlib, psycopg2-binary
- Frontend: Next.js 16+, Better Auth, TypeScript, Tailwind CSS, React 19+

**Storage**: Neon Serverless PostgreSQL (cloud-hosted)
**Testing**: pytest (backend), Jest/React Testing Library (frontend)
**Target Platform**: Web application (local development, cloud deployment ready)
**Project Type**: Web (frontend + backend)
**Performance Goals**: <200ms API response time, support 100+ concurrent users
**Constraints**:
- JWT token validation on every request
- User isolation enforced at database query level
- No modification to Phase-1 folder
- CORS configuration for local development

**Scale/Scope**:
- 2 services (frontend, backend)
- 6 API endpoints
- 4 frontend pages
- Single database table (tasks)
- Multi-user support with authentication

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Non-Negotiables
- [x] No manual coding - all via Claude Code + Spec-Kit Plus
- [x] Spec → Plan → Tasks → Implement → Verify workflow
- [x] Phase-1 folder remains untouched
- [x] All code generated, not manually written

### ✅ Phase Goal Alignment
- [x] Transform Phase-I console app to full-stack web
- [x] REST API with FastAPI
- [x] Persistent storage with Neon PostgreSQL
- [x] SQLModel ORM
- [x] Next.js 16+ App Router frontend
- [x] Better Auth authentication
- [x] JWT-secured API

### ✅ Required Features (Basic Level)
- [x] Add Task
- [x] Delete Task
- [x] Update Task
- [x] View Task List
- [x] Mark Complete (toggle)
- [x] All features work through web UI and API

### ✅ Authentication Rules
- [x] Better Auth in Next.js
- [x] JWT token issuance
- [x] JWT attached to every API request
- [x] All endpoints require valid JWT
- [x] Missing/invalid token → 401
- [x] user_id in URL must match authenticated user

### ✅ API Contract
- [x] GET /api/{user_id}/tasks
- [x] POST /api/{user_id}/tasks
- [x] GET /api/{user_id}/tasks/{id}
- [x] PUT /api/{user_id}/tasks/{id}
- [x] DELETE /api/{user_id}/tasks/{id}
- [x] PATCH /api/{user_id}/tasks/{id}/complete
- [x] All endpoints require JWT
- [x] 401 for missing/invalid token
- [x] user_id must match authenticated user

### ✅ Database Rules
- [x] Neon Serverless PostgreSQL
- [x] SQLModel for all DB operations
- [x] Tasks table schema: id, user_id, title, description, completed, created_at, updated_at

### ✅ Monorepo Structure
- [x] phase-2/frontend (Next.js)
- [x] phase-2/backend (FastAPI)
- [x] phase-2/specs (Spec-Kit)
- [x] phase-2/.specify/config.yaml
- [x] phase-2/CLAUDE.md (root guidance)
- [x] phase-2/frontend/CLAUDE.md
- [x] phase-2/backend/CLAUDE.md

### ✅ Frontend Rules
- [x] Next.js 16+ App Router
- [x] TypeScript
- [x] Responsive UI
- [x] Tailwind CSS (no inline styles)
- [x] Signup/Signin pages
- [x] Task CRUD UI
- [x] Completion toggle

### ✅ Backend Rules
- [x] FastAPI service
- [x] SQLModel ORM
- [x] JWT verification middleware/dependency
- [x] Clean route separation
- [x] Proper HTTP codes and JSON responses

### ✅ Environment Variables
- [x] Frontend: BETTER_AUTH_SECRET, NEXT_PUBLIC_API_URL
- [x] Backend: DATABASE_URL, BETTER_AUTH_SECRET

### ✅ Quality Gates
- [x] Both services run locally
- [x] Signup/signin works
- [x] JWT-secured API works
- [x] User isolation (each user sees only their tasks)
- [x] All 5 features work end-to-end via UI
- [x] Neon DB persists tasks across restarts

**Gate Status**: ✅ PASS - All constitutional requirements aligned with plan

## Project Structure

### Documentation (this feature)

```text
specs/001-fullstack-todo/
├── spec.md              # Feature specification
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── api-spec.yaml    # OpenAPI specification
│   └── auth-flow.md     # Authentication flow documentation
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
phase-2/
├── backend/
│   ├── src/
│   │   ├── main.py              # FastAPI app entrypoint
│   │   ├── config.py            # Configuration and environment
│   │   ├── database.py          # SQLModel engine and session
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── task.py          # Task SQLModel
│   │   ├── auth/
│   │   │   ├── __init__.py
│   │   │   └── jwt_handler.py   # JWT verification dependency
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── health.py        # Health check endpoint
│   │   │   └── tasks.py         # Task CRUD endpoints
│   │   └── schemas/
│   │       ├── __init__.py
│   │       └── task.py          # Pydantic schemas for requests/responses
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py          # Pytest fixtures
│   │   ├── test_auth.py         # JWT verification tests
│   │   └── test_tasks.py        # Task endpoint tests
│   ├── .env.example
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── signup/
│   │   │   │   └── page.tsx     # Signup page
│   │   │   ├── signin/
│   │   │   │   └── page.tsx     # Signin page
│   │   │   └── tasks/
│   │   │       └── page.tsx     # Task dashboard (protected)
│   │   ├── components/
│   │   │   ├── TaskList.tsx     # Task list component
│   │   │   ├── TaskForm.tsx     # Create/edit task form
│   │   │   ├── TaskItem.tsx     # Single task item
│   │   │   └── AuthGuard.tsx    # Route protection wrapper
│   │   ├── lib/
│   │   │   ├── api-client.ts    # API client with JWT attachment
│   │   │   ├── auth.ts          # Better Auth configuration
│   │   │   └── types.ts         # TypeScript types
│   │   └── styles/
│   │       └── globals.css      # Tailwind imports
│   ├── tests/
│   │   └── components/
│   │       └── TaskList.test.tsx
│   ├── .env.local.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── README.md
│
├── specs/                       # Spec-Kit documentation
├── .specify/                    # Spec-Kit configuration
├── CLAUDE.md                    # Phase-2 root guidance
└── README.md                    # Phase-2 overview
```

**Structure Decision**: Web application structure (Option 2) selected. Separate backend and frontend directories for clear service boundaries. Backend uses standard FastAPI structure with models, API routes, and auth middleware. Frontend uses Next.js App Router structure with app directory, components, and lib utilities.

## Complexity Tracking

No constitutional violations. All requirements align with constitution principles.
