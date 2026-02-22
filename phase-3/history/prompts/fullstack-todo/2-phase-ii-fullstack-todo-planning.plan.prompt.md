---
id: 2
title: Phase II Full-Stack Todo Planning
stage: plan
date: 2026-02-13
surface: agent
model: claude-sonnet-4-5
feature: 001-fullstack-todo
branch: 001-fullstack-todo
user: Muhammad Saad
command: /sp.plan
labels: ["planning", "architecture", "full-stack", "fastapi", "nextjs"]
links:
  spec: ../specs/001-fullstack-todo/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-fullstack-todo/spec.md
  - specs/001-fullstack-todo/plan.md
  - specs/001-fullstack-todo/research.md
  - specs/001-fullstack-todo/data-model.md
  - specs/001-fullstack-todo/contracts/api-spec.yaml
  - specs/001-fullstack-todo/contracts/auth-flow.md
  - specs/001-fullstack-todo/quickstart.md
tests:
  - None (planning phase)
---

## Prompt

# Phase II Plan — Full-Stack Web Todo (Next.js + FastAPI + Neon + Better Auth)

## Goal
Build a multi-user web todo app with:
- Next.js frontend
- FastAPI backend
- SQLModel ORM
- Neon Postgres persistence
- Better Auth signup/signin
- JWT-secured REST API

---

## Step 1 — Validate Repo Structure
- Confirm Phase-1 untouched.
- Confirm Phase-2 root contains:
  frontend/, backend/, specs/, specs_history/, CLAUDE.md, README.md

---

## Step 2 — Backend Foundation (FastAPI + SQLModel + Neon)
- Setup FastAPI app entrypoint
- Setup SQLModel engine + session
- Setup Neon DATABASE_URL loading from .env
- Create Task model + migrations strategy (simple create_all ok for Phase-2)
- Create health endpoint

---

## Step 3 — Authentication Bridge (Better Auth JWT → FastAPI)
- Setup Better Auth in Next.js
- Enable JWT issuance
- Store shared BETTER_AUTH_SECRET in both frontend and backend
- Implement FastAPI JWT verification dependency
- Enforce:
  - missing/invalid token => 401
  - URL user_id mismatch => 403

---

## Step 4 — Implement REST API Endpoints
Implement endpoints exactly as required:
- GET /api/{user_id}/tasks
- POST /api/{user_id}/tasks
- GET /api/{user_id}/tasks/{id}
- PUT /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH /api/{user_id}/tasks/{id}/complete

Rules:
- Every endpoint must filter by authenticated user
- Ownership enforced in every query

---

## Step 5 — Frontend UI (Next.js)
Create pages:
- / (landing)
- /signup
- /signin
- /tasks (dashboard)

Implement:
- Task list
- Create task form
- Edit task
- Delete task
- Toggle completion
- Logout

---

## Step 6 — Frontend API Client + JWT Attachment
- Build a single API client module
- Attach JWT token to every request
- Handle errors (401/403)

---

## Step 7 — End-to-End Testing
- Create user A and user B
- Verify user isolation
- Verify persistence in Neon
- Verify all 5 features work

---

## Step 8 — Documentation + Deliverables
- Update README.md
- Add run commands for both services
- Add env setup instruction

## Response snapshot

Executed complete planning workflow for Phase II full-stack todo application:

**Phase 0 - Research**: Created research.md documenting all technology decisions:
- Backend: FastAPI + SQLModel + Neon PostgreSQL
- Frontend: Next.js 16+ App Router + Better Auth + Tailwind CSS
- Authentication: JWT-based with python-jose verification
- All decisions include rationale, alternatives considered, and integration patterns

**Phase 1 - Design & Contracts**: Generated comprehensive design artifacts:
- data-model.md: Task entity schema with SQLModel definitions, validation rules, and CRUD operations
- contracts/api-spec.yaml: Complete OpenAPI 3.0 specification with all 6 endpoints
- contracts/auth-flow.md: Detailed JWT authentication flow with security considerations
- quickstart.md: Step-by-step setup guide for local development

**Constitution Check**: All requirements validated against Phase-II constitution:
- ✅ All 5 core features (Add, Delete, Update, View, Mark Complete)
- ✅ JWT-secured API with Better Auth
- ✅ User isolation enforced at query level
- ✅ Exact API contract as specified
- ✅ Monorepo structure (frontend/backend separation)
- ✅ No Phase-1 modifications

**Project Structure**: Defined complete directory layout for both services with clear separation of concerns.

**Agent Context**: Updated CLAUDE.md with new technology stack (Python 3.11+, TypeScript/Node.js 18+, Neon PostgreSQL).

## Outcome

- ✅ Impact: Complete implementation plan ready for task generation. All design decisions documented with rationale. Clear path from planning to implementation.
- 🧪 Tests: No tests run (planning phase). Test strategy documented in research.md for both backend (pytest) and frontend (Jest).
- 📁 Files: Created 7 planning artifacts (spec, plan, research, data-model, 2 contracts, quickstart). All files follow Spec-Kit Plus structure.
- 🔁 Next prompts: Run `/sp.tasks` to generate actionable implementation tasks from this plan. Then `/sp.implement` to execute tasks.
- 🧠 Reflection: Planning workflow completed successfully. All constitutional requirements validated. Technology choices align with Phase-II goals. Ready for task generation.

## Evaluation notes (flywheel)

- Failure modes observed: None. PHR script failed due to missing template path handling, but manual PHR creation succeeded.
- Graders run and results (PASS/FAIL): Constitution Check: PASS (all gates satisfied)
- Prompt variant (if applicable): Standard /sp.plan workflow with user-provided step-by-step plan
- Next experiment (smallest change to try): Generate tasks with `/sp.tasks` and validate task breakdown aligns with 8-step plan provided by user
