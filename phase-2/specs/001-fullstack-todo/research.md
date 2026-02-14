# Research: Full-Stack Web Todo Application

**Date**: 2026-02-13
**Feature**: 001-fullstack-todo

## Overview

This document captures research findings and technology decisions for the full-stack todo application. All technical choices are driven by the Phase-II constitution requirements.

## Technology Stack Decisions

### Backend Framework: FastAPI

**Decision**: Use FastAPI for the REST API backend

**Rationale**:
- Native async support for high performance
- Automatic OpenAPI documentation generation
- Built-in request/response validation with Pydantic
- Excellent integration with SQLModel (shares Pydantic base)
- Lightweight and fast (<200ms response time achievable)
- Strong typing support for Python 3.11+

**Alternatives Considered**:
- Flask: Lacks native async, requires extensions for validation
- Django REST Framework: Too heavy for simple CRUD API, more opinionated
- FastAPI chosen for performance, modern Python features, and SQLModel compatibility

### ORM: SQLModel

**Decision**: Use SQLModel for database operations

**Rationale**:
- Combines SQLAlchemy ORM with Pydantic validation
- Single model definition for DB and API schemas
- Type-safe queries with Python type hints
- Async support for FastAPI integration
- Simpler than raw SQLAlchemy for basic CRUD

**Alternatives Considered**:
- Raw SQLAlchemy: More verbose, separate schema definitions
- Tortoise ORM: Less mature, smaller ecosystem
- SQLModel chosen for simplicity and Pydantic integration

### Database: Neon Serverless PostgreSQL

**Decision**: Use Neon for PostgreSQL hosting

**Rationale**:
- Serverless architecture (auto-scaling, pay-per-use)
- PostgreSQL compatibility (standard SQL, ACID compliance)
- Instant provisioning, no server management
- Built-in connection pooling
- Free tier available for development

**Alternatives Considered**:
- Self-hosted PostgreSQL: Requires infrastructure management
- Supabase: Includes unnecessary features (auth, storage, realtime)
- Neon chosen for simplicity and PostgreSQL standard compliance

### Frontend Framework: Next.js 16+ (App Router)

**Decision**: Use Next.js with App Router

**Rationale**:
- React Server Components for better performance
- Built-in routing with file-system based structure
- TypeScript support out of the box
- API routes for Better Auth integration
- Excellent developer experience
- Production-ready with optimizations

**Alternatives Considered**:
- Create React App: Deprecated, no SSR
- Vite + React Router: More configuration needed
- Next.js Pages Router: Older pattern, App Router is current standard
- Next.js App Router chosen for modern React patterns and built-in features

### Authentication: Better Auth

**Decision**: Use Better Auth for authentication

**Rationale**:
- Modern, lightweight auth library for Next.js
- JWT token generation built-in
- Email/password authentication support
- TypeScript-first design
- Minimal configuration required
- Active development and maintenance

**Alternatives Considered**:
- NextAuth.js: More complex, heavier, session-based by default
- Auth0/Clerk: Third-party services, unnecessary for simple use case
- Custom JWT implementation: Reinventing the wheel, security risks
- Better Auth chosen for simplicity and JWT-first approach

### JWT Verification: python-jose

**Decision**: Use python-jose for JWT verification in FastAPI

**Rationale**:
- Standard JWT library for Python
- Supports multiple algorithms (HS256, RS256)
- Well-tested and widely used
- Simple API for token verification
- Compatible with Better Auth JWT format

**Alternatives Considered**:
- PyJWT: Similar functionality, python-jose has better FastAPI examples
- authlib: More features than needed
- python-jose chosen for simplicity and community adoption

### Styling: Tailwind CSS

**Decision**: Use Tailwind CSS for frontend styling

**Rationale**:
- Utility-first approach (no inline styles, as required)
- Responsive design built-in
- Small production bundle (unused classes purged)
- Excellent Next.js integration
- Fast development with IntelliSense

**Alternatives Considered**:
- CSS Modules: More verbose, manual responsive design
- Styled Components: Runtime overhead, not ideal for SSR
- Tailwind chosen for speed and modern best practices

## Architecture Patterns

### Authentication Flow

**Pattern**: JWT-based stateless authentication

**Flow**:
1. User signs up/signs in via Better Auth in Next.js
2. Better Auth generates JWT token with user_id claim
3. Frontend stores token (httpOnly cookie or localStorage)
4. Frontend attaches token to every API request (Authorization header)
5. FastAPI dependency verifies JWT signature and extracts user_id
6. FastAPI enforces user_id in URL matches token user_id (403 if mismatch)

**Security Considerations**:
- Shared BETTER_AUTH_SECRET between frontend and backend
- Token expiration (configurable, default 7 days)
- HTTPS required in production
- CORS configuration for local development

### API Design Pattern

**Pattern**: RESTful API with resource-based URLs

**Conventions**:
- Resource: `/api/{user_id}/tasks`
- Collection GET: List all tasks for user
- Collection POST: Create new task
- Item GET: Retrieve single task
- Item PUT: Update entire task
- Item DELETE: Remove task
- Item PATCH: Partial update (completion toggle)

**User Isolation**:
- Every endpoint includes `{user_id}` in URL
- JWT verification extracts authenticated user_id
- 403 Forbidden if URL user_id ≠ token user_id
- All database queries filter by authenticated user_id

### Database Schema Pattern

**Pattern**: Single-table design with user_id foreign key

**Rationale**:
- Simple CRUD operations
- User isolation via indexed user_id column
- No complex joins needed
- Timestamps for audit trail

**Migration Strategy**:
- Phase-II: Use SQLModel.metadata.create_all() for simplicity
- Future: Alembic for production migrations

## Best Practices Applied

### Backend
- Dependency injection for database sessions
- Pydantic schemas for request/response validation
- HTTP status codes: 200 (OK), 201 (Created), 204 (No Content), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found)
- Environment variables for secrets (never hardcoded)
- CORS middleware for local development

### Frontend
- TypeScript strict mode for type safety
- Component composition (TaskList → TaskItem)
- API client abstraction (single module for all requests)
- Error boundary for graceful error handling
- Loading states for async operations
- Protected routes with AuthGuard wrapper

### Security
- JWT signature verification on every request
- User_id validation (URL vs token)
- Password hashing (handled by Better Auth)
- Environment variables for secrets
- CORS whitelist (not wildcard)
- SQL injection prevention (SQLModel parameterized queries)

## Integration Points

### Better Auth ↔ FastAPI

**Challenge**: Better Auth (Next.js) generates JWT, FastAPI must verify it

**Solution**:
1. Share BETTER_AUTH_SECRET between services
2. Better Auth uses HS256 algorithm (symmetric key)
3. FastAPI uses python-jose to verify with same secret
4. Extract user_id from JWT claims
5. Create FastAPI dependency: `get_current_user(token: str)`

**Configuration**:
- Frontend: Better Auth config with JWT enabled
- Backend: JWT verification dependency with shared secret

### Frontend ↔ Backend CORS

**Challenge**: Local development has frontend (localhost:3000) and backend (localhost:8000) on different origins

**Solution**:
- FastAPI CORS middleware with allowed origins
- Development: Allow localhost:3000
- Production: Allow specific domain only
- Credentials: true (for cookies if used)

**Configuration**:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Performance Considerations

### Backend
- Connection pooling (SQLModel engine configuration)
- Async endpoints for I/O operations
- Index on user_id column for fast filtering
- Limit query results (pagination if needed)

### Frontend
- React Server Components for initial render
- Client components only where interactivity needed
- Optimistic UI updates for better UX
- Debounce search/filter inputs

## Testing Strategy

### Backend Tests (pytest)
- Unit tests: JWT verification, model validation
- Integration tests: API endpoints with test database
- Fixtures: Test user, test tasks, authenticated client

### Frontend Tests (Jest + React Testing Library)
- Component tests: TaskList, TaskForm, TaskItem
- Integration tests: Full user flows
- Mock API responses for isolated testing

## Environment Setup

### Required Accounts/Services
- Neon account (free tier) for PostgreSQL database
- Node.js 18+ installed
- Python 3.11+ installed

### Environment Variables
**Backend (.env)**:
```
DATABASE_URL=postgresql://user:pass@host/db
BETTER_AUTH_SECRET=shared-secret-min-32-chars
```

**Frontend (.env.local)**:
```
BETTER_AUTH_SECRET=shared-secret-min-32-chars
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Risks and Mitigations

### Risk: Better Auth JWT format incompatibility
**Mitigation**: Test JWT verification early, document token structure

### Risk: CORS issues in production
**Mitigation**: Configure allowed origins explicitly, test with production URLs

### Risk: Database connection limits
**Mitigation**: Use connection pooling, monitor active connections

### Risk: JWT secret mismatch between services
**Mitigation**: Use .env files, document setup process clearly

## Next Steps

Phase 1 will produce:
1. data-model.md - Task entity schema
2. contracts/api-spec.yaml - OpenAPI specification
3. contracts/auth-flow.md - Authentication flow diagram
4. quickstart.md - Setup and run instructions
