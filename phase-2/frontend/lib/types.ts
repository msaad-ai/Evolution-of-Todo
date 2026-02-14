/**
 * TypeScript type definitions for the application.
 */

/**
 * Task interface matching the backend schema.
 */
export interface Task {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Task creation payload (no id, user_id, timestamps).
 */
export interface TaskCreate {
  title: string;
  description?: string | null;
}

/**
 * Task update payload.
 */
export interface TaskUpdate {
  title: string;
  description?: string | null;
}

/**
 * User authentication data.
 */
export interface User {
  id: string;
  email: string;
}

/**
 * Authentication response from Better Auth.
 */
export interface AuthResponse {
  token: string;
  user: User;
}
