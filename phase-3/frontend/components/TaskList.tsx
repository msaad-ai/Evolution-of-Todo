"use client";

import { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onToggleComplete?: (taskId: number) => void;
}

export default function TaskList({
  tasks,
  loading = false,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-blue-600 border-r-purple-600 absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">
          Loading your tasks...
        </p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-3xl animate-pulse"></div>
          <div className="relative p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-3xl">
            <svg
              className="mx-auto h-20 w-20 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          No tasks yet 📝
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
          Get started by creating your first task above. Stay organized and productive!
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Start building your productivity journey
        </div>
      </div>
    );
  }

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-8">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              📌 Pending ({pendingTasks.length})
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
          </div>
          {pendingTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 dark:via-green-600 to-transparent"></div>
            <h3 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full">
              ✅ Completed ({completedTasks.length})
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-300 dark:via-green-600 to-transparent"></div>
          </div>
          {completedTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fadeIn opacity-75 hover:opacity-100 transition-opacity"
              style={{ animationDelay: `${(pendingTasks.length + index) * 50}ms` }}
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
