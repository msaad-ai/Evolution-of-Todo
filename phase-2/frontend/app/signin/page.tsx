"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockSignIn } from "@/lib/mock-auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use mock authentication for testing
      const { token, user } = await mockSignIn(email, password);

      // Store token and user info
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_id", user.id);

      // Redirect to tasks page
      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Multi-layered professional background */}
      <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>
      <div className="absolute inset-0 bg-mesh-gradient"></div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-animated-gradient"></div>

      {/* Floating orbs with depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orb - top left */}
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-gradient-to-br from-blue-400/25 to-blue-600/15 dark:from-blue-600/25 dark:to-blue-800/15 rounded-full blur-3xl animate-float"></div>

        {/* Large floating orb - bottom right */}
        <div className="absolute -bottom-40 -right-40 w-[650px] h-[650px] bg-gradient-to-tl from-purple-400/25 to-purple-600/15 dark:from-purple-600/25 dark:to-purple-800/15 rounded-full blur-3xl animate-float-delayed"></div>

        {/* Center accent orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-300/20 to-purple-300/20 dark:from-blue-700/20 dark:to-purple-700/20 rounded-full blur-3xl animate-float-slow"></div>

        {/* Small accent orbs */}
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-500/15 dark:bg-blue-400/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-purple-500/15 dark:bg-purple-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {/* Rotating gradient ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-25">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/25 to-transparent dark:via-blue-400/25 rounded-full animate-rotate-slow"></div>
        </div>

        {/* Additional sparkle effects */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 dark:from-cyan-600/20 dark:to-blue-700/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-tl from-pink-400/20 to-purple-500/20 dark:from-pink-600/20 dark:to-purple-700/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl animate-scaleIn">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            TaskForge
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome back! 👋
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sign in to continue your productivity journey
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn" style={{ animationDelay: '100ms' }}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 p-5 border-2 border-red-300 dark:border-red-700/50 animate-shake shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-red-500 rounded-lg">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-red-900 dark:text-red-200 font-semibold">Sign In Failed</p>
                    <p className="text-sm text-red-800 dark:text-red-300 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <span className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <span className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:text-white transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="text-center animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Create one now →
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
