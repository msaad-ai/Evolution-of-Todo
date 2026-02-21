# Landing Page Skill - Modern SaaS Theme & Animations

Generate modern, accessible SaaS landing pages with clean design, smooth animations, and dark mode support for Next.js + Tailwind CSS projects.

## Overview

This skill provides a complete set of landing page components with:
- **Modern gradient theme** (blue-to-purple) with dark mode support
- **Smooth animations** (fade, slide, scale) using Tailwind CSS
- **Fully responsive** design (mobile-first approach)
- **Accessibility compliant** (ARIA labels, semantic HTML, keyboard navigation)
- **Customizable** components with sensible defaults

## Components

### 1. Hero Section
**File:** `components/landing/Hero.tsx`

The main hero section with brand name, tagline, description, and CTA buttons.

**Props:**
```typescript
interface HeroProps {
  brandName?: string;        // Default: "TaskForge"
  tagline?: string;          // Default: "Organize smarter..."
  description?: string;      // Default: "Your personal..."
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}
```

**Usage:**
```tsx
import Hero from "@/components/landing/Hero";

<Hero
  brandName="YourApp"
  tagline="Your catchy tagline here"
  primaryCTA={{ text: "Get Started", href: "/signup" }}
  secondaryCTA={{ text: "Learn More", href: "#features" }}
/>
```

**Features:**
- Gradient text for brand name (blue-to-purple)
- Fade-in animation on load
- Gradient background (blue-purple tones)
- Hover effects on CTA buttons (lift + shadow)
- Active state scaling for tactile feedback

---

### 2. Navbar
**File:** `components/landing/Navbar.tsx`

Sticky navigation bar with mobile menu support.

**Props:**
```typescript
interface NavbarProps {
  brandName?: string;
  links?: NavLink[];         // Array of { label, href }
  ctaText?: string;
  ctaHref?: string;
}
```

**Usage:**
```tsx
import Navbar from "@/components/landing/Navbar";

<Navbar
  brandName="YourApp"
  links={[
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" }
  ]}
  ctaText="Get Started"
  ctaHref="/signup"
/>
```

**Features:**
- Sticky positioning with backdrop blur
- Mobile hamburger menu with smooth toggle
- Gradient brand text
- Responsive breakpoints (hidden on mobile, visible on md+)

---

### 3. Feature Grid
**File:** `components/landing/FeatureGrid.tsx`

Grid layout for displaying product features.

**Props:**
```typescript
interface FeatureGridProps {
  features?: Feature[];      // Array of { icon, title, description }
  columns?: 2 | 3 | 4;       // Default: 4
}
```

**Usage:**
```tsx
import FeatureGrid from "@/components/landing/FeatureGrid";

<FeatureGrid
  columns={3}
  features={[
    {
      icon: "🚀",
      title: "Fast Performance",
      description: "Lightning-fast load times"
    },
    {
      icon: "🔒",
      title: "Secure",
      description: "Bank-level security"
    }
  ]}
/>
```

**Features:**
- Responsive grid (1 col mobile, 2-4 cols desktop)
- Staggered animation delays for cascade effect
- Hover shadow effects
- Dark mode support

---

### 4. Feature Card
**File:** `components/landing/FeatureCard.tsx`

Individual feature card component.

**Props:**
```typescript
interface FeatureCardProps {
  icon: string;              // Emoji or icon
  title: string;
  description: string;
  delay?: number;            // Animation delay in ms
}
```

**Usage:**
```tsx
import FeatureCard from "@/components/landing/FeatureCard";

<FeatureCard
  icon="✨"
  title="Simple & Clean"
  description="Intuitive interface designed for focus"
  delay={100}
/>
```

**Features:**
- Scale-in animation with configurable delay
- Hover shadow transition
- Rounded corners with border
- Dark mode styling

---

### 5. CTA Button
**File:** `components/landing/CTAButton.tsx`

Reusable call-to-action button with multiple variants.

**Props:**
```typescript
interface CTAButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  ariaLabel?: string;
}
```

**Usage:**
```tsx
import CTAButton from "@/components/landing/CTAButton";

<CTAButton
  text="Get Started"
  href="/signup"
  variant="primary"
  size="lg"
/>
```

**Variants:**
- **primary**: Gradient background (blue-to-purple)
- **secondary**: White/gray background with border
- **outline**: Transparent with colored border

**Features:**
- Active scale effect (0.95 on click)
- Hover lift animation
- Focus ring for accessibility
- Responsive sizing

---

### 6. Footer
**File:** `components/landing/Footer.tsx`

Comprehensive footer with links and social media.

**Props:**
```typescript
interface FooterProps {
  brandName?: string;
  tagline?: string;
  sections?: FooterSection[];  // Array of link sections
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}
```

**Usage:**
```tsx
import Footer from "@/components/landing/Footer";

<Footer
  brandName="YourApp"
  tagline="Your tagline"
  sections={[
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" }
      ]
    }
  ]}
  socialLinks={{
    twitter: "https://twitter.com/yourapp",
    github: "https://github.com/yourapp"
  }}
/>
```

**Features:**
- Responsive grid layout
- Social media icons (Twitter, GitHub, LinkedIn)
- Auto-generated copyright year
- Dark mode support

---

## Theme System

### Color Palette

The landing page uses a **blue-to-purple gradient** theme:

```css
/* Primary Gradient */
from-blue-600 to-purple-600    /* Main brand colors */
from-blue-700 to-purple-700    /* Hover states */

/* Background Gradients */
from-blue-50 via-white to-purple-50        /* Light mode */
from-gray-900 via-gray-800 to-gray-900     /* Dark mode */
```

### Dark Mode

All components support dark mode using Tailwind's `dark:` prefix:

```tsx
// Example pattern used throughout
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

Dark mode is automatically detected via `prefers-color-scheme` media query.

### Custom CSS Variables

Defined in `styles/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

---

## Animation System

### Available Animations

Defined in `tailwind.config.ts`:

| Animation | Effect | Duration | Usage |
|-----------|--------|----------|-------|
| `animate-fadeIn` | Fade in + slight upward movement | 0.6s | Hero sections, modals |
| `animate-slideInLeft` | Slide in from left | 0.6s | Side content |
| `animate-slideInRight` | Slide in from right | 0.6s | Side content |
| `animate-scaleIn` | Scale up from 95% to 100% | 0.5s | Cards, buttons |
| `animate-shake` | Horizontal shake | 0.5s | Error states, attention |

### Keyframe Definitions

```javascript
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
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
  },
}
```

### Staggered Animations

Use `animationDelay` style prop for cascade effects:

```tsx
<FeatureCard
  icon="✨"
  title="Feature 1"
  description="Description"
  delay={0}      // First card
/>
<FeatureCard
  icon="🚀"
  title="Feature 2"
  description="Description"
  delay={100}    // Second card (100ms delay)
/>
<FeatureCard
  icon="🔒"
  title="Feature 3"
  description="Description"
  delay={200}    // Third card (200ms delay)
/>
```

### Hover Animations

Common hover patterns used:

```css
/* Lift effect */
hover:-translate-y-0.5 hover:shadow-xl

/* Scale effect */
hover:scale-105

/* Active press effect */
active:scale-95

/* Shadow growth */
shadow-md hover:shadow-lg
```

---

## Custom Styling

### Scrollbar Customization

Custom gradient scrollbar defined in `globals.css`:

```css
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgb(59 130 246), rgb(147 51 234));
  border-radius: 4px;
}
```

### Smooth Transitions

All interactive elements have smooth transitions:

```css
button, input, textarea {
  @apply transition-all duration-200 ease-out;
}
```

---

## Complete Landing Page Example

```tsx
// app/page.tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Navbar
        brandName="YourApp"
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "About", href: "#about" }
        ]}
        ctaText="Get Started"
        ctaHref="/signup"
      />

      <Hero
        brandName="YourApp"
        tagline="Build amazing products faster"
        description="The all-in-one platform for modern teams to collaborate and ship products."
        primaryCTA={{ text: "Start Free Trial", href: "/signup" }}
        secondaryCTA={{ text: "Watch Demo", href: "#demo" }}
      />

      <section id="features">
        <FeatureGrid
          columns={3}
          features={[
            {
              icon: "⚡",
              title: "Lightning Fast",
              description: "Optimized for speed and performance"
            },
            {
              icon: "🔒",
              title: "Secure by Default",
              description: "Enterprise-grade security built-in"
            },
            {
              icon: "🎨",
              title: "Beautiful Design",
              description: "Pixel-perfect UI components"
            }
          ]}
        />
      </section>

      <Footer
        brandName="YourApp"
        tagline="Build amazing products faster"
        sections={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" }
            ]
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#about" },
              { label: "Blog", href: "#blog" },
              { label: "Contact", href: "#contact" }
            ]
          }
        ]}
        socialLinks={{
          twitter: "https://twitter.com/yourapp",
          github: "https://github.com/yourapp"
        }}
      />
    </main>
  );
}
```

---

## Customization Guide

### Changing the Color Scheme

To change from blue-purple to a different gradient:

1. **Update Tailwind config** (`tailwind.config.ts`):
```javascript
// Example: Change to green-teal gradient
colors: {
  primary: {
    from: '#10b981',  // green-500
    to: '#14b8a6',    // teal-500
  }
}
```

2. **Update component classes**:
```tsx
// Replace all instances of:
from-blue-600 to-purple-600
// With:
from-green-500 to-teal-500
```

### Adding New Animations

1. **Define keyframe** in `tailwind.config.ts`:
```javascript
keyframes: {
  bounceIn: {
    '0%': { transform: 'scale(0.3)', opacity: '0' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  }
}
```

2. **Add animation**:
```javascript
animation: {
  bounceIn: 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}
```

3. **Use in components**:
```tsx
<div className="animate-bounceIn">Content</div>
```

### Creating Custom Components

Follow the established patterns:

```tsx
// components/landing/CustomSection.tsx
interface CustomSectionProps {
  title: string;
  content: string;
}

export default function CustomSection({ title, content }: CustomSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fadeIn">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 animate-slideInLeft">
          {content}
        </p>
      </div>
    </section>
  );
}
```

---

## Accessibility Best Practices

All components follow WCAG 2.1 AA standards:

1. **Semantic HTML**: Proper use of `<nav>`, `<section>`, `<footer>`, etc.
2. **ARIA labels**: All interactive elements have descriptive labels
3. **Keyboard navigation**: Full keyboard support (Tab, Enter, Escape)
4. **Focus indicators**: Visible focus rings on all interactive elements
5. **Color contrast**: Meets WCAG AA contrast ratios
6. **Screen reader support**: Proper role attributes and alt text

### Example Accessibility Features

```tsx
// Proper ARIA label
<button aria-label="Toggle mobile menu" aria-expanded={isOpen}>
  Menu
</button>

// Focus ring
className="focus:outline-none focus:ring-4 focus:ring-blue-300"

// Semantic HTML
<nav aria-label="Main navigation">
  {/* Navigation content */}
</nav>
```

---

## Performance Optimization

### Image Optimization

Use Next.js Image component for all images:

```tsx
import Image from "next/image";

<Image
  src="/hero-image.png"
  alt="Product screenshot"
  width={1200}
  height={800}
  priority  // For above-the-fold images
/>
```

### Code Splitting

Components are automatically code-split by Next.js. For heavy components, use dynamic imports:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### Animation Performance

All animations use `transform` and `opacity` for GPU acceleration:

```css
/* Good - GPU accelerated */
transform: translateY(10px);
opacity: 0;

/* Avoid - causes reflow */
top: 10px;
display: none;
```

---

## Troubleshooting

### Animations not working

1. Check Tailwind config is properly imported
2. Ensure `tailwind.config.ts` includes animation definitions
3. Verify component has proper animation class

### Dark mode not switching

1. Check system preferences (OS-level dark mode)
2. Verify `dark:` classes are applied
3. Ensure CSS variables are defined in `globals.css`

### Mobile menu not closing

1. Check `useState` is properly imported
2. Verify `onClick` handlers are attached
3. Ensure `mobileMenuOpen` state is toggled correctly

---

## File Structure

```
frontend/
├── components/
│   └── landing/
│       ├── Hero.tsx
│       ├── Navbar.tsx
│       ├── FeatureGrid.tsx
│       ├── FeatureCard.tsx
│       ├── CTAButton.tsx
│       └── Footer.tsx
├── styles/
│   └── globals.css
├── tailwind.config.ts
└── app/
    └── page.tsx
```

---

## Dependencies

Required packages:
- `next` (v14+)
- `react` (v18+)
- `tailwindcss` (v3+)
- `typescript` (v5+)

No additional animation libraries needed - all animations use native Tailwind CSS.

---

## License & Credits

Built with Next.js, React, and Tailwind CSS.
Follows modern web standards and accessibility guidelines.

---

## Quick Start Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Copy components to `components/landing/`
- [ ] Update `tailwind.config.ts` with animations
- [ ] Import `globals.css` in root layout
- [ ] Customize brand name and colors
- [ ] Add your content and CTAs
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify dark mode works
- [ ] Check accessibility with screen reader
- [ ] Deploy and enjoy! 🚀
