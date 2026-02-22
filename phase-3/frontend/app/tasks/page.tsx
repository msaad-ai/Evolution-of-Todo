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
      router.replace("/signin");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Multi-layered professional background */}
      <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>
      <div className="absolute inset-0 bg-mesh-gradient"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-animated-gradient"></div>

      {/* Floating orbs with depth and movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orb - top left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 to-blue-600/10 dark:from-blue-600/20 dark:to-blue-800/10 rounded-full blur-3xl animate-float"></div>

        {/* Large floating orb - bottom right */}
        <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-gradient-to-tl from-purple-400/20 to-purple-600/10 dark:from-purple-600/20 dark:to-purple-800/10 rounded-full blur-3xl animate-float-delayed"></div>

        {/* Medium orb - center right */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-gradient-to-l from-blue-300/15 to-purple-300/15 dark:from-blue-700/15 dark:to-purple-700/15 rounded-full blur-3xl animate-float-slow"></div>

        {/* Small accent orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Rotating gradient rings */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-blue-400/20 rounded-full animate-rotate-slow"></div>
        </div>

        {/* Additional depth layer */}
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 dark:from-indigo-600/10 dark:to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 animate-slideInLeft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              TaskForge
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome back! 👋
              </h2>
              <p className="text-blue-100">
                You have {tasks.filter(t => !t.completed).length} pending tasks and {tasks.filter(t => t.completed).length} completed
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Task Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingTask ? "✏️ Edit Task" : "➕ Add New Task"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {editingTask ? "Update your task details" : "Create a new task to stay organized"}
              </p>
            </div>
          </div>
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
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn hover:shadow-3xl transition-all duration-300" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📋 Your Tasks
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage and track your daily tasks
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                {tasks.length} Total
              </span>
            </div>
          </div>
          <TaskList
            tasks={tasks}
            loading={fetchingTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>

        {/* Productivity Tip */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-200/50 dark:border-gray-600/50 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                💡 Productivity Tip
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Break large tasks into smaller, manageable chunks. This makes them less overwhelming and easier to complete!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
