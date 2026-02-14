# Phase-2 Frontend - Next.js Todo App

Multi-user todo application frontend built with Next.js 15, TypeScript, Tailwind CSS, and Better Auth.

## Features

- Modern UI with Tailwind CSS
- User authentication (signup/signin/logout)
- Full CRUD operations for tasks
- Task completion toggle
- Responsive design
- Real-time task list updates
- Error handling and loading states

## Prerequisites

- Node.js 18 or higher
- Backend API running on http://localhost:8000
- Shared BETTER_AUTH_SECRET (must match backend)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Copy example file
   cp .env.local.example .env.local

   # Edit .env.local and add your values:
   # - BETTER_AUTH_SECRET: Shared secret (min 32 characters, must match backend)
   # - NEXT_PUBLIC_API_URL: Backend API URL (default: http://localhost:8000)
   ```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

The application will be available at http://localhost:3000

## Pages

- **/** - Landing page with signup/signin links
- **/signup** - User registration
- **/signin** - User login
- **/tasks** - Task dashboard (protected route)

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── signup/
│   │   └── page.tsx         # Signup page
│   ├── signin/
│   │   └── page.tsx         # Signin page
│   └── tasks/
│       └── page.tsx         # Task dashboard
├── components/
│   ├── TaskForm.tsx         # Create/edit task form
│   ├── TaskList.tsx         # Task list display
│   └── TaskItem.tsx         # Single task item
├── lib/
│   ├── api-client.ts        # API client with JWT handling
│   ├── auth.ts              # Better Auth configuration
│   └── types.ts             # TypeScript type definitions
├── styles/
│   └── globals.css          # Tailwind CSS imports
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── .env.local.example
├── .gitignore
└── README.md
```

## Features

### Authentication
- Email/password signup and signin
- JWT token storage in localStorage
- Automatic redirect to signin on 401 errors
- Logout functionality

### Task Management
- **Add Task**: Create new tasks with title and optional description
- **View Tasks**: See all your tasks in a list
- **Edit Task**: Update task title and description
- **Delete Task**: Remove tasks with confirmation dialog
- **Mark Complete**: Toggle task completion status with checkbox

### User Isolation
- Each user only sees their own tasks
- Backend enforces user_id validation
- 403 Forbidden if attempting to access other users' tasks

## API Integration

The frontend communicates with the backend API at `NEXT_PUBLIC_API_URL`:

- All requests include `Authorization: Bearer <token>` header
- Automatic token refresh on 401 errors
- Error handling for 403 (forbidden) and 404 (not found)

## Styling

- **Tailwind CSS** for utility-first styling
- **Dark mode** support (system preference)
- **Responsive design** for mobile and desktop
- **Loading states** for async operations
- **Empty states** with helpful messages

## Development Notes

### Better Auth Integration

The current implementation includes placeholder Better Auth configuration. To fully integrate Better Auth:

1. Install Better Auth packages (already in package.json)
2. Configure Better Auth server in `lib/auth.ts`
3. Update signup/signin pages to use Better Auth hooks
4. Implement proper session management

### Type Safety

All API responses and requests are typed using TypeScript interfaces defined in `lib/types.ts`.

## Troubleshooting

**Module not found errors:**
- Run `npm install` to install dependencies

**CORS errors:**
- Verify backend CORS middleware allows http://localhost:3000
- Check backend is running on port 8000

**401 Unauthorized errors:**
- Verify BETTER_AUTH_SECRET matches backend
- Check JWT token is being sent in Authorization header
- Try signing out and signing in again

**Tasks not loading:**
- Check backend API is running
- Verify NEXT_PUBLIC_API_URL in .env.local
- Check browser console for error messages

## Security Notes

- Never commit `.env.local` file (already in .gitignore)
- Use strong passwords for user accounts
- BETTER_AUTH_SECRET must match backend exactly
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Use HTTPS in production

## Future Enhancements

- Task filtering and sorting
- Task search functionality
- Task categories/tags
- Due dates and reminders
- Task sharing between users
- Real-time updates with WebSockets
