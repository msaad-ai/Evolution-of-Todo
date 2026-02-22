# Landing Page Skill - Quick Reference

## Installation Checklist

- [ ] Copy component templates from `.specify/templates/landing/` to `frontend/components/landing/`
- [ ] Update `frontend/tailwind.config.ts` with animation keyframes
- [ ] Ensure `frontend/styles/globals.css` has smooth scroll behavior
- [ ] Test on mobile, tablet, and desktop viewports

## Component Templates

All templates are located in `.specify/templates/landing/`:

1. **Hero.template.tsx** - Hero section with brand and CTAs
2. **FeatureCard.template.tsx** - Individual feature card
3. **FeatureGrid.template.tsx** - Grid layout for features
4. **Navbar.template.tsx** - Sticky navigation (client component)
5. **Footer.template.tsx** - Footer with links and social
6. **CTAButton.template.tsx** - Reusable CTA button

## Tailwind Config Required

Add to `frontend/tailwind.config.ts`:

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

## Usage Examples

### Minimal (Hero Only)
```tsx
import Hero from "@/components/landing/Hero";

export default function Home() {
  return <Hero />;
}
```

### With Navbar
```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
```

### Full Page
See `example-full-page.tsx` for complete implementation.

## Customization Quick Tips

### Change Brand
```tsx
<Hero brandName="YourApp" tagline="Your tagline" />
<Navbar brandName="YourApp" />
<Footer brandName="YourApp" />
```

### Change Colors
Edit `tailwind.config.ts` color values or update component classes:
- Primary: `from-blue-600 to-purple-600`
- Secondary: `bg-white` / `bg-gray-50`

### Change Features
```tsx
const features = [
  { icon: "🎯", title: "Your Feature", description: "Description" },
  // Add more...
];

<FeatureGrid features={features} columns={3} />
```

### Add More Sections
Insert between Hero and Footer:
```tsx
<section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {/* Your content */}
  </div>
</section>
```

## Design Tokens

### Spacing
- Section padding: `py-16 sm:py-20 lg:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 lg:p-8`

### Typography
- H1: `text-6xl sm:text-7xl font-extrabold`
- H2: `text-4xl sm:text-5xl font-bold`
- H3: `text-2xl sm:text-3xl font-semibold`
- Body: `text-lg` / `text-base` / `text-sm`

### Shadows
- Card: `shadow-md hover:shadow-lg`
- Button: `shadow-lg hover:shadow-xl`

### Rounded Corners
- Buttons: `rounded-xl` (12px)
- Cards: `rounded-xl` (12px)
- Small elements: `rounded-lg` (8px)

## Accessibility Checklist

- [ ] All buttons have focus states (`focus:ring-4`)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] ARIA labels on icon-only buttons
- [ ] Semantic HTML (`<nav>`, `<main>`, `<section>`)
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works
- [ ] Mobile menu accessible

## Performance Checklist

- [ ] Animations use only `transform` and `opacity`
- [ ] No layout shifts on load
- [ ] Images use Next.js Image component
- [ ] No unnecessary JavaScript
- [ ] CSS-only animations (no JS)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Latest

## Common Issues

**Animations not working?**
→ Check tailwind.config.ts has keyframes in `extend` section

**Dark mode not working?**
→ Ensure `darkMode: 'class'` in tailwind.config.ts

**Mobile menu not opening?**
→ Navbar needs `"use client"` directive

**Styles not applying?**
→ Restart dev server: `npm run dev`

## File Locations

```
.specify/
├── commands/
│   └── sp.landing.command.md
└── templates/
    └── landing/
        ├── README.md
        ├── QUICKSTART.md (this file)
        ├── example-full-page.tsx
        ├── Hero.template.tsx
        ├── FeatureCard.template.tsx
        ├── FeatureGrid.template.tsx
        ├── Navbar.template.tsx
        ├── Footer.template.tsx
        └── CTAButton.template.tsx
```

## Next Steps

1. Copy templates to `frontend/components/landing/`
2. Update tailwind.config.ts
3. Create/update your landing page
4. Test responsiveness
5. Run Lighthouse audit
6. Deploy!
