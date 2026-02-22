# Tasks: Full-Stack Web Todo Application

**Input**: Design documents from `/specs/001-fullstack-todo/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Tests are NOT included in this task list as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by technical layer first (setup, foundational), then by user story to enable independent implementation and testing of each feature.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US5)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/`
- **Frontend**: `frontend/src/`
- All paths relative to phase-2 directory

---

## Phase 1: Setup & Audit

**Purpose**: Verify project structure and initialize both services

- [x] T001 Audit Phase-2 directory structure and confirm Phase-1 is untouched
- [x] T002 Print complete folder tree of phase-2 directory
- [x] T003 [P] Create backend/src directory structure (models/, api/, auth/, schemas/)
- [x] T004 [P] Create backend/requirements.txt with FastAPI, SQLModel, python-jose, psycopg2-binary, uvicorn, python-dotenv
- [x] T005 [P] Create backend/.env.example with DATABASE_URL and BETTER_AUTH_SECRET placeholders
- [x] T006 [P] Create frontend package.json with Next.js 16+, TypeScript, Tailwind CSS, Better Auth dependencies
- [x] T007 [P] Create frontend/.env.local.example with BETTER_AUTH_SECRET and NEXT_PUBLIC_API_URL placeholders

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Backend Foundation

- [x] T008 Create backend/src/config.py to load environment variables (DATABASE_URL, BETTER_AUTH_SECRET)
- [x] T009 Create backend/src/database.py with SQLModel engine, session factory, and get_db dependency
- [x] T010 Create backend/src/models/__init__.py
- [x] T011 Create backend/src/models/task.py with Task SQLModel (id, user_id, title, description, completed, created_at, updated_at)
- [x] T012 Create backend/src/schemas/__init__.py
- [x] T013 [P] Create backend/src/schemas/task.py with TaskCreate, TaskUpdate, TaskResponse Pydantic schemas
- [x] T014 Create backend/src/main.py with FastAPI app initialization and CORS middleware for http://localhost:3000
- [x] T015 Create backend/src/api/__init__.py
- [x] T016 [P] Create backend/src/api/health.py with GET /health endpoint (no auth required)
- [ ] T017 Test Neon DATABASE_URL connection and create tasks table using SQLModel.metadata.create_all()
- [ ] T018 Verify backend starts successfully with uvicorn on port 8000

### Authentication Foundation

- [x] T019 Create backend/src/auth/__init__.py
- [x] T020 Create backend/src/auth/jwt_handler.py with get_current_user dependency (verify JWT, extract user_id, return 401 if invalid)
- [x] T021 Add HTTPBearer security scheme to backend/src/auth/jwt_handler.py
- [ ] T022 Test JWT verification with a sample token to ensure BETTER_AUTH_SECRET works

### Frontend Foundation

- [x] T023 Initialize Next.js project in frontend/ with TypeScript and App Router
- [x] T024 Configure Tailwind CSS in frontend/tailwind.config.ts and frontend/styles/globals.css
- [x] T025 Create frontend/lib/types.ts with Task interface matching backend schema
- [x] T026 Install and configure Better Auth in frontend/lib/auth.ts with JWT enabled
- [x] T027 Create frontend/app/layout.tsx with root layout and Tailwind imports
- [x] T028 Create frontend/app/page.tsx with landing page (links to /signup and /signin)
- [ ] T029 Test frontend starts successfully with npm run dev on port 3000

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Add Task (Priority: P1) 🎯 MVP

**Goal**: Users can create new tasks with title and optional description

**Independent Test**: Sign in, create a task, verify it appears in the database

### Backend for US1

- [ ] T030 [US1] Create backend/src/api/tasks.py with POST /api/{user_id}/tasks endpoint
- [ ] T031 [US1] Implement user_id validation in POST endpoint (403 if user_id != authenticated user)
- [ ] T032 [US1] Implement task creation logic using TaskCreate schema and database session
- [ ] T033 [US1] Return 201 Created with TaskResponse on success
- [ ] T034 [US1] Register tasks router in backend/src/main.py

### Frontend for US1

- [ ] T035 [US1] Create frontend/src/app/signup/page.tsx with Better Auth signup form
- [ ] T036 [US1] Create frontend/src/app/signin/page.tsx with Better Auth signin form
- [ ] T037 [US1] Create frontend/src/lib/api-client.ts with base API client that attaches JWT token to requests
- [ ] T038 [US1] Add createTask function to frontend/src/lib/api-client.ts (POST /api/{user_id}/tasks)
- [ ] T039 [US1] Create frontend/src/components/TaskForm.tsx with title and description inputs
- [ ] T040 [US1] Create frontend/src/app/tasks/page.tsx with TaskForm component (protected route)
- [ ] T041 [US1] Implement form submission in TaskForm that calls createTask API
- [ ] T042 [US1] Add error handling for 401 (redirect to signin) and 403 (show error message)

**Checkpoint**: Users can sign up, sign in, and create tasks

---

## Phase 4: User Story 2 - View Task List (Priority: P1) 🎯 MVP

**Goal**: Users can see all their tasks in a list

**Independent Test**: Create multiple tasks, verify all appear in the list, verify other users' tasks don't appear

### Backend for US2

- [ ] T043 [US2] Add GET /api/{user_id}/tasks endpoint to backend/src/api/tasks.py
- [ ] T044 [US2] Implement user_id validation in GET endpoint (403 if user_id != authenticated user)
- [ ] T045 [US2] Query tasks filtered by authenticated user_id and return list of TaskResponse
- [ ] T046 [US2] Return 200 OK with empty array if no tasks found

### Frontend for US2

- [ ] T047 [US2] Add getTasks function to frontend/src/lib/api-client.ts (GET /api/{user_id}/tasks)
- [ ] T048 [US2] Create frontend/src/components/TaskItem.tsx to display single task (title, description, completed status)
- [ ] T049 [US2] Create frontend/src/components/TaskList.tsx to display array of TaskItem components
- [ ] T050 [US2] Integrate TaskList into frontend/src/app/tasks/page.tsx
- [ ] T051 [US2] Fetch tasks on page load and display in TaskList
- [ ] T052 [US2] Add loading state while fetching tasks
- [ ] T053 [US2] Handle empty state (no tasks yet)

**Checkpoint**: Users can view their task list, list updates after creating new tasks

---

## Phase 5: User Story 3 - Update Task (Priority: P2)

**Goal**: Users can edit task title and description

**Independent Test**: Edit a task, verify changes persist in database and UI

### Backend for US3

- [ ] T054 [US3] Add GET /api/{user_id}/tasks/{id} endpoint to backend/src/api/tasks.py
- [ ] T055 [US3] Add PUT /api/{user_id}/tasks/{id} endpoint to backend/src/api/tasks.py
- [ ] T056 [US3] Implement user_id validation in both endpoints (403 if mismatch)
- [ ] T057 [US3] Implement task lookup with 404 if not found or doesn't belong to user
- [ ] T058 [US3] Implement task update logic using TaskUpdate schema
- [ ] T059 [US3] Update updated_at timestamp on task modification
- [ ] T060 [US3] Return 200 OK with updated TaskResponse

### Frontend for US3

- [ ] T061 [US3] Add getTask function to frontend/src/lib/api-client.ts (GET /api/{user_id}/tasks/{id})
- [ ] T062 [US3] Add updateTask function to frontend/src/lib/api-client.ts (PUT /api/{user_id}/tasks/{id})
- [ ] T063 [US3] Add edit mode to TaskForm component (populate with existing task data)
- [ ] T064 [US3] Add edit button to TaskItem component
- [ ] T065 [US3] Implement edit flow: click edit → populate form → submit → update list
- [ ] T066 [US3] Add cancel button to exit edit mode without saving
- [ ] T067 [US3] Handle 404 error (task not found or deleted)

**Checkpoint**: Users can edit their tasks, changes persist and display correctly

---

## Phase 6: User Story 4 - Delete Task (Priority: P2)

**Goal**: Users can delete their own tasks

**Independent Test**: Delete a task, verify it's removed from database and UI

### Backend for US4

- [ ] T068 [US4] Add DELETE /api/{user_id}/tasks/{id} endpoint to backend/src/api/tasks.py
- [ ] T069 [US4] Implement user_id validation (403 if mismatch)
- [ ] T070 [US4] Implement task lookup and deletion with 404 if not found
- [ ] T071 [US4] Return 204 No Content on successful deletion

### Frontend for US4

- [ ] T072 [US4] Add deleteTask function to frontend/src/lib/api-client.ts (DELETE /api/{user_id}/tasks/{id})
- [ ] T073 [US4] Add delete button to TaskItem component
- [ ] T074 [US4] Add confirmation dialog before deleting (prevent accidental deletion)
- [ ] T075 [US4] Implement delete flow: click delete → confirm → remove from list
- [ ] T076 [US4] Handle 404 error gracefully (task already deleted)
- [ ] T077 [US4] Update task list immediately after deletion (optimistic UI update)

**Checkpoint**: Users can delete tasks, UI updates immediately

---

## Phase 7: User Story 5 - Mark Complete (Priority: P2)

**Goal**: Users can toggle task completion status

**Independent Test**: Toggle completion multiple times, verify state persists

### Backend for US5

- [ ] T078 [US5] Add PATCH /api/{user_id}/tasks/{id}/complete endpoint to backend/src/api/tasks.py
- [ ] T079 [US5] Implement user_id validation (403 if mismatch)
- [ ] T080 [US5] Implement completion toggle logic (completed = !completed)
- [ ] T081 [US5] Update updated_at timestamp on toggle
- [ ] T082 [US5] Return 200 OK with updated TaskResponse

### Frontend for US5

- [ ] T083 [US5] Add toggleComplete function to frontend/src/lib/api-client.ts (PATCH /api/{user_id}/tasks/{id}/complete)
- [ ] T084 [US5] Add checkbox to TaskItem component for completion status
- [ ] T085 [US5] Implement toggle flow: click checkbox → call API → update UI
- [ ] T086 [US5] Add visual distinction for completed tasks (strikethrough, different color)
- [ ] T087 [US5] Handle toggle errors gracefully (revert UI if API fails)
- [ ] T088 [US5] Use optimistic UI update for instant feedback

**Checkpoint**: All 5 core features are now functional

---

## Phase 8: Polish & Integration

**Purpose**: Cross-cutting improvements and final validation

### Authentication & Security

- [ ] T089 [P] Add logout functionality to frontend (clear token, redirect to landing)
- [ ] T090 [P] Create frontend/src/components/AuthGuard.tsx to protect /tasks route
- [ ] T091 [P] Add global error handler for 401 responses (auto-redirect to signin)
- [ ] T092 [P] Verify CORS configuration allows credentials and proper headers

### User Experience

- [ ] T093 [P] Add loading spinners for all async operations
- [ ] T094 [P] Add success/error toast notifications for user actions
- [ ] T095 [P] Make UI responsive for mobile devices using Tailwind breakpoints
- [ ] T096 [P] Add empty state illustrations and helpful messages
- [ ] T097 [P] Improve form validation with inline error messages

### Documentation & Deployment Readiness

- [ ] T098 [P] Create backend/README.md with setup and run instructions
- [ ] T099 [P] Create frontend/README.md with setup and run instructions
- [ ] T100 [P] Update phase-2/README.md with complete project overview
- [ ] T101 [P] Verify .env.example files have all required variables documented
- [ ] T102 Validate quickstart.md instructions by following them step-by-step

### End-to-End Validation

- [ ] T103 Create User A: signup, create 3 tasks, edit 1, delete 1, toggle completion on 1
- [ ] T104 Create User B: signup, create 2 tasks, verify User A's tasks are not visible
- [ ] T105 Sign in as User A again, verify only User A's tasks are visible (2 remaining)
- [ ] T106 Restart both backend and frontend services, verify tasks persist in Neon
- [ ] T107 Test all 5 features work end-to-end through the web UI
- [ ] T108 Verify all API endpoints return correct HTTP status codes (200, 201, 204, 401, 403, 404)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (Add Task) must complete before US2 (View List) for practical testing
  - US2 (View List) should complete before US3-5 for UI integration
  - US3 (Update), US4 (Delete), US5 (Complete) can proceed in parallel after US1+US2
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Add Task)**: Depends on Foundational - No dependencies on other stories
- **US2 (View List)**: Depends on Foundational - Practically needs US1 for testing
- **US3 (Update Task)**: Depends on Foundational + US1 + US2 - Needs tasks to exist and be visible
- **US4 (Delete Task)**: Depends on Foundational + US1 + US2 - Needs tasks to exist and be visible
- **US5 (Mark Complete)**: Depends on Foundational + US1 + US2 - Needs tasks to exist and be visible

### Within Each User Story

- Backend endpoints before frontend integration
- API client functions before UI components
- Core components before page integration
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**: T003-T007 can all run in parallel (different files)

**Phase 2 (Foundational)**:
- T013 (schemas) parallel with T010-T011 (models)
- T016 (health endpoint) parallel with T019-T022 (auth)
- T023-T029 (frontend foundation) parallel with T008-T022 (backend foundation)

**Phase 3-7 (User Stories)**: After US1+US2 complete, US3, US4, US5 can proceed in parallel

**Phase 8 (Polish)**: T089-T102 can all run in parallel (different concerns)

---

## Parallel Example: Foundational Phase

```bash
# Backend foundation (can run in parallel):
Task T013: "Create backend/src/schemas/task.py"
Task T016: "Create backend/src/api/health.py"

# Frontend foundation (can run in parallel with backend):
Task T023: "Initialize Next.js project"
Task T024: "Configure Tailwind CSS"
Task T025: "Create types.ts"
```

---

## Parallel Example: After US1+US2 Complete

```bash
# These user stories can proceed in parallel:
Task T054-T067: "User Story 3 - Update Task"
Task T068-T077: "User Story 4 - Delete Task"
Task T078-T088: "User Story 5 - Mark Complete"
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational (T008-T029) - CRITICAL
3. Complete Phase 3: US1 - Add Task (T030-T042)
4. Complete Phase 4: US2 - View List (T043-T053)
5. **STOP and VALIDATE**: Test signup, signin, create tasks, view list
6. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 + US2 → Test independently → Deploy/Demo (MVP!)
3. Add US3 → Test independently → Deploy/Demo
4. Add US4 → Test independently → Deploy/Demo
5. Add US5 → Test independently → Deploy/Demo
6. Polish → Final validation → Production ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T029)
2. Team completes US1 + US2 together (T030-T053) - needed for testing
3. Once US1+US2 done:
   - Developer A: US3 - Update Task (T054-T067)
   - Developer B: US4 - Delete Task (T068-T077)
   - Developer C: US5 - Mark Complete (T078-T088)
4. Team completes Polish together (T089-T108)

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All paths are relative to phase-2 directory
- Backend runs on http://localhost:8000
- Frontend runs on http://localhost:3000
- Shared BETTER_AUTH_SECRET must be identical in both .env files
