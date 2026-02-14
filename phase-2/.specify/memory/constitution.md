<!-- SYNC IMPACT REPORT
Version change: N/A (initial version) → 1.0.0
Modified principles: None (new constitution)
Added sections: All sections (new constitution)
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
  - README.md ⚠ pending
Follow-up TODOs: None
-->
# Phase II (Full-Stack Web Todo) Constitution

## Core Principles

### Non-Negotiables
No manual coding. All code must be generated via Claude Code using Spec-Kit Plus. Spec → Plan → Tasks → Implement → Verify (always). Do not modify Phase-1 folder. Phase-1 is frozen and must remain reproducible.

### Phase Goal
Transform the Phase-I console todo app into a modern multi-user full-stack web application with: REST API (FastAPI), Persistent storage (Neon Serverless PostgreSQL), ORM (SQLModel), Frontend (Next.js 16+ App Router), Authentication (Better Auth), JWT-secured API (FastAPI validates JWT).

### Required Features (Basic Level)
Phase-II must implement the same 5 basic features: Add Task, Delete Task, Update Task, View Task List, Mark Complete (toggle). All features must work through the web UI and API.

### Authentication Rules
Authentication must be implemented using Better Auth in Next.js. Better Auth must issue JWT tokens. Frontend must attach JWT to every API request. All endpoints require a valid JWT token. Missing/invalid token returns 401. User_id in URL must match the authenticated user.

### API Contract
Required endpoints: GET /api/{user_id}/tasks, POST /api/{user_id}/tasks, GET /api/{user_id}/tasks/{id}, PUT /api/{user_id}/tasks/{id}, DELETE /api/{user_id}/tasks/{id}, PATCH /api/{user_id}/tasks/{id}/complete. All endpoints require a valid JWT token. Missing/invalid token => 401. user_id in URL must match the authenticated user.

### Database Rules
Use Neon Serverless PostgreSQL. Use SQLModel for all DB operations. Tasks table must include: id (int), user_id (string), title (string), description (text, optional), completed (bool), created_at, updated_at timestamps.

### Monorepo Structure
Phase-2 must be isolated in its own folder: phase-2/frontend (Next.js), phase-2/backend (FastAPI), phase-2/specs (Spec-Kit), phase-2/.spec-kit/config.yaml, phase-2/CLAUDE.md (Phase-2 root guidance), phase-2/frontend/CLAUDE.md, phase-2/backend/CLAUDE.md.

### Frontend Rules
Next.js 16+ App Router, TypeScript, Responsive UI, Clean and modern layout, No inline styles; use Tailwind, UI must support: Signup / Signin, Task CRUD, Completion toggle.

### Backend Rules
FastAPI service, SQLModel ORM, JWT verification middleware/dependency, Clean route separation, Return proper HTTP codes and JSON responses.

## Additional Constraints

### Environment Variables
Frontend must use: BETTER_AUTH_SECRET, NEXT_PUBLIC_API_URL. Backend must use: DATABASE_URL (Neon), BETTER_AUTH_SECRET (same value as frontend).

### Quality Gates
Phase-II is complete only if: Both services run locally, Signup/signin works, JWT-secured API works, Each user only sees their own tasks, All 5 features work end-to-end via UI, Neon DB persists tasks across restarts.

## Development Workflow

### Do Not Do List
Do not add extra features (filters, tags, etc.) unless Phase-II is fully complete. Do not change the endpoint contract. Do not replace Better Auth with another auth system.

## Governance

All development must follow the Spec → Plan → Tasks → Implement → Verify sequence. No manual coding is allowed - all code must be generated via Claude Code. Phase-1 remains frozen and must remain reproducible. All code generation must use Spec-Kit Plus tools.

**Version**: 1.0.0 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05