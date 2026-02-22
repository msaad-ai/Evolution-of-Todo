# Modern SaaS Landing Page Skill

A comprehensive skill for generating modern, accessible, and performant SaaS landing pages with Next.js and Tailwind CSS.

## Overview

This skill provides reusable components and templates for creating professional landing pages with:
- Clean hero sections with gradient text and CTAs
- Smooth entrance animations (fade, slide, scale)
- Responsive mobile-first design
- Accessibility-compliant markup
- Dark mode support
- Sticky navigation
- Feature grids with cards
- Professional footer sections

## Quick Start

### 1. Generate Components

```bash
/sp.landing --components --navbar --footer
```

This creates all reusable components in `frontend/components/landing/`:
- `Hero.tsx` - Hero section with brand, tagline, and CTAs
- `FeatureCard.tsx` - Individual feature card component
- `FeatureGrid.tsx` - Grid layout for features
- `Navbar.tsx` - Sticky navigation bar
- `Footer.tsx` - Footer with links and social icons
- `CTAButton.tsx` - Reusable CTA button with variants

### 2. Update Tailwind Config

Add animation keyframes to `frontend/tailwind.config.ts`:

```typescript
extend: {
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0', transform: 'translateY(10px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
    slideInLeft: {
      '0%': { opacity: '0', transform: 'translateX(-20px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    slideInRight: {
      '0%': { opacity: '0', transform: 'translateX(20px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    scaleIn: {
      '0%': { opacity: '0', transform: 'scale(0.95)' },
      '100%': { opacity: '1', transform: 'scale(1)' },
    },
  },
  animation: {
    fadeIn: 'fadeIn 0.6s ease-out forwards',
    slideInLeft: 'slideInLeft 0.6s ease-out forwards',
    slideInRight: 'slideInRight 0.6s ease-out forwards',
    scaleIn: 'scaleIn 0.5s ease-out forwards',
  },
}
```

### 3. Use Components in Your Page

```tsx
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Footer />
    </>
  );
}
```

## Component API

### Hero

```tsx
<Hero
  brandName="TaskForge"
  tagline="Organize smarter. Build better habits."
  description="Your personal productivity companion..."
  primaryCTA={{ text: "Get Started Free", href: "/signup" }}
  secondaryCTA={{ text: "Sign In", href: "/signin" }}
/>
```

**Props:**
- `brandName` (string, optional): Brand name displayed in large gradient text
- `tagline` (string, optional): Tagline below brand name
- `description` (string, optional): Longer description text
- `primaryCTA` (object, optional): Primary button config `{ text, href }`
- `secondaryCTA` (object, optional): Secondary button config `{ text, href }`

### FeatureCard

```tsx
<FeatureCard
  icon="✨"
  title="Simple & Clean"
  description="Intuitive interface designed for focus"
  delay={0}
/>
```

**Props:**
- `icon` (string): Emoji or icon character
- `title` (string): Feature title
- `description` (string): Feature description
- `delay` (number, optional): Animation delay in milliseconds

### FeatureGrid

```tsx
<FeatureGrid
  columns={4}
  features={[
    { icon: "✨", title: "Feature 1", description: "Description 1" },
    { icon: "🔒", title: "Feature 2", description: "Description 2" },
  ]}
/>
```

**Props:**
- `columns` (2 | 3 | 4, optional): Number of columns on large screens
- `features` (array, optional): Array of feature objects

### Navbar

```tsx
<Navbar
  brandName="TaskForge"
  links={[
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ]}
  ctaText="Get Started"
  ctaHref="/signup"
/>
```

**Props:**
- `brandName` (string, optional): Brand name in navbar
- `links` (array, optional): Navigation links `[{ label, href }]`
- `ctaText` (string, optional): CTA button text
- `ctaHref` (string, optional): CTA button link

**Note:** This is a client component (`"use client"`) for mobile menu interactivity.

### Footer

```tsx
<Footer
  brandName="TaskForge"
  tagline="Organize smarter. Build better habits."
  sections={[
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
  ]}
  socialLinks={{
    twitter: "https://twitter.com/yourapp",
    github: "https://github.com/yourapp",
  }}
/>
```

**Props:**
- `brandName` (string, optional): Brand name
- `tagline` (string, optional): Brand tagline
- `sections` (array, optional): Footer link sections
- `socialLinks` (object, optional): Social media links `{ twitter, github, linkedin }`

### CTAButton

```tsx
<CTAButton
  text="Get Started"
  href="/signup"
  variant="primary"
  size="lg"
  fullWidth={false}
/>
```

**Props:**
- `text` (string): Button text
- `href` (string): Link destination
- `variant` ("primary" | "secondary" | "outline", optional): Button style
- `size` ("sm" | "md" | "lg", optional): Button size
- `fullWidth` (boolean, optional): Full width button
- `ariaLabel` (string, optional): Accessibility label

## Customization

### Colors

Edit `frontend/tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        600: '#2563eb',
        700: '#1d4ed8',
      },
      secondary: {
        50: '#faf5ff',
        600: '#9333ea',
        700: '#7e22ce',
      },
    },
  },
}
```

### Typography

Update component classes or add custom font families:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'system-ui', 'sans-serif'],
    },
  },
}
```

### Animations

Adjust animation timing in `tailwind.config.ts`:

```typescript
animation: {
  fadeIn: 'fadeIn 0.8s ease-out forwards', // Slower
  scaleIn: 'scaleIn 0.4s ease-out forwards', // Faster
}
```

## Design Principles

### 1. Mobile-First
All components start with mobile styles and scale up:
```tsx
className="text-4xl sm:text-5xl lg:text-6xl"
```

### 2. Accessibility
- Semantic HTML (`<nav>`, `<main>`, `<section>`)
- ARIA labels on interactive elements
- Focus states on all buttons and links
- Proper heading hierarchy (h1 → h2 → h3)

### 3. Performance
- CSS-only animations (no JavaScript)
- GPU-accelerated transforms (transform, opacity)
- No layout shifts
- Optimized for Core Web Vitals

### 4. Dark Mode
All components support dark mode via Tailwind's `dark:` variant:
```tsx
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

## Examples

### Minimal Landing Page

```tsx
import Hero from "@/components/landing/Hero";

export default function Home() {
  return <Hero />;
}
```

### Full Landing Page

```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const features = [
    { icon: "✨", title: "Feature 1", description: "Description 1" },
    { icon: "🔒", title: "Feature 2", description: "Description 2" },
    { icon: "☁️", title: "Feature 3", description: "Description 3" },
    { icon: "⚡", title: "Feature 4", description: "Description 4" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureGrid features={features} columns={4} />
      </main>
      <Footer />
    </>
  );
}
```

### Custom Brand

```tsx
<Hero
  brandName="MyApp"
  tagline="Your custom tagline here"
  description="A longer description of what your app does..."
  primaryCTA={{ text: "Start Free Trial", href: "/trial" }}
  secondaryCTA={{ text: "Watch Demo", href: "/demo" }}
/>
```

## File Structure

```
frontend/
├── components/
│   └── landing/
│       ├── Hero.tsx
│       ├── FeatureCard.tsx
│       ├── FeatureGrid.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── CTAButton.tsx
├── app/
│   ├── page.tsx          # Landing page
│   └── layout.tsx
├── styles/
│   └── globals.css
└── tailwind.config.ts
```

## Best Practices

### 1. Keep It Simple
Don't add unnecessary animations or complexity. The goal is a clean, professional look.

### 2. Test Responsiveness
Always test on mobile, tablet, and desktop sizes:
```bash
# Use browser dev tools or
npm run dev
# Visit http://localhost:3000
```

### 3. Optimize Images
If adding images, use Next.js Image component:
```tsx
import Image from "next/image";

<Image
  src="/hero-image.png"
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

### 4. Measure Performance
Use Lighthouse to check:
- Performance score
- Accessibility score
- Best practices
- SEO

## Troubleshooting

### Animations Not Working
Ensure tailwind.config.ts includes the keyframes and animations in the `extend` section.

### Dark Mode Not Working
Check that your `tailwind.config.ts` has `darkMode: 'class'` or uses the default `media` strategy.

### Mobile Menu Not Opening
The Navbar component requires `"use client"` directive at the top of the file.

### Styles Not Applying
Run `npm run dev` to rebuild Tailwind classes. Clear browser cache if needed.

## Version History

- **1.0.0** (2026-02-21): Initial release with core components

## License

Part of SpecKit Plus - TaskForge Project
