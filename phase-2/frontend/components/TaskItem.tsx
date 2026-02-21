"use client";

import { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onToggleComplete?: (taskId: number) => void;
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskItemProps) {
  return (
    <div className="group relative border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-800/50 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out hover:border-transparent backdrop-blur-sm">
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-md animate-pulse"></div>

      {/* Completion badge */}
      {task.completed && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-scaleIn">
          ✓ Done
        </div>
      )}

      <div className="flex items-start gap-5">
        {/* Enhanced checkbox with gradient accent */}
        <div className="relative mt-1.5">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete?.(task.id)}
            className="peer h-6 w-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-transparent bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:scale-110 checked:bg-gradient-to-r checked:from-blue-600 checked:to-purple-600 checked:border-transparent"
          />
          {task.completed && (
            <svg className="absolute inset-0 w-6 h-6 text-white pointer-events-none animate-scaleIn" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-xl font-bold transition-all duration-300 ${
              task.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-3 text-sm leading-relaxed ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {new Date(task.created_at).toLocaleDateString()}
            </span>
            {task.updated_at !== task.created_at && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Updated
              </span>
            )}
          </div>
        </div>

        {/* Enhanced action buttons with icons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-white dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              aria-label="Edit task"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 hover:text-white dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              aria-label="Delete task"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
