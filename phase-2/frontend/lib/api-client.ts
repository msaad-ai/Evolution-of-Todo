/**
 * API client for making authenticated requests to the backend.
 */
import { Task, TaskCreate, TaskUpdate } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Get authentication token from localStorage.
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

/**
 * Get user ID from localStorage.
 */
function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_id");
}

/**
 * Make an authenticated API request.
 */
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Attach JWT token if available
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  // Handle authentication errors
  if (response.status === 401) {
    // Clear stored auth data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    // Redirect to signin
    window.location.href = "/signin";
    throw new Error("Authentication required");
  }

  // Handle forbidden errors
  if (response.status === 403) {
    throw new Error("Access forbidden");
  }

  // Handle not found errors
  if (response.status === 404) {
    throw new Error("Resource not found");
  }

  // Handle other errors
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }

  // Handle no content responses
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

/**
 * Create a new task.
 */
export async function createTask(taskData: TaskCreate): Promise<Task> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<Task>(`/api/${userId}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

/**
 * Get all tasks for the authenticated user.
 */
export async function getTasks(): Promise<Task[]> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<Task[]>(`/api/${userId}/tasks`);
}

/**
 * Get a single task by ID.
 */
export async function getTask(taskId: number): Promise<Task> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<Task>(`/api/${userId}/tasks/${taskId}`);
}

/**
 * Update a task.
 */
export async function updateTask(
  taskId: number,
  taskData: TaskUpdate
): Promise<Task> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<Task>(`/api/${userId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

/**
 * Delete a task.
 */
export async function deleteTask(taskId: number): Promise<void> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<void>(`/api/${userId}/tasks/${taskId}`, {
    method: "DELETE",
  });
}

/**
 * Toggle task completion status.
 */
export async function toggleComplete(taskId: number): Promise<Task> {
  const userId = getUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  return apiRequest<Task>(`/api/${userId}/tasks/${taskId}/complete`, {
    method: "PATCH",
  });
}
