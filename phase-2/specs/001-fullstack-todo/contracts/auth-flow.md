# Authentication Flow: Full-Stack Web Todo Application

**Date**: 2026-02-13
**Feature**: 001-fullstack-todo

## Overview

This document describes the JWT-based authentication flow between the Next.js frontend (Better Auth) and FastAPI backend.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Next.js       │         │   Better Auth    │         │   FastAPI       │
│   Frontend      │         │   (Next.js)      │         │   Backend       │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │                            │
        │                            │                            │
        │  1. Signup/Signin          │                            │
        ├───────────────────────────>│                            │
        │                            │                            │
        │  2. JWT Token              │                            │
        │<───────────────────────────┤                            │
        │                            │                            │
        │  3. API Request + JWT      │                            │
        ├────────────────────────────┼───────────────────────────>│
        │                            │                            │
        │                            │  4. Verify JWT             │
        │                            │<───────────────────────────┤
        │                            │                            │
        │                            │  5. Extract user_id        │
        │                            │<───────────────────────────┤
        │                            │                            │
        │                            │  6. Validate user_id       │
        │                            │<───────────────────────────┤
        │                            │                            │
        │  7. API Response           │                            │
        │<───────────────────────────┼────────────────────────────┤
        │                            │                            │
```

## Detailed Flow

### 1. User Signup

**Frontend (Next.js + Better Auth)**:
```typescript
// User submits signup form
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

// Better Auth creates user and returns JWT
const { token, user } = await response.json();
```

**Better Auth**:
- Validates email format and password strength
- Hashes password with bcrypt
- Creates user record in Better Auth database
- Generates JWT token with claims:
  ```json
  {
    "sub": "user_abc123",
    "email": "user@example.com",
    "iat": 1707825600,
    "exp": 1708430400
  }
  ```
- Signs token with BETTER_AUTH_SECRET (HS256 algorithm)

**Frontend Storage**:
- Store token in httpOnly cookie (recommended) OR
- Store token in localStorage (simpler for Phase-II)

### 2. User Signin

**Frontend (Next.js + Better Auth)**:
```typescript
// User submits signin form
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

// Better Auth validates credentials and returns JWT
const { token, user } = await response.json();
```

**Better Auth**:
- Looks up user by email
- Verifies password hash
- Generates new JWT token (same structure as signup)
- Returns token to frontend

### 3. API Request with JWT

**Frontend API Client**:
```typescript
// api-client.ts
async function apiRequest(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    // Redirect to signin
    window.location.href = '/signin';
  }

  if (response.status === 403) {
    // Show error: forbidden
    throw new Error('Access forbidden');
  }

  return response;
}

// Example: Get tasks
const response = await apiRequest(`/api/${userId}/tasks`);
const tasks = await response.json();
```

### 4. JWT Verification (FastAPI)

**Backend Dependency**:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
import os

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> str:
    """
    Verify JWT token and extract user_id

    Returns:
        user_id (str): Authenticated user ID

    Raises:
        HTTPException: 401 if token invalid
    """
    token = credentials.credentials
    secret = os.getenv("BETTER_AUTH_SECRET")

    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user ID"
            )

        return user_id

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
```

### 5. User ID Validation

**Backend Endpoint**:
```python
@router.get("/api/{user_id}/tasks")
async def get_tasks(
    user_id: str,
    current_user: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all tasks for user

    Args:
        user_id: User ID from URL path
        current_user: Authenticated user ID from JWT
        db: Database session

    Returns:
        List of tasks

    Raises:
        HTTPException: 403 if user_id != current_user
    """
    # Validate user_id matches authenticated user
    if user_id != current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: user_id mismatch"
        )

    # Query tasks for authenticated user
    tasks = db.query(Task).filter(Task.user_id == current_user).all()
    return tasks
```

## Security Considerations

### Shared Secret

**Critical**: Both services must use the same BETTER_AUTH_SECRET

**Setup**:
```bash
# Generate secure secret (min 32 characters)
openssl rand -base64 32

# Add to both .env files
# frontend/.env.local
BETTER_AUTH_SECRET=your-secret-here

# backend/.env
BETTER_AUTH_SECRET=your-secret-here
```

### Token Expiration

**Default**: 7 days (configurable in Better Auth)

**Handling Expiration**:
- Frontend: Catch 401 errors, redirect to signin
- Backend: JWT library automatically validates exp claim
- Refresh tokens: Out of scope for Phase-II

### HTTPS Requirement

**Development**: HTTP acceptable (localhost)
**Production**: HTTPS required to prevent token interception

### CORS Configuration

**Backend (FastAPI)**:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Error Handling

### 401 Unauthorized

**Causes**:
- Missing Authorization header
- Invalid JWT signature
- Expired token
- Malformed token

**Frontend Response**:
- Clear stored token
- Redirect to /signin
- Show message: "Session expired, please sign in"

### 403 Forbidden

**Causes**:
- user_id in URL ≠ authenticated user_id from token

**Frontend Response**:
- Show error message
- Do not retry (user error, not transient)

### Example Error Responses

```json
// 401 Unauthorized
{
  "detail": "Not authenticated"
}

// 403 Forbidden
{
  "detail": "Access forbidden: user_id mismatch"
}
```

## Testing Authentication

### Manual Testing

1. **Signup**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Signin**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **API Request**:
   ```bash
   curl http://localhost:8000/api/user_abc123/tasks \
     -H "Authorization: Bearer <token>"
   ```

### Automated Testing

**Backend (pytest)**:
```python
def test_jwt_verification():
    # Valid token
    token = create_test_token(user_id="user_123")
    response = client.get(
        "/api/user_123/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200

def test_user_id_mismatch():
    # Token for user_123, but requesting user_456 tasks
    token = create_test_token(user_id="user_123")
    response = client.get(
        "/api/user_456/tasks",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 403
```

## JWT Token Structure

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
```json
{
  "sub": "user_abc123",      // User ID (subject)
  "email": "user@example.com",
  "iat": 1707825600,          // Issued at (Unix timestamp)
  "exp": 1708430400           // Expiration (Unix timestamp)
}
```

### Signature
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  BETTER_AUTH_SECRET
)
```

## Troubleshooting

### "Invalid token" errors

**Check**:
1. BETTER_AUTH_SECRET matches in both services
2. Token is being sent in Authorization header
3. Token format is "Bearer <token>"
4. Token has not expired

### "Access forbidden" errors

**Check**:
1. user_id in URL matches token's sub claim
2. Frontend is using correct user_id from auth response

### CORS errors

**Check**:
1. Backend CORS middleware configured
2. Frontend URL in allow_origins list
3. Credentials enabled if using cookies
