import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

/**
 * Complete Landing Page Example
 *
 * This is a full example showing how to compose all landing components
 * into a professional SaaS landing page.
 *
 * Usage:
 * 1. Copy this file to frontend/app/page.tsx
 * 2. Ensure all components exist in frontend/components/landing/
 * 3. Update tailwind.config.ts with animation keyframes
 * 4. Customize brand, features, and content as needed
 */

export default function LandingPage() {
  // Custom features for your app
  const features = [
    {
      icon: "✨",
      title: "Simple & Clean",
      description: "Intuitive interface designed for focus and productivity",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and protected with industry standards",
    },
    {
      icon: "☁️",
      title: "Cloud Synced",
      description: "Access your work from anywhere, on any device",
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for speed with modern web technologies",
    },
  ];

  // Navigation links
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  // Footer sections
  const footerSections = [
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
      title: "Resources",
      links: [
        { label: "Documentation", href: "#docs" },
        { label: "API Reference", href: "#api" },
        { label: "Support", href: "#support" },
        { label: "Status", href: "#status" },
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
  ];

  return (
    <>
      {/* Sticky Navigation */}
      <Navbar
        brandName="TaskForge"
        links={navLinks}
        ctaText="Get Started"
        ctaHref="/signup"
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          brandName="TaskForge"
          tagline="Organize smarter. Build better habits."
          description="Your personal productivity companion. Create, manage, and complete tasks with ease. Stay organized and build momentum towards your goals."
          primaryCTA={{ text: "Get Started Free", href: "/signup" }}
          secondaryCTA={{ text: "Sign In", href: "/signin" }}
        />

        {/* Features Section */}
        <section id="features" className="bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Everything you need to stay productive
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Powerful features designed to help you organize your work and achieve your goals.
              </p>
            </div>
            <FeatureGrid features={features} columns={4} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already organizing their work with TaskForge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 transition-all shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/50 active:scale-95 transition-all border-2 border-white"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        brandName="TaskForge"
        tagline="Organize smarter. Build better habits."
        sections={footerSections}
        socialLinks={{
          twitter: "https://twitter.com/taskforge",
          github: "https://github.com/taskforge",
          linkedin: "https://linkedin.com/company/taskforge",
        }}
      />
    </>
  );
}
