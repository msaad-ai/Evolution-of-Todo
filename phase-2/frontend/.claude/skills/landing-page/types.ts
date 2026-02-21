/**
 * TypeScript Type Definitions
 *
 * Centralized type definitions for all landing page components.
 */

// Navbar Types
export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
}

// Hero Types
export interface HeroProps {
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

// Feature Types
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features?: Feature[];
  columns?: 2 | 3 | 4;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

// Button Types
export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface CTAButtonProps {
  text: string;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  ariaLabel?: string;
}

// Footer Types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  brandName?: string;
  tagline?: string;
  sections?: FooterSection[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

// Theme Types
export interface ThemeGradient {
  text: string;
  bg: string;
  bgLight: string;
  bgDark: string;
  hover: string;
}

export interface Theme {
  gradient: ThemeGradient;
  primary: string;
  secondary: string;
  focus: string;
}

export type ThemeVariant =
  | "bluePurple"
  | "greenTeal"
  | "orangeRed"
  | "pinkPurple"
  | "cyanBlue"
  | "indigoPurple"
  | "slate"
  | "emerald";

// Animation Types
export type AnimationType =
  | "fadeIn"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "shake";

export type HoverEffect = "lift" | "scale" | "shadowGrow" | "brighten" | "glow";

export type TimingPreset = "fast" | "normal" | "slow" | "verySlow";

export type EasingPreset = "linear" | "in" | "out" | "inOut";
