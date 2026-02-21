# Deployment Guide

## Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] Environment variables configured
- [ ] API endpoints updated for production

### Performance
- [ ] Images optimized (WebP format, proper sizing)
- [ ] Fonts optimized (subset, preload)
- [ ] Bundle size analyzed and optimized
- [ ] Lighthouse score > 90 for all metrics
- [ ] Core Web Vitals passing

### SEO
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Structured data implemented
- [ ] Canonical URLs set

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Screen reader tested
- [ ] Keyboard navigation works
- [ ] Color contrast meets standards
- [ ] ARIA labels present

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data exposed
- [ ] CORS configured properly
- [ ] Rate limiting implemented

---

## Deployment Platforms

### Vercel (Recommended for Next.js)

#### Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Production Deployment

```bash
# Deploy to production
vercel --prod
```

#### Environment Variables

```bash
# Add via CLI
vercel env add NEXT_PUBLIC_API_URL

# Or via Vercel Dashboard:
# Project Settings → Environment Variables
```

#### Custom Domain

```bash
# Add domain via CLI
vercel domains add yourdomain.com

# Or via Vercel Dashboard:
# Project Settings → Domains
```

#### vercel.json Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

---

### Netlify

#### netlify.toml Configuration

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/home"
  to = "/"
  status = 301
```

#### Deploy

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

### AWS Amplify

#### amplify.yml Configuration

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

---

### Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
    restart: unless-stopped
```

#### Build and Run

```bash
# Build image
docker build -t landing-page .

# Run container
docker run -p 3000:3000 landing-page

# Or with docker-compose
docker-compose up -d
```

---

## Environment Variables

### Development (.env.local)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=true
```

### Production (.env.production)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
```

---

## CDN Configuration

### Cloudflare

1. Add your domain to Cloudflare
2. Update nameservers
3. Enable:
   - Auto Minify (HTML, CSS, JS)
   - Brotli compression
   - HTTP/3
   - Early Hints
4. Configure caching rules:

```
Cache Level: Standard
Browser Cache TTL: 4 hours
Edge Cache TTL: 2 hours
```

### CloudFront (AWS)

```json
{
  "DistributionConfig": {
    "Origins": [
      {
        "DomainName": "your-app.vercel.app",
        "Id": "vercel-origin",
        "CustomOriginConfig": {
          "HTTPPort": 80,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "vercel-origin",
      "ViewerProtocolPolicy": "redirect-to-https",
      "Compress": true,
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
    }
  }
}
```

---

## Monitoring & Analytics

### Google Analytics 4

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Uptime Monitoring

- **UptimeRobot**: Free, checks every 5 minutes
- **Pingdom**: Detailed performance monitoring
- **StatusCake**: Multi-location monitoring

---

## Performance Optimization

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress output
  compress: true,

  // Enable SWC minification
  swcMinify: true,

  // Production source maps (optional)
  productionBrowserSourceMaps: false,

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Post-Deployment

### Verification Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Forms submit properly
- [ ] Analytics tracking works
- [ ] Error tracking configured
- [ ] SSL certificate valid
- [ ] Custom domain resolves
- [ ] Redirects work correctly
- [ ] Mobile version displays properly
- [ ] Dark mode functions

### Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --collect.url=https://yourdomain.com
```

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 https://yourdomain.com/

# Using k6
k6 run load-test.js
```

---

## Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Docker

```bash
# List images
docker images

# Run previous version
docker run -p 3000:3000 landing-page:previous-tag
```

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor error logs
- Check uptime status
- Review analytics

**Weekly:**
- Update dependencies
- Review performance metrics
- Check security alerts

**Monthly:**
- Full security audit
- Performance optimization review
- Content updates
- SEO review

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update to latest (careful!)
npx npm-check-updates -u
npm install
```

---

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Performance Issues

1. Check bundle size: `npm run analyze`
2. Review Lighthouse report
3. Check CDN cache hit rate
4. Optimize images
5. Enable compression

### SSL Issues

1. Verify certificate validity
2. Check DNS propagation
3. Clear browser cache
4. Test with SSL Labs

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- [Next.js Discord](https://nextjs.org/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### Monitoring
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
