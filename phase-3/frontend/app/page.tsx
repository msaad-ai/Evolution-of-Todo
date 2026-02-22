import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const features = [
    {
      icon: "✨",
      title: "Simple & Clean",
      description: "Intuitive interface designed for focus and productivity",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your tasks are encrypted and yours alone",
    },
    {
      icon: "☁️",
      title: "Cloud Synced",
      description: "Access anywhere, anytime, on any device",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for speed with optimized performance",
    },
    {
      icon: "🎯",
      title: "Goal Tracking",
      description: "Set goals and track your progress over time",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Insights into your productivity patterns",
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      description: "Never miss a deadline with intelligent notifications",
    },
    {
      icon: "🤝",
      title: "Team Ready",
      description: "Share tasks and collaborate with your team",
    },
  ];

  const navLinks: { label: string; href: string }[] = [];

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ],
    },
  ];

  return (
    <>
      <Navbar
        brandName="TaskForge"
        links={navLinks}
        ctaText="Get Started"
        ctaHref="/signup"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Multi-layered professional background */}
        <div className="absolute inset-0 bg-pattern-grid opacity-30"></div>
        <div className="absolute inset-0 bg-mesh-gradient"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-animated-gradient"></div>

        {/* Floating orbs with depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating orb - top left */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-blue-600/10 dark:from-blue-600/20 dark:to-blue-800/10 rounded-full blur-3xl animate-float"></div>

          {/* Large floating orb - bottom right */}
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-purple-400/20 to-purple-600/10 dark:from-purple-600/20 dark:to-purple-800/10 rounded-full blur-3xl animate-float-delayed"></div>

          {/* Medium orb - center */}
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-gradient-to-r from-blue-300/15 to-purple-300/15 dark:from-blue-700/15 dark:to-purple-700/15 rounded-full blur-3xl animate-float-slow"></div>

          {/* Small accent orbs */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          {/* Rotating gradient ring */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-blue-400/20 rounded-full animate-rotate-slow"></div>
          </div>
        </div>

        <main className="relative z-10">
          <Hero
            brandName="TaskForge"
            tagline="Organize smarter. Build better habits."
            description="Your personal productivity companion. Create, manage, and complete tasks with ease. Stay organized and build momentum towards your goals."
            primaryCTA={{ text: "Get Started Free", href: "/signup" }}
            secondaryCTA={{ text: "Sign In", href: "/signin" }}
          />

          {/* Features Section with enhanced styling */}
          <section id="features" className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 animate-fadeIn">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Everything you need to stay productive
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Powerful features designed to help you organize your life and achieve your goals
                </p>
              </div>
              <FeatureGrid features={features} columns={4} />
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="animate-scaleIn">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    50K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Active Users
                  </div>
                </div>
                <div className="animate-scaleIn" style={{ animationDelay: '100ms' }}>
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    1M+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Tasks Completed
                  </div>
                </div>
                <div className="animate-scaleIn" style={{ animationDelay: '200ms' }}>
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    99.9%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Uptime
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center animate-fadeIn">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of users who are already organizing their lives with TaskForge
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scaleIn">
                <a
                  href="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Free Trial
                </a>
                <a
                  href="/signin"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 active:scale-95 transition-all shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  Sign In
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer
        brandName="TaskForge"
        tagline="Organize smarter. Build better habits."
        sections={footerSections}
      />
    </>
  );
}
