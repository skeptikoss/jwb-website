# JWB Singapore Website

> Portfolio demo redesign of singaporejews.com — a unified community platform for the Jewish Welfare Board of Singapore.

## Quick Context

- **Type:** Portfolio/demo project (not live client)
- **Stack:** Next.js 16 + React 19 + Tailwind v4 + Sanity CMS + Stripe (test mode)
- **Design:** "Heritage Meets Haven" theme with Hebrew RTL support
- **Status:** Phase D (Events) 60% complete — see `roadmap.md`
- **Sanity Project ID:** `r3h9xffe`

## Key Files

| File | Purpose |
|------|---------|
| `roadmap.md` | Progress tracking, task checklists, decisions log |
| `.claude/skills/jwb-frontend-design/SKILL.md` | Design system specification (invoke with `/jwb-frontend-design`) |
| `~/.claude/plans/parsed-orbiting-zebra.md` | Original project plan/specification |
| `src/app/globals.css` | Design tokens, color palette, base styles |
| `src/i18n/` | Internationalization config and messages |
| `src/sanity/schemaTypes/` | Sanity CMS schemas (page, synagogue, person, etc.) |
| `sanity.config.ts` | Sanity Studio configuration |

## Architecture

### File Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing (en, he)
│   │   ├── layout.tsx     # RTL handling, NextIntlClientProvider
│   │   ├── page.tsx       # Homepage
│   │   ├── history/       # History page
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page with form
│   │   ├── travel/        # Travel info page
│   │   ├── synagogues/    # Synagogue list + [slug] detail
│   │   ├── education/     # Education list + [slug] detail
│   │   ├── leadership/    # Leadership list + [slug] detail
│   │   ├── events/        # Events list + [slug] detail
│   │   ├── restaurant/    # Awafi Restaurant info page
│   │   ├── museum/        # Jews of Singapore Museum page
│   │   └── shop/          # Shop list, [slug] detail, cart, checkout
│   ├── studio/[[...tool]] # Sanity Studio (embedded)
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Design tokens
├── components/
│   ├── ui/                # shadcn/ui (customized)
│   ├── layout/            # Header, Footer, Navigation
│   ├── sanity/            # Sanity rendering components
│   │   ├── portable-text.tsx  # Rich text renderer
│   │   └── sanity-image.tsx   # Image component
│   ├── shop/              # ProductCard, ProductGrid, CartDrawer, etc. (12 components)
│   ├── events/            # Event cards, calendar (Phase D)
│   └── common/            # Shared components
├── i18n/
│   ├── messages/          # en.json, he.json
│   ├── config.ts          # Locale definitions
│   ├── routing.ts         # next-intl routing
│   └── navigation.ts      # i18n-aware Link, useRouter
├── sanity/
│   ├── schemaTypes/       # Content schemas
│   │   ├── documents/     # page, synagogue, person, educationProgram, product, productCategory, event
│   │   ├── objects/       # address, serviceTime, seo
│   │   ├── singletons/    # settings
│   │   └── locale.ts      # localeString, localeText, localeBlockContent
│   ├── lib/               # client.ts, image.ts
│   └── structure.ts       # Studio sidebar structure
├── store/
│   └── cart-store.ts      # Zustand cart state with localStorage persistence
├── hooks/
│   └── use-cart.ts        # Cart hook
└── lib/
    ├── utils.ts           # cn() helper for Tailwind
    └── sanity/            # Sanity query utilities
        ├── queries.ts     # GROQ query helpers
        └── types.ts       # TypeScript interfaces
```

### Routing

- URL structure: `/` (English default), `/he/...` (Hebrew)
- Locale prefix: `as-needed` — only non-default locales show prefix
- All pages under `src/app/[locale]/`

## Design System

### Colors (use these class names)

| Color | Class | Hex | Usage |
|-------|-------|-----|-------|
| Navy | `text-navy`, `bg-navy` | #1a365d | Primary, headings, buttons |
| Gold | `text-gold`, `bg-gold` | #c9a227 | Accents, CTAs, highlights |
| Cream | `text-cream`, `bg-cream` | #faf8f5 | Backgrounds, light sections |
| Charcoal | `text-charcoal` | #2d3748 | Body text |
| Warm Gray | `text-warm-gray` | #8a8680 | Secondary text |
| Terracotta | `text-terracotta`, `bg-terracotta` | #c45d3a | Accent |
| Sage | `text-sage`, `bg-sage` | #7d8c6e | Success, badges |
| Sky | `text-sky`, `bg-sky` | #6b9ac4 | Info |

### Typography

| Element | Class | Font |
|---------|-------|------|
| Headings (h1-h6) | `font-heading` | Cormorant Garamond |
| Body text | `font-body` | Source Sans 3 |
| Hebrew content | `font-hebrew` | Heebo |
| UI elements | `font-ui` | DM Sans |

**Rules:**
- Always use `font-heading` on h1-h6 elements
- Buttons and nav use `font-ui`
- Hebrew pages automatically get `font-hebrew` via locale layout

### Component Patterns

```tsx
// Card with gold accent border
<Card className="border-t-[3px] border-t-gold bg-white shadow-sm">

// Primary button
<Button className="bg-navy text-cream hover:bg-navy/90">

// Gold accent button
<Button className="bg-gold text-charcoal hover:bg-gold/90">

// Section container
<section className="py-16">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

## Gotchas & Conventions

### Tailwind v4 Differences

- **No `tailwind.config.ts`** — Configuration is CSS-native in `globals.css` using `@theme inline`
- **Colors use OKLCH** — Not hex in the theme, but hex works in arbitrary values
- **Custom colors** — Defined in `@theme inline` block, accessed as `text-navy`, `bg-gold`, etc.

### next-intl Patterns

```tsx
// Use i18n-aware navigation (not next/link directly)
import { Link } from "@/i18n/navigation";

// Get translations in server components
import { getTranslations } from "next-intl/server";
const t = await getTranslations("home");

// Get translations in client components
import { useTranslations } from "next-intl";
const t = useTranslations("home");

// Access current locale
import { useLocale } from "next-intl";
```

### RTL Support

- Hebrew pages get `dir="rtl"` automatically via `[locale]/layout.tsx`
- Use CSS logical properties: `ms-4` (margin-start) not `ml-4`
- Icons that indicate direction should flip in RTL

### Import Aliases

```tsx
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
```

## Common Tasks

### Adding a new page

1. Create `src/app/[locale]/pagename/page.tsx`
2. Add translations to `src/i18n/messages/en.json` and `he.json`
3. Update navigation in `src/components/layout/header.tsx`

### Adding a shadcn component

```bash
npx shadcn@latest add [component-name]
```

### Running the dev server

```bash
npm run dev
# Visit http://localhost:3000 (English)
# Visit http://localhost:3000/he (Hebrew)
```

## Build & Deploy

```bash
npm run build    # Production build
npm run start    # Start production server
```

**Vercel:** Connected to GitHub, auto-deploys on push to main.

## Sanity CMS

### Accessing the Studio

```bash
npm run dev
# Visit http://localhost:3000/studio
```

### Bilingual Content Pattern

All content uses field-level localization with `en` and `he` sub-fields:

```typescript
// Schema definition
{
  name: "title",
  type: "localeString",  // Has title.en and title.he
}

// Fetching with GROQ
const page = await client.fetch(`*[_type == "page"][0]`);
const title = page.title[locale]; // "en" or "he"
```

### Available Schemas

| Schema | Type | Purpose |
|--------|------|---------|
| `page` | Document | Generic content pages |
| `synagogue` | Document | Synagogue details with service times |
| `person` | Document | Rabbi, staff, board members |
| `educationProgram` | Document | Schools and programs |
| `event` | Document | Community events with type, date, registration |
| `product` | Document | Shop products with price, kashrut, images |
| `productCategory` | Document | Product categories (10 seeded) |
| `settings` | Singleton | Site-wide settings, Shabbat times |

## Phase Status

See `roadmap.md` for detailed progress. Current: **Phase D 60% Complete**.

Completed:
- Phase A: Foundation (Next.js, Tailwind, shadcn/ui, i18n)
- Phase B: Core Content (Sanity CMS, all content pages, query infrastructure)
- Phase B.1: Content Fixes (Leadership pages, full History/Synagogue content with Hebrew)
- Phase C (partial): Shop pages, cart, 172 products seeded, 74 products with images
- Phase C.1: Community photos (leadership + synagogue images uploaded)
- Phase D (partial): Events schema, listing/detail pages, 6 sample events
- Phase D.1: Restaurant page, Museum page, footer navigation
- Phase D.2: UI Polish (logo, favicon, dynamic homepage synagogues)

Remaining:
- Phase C: Stripe checkout integration, order confirmation
- Phase D: RSVP/booking flow, Shabbat meal reservations, paid events

## Sanity Content Fetching Pattern

```tsx
// In a page.tsx (server component)
import { getLocale } from "next-intl/server";
import { getPageBySlug, getLocalizedValue, type Locale } from "@/lib/sanity";

export default async function Page() {
  const locale = (await getLocale()) as Locale;
  const page = await getPageBySlug("history");

  // Get localized content with fallback to English
  const title = getLocalizedValue(page.title, locale);

  return <h1>{title}</h1>;
}
```

## Bulk Sanity Operations

**Important:** For bulk Sanity operations (creating/updating many documents), always prefer **scripts** over individual MCP tool calls. This prevents context bloat and enables atomic transactions.

| Task | Approach |
|------|----------|
| Query/read operations | MCP tools (fine for any quantity) |
| Create/update 1-5 documents | MCP tools |
| Create/update 10+ documents | Write a script |

See `scripts/assign-product-categories.ts` for the pattern and `roadmap.md` for full documentation.

**Running bulk scripts:**
```bash
SANITY_API_TOKEN=xxx npx tsx scripts/your-script.ts
```

Get write tokens from: https://www.sanity.io/manage/project/r3h9xffe → API → Tokens
