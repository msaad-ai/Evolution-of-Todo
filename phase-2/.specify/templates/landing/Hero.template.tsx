import Link from "next/link";

interface HeroProps {
  brandName?: string;
  tagline?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function Hero({
  brandName = "TaskForge",
  tagline = "Organize smarter. Build better habits.",
  description = "Your personal productivity companion. Create, manage, and complete tasks with ease. Stay organized and build momentum towards your goals.",
  primaryCTA = { text: "Get Started Free", href: "/signup" },
  secondaryCTA = { text: "Sign In", href: "/signin" },
}: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto text-center animate-fadeIn">
        {/* Brand */}
        <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {brandName}
        </h1>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium mb-6">
          {tagline}
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCTA.href}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            aria-label={`${primaryCTA.text} - Start using ${brandName}`}
          >
            {primaryCTA.text}
          </Link>

          <Link
            href={secondaryCTA.href}
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-95 transition-all shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
            aria-label={secondaryCTA.text}
          >
            {secondaryCTA.text}
          </Link>
        </div>
      </div>
    </section>
  );
}
