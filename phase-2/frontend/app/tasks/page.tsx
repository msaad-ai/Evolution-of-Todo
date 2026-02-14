"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { createTask, getTasks, updateTask, deleteTask, toggleComplete } from "@/lib/api-client";
import { Task, TaskCreate, TaskUpdate } from "@/lib/types";

export default function TasksPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetchingTasks, setFetchingTasks] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      router.push("/signin");
      return;
    }

    setIsAuthenticated(true);
    setLoading(false);

    // Fetch tasks
    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    setFetchingTasks(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setFetchingTasks(false);
    }
  };

  const handleCreateTask = async (taskData: TaskCreate) => {
    try {
      await createTask(taskData);
      // Refresh task list after creation
      await fetchTasks();
    } catch (error) {
      // Error handling is done in TaskForm component
      throw error;
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (taskData: TaskUpdate) => {
    if (!editingTask) return;

    try {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
      // Refresh task list after update
      await fetchTasks();
    } catch (error) {
      // Error handling is done in TaskForm component
      throw error;
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId: number) => {
    // Confirmation dialog
    if (!confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteTask(taskId);
      // Refresh task list after deletion
      await fetchTasks();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete task");
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    try {
      await toggleComplete(taskId);
      // Refresh task list after toggling completion
      await fetchTasks();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to toggle task completion");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Tasks
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Task Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={editingTask ? handleCancelEdit : undefined}
            initialData={
              editingTask
                ? { title: editingTask.title, description: editingTask.description }
                : undefined
            }
            submitLabel={editingTask ? "Update Task" : "Add Task"}
          />
        </div>

        {/* Task List Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Tasks ({tasks.length})
          </h2>
          <TaskList
            tasks={tasks}
            loading={fetchingTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
    </div>
  );
}
