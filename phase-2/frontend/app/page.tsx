import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center gap-8 p-8 max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Phase-2 Todo App
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300">
          A multi-user todo application with JWT authentication
        </p>

        <div className="flex gap-4 mt-8">
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>

          <Link
            href="/signin"
            className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Features:</p>
          <ul className="mt-2 space-y-1">
            <li>✓ Add, edit, and delete tasks</li>
            <li>✓ Mark tasks as complete</li>
            <li>✓ User isolation (your tasks only)</li>
            <li>✓ Persistent storage with Neon PostgreSQL</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
