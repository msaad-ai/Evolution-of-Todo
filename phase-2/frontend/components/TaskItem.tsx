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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Checkbox for completion (will be functional in Phase 7) */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete?.(task.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium ${
              task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mt-1 text-sm ${
                task.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
            {task.updated_at !== task.created_at && (
              <span>Updated: {new Date(task.updated_at).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
