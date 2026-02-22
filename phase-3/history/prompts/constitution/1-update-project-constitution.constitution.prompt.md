---
id: 1
title: "Update Project Constitution for Phase II"
stage: constitution
date_iso: 2026-02-05
surface: "agent"
model: "claude-sonnet-4-5-20250929"
feature: "phase-2"
branch: "main"
user: "user"
command: "/sp.constitution"
labels: ["constitution", "spec", "phase-2"]
link_spec: "null"
link_ticket: "null"
link_adr: "null"
link_pr: "null"
files_yaml: |
  - .specify/memory/constitution.md
tests_yaml: |
  - none
prompt_text: |
  # Constitution — Phase II (Full-Stack Web Todo)

  ## 0) Non-Negotiables
  - No manual coding. All code must be generated via Claude Code using Spec-Kit Plus.
  - Spec → Plan → Tasks → Implement → Verify (always).
  - Do not modify Phase-1 folder. Phase-1 is frozen and must remain reproducible.

  ## 1) Phase Goal
  Transform the Phase-I console todo app into a modern multi-user full-stack web application with:
  - REST API (FastAPI)
  - Persistent storage (Neon Serverless PostgreSQL)
  - ORM (SQLModel)
  - Frontend (Next.js 16+ App Router)
  - Authentication (Better Auth)
  - JWT-secured API (FastAPI validates JWT)

  ## 2) Required Features (Basic Level)
  Phase-II must implement the same 5 basic features:
  1. Add Task
  2. Delete Task
  3. Update Task
  4. View Task List
  5. Mark Complete (toggle)

  All features must work through the web UI and API.

  ## 3) Authentication Rules (Hard Requirements)
  - Authentication must be implemented using Better Auth in Next.js.
  - Better Auth must issue JWT tokens.
  - Frontend must attach JWT to ever## 4) API Contract (Must Match)
  Endpoints (must exist and work):

  - GET    /api/{user_id}/tasks
  - POST   /api/{user_id}/tasks
  - GET    /api/{user_id}/tasks/{id}
  - PUT    /api/{user_id}/tasks/{id}
  - DELETE /api/{user_id}/tasks/{id}
  - PATCH  /api/{user_id}/tasks/{id}/complete

  Security:
  - All endpoints require a valid JWT token.
  - Missing/invalid token => 401
  - user_id in URL must match the authenticated user.

  ## 5) Database Rules
  - Use Neon Serverless PostgreSQL.
  - Use SQLModel for all DB operations.
  - Tasks table must include:
    - id (int)
    - user_id (string)
    - title (string)
    - description (text, optional)
    - completed (bool)
    - created_at, updated_at timestamps

  ## 6) Monorepo Structure (Mandatory)
  Phase-2 must be isolated in its own folder:
  - `phase-2/frontend` (Next.js)
  - `phase-2/backend` (FastAPI)
  - `phase-2/specs` (Spec-Kit)
  - `phase-2/.spec-kit/config.yaml`
  - `phase-2/CLAUDE.md` (Phase-2 root guidance)
  - `phase-2/frontend/CLAUDE.md`
  - `phase-2/backend/CLAUDE.md`

  ## 7) Frontend Rules
  - Next.js 16+ App Router
  - TypeScript
  - Responsive UI
  - Clean and modern layout
  - No inline styles; use Tailwind
  - UI must support:
    - Signup / Signin
    - Task CRUD
    - Completion toggle

  ## 8) Backend Rules
  - FastAPI service
  - SQLModel ORM
  - JWT verification middleware/dependency
  - Clean route separation
  - Return proper HTTP codes and JSON responses

  ## 9) Environment Variables (Must Use)
  Frontend:
  - BETTER_AUTH_SECRET
  - NEXT_PUBLIC_API_URL

  Backend:
  - DATABASE_URL (Neon)
  - BETTER_AUTH_SECRET (same value as frontend)

  ## 10) Quality Gates
  Phase-II is complete only if:
  - Both services run locally
  - Signup/signin works
  - JWT-secured API works
  - Each user only sees their own tasks
  - All 5 features work end-to-end via UI
  - Neon DB persists tasks across restarts

  ## 11) Do Not Do
  - Do not add extra features (filters, tags, etc.) unless Phase-II is fully complete.
  - Do not change the endpoint contract.
  - Do not replace Better Auth with another auth system.
response_text: |
  Updated the project constitution file (.specify/memory/constitution.md) to reflect the requirements for Phase II Full-Stack Web Todo application. The constitution now includes specific principles covering non-negotiables, phase goals, required features, authentication rules, API contracts, database rules, monorepo structure, frontend and backend rules, environment variables, quality gates, and development workflow constraints.
outcome: |
  The constitution has been successfully updated with all the requirements for the Phase II full-stack web todo application. The new constitution enforces the proper architecture, technology stack, and development practices needed for the transformation from the console app to a full web application with authentication and persistent storage.
evaluation: |
  The constitution update is complete and properly structured. All requirements from the user input have been incorporated into the constitution document. The version has been set to 1.0.0 as this is the initial version for Phase II, with appropriate dates set to today (2026-02-05). The sync impact report is included at the top of the file.
---

## Summary

This PHR documents the update to the project constitution for Phase II of the todo application. The constitution has been completely revised to reflect the requirements for transforming the console todo app into a modern multi-user full-stack web application with authentication, persistent storage, and proper API contracts.