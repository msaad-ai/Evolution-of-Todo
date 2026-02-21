# sp.landing - Modern SaaS Landing Page Generator

## Command Metadata
- **Name**: sp.landing
- **Category**: Frontend/UI
- **Version**: 1.0.0
- **Author**: SpecKit Plus
- **Last Updated**: 2026-02-21

## Purpose
Generate or update modern SaaS landing pages with clean design, smooth animations, and accessibility best practices. Optimized for Next.js App Router with Tailwind CSS.

## Usage
```bash
/sp.landing [options]
```

### Options
- `--page <name>` - Target page name (default: "home")
- `--brand <name>` - Brand/app name (default: "TaskForge")
- `--tagline <text>` - Brand tagline (default: "Organize smarter. Build better habits.")
- `--components` - Generate reusable landing components
- `--navbar` - Include sticky navbar component
- `--footer` - Include footer component
- `--full` - Generate complete landing page with all sections

### Examples
```bash
/sp.landing --full
/sp.landing --components --navbar --footer
/sp.landing --brand "MyApp" --tagline "Build amazing things"
```

## Design System

### Brand Identity
- **App Name**: TaskForge (customizable)
- **Tagline**: "Organize smarter. Build better habits." (customizable)
- **Design Style**: Minimal modern SaaS
- **Color Palette**: Calm, professional startup vibe
- **Interactions**: Subtle micro-interactions

### Color Palette (Tailwind)
```typescript
// Primary Colors
primary: {
  50: 'rgb(239 246 255)',   // blue-50
  100: 'rgb(219 234 254)',  // blue-100
  500: 'rgb(59 130 246)',   // blue-500
  600: 'rgb(37 99 235)',    // blue-600
  700: 'rgb(29 78 216)',    // blue-700
}

// Secondary Colors
secondary: {
  50: 'rgb(250 245 255)',   // purple-50
  100: 'rgb(243 232 255)',  // purple-100
  500: 'rgb(168 85 247)',   // purple-500
  600: 'rgb(147 51 234)',   // purple-600
  700: 'rgb(126 34 206)',   // purple-700
}

// Neutral Colors
neutral: {
  50: 'rgb(249 250 251)',   // gray-50
  100: 'rgb(243 244 246)',  // gray-100
  600: 'rgb(75 85 99)',     // gray-600
  800: 'rgb(31 41 55)',     // gray-800
  900: 'rgb(17 24 39)',     // gray-900
}
```

### Typography Hierarchy
```css
/* Headings */
H1: text-6xl sm:text-7xl font-extrabold (Hero title)
H2: text-4xl sm:text-5xl font-bold (Section titles)
H3: text-2xl sm:text-3xl font-semibold (Subsection titles)
H4: text-xl font-semibold (Card titles)

/* Body Text */
Body Large: text-lg (Hero description)
Body: text-base (Default body text)
Body Small: text-sm (Card descriptions, captions)

/* Font Weights */
Regular: font-normal (400)
Medium: font-medium (500)
Semibold: font-semibold (600)
Bold: font-bold (700)
Extrabold: font-extrabold (800)
```

### Spacing System
```css
/* Section Spacing */
Section Padding Y: py-16 sm:py-20 lg:py-24
Section Padding X: px-4 sm:px-6 lg:px-8
Max Width: max-w-7xl mx-auto

/* Component Spacing */
Card Padding: p-6 lg:p-8
Button Padding: px-6 py-3 (medium), px-8 py-4 (large)
Gap Between Elements: gap-4, gap-6, gap-8, gap-12
```

### Animation System

#### Entrance Animations
```typescript
// Tailwind Config Extensions
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
}

animation: {
  fadeIn: 'fadeIn 0.6s ease-out forwards',
  slideInLeft: 'slideInLeft 0.6s ease-out forwards',
  slideInRight: 'slideInRight 0.6s ease-out forwards',
  scaleIn: 'scaleIn 0.5s ease-out forwards',
}
```

#### Animation Best Practices
- Use `ease-out` for entrance animations
- Duration: 0.5s - 0.6s for smooth feel
- Stagger animations with delays: `animation-delay-100`, `animation-delay-200`
- Avoid animations on scroll (performance)
- Use `transform` and `opacity` only (GPU-accelerated)

### Component Patterns

#### Hero Section
```tsx
<section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div className="max-w-4xl mx-auto text-center animate-fadeIn">
    {/* Brand */}
    <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
      {brandName}
    </h1>

    {/* Tagline */}
    <p className="text-xl sm:text-2xl text-gray-600 font-medium mb-6">
      {tagline}
    </p>

    {/* Description */}
    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
      {description}
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Primary CTA
      </button>
      <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200">
        Secondary CTA
      </button>
    </div>
  </div>
</section>
```

#### Feature Cards
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
</div>
```

#### Sticky Navbar
```tsx
<nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {brandName}
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
          Features
        </a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
          Pricing
        </a>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
          Get Started
        </button>
      </div>
    </div>
  </div>
</nav>
```

#### Gradient Backgrounds
```tsx
// Subtle gradient backgrounds
bg-gradient-to-br from-blue-50 via-white to-purple-50
bg-gradient-to-r from-blue-50 to-purple-50
bg-gradient-to-b from-white to-gray-50

// Dark mode variants
dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
```

### Accessibility Guidelines

#### Button States
```tsx
// Primary Button
className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold
  hover:from-blue-700 hover:to-purple-700
  focus:outline-none focus:ring-4 focus:ring-blue-300
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all"

// Secondary Button
className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold
  hover:bg-gray-50
  focus:outline-none focus:ring-4 focus:ring-gray-300
  active:scale-95
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all shadow-md hover:shadow-lg border border-gray-200"
```

#### Semantic HTML
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use `<section>` for distinct sections
- Use `<article>` for self-contained content
- Use proper heading hierarchy (h1 → h2 → h3)

#### ARIA Labels
```tsx
<button aria-label="Get started with TaskForge">
  Get Started
</button>

<nav aria-label="Main navigation">
  {/* nav content */}
</nav>
```

### Responsive Design

#### Breakpoints
```css
sm: 640px   /* Small devices (tablets) */
md: 768px   /* Medium devices (small laptops) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

#### Mobile-First Approach
```tsx
// Start with mobile styles, add larger breakpoints
<h1 className="text-4xl sm:text-5xl lg:text-6xl">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
<div className="px-4 sm:px-6 lg:px-8">
```

## Implementation Instructions

When the user invokes `/sp.landing`, follow these steps:

### Step 1: Understand Requirements
Ask clarifying questions if needed:
- Which page to update? (default: app/page.tsx)
- Generate new components or update existing?
- Include navbar and/or footer?
- Custom brand name or tagline?

### Step 2: Update Tailwind Config
Ensure tailwind.config.ts includes the animation keyframes:

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

### Step 3: Generate Components (if --components flag)
Create reusable components in `frontend/components/landing/`:

- `Hero.tsx` - Hero section with brand, tagline, CTA
- `FeatureCard.tsx` - Individual feature card
- `FeatureGrid.tsx` - Grid of feature cards
- `Navbar.tsx` - Sticky navigation bar (if --navbar)
- `Footer.tsx` - Footer section (if --footer)
- `CTAButton.tsx` - Reusable CTA button with variants

### Step 4: Generate or Update Page
Update the target page (default: `frontend/app/page.tsx`) with:
- Clean hero section
- Feature grid (3-4 features)
- Smooth entrance animations
- Responsive layout
- Accessible markup
- Gradient backgrounds

### Step 5: Update Global Styles (if needed)
Ensure `frontend/styles/globals.css` includes:
- Smooth scroll behavior
- Custom scrollbar styling
- Transition utilities

### Step 6: Validation Checklist
- [ ] All animations use transform/opacity only
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Focus states on all interactive elements
- [ ] ARIA labels where needed
- [ ] Mobile-first responsive design
- [ ] No inline styles (Tailwind only)
- [ ] Gradient backgrounds are subtle
- [ ] Button states (hover, focus, active, disabled)
- [ ] Semantic HTML elements
- [ ] No performance-heavy effects

## Constraints

### Must Follow
- Next.js App Router compatible
- Tailwind CSS only (no inline styles)
- No backend modifications
- No auth changes
- No new root folders
- Mobile-first responsive design
- Accessibility compliant (WCAG 2.1 AA)

### Must Avoid
- Aggressive animations (no bounce, no spin)
- Heavy JavaScript (keep it static)
- Inline styles
- Non-semantic HTML
- Missing focus states
- Poor color contrast
- Layout shifts

## Output Format

After generating the landing page, provide:

1. **Summary**: Brief description of what was created/updated
2. **Files Modified**: List of all files changed
3. **Components Created**: List of new components (if any)
4. **Preview Instructions**: How to view the changes locally
5. **Customization Guide**: How to customize brand, colors, content

## Example Output

```
✅ Modern SaaS landing page generated successfully!

📁 Files Modified:
- frontend/app/page.tsx
- frontend/tailwind.config.ts
- frontend/styles/globals.css

🎨 Components Created:
- frontend/components/landing/Hero.tsx
- frontend/components/landing/FeatureCard.tsx
- frontend/components/landing/Navbar.tsx

👀 Preview:
Run `npm run dev` in the frontend directory and visit http://localhost:3000

🎨 Customization:
- Brand name: Edit Hero.tsx line 12
- Tagline: Edit Hero.tsx line 16
- Colors: Update tailwind.config.ts theme.extend.colors
- Features: Edit FeatureGrid.tsx data array
```

## Notes

- This skill focuses on static landing pages (no API calls)
- Animations are CSS-only for best performance
- All components are server components by default
- Dark mode support included via Tailwind dark: variants
- Follows TaskForge brand guidelines by default

## Version History

- 1.0.0 (2026-02-21): Initial release
