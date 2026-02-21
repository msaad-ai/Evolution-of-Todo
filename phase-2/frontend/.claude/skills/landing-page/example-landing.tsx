/**
 * Example Landing Page Implementation
 *
 * This file demonstrates how to use all landing page components together
 * to create a complete, production-ready landing page.
 *
 * Copy this to app/page.tsx or app/landing/page.tsx to use it.
 */

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Navigation Bar */}
      <Navbar
        brandName="TaskForge"
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ]}
        ctaText="Get Started"
        ctaHref="/signup"
      />

      {/* Hero Section */}
      <Hero
        brandName="TaskForge"
        tagline="Organize smarter. Build better habits."
        description="Your personal productivity companion. Create, manage, and complete tasks with ease. Stay organized and build momentum towards your goals."
        primaryCTA={{ text: "Start Free Trial", href: "/signup" }}
        secondaryCTA={{ text: "Sign In", href: "/signin" }}
      />

      {/* Features Section */}
      <section id="features" className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeIn">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeIn">
              Powerful features designed to help you organize your life and achieve your goals.
            </p>
          </div>

          <FeatureGrid
            columns={4}
            features={[
              {
                icon: "✨",
                title: "Simple & Clean",
                description: "Intuitive interface designed for focus and clarity",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your tasks are encrypted and yours alone",
              },
              {
                icon: "☁️",
                title: "Cloud Synced",
                description: "Access your tasks anywhere, anytime, on any device",
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
                title: "Analytics",
                description: "Insights into your productivity patterns",
              },
              {
                icon: "🔔",
                title: "Smart Reminders",
                description: "Never miss a deadline with intelligent notifications",
              },
              {
                icon: "🤝",
                title: "Team Collaboration",
                description: "Share tasks and collaborate with your team",
              },
            ]}
          />
        </div>
      </section>

      {/* Pricing Section (Example) */}
      <section id="pricing" className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 animate-scaleIn">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Free
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Perfect for getting started
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  $0
                </span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Up to 50 tasks
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Basic features
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile app access
                </li>
              </ul>
              <a
                href="/signup"
                className="block w-full text-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Get Started
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 shadow-xl transform scale-105 animate-scaleIn" style={{ animationDelay: '100ms' }}>
              <div className="bg-white dark:bg-gray-900 rounded-lg px-3 py-1 inline-block mb-4">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-blue-100 mb-6">For power users</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$9</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Unlimited tasks
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Team collaboration
                </li>
              </ul>
              <a
                href="/signup?plan=pro"
                className="block w-full text-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Start Free Trial
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md border border-gray-200 dark:border-gray-700 animate-scaleIn" style={{ animationDelay: '200ms' }}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Enterprise
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                For large organizations
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  Custom
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Everything in Pro
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  SLA guarantee
                </li>
              </ul>
              <a
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 animate-fadeIn">
            Join thousands of users who are already organizing their lives with TaskForge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scaleIn">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 transition-all shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 transition-all border-2 border-white"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        brandName="TaskForge"
        tagline="Organize smarter. Build better habits."
        sections={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Roadmap", href: "#roadmap" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#about" },
              { label: "Blog", href: "#blog" },
              { label: "Careers", href: "#careers" },
              { label: "Contact", href: "#contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms of Service", href: "#terms" },
              { label: "Cookie Policy", href: "#cookies" },
            ],
          },
        ]}
        socialLinks={{
          twitter: "https://twitter.com/taskforge",
          github: "https://github.com/taskforge",
          linkedin: "https://linkedin.com/company/taskforge",
        }}
      />
    </main>
  );
}
