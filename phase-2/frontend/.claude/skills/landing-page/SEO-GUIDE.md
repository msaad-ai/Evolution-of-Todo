# Landing Page SEO Guide

## Meta Tags Setup

### Basic Meta Tags

```tsx
// app/layout.tsx or app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TaskForge - Organize smarter. Build better habits.',
  description: 'Your personal productivity companion. Create, manage, and complete tasks with ease. Stay organized and build momentum towards your goals.',
  keywords: ['task management', 'productivity', 'todo app', 'organization'],
  authors: [{ name: 'TaskForge Team' }],
  creator: 'TaskForge',
  publisher: 'TaskForge',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://taskforge.com',
    title: 'TaskForge - Organize smarter. Build better habits.',
    description: 'Your personal productivity companion for task management.',
    siteName: 'TaskForge',
    images: [
      {
        url: 'https://taskforge.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaskForge Preview',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'TaskForge - Organize smarter. Build better habits.',
    description: 'Your personal productivity companion for task management.',
    creator: '@taskforge',
    images: ['https://taskforge.com/twitter-image.png'],
  },

  // Verification
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Dynamic Meta Tags

```tsx
// For dynamic pages
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `${params.feature} - TaskForge`,
    description: `Learn about ${params.feature} in TaskForge`,
  };
}
```

---

## Structured Data (JSON-LD)

### Organization Schema

```tsx
// components/StructuredData.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TaskForge',
    url: 'https://taskforge.com',
    logo: 'https://taskforge.com/logo.png',
    description: 'Personal productivity and task management platform',
    sameAs: [
      'https://twitter.com/taskforge',
      'https://github.com/taskforge',
      'https://linkedin.com/company/taskforge',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'support@taskforge.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### WebApplication Schema

```tsx
export function WebApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TaskForge',
    url: 'https://taskforge.com',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### FAQ Schema

```tsx
export function FAQSchema({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://taskforge.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://taskforge.com/features',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://taskforge.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://taskforge.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

---

## Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://taskforge.com/sitemap.xml',
  };
}
```

---

## Performance Optimization for SEO

### Image Optimization

```tsx
import Image from 'next/image';

// Always use Next.js Image component
<Image
  src="/hero-image.png"
  alt="TaskForge dashboard showing task management interface"
  width={1200}
  height={800}
  priority // For above-the-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Font Optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## Content Optimization

### Heading Hierarchy

```tsx
// Proper heading structure
<h1>TaskForge - Task Management Made Simple</h1>
  <h2>Features</h2>
    <h3>Simple & Clean Interface</h3>
    <h3>Secure & Private</h3>
  <h2>Pricing</h2>
    <h3>Free Plan</h3>
    <h3>Pro Plan</h3>
```

### Semantic HTML

```tsx
// Use semantic elements
<header>
  <nav aria-label="Main navigation">
    {/* Navigation content */}
  </nav>
</header>

<main>
  <article>
    {/* Main content */}
  </article>
</main>

<footer>
  {/* Footer content */}
</footer>
```

### Alt Text Best Practices

```tsx
// Good alt text
<Image
  src="/feature-screenshot.png"
  alt="TaskForge dashboard showing completed tasks with checkmarks and progress bar"
  width={800}
  height={600}
/>

// Bad alt text
<Image
  src="/feature-screenshot.png"
  alt="screenshot" // Too vague
  width={800}
  height={600}
/>
```

---

## URL Structure

### Clean URLs
```
✅ Good:
https://taskforge.com/features
https://taskforge.com/pricing
https://taskforge.com/blog/productivity-tips

❌ Bad:
https://taskforge.com/page?id=123
https://taskforge.com/index.php?page=features
```

### Canonical URLs

```tsx
// app/layout.tsx
export const metadata = {
  alternates: {
    canonical: 'https://taskforge.com',
  },
};
```

---

## Mobile Optimization

### Viewport Meta Tag

```tsx
// Automatically handled by Next.js, but verify:
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Mobile-Friendly Test
- Use Google's Mobile-Friendly Test tool
- Ensure touch targets are 44x44px minimum
- Test on real devices

---

## Page Speed Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques

```tsx
// 1. Lazy load below-the-fold content
import dynamic from 'next/dynamic';

const FeatureGrid = dynamic(() => import('@/components/landing/FeatureGrid'), {
  loading: () => <div>Loading...</div>,
});

// 2. Preload critical resources
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

// 3. Prefetch next pages
<link rel="prefetch" href="/signup" />
```

---

## Analytics & Tracking

### Google Analytics 4

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Local SEO (if applicable)

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TaskForge',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main St',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94102',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  telephone: '+1-555-123-4567',
};
```

---

## SEO Checklist

### Technical SEO
- [ ] Sitemap.xml generated and submitted
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] SSL certificate installed (HTTPS)
- [ ] Mobile-friendly design
- [ ] Fast page load times (< 3s)
- [ ] No broken links
- [ ] Structured data implemented

### On-Page SEO
- [ ] Unique, descriptive title tags (50-60 chars)
- [ ] Compelling meta descriptions (150-160 chars)
- [ ] Proper heading hierarchy (H1-H6)
- [ ] Descriptive alt text for images
- [ ] Internal linking strategy
- [ ] Keyword optimization (natural, not stuffed)
- [ ] Content quality and relevance

### Off-Page SEO
- [ ] Social media profiles linked
- [ ] Backlink strategy
- [ ] Guest posting
- [ ] Directory submissions
- [ ] Brand mentions

---

## Monitoring & Maintenance

### Tools to Use
- **Google Search Console**: Monitor search performance
- **Google Analytics**: Track user behavior
- **Lighthouse**: Audit performance and SEO
- **Ahrefs/SEMrush**: Keyword research and tracking
- **PageSpeed Insights**: Monitor Core Web Vitals

### Regular Tasks
- Weekly: Check Search Console for errors
- Monthly: Review analytics and adjust strategy
- Quarterly: Update content and refresh keywords
- Annually: Comprehensive SEO audit

---

## Common SEO Mistakes to Avoid

1. ❌ Duplicate content
2. ❌ Missing or duplicate meta tags
3. ❌ Slow page load times
4. ❌ Not mobile-friendly
5. ❌ Broken links
6. ❌ Missing alt text
7. ❌ Thin or low-quality content
8. ❌ Keyword stuffing
9. ❌ No HTTPS
10. ❌ Ignoring Core Web Vitals
