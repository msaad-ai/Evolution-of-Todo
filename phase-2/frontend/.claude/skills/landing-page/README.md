# Landing Page Skill

A complete landing page system with modern design, smooth animations, and dark mode support.

## Quick Start

```bash
# This skill is already integrated into your project
# All components are in: frontend/components/landing/
```

## What's Included

- **6 Production-Ready Components**: Hero, Navbar, Footer, FeatureGrid, FeatureCard, CTAButton
- **5 Custom Animations**: fadeIn, slideInLeft, slideInRight, scaleIn, shake
- **Blue-Purple Gradient Theme**: Modern SaaS aesthetic with dark mode
- **Fully Responsive**: Mobile-first design
- **Accessibility Compliant**: WCAG 2.1 AA standards

## Usage

### Basic Landing Page

```tsx
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";
import Footer from "@/components/landing/Footer";

export default function Home() {
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

### Customized Landing Page

```tsx
<Hero
  brandName="MyApp"
  tagline="Your custom tagline"
  primaryCTA={{ text: "Start Free", href: "/signup" }}
/>

<FeatureGrid
  columns={3}
  features={[
    { icon: "🚀", title: "Fast", description: "Lightning speed" },
    { icon: "🔒", title: "Secure", description: "Bank-level security" },
    { icon: "🎨", title: "Beautiful", description: "Stunning design" }
  ]}
/>
```

## Documentation

See [SKILL.md](./SKILL.md) for complete documentation including:
- Component API reference
- Theme customization
- Animation system
- Accessibility guidelines
- Performance optimization

## File Structure

```
components/landing/
├── Hero.tsx           # Main hero section
├── Navbar.tsx         # Sticky navigation
├── Footer.tsx         # Footer with links
├── FeatureGrid.tsx    # Feature showcase grid
├── FeatureCard.tsx    # Individual feature card
└── CTAButton.tsx      # Call-to-action button
```

## Theme Colors

- **Primary**: Blue (#2563eb) to Purple (#9333ea)
- **Background**: White / Dark Gray (#0a0a0a)
- **Text**: Gray-900 / White

## Animations

All animations are GPU-accelerated using CSS transforms:

- `animate-fadeIn` - Fade in with upward motion
- `animate-slideInLeft` - Slide from left
- `animate-slideInRight` - Slide from right
- `animate-scaleIn` - Scale up effect
- `animate-shake` - Attention shake

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Part of the TaskForge project.
