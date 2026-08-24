# SocialHaus — Enter the Haus

Production-ready SocialHaus digital experience with a cinematic opening, scroll-driven brand narrative, selected collaborations, services and contact information.

## Foundation

- Next.js App Router conventions through vinext
- TypeScript and React
- GSAP with ScrollTrigger
- Lenis smooth scrolling synchronized to GSAP
- Dedicated desktop and mobile composition rules
- Reduced-motion fallback
- SEO metadata, social previews, Schema.org data, robots.txt and sitemap.xml
- Accessible navigation, focus states and semantic landmarks
- Cloudflare Sites-compatible production output
- Conditional static export for GitHub Pages

## Commands

```sh
pnpm dev
pnpm build
pnpm test
pnpm build:pages
```

`pnpm build` keeps the Cloudflare Sites output. The GitHub Pages workflow sets the repository base path and creates a static export in `dist/client` on every push to `main`.
