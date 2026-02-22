# Landing Page Skill - Testing Guide

## Manual Testing Checklist

### Visual Testing

#### Desktop (1920x1080)
- [ ] Hero section displays correctly
- [ ] Navbar is sticky and visible
- [ ] Feature grid shows 4 columns
- [ ] Footer layout is correct
- [ ] All gradients render properly
- [ ] Dark mode switches correctly

#### Tablet (768x1024)
- [ ] Hero text is readable
- [ ] Navbar shows desktop menu
- [ ] Feature grid shows 2 columns
- [ ] Footer adapts to smaller width
- [ ] Touch targets are adequate (44x44px min)

#### Mobile (375x667)
- [ ] Hero section is readable
- [ ] Hamburger menu appears
- [ ] Mobile menu opens/closes
- [ ] Feature grid shows 1 column
- [ ] Footer stacks vertically
- [ ] All text is legible

### Animation Testing

- [ ] Hero fades in on load
- [ ] Feature cards scale in with stagger
- [ ] Buttons have hover lift effect
- [ ] Active state scales down on click
- [ ] Mobile menu animates smoothly
- [ ] No animation jank or stuttering

### Interaction Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Enter activates buttons/links
- [ ] Escape closes mobile menu
- [ ] No keyboard traps

#### Mouse/Touch
- [ ] All buttons are clickable
- [ ] Hover states work correctly
- [ ] Active states provide feedback
- [ ] Links navigate properly
- [ ] Mobile menu toggle works

### Accessibility Testing

#### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] All content is announced
- [ ] ARIA labels are descriptive
- [ ] Navigation landmarks work
- [ ] Heading hierarchy is logical
- [ ] Images have alt text

#### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Focus indicators are visible
- [ ] Dark mode has sufficient contrast

#### Keyboard Only
- [ ] Can navigate entire page
- [ ] Focus order is logical
- [ ] No focus traps
- [ ] Skip links work (if present)

### Browser Testing

#### Chrome/Edge
- [ ] All features work
- [ ] Animations smooth
- [ ] Dark mode works
- [ ] No console errors

#### Firefox
- [ ] All features work
- [ ] Animations smooth
- [ ] Dark mode works
- [ ] No console errors

#### Safari
- [ ] All features work
- [ ] Animations smooth
- [ ] Dark mode works
- [ ] No console errors
- [ ] iOS Safari tested

### Performance Testing

#### Lighthouse Scores
- [ ] Performance: 90+
- [ ] Accessibility: 100
- [ ] Best Practices: 90+
- [ ] SEO: 90+

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Network
- [ ] Fast 3G loads acceptably
- [ ] Images are optimized
- [ ] No unnecessary requests
- [ ] Fonts load efficiently

---

## Automated Testing

### Component Tests (Example with Jest + React Testing Library)

```typescript
import { render, screen } from '@testing-library/react';
import Hero from '@/components/landing/Hero';

describe('Hero Component', () => {
  it('renders brand name', () => {
    render(<Hero brandName="TestApp" />);
    expect(screen.getByText('TestApp')).toBeInTheDocument();
  });

  it('renders CTAs', () => {
    render(<Hero />);
    expect(screen.getByText('Get Started Free')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('has proper ARIA labels', () => {
    render(<Hero brandName="TestApp" />);
    const cta = screen.getByText('Get Started Free');
    expect(cta).toHaveAttribute('aria-label');
  });
});
```

### Visual Regression Tests (Example with Playwright)

```typescript
import { test, expect } from '@playwright/test';

test('landing page visual regression', async ({ page }) => {
  await page.goto('/');

  // Desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page).toHaveScreenshot('landing-desktop.png');

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page).toHaveScreenshot('landing-tablet.png');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page).toHaveScreenshot('landing-mobile.png');
});

test('dark mode visual regression', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page).toHaveScreenshot('landing-dark.png');
});
```

### Accessibility Tests (Example with axe-core)

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('landing page accessibility', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Testing Tools

### Recommended Tools
- **Chrome DevTools**: Lighthouse, Performance, Accessibility
- **Firefox DevTools**: Accessibility Inspector
- **WAVE**: Web accessibility evaluation tool
- **axe DevTools**: Accessibility testing extension
- **Contrast Checker**: Color contrast analyzer
- **Responsive Design Mode**: Built into browsers

### Screen Readers
- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

---

## Common Issues & Solutions

### Issue: Animations not working
**Solution:** Check that tailwind.config.ts includes animation definitions

### Issue: Dark mode not switching
**Solution:** Verify system dark mode is enabled, check CSS variables

### Issue: Mobile menu stuck
**Solution:** Ensure useState is properly managing menu state

### Issue: Focus indicators not visible
**Solution:** Check focus ring classes are applied, verify z-index

### Issue: Poor Lighthouse score
**Solution:** Optimize images, reduce bundle size, lazy load components

---

## Test Coverage Goals

- [ ] 80%+ component test coverage
- [ ] 100% accessibility compliance
- [ ] All user flows tested
- [ ] Visual regression tests for all breakpoints
- [ ] Performance budgets met

---

## Continuous Testing

### Pre-commit
- Run linter
- Run type checker
- Run unit tests

### Pre-push
- Run full test suite
- Run accessibility tests
- Check bundle size

### CI/CD
- Run all tests
- Generate coverage report
- Run Lighthouse CI
- Deploy preview

---

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Device and screen size
3. Steps to reproduce
4. Expected vs actual behavior
5. Screenshots/video if applicable
6. Console errors if any
