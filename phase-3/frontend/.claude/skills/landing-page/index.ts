/**
 * Landing Page Skill - Main Export
 *
 * Central export file for all landing page components and utilities.
 * Import from this file for convenience.
 */

// Components
export { default as Navbar } from "@/components/landing/Navbar";
export { default as Hero } from "@/components/landing/Hero";
export { default as FeatureGrid } from "@/components/landing/FeatureGrid";
export { default as FeatureCard } from "@/components/landing/FeatureCard";
export { default as CTAButton } from "@/components/landing/CTAButton";
export { default as Footer } from "@/components/landing/Footer";

// Utilities
export { default as themeVariants } from "./theme-variants";
export {
  animations,
  hoverEffects,
  interactiveStates,
  timing,
  easing,
  presets,
  staggerDelay,
  delay,
  cn,
  useScrollAnimation,
} from "./animation-utils";

// Types
export type {
  NavLink,
  NavbarProps,
  HeroProps,
  Feature,
  FeatureGridProps,
  FeatureCardProps,
  ButtonVariant,
  ButtonSize,
  CTAButtonProps,
  FooterLink,
  FooterSection,
  FooterProps,
} from "./types";

/**
 * Usage:
 *
 * import { Hero, Navbar, Footer, themeVariants, animations } from '@/skills/landing-page';
 *
 * export default function LandingPage() {
 *   return (
 *     <>
 *       <Navbar />
 *       <Hero />
 *       <Footer />
 *     </>
 *   );
 * }
 */
