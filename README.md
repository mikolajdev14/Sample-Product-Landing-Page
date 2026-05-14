# FlowSync AI — Premium SaaS Landing Page

A production-grade, portfolio-quality landing page for a fictional SaaS
product called **FlowSync AI**. Designed to look like a high-end 2026
technology startup site — dark theme, glassmorphism, animated gradients,
parallax, 3D tilt, scroll reveal, and live-feeling dashboard mockups.

![FlowSync AI landing preview](https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=70)

## ✨ Highlights

- **Hero** with line-by-line text animation, mouse parallax on the image
  and floating UI cards (Analytics / Revenue / Automation), pulsing glow,
  shine button.
- **Sticky navbar** that turns into a frosted glass panel on scroll,
  with a fully animated mobile menu.
- **Logo cloud** with grayscale → full-color hover transitions.
- **Features grid** (6 cards) with glassmorphism, animated icon gradients,
  spotlight hover, lift + slight rotation.
- **Interactive dashboard mockup** with mouse-tracking 3D tilt, animated
  counters, pure-SVG area chart and animated bar chart.
- **Testimonials** with avatars and hover halo.
- **Pricing** with Monthly / Yearly toggle and smooth price-change
  animation. Highlighted Pro plan with animated gradient border.
- **FAQ accordion** with smooth height + opacity transitions and proper
  ARIA wiring.
- **Final CTA** with an intense radial gradient backdrop.
- **Footer** with newsletter form and social icons.
- **Background**: animated colour blobs, grid pattern with radial mask,
  top/bottom vignettes — shared across the whole page.

## 🧱 Tech stack

- [**Next.js 14**](https://nextjs.org/) (App Router)
- [**React 18**](https://react.dev/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**Framer Motion**](https://www.framer.com/motion/) for animations
- [**lucide-react**](https://lucide.dev/) for icons
- **Inter** font via `next/font`

## 📁 Project structure

```
.
├── app/
│   ├── globals.css        # Tokens, utilities, glass + button styles
│   ├── layout.tsx         # Fonts, metadata, OG, viewport
│   └── page.tsx           # Section composition + JSON-LD
├── components/
│   ├── BackgroundFX.tsx   # Animated blobs / grid / vignettes
│   ├── Navbar.tsx         # Sticky blur-on-scroll navigation
│   ├── Hero.tsx           # Hero with parallax + floating cards
│   ├── LogoCloud.tsx      # Trusted-by logos
│   ├── Features.tsx       # 6 glass feature cards
│   ├── AnimatedCounter.tsx
│   ├── Dashboard.tsx      # 3D-tilt dashboard mockup with charts
│   ├── Testimonials.tsx
│   ├── Pricing.tsx        # Monthly/Yearly toggle
│   ├── FAQ.tsx            # Accordion
│   ├── FinalCTA.tsx
│   └── Footer.tsx
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── tsconfig.json
```

## 🛠️ Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Build for production
npm run build
npm start
```

## 🎨 Design tokens

All accent colours live in `tailwind.config.ts` under the `brand` palette
(`purple`, `violet`, `blue`, `sky`, `cyan`). The dark background uses an
`ink` scale defined in the same file.

Custom utilities in `app/globals.css`:

| Class             | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `.glass`          | Standard frosted-glass surface                     |
| `.glass-strong`   | Higher-contrast frosted glass                      |
| `.btn-primary`    | Brand-gradient button with shine + pulse           |
| `.btn-ghost`      | Secondary ghost button                             |
| `.badge`          | Small pill badge                                   |
| `.text-gradient-brand` | Purple → indigo → cyan text gradient          |
| `.grad-border`    | Animated gradient border via mask                  |
| `.hero-title`     | Clamp-scaled hero typography                       |
| `.section-title`  | Clamp-scaled section typography                    |

## ♿ Accessibility

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`,
  `<article>`, `<blockquote>`, `<figure>`).
- `aria-label`, `aria-controls`, `aria-expanded` on interactive controls.
- "Skip to content" link in the layout.
- Visible focus rings (`*:focus-visible`).
- `prefers-reduced-motion` disables animations.

## ⚡ Performance

- Next.js `<Image>` for the hero, with `priority` and responsive `sizes`.
- All other Unsplash / Pravatar images lazy-loaded by default.
- Animations use `transform` / `opacity` only — no layout thrashing.
- Backdrop blur is applied only to a handful of surfaces.

## 🔍 SEO

- Rich `metadata` (title template, description, keywords).
- Open Graph + Twitter cards.
- JSON-LD `SoftwareApplication` schema in `app/page.tsx`.

## 📝 License

MIT — feel free to fork and remix for your portfolio.
