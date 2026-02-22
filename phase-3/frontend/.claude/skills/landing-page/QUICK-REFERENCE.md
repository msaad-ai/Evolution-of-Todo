# Landing Page Quick Reference

## Component Imports

```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import FeatureCard from "@/components/landing/FeatureCard";
import CTAButton from "@/components/landing/CTAButton";
import Footer from "@/components/landing/Footer";
```

## Animations Cheat Sheet

| Class | Effect | Use Case |
|-------|--------|----------|
| `animate-fadeIn` | Fade in + up | Hero sections, modals |
| `animate-slideInLeft` | Slide from left | Side panels, content |
| `animate-slideInRight` | Slide from right | Side panels, content |
| `animate-scaleIn` | Scale up | Cards, buttons, popups |
| `animate-shake` | Horizontal shake | Errors, alerts |

### Staggered Animation Pattern

```tsx
{items.map((item, index) => (
  <div
    key={index}
    className="animate-scaleIn"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {item}
  </div>
))}
```

## Color Classes

### Gradients
```tsx
// Text gradient
className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"

// Background gradient
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Background gradient (light)
className="bg-gradient-to-br from-blue-50 via-white to-purple-50"

// Background gradient (dark)
className="dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
```

### Hover Effects
```tsx
// Lift effect
className="hover:-translate-y-0.5 hover:shadow-xl"

// Shadow growth
className="shadow-md hover:shadow-lg"

// Scale
className="hover:scale-105"

// Active press
className="active:scale-95"
```

## Common Patterns

### Section Container
```tsx
<section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Centered Content
```tsx
<div className="max-w-4xl mx-auto text-center">
  {/* Content */}
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Items */}
</div>
```

### Flex Row (Responsive)
```tsx
<div className="flex flex-col sm:flex-row gap-4">
  {/* Items */}
</div>
```

## Button Variants

### Primary (Gradient)
```tsx
<CTAButton
  text="Get Started"
  href="/signup"
  variant="primary"
  size="lg"
/>
```

### Secondary (White/Gray)
```tsx
<CTAButton
  text="Learn More"
  href="#features"
  variant="secondary"
  size="md"
/>
```

### Outline (Transparent)
```tsx
<CTAButton
  text="Contact Us"
  href="/contact"
  variant="outline"
  size="sm"
/>
```

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

## Dark Mode Pattern

```tsx
// Always include dark mode classes
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

## Accessibility Checklist

- [ ] All buttons have `aria-label`
- [ ] Images have `alt` text
- [ ] Semantic HTML (`<nav>`, `<section>`, `<footer>`)
- [ ] Focus rings visible (`focus:ring-4`)
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA

## Common Customizations

### Change Brand Colors
Replace all instances of:
- `from-blue-600 to-purple-600` → Your gradient
- `blue-600` → Your primary color
- `purple-600` → Your secondary color

### Change Font
In `globals.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

### Add New Animation
In `tailwind.config.ts`:
```javascript
keyframes: {
  yourAnimation: {
    '0%': { /* start state */ },
    '100%': { /* end state */ },
  }
},
animation: {
  yourAnimation: 'yourAnimation 0.6s ease-out',
}
```

## Performance Tips

1. Use Next.js `<Image>` for all images
2. Add `priority` to above-the-fold images
3. Use `loading="lazy"` for below-the-fold content
4. Minimize animation duration (0.3-0.6s optimal)
5. Use `transform` and `opacity` for animations (GPU-accelerated)

## Common Issues & Fixes

### Animations not working
```bash
# Check tailwind.config.ts is imported
# Verify animation classes are correct
# Ensure no CSS conflicts
```

### Dark mode not switching
```bash
# Check system dark mode setting
# Verify dark: classes are present
# Check globals.css has CSS variables
```

### Mobile menu stuck open
```tsx
// Ensure onClick closes menu
onClick={() => setMobileMenuOpen(false)}
```

## File Locations

```
frontend/
├── components/landing/     # All landing components
├── styles/globals.css      # Global styles + scrollbar
├── tailwind.config.ts      # Animations + theme
└── app/page.tsx           # Main landing page
```

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Example: Minimal Landing Page

```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
```

## Example: Full Landing Page

See `example-landing.tsx` for a complete implementation with:
- Navigation
- Hero section
- Features grid
- Pricing section
- CTA section
- Footer

## Support

For detailed documentation, see [SKILL.md](./SKILL.md)
