# JWB Website Roadmap

> **Project:** Portfolio demo redesign of singaporejews.com
> **Stack:** Next.js 16 + React 19 + Tailwind v4 + Sanity CMS + Stripe
> **Plan File:** `~/.claude/plans/parsed-orbiting-zebra.md`

---

## Current Status

| Phase | Status | Progress |
|-------|--------|----------|
| A. Foundation | ✅ Complete | 100% |
| B. Core Content | ✅ Complete | 100% |
| B.1 Content Fixes | ✅ Complete | 100% |
| C. E-commerce | 🟡 In Progress | 90% |
| C.1 Community Photos | ✅ Complete | 100% |
| D. Events & Booking | 🟡 In Progress | 60% |
| D.1 Restaurant & Museum Pages | ✅ Complete | 100% |
| D.2 UI Polish | ✅ Complete | 100% |
| E. Member Portal & Donations | 🔲 Not Started | 0% |
| F. Polish & Optimization | 🔲 Not Started | 0% |
| G. Launch Preparation | 🔲 Not Started | 0% |

---

## Phase A: Foundation ✅

**Completed:** 2025-01-08

### Tasks Completed

- [x] Next.js project initialization (v16.1.1 with Turbopack)
- [x] Core dependencies installed
  - `@sanity/client`, `@sanity/image-url`, `next-sanity`
  - `next-intl` for internationalization
  - `@stripe/stripe-js`, `stripe` for payments
  - `next-auth` for authentication
  - `shadcn/ui` components (button, card, input, sheet, navigation-menu, badge)
- [x] Design system configured in `globals.css`
  - JWB color palette (navy, gold, cream + secondary colors)
  - OKLCH color values for Tailwind v4
  - Custom shadows and border styles
- [x] Google Fonts setup
  - Cormorant Garamond (headings)
  - Source Sans 3 (body)
  - Heebo (Hebrew)
  - DM Sans (UI elements)
- [x] Base layout components
  - `src/components/layout/header.tsx` - Responsive header with mobile menu
  - `src/components/layout/footer.tsx` - Full footer with links
- [x] Internationalization (i18n)
  - `next-intl` with URL-based routing (`/en/...`, `/he/...`)
  - RTL support for Hebrew
  - Message files for both locales
  - Middleware for locale detection
- [x] Custom skill created
  - `.claude/skills/jwb-frontend-design/SKILL.md`

### Files Created

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   └── [locale]/
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── index.ts
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── sheet.tsx
│       ├── navigation-menu.tsx
│       └── badge.tsx
├── i18n/
│   ├── config.ts
│   ├── routing.ts
│   ├── navigation.ts
│   ├── request.ts
│   ├── index.ts
│   └── messages/
│       ├── en.json
│       └── he.json
├── lib/
│   └── utils.ts
└── middleware.ts
```

---

## Phase B: Core Content ✅

**Status:** Complete
**Started:** 2025-01-09
**Completed:** 2026-01-09

### Tasks Completed

- [x] i18n integration in components
  - [x] Header uses `useTranslations()` with working language toggle
  - [x] Footer uses `useTranslations()` with i18n-aware links
  - [x] Homepage uses `getTranslations()` (server component)
  - [x] RTL support verified on `/he` route
- [x] Set up Sanity Studio
  - [x] Create Sanity project (ID: `r3h9xffe`)
  - [x] Embedded studio at `/studio`
  - [x] Configure bilingual schemas with field-level localization
    - `localeString`, `localeText`, `localeBlockContent` types
    - `page`, `synagogue`, `person`, `educationProgram` documents
    - `settings` singleton
    - `address`, `serviceTime`, `seo` objects
  - [x] Studio structure with organized sections
  - [x] Schema deployed to Sanity cloud
- [x] Query infrastructure
  - [x] GROQ query helpers (`src/lib/sanity/queries.ts`)
  - [x] TypeScript types (`src/lib/sanity/types.ts`)
  - [x] PortableText component (`src/components/sanity/portable-text.tsx`)
  - [x] SanityImage component (`src/components/sanity/sanity-image.tsx`)
- [x] Content pages (fetch from Sanity)
  - [x] History page (`/history`)
  - [x] About page (`/about`)
  - [x] Synagogues section (`/synagogues`, `/synagogues/[slug]`)
  - [x] Education section (`/education`, `/education/[slug]`)
  - [x] Travel Info page (`/travel`)
  - [x] Contact page with form (`/contact`)
- [x] Content created in Sanity (EN + HE)
  - [x] History page content
  - [x] About page content
  - [x] Travel Info page content (scraped from singaporejews.com + Hebrew from source)
  - [x] Maghain Aboth synagogue (full details, history, service times)
  - [x] Chesed El synagogue (full details, history, service times)
  - [x] Rabbi Mordechai Abergel profile
  - [x] Rabbi Netanel Rivni profile
  - [x] Ganenu Preschool program
  - [x] Sunday School (Talmud Torah) program
  - [x] Sir Manasseh Meyer International School (SMMIS) program

### Deferred to Phase F

- [ ] Preview mode for content editors (optional enhancement)

---

## Phase B.1: Content Fixes ✅

**Status:** Complete
**Completed:** 2026-01-10

### Tasks Completed

#### 1. Frontend Routes for Leadership

- [x] Created `/leadership` listing page showing all clergy/staff
- [x] Created `/leadership/[slug]` detail page for individual profiles
- [x] Added "Leadership" link to header navigation
- [x] Added i18n translations (EN + HE) for leadership section

**Files created:**
- `src/app/[locale]/leadership/page.tsx`
- `src/app/[locale]/leadership/[slug]/page.tsx`

#### 2. History Page Content

**Sanity document:** `b9bc3d84-9cbd-40a9-815c-667e3e6c7081`

- [x] Expanded content from ~250 words to full historical narrative
- [x] Added: First synagogue 1840, trustees, 1931 census, WWII history
- [x] Added: Notable figures (David Marshall, Dr. Yahya Cohen)
- [x] Added: Modern era (Chabad, Bnei Akivah, Ganenu/SMMIS, Jacob Ballas Centre)
- [x] Added: Hebrew translations for all new content

#### 3. Maghain Aboth Synagogue

**Sanity document:** `a56371d9-5ee0-4aba-a65c-075dc2382499`

- [x] Added full history field (EN + HE) with 11 blocks covering:
  - First synagogue on Synagogue Street (1841)
  - Growth and relocation to Waterloo Street (1878)
  - Ladies gallery construction by Sir Manasseh Meyer
  - Centenary celebrations with David Marshall
  - National monument status (1998), 125th anniversary (2004)
- [x] Updated service times to full schedule

#### 4. Chesed El Synagogue

**Sanity document:** `a716c418-5ae3-4fd9-bc85-7f2d63800c7f`

- [x] Added full history field (EN + HE) with 9 blocks covering:
  - Sir Manasseh Meyer's story (poverty to philanthropy)
  - Synagogue founding on private estate (1905)
  - National monument status
  - Centennial celebration (2005)
- [x] Updated service times and contact info

#### 5. Hebrew Translations

- [x] All History page content translated to Hebrew
- [x] Maghain Aboth history translated to Hebrew (11 blocks)
- [x] Chesed El history translated to Hebrew (9 blocks)

#### 6. Code Quality Cleanup (2026-01-10)

- [x] Fixed ESLint error: replaced `as any` with proper `LocalizedReturnType<T>` in `types.ts`
- [x] Removed 8 unused imports/variables across 7 files
- [x] Build and lint now pass with 0 errors, 0 warnings

---

## Phase C: E-commerce 🟡

**Status:** In Progress (90%)
**Started:** 2026-01-11

### Tasks Completed

- [x] Product schema in Sanity (`product`, `productCategory`)
- [x] Product listing page with filters (`/shop`)
- [x] Product detail page (`/shop/[slug]`)
- [x] Shopping cart with Zustand (`src/store/cart-store.ts`)
- [x] Category filtering and search
- [x] 10 product categories created in Sanity
- [x] 172 products seeded with categories assigned
- [x] Shop components (12 files): ProductCard, ProductGrid, CartDrawer, etc.
- [x] i18n translations for shop section
- [x] **Product images** — Scraped from source site and uploaded to Sanity
  - **Result:** 74 of 100 products now have images (74% coverage)
  - **How:** Built a script that scrapes images from singaporejews.com/shop, fuzzy-matches product names, and uploads to Sanity
  - **Unmatched:** 26 products couldn't be matched due to naming differences (e.g., wines with different label formats)
  - **To re-run or learn more:** See [`scripts/scrape-product-images/README.md`](scripts/scrape-product-images/README.md)

### Tasks Remaining

- [ ] Stripe checkout integration
- [ ] Order confirmation flow

### Files Created

```
src/
├── app/[locale]/shop/
│   ├── page.tsx              # Shop listing with filters
│   ├── [slug]/page.tsx       # Product detail
│   ├── cart/page.tsx         # Cart page
│   ├── checkout/page.tsx     # Checkout (placeholder)
│   └── confirmation/page.tsx # Order confirmation (placeholder)
├── components/shop/
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── product-filters.tsx
│   ├── category-filter.tsx
│   ├── search-input.tsx
│   ├── sort-select.tsx
│   ├── price-display.tsx
│   ├── kashrut-badge.tsx
│   ├── add-to-cart-button.tsx
│   ├── cart-drawer.tsx
│   ├── cart-item.tsx
│   └── index.ts
├── store/
│   └── cart-store.ts         # Zustand cart state
├── hooks/
│   └── use-cart.ts           # Cart hook
└── sanity/schemaTypes/documents/
    ├── product.ts
    └── productCategory.ts
scripts/
└── assign-product-categories.ts  # Bulk category assignment script
```

### Product Categories (10)

| Category | Products |
|----------|----------|
| Wine & Beverages | Wines, grape juice, coffee, arak |
| Dairy & Chilled | Cheese, cream, fromage |
| Frozen Food | Borekas, gefilte fish, ice cream cones |
| Canned & Preserved | Olives, tuna, peppers, preserved vegetables |
| Condiments & Spices | Tahini, sauces, spices, spreads |
| Snacks & Confectionery | Halva, mentos |
| Cookies & Biscuits | Wafers, cookies, bagels, cakes |
| Bread & Bakery | Matzah, bread |
| Grains & Pasta | Couscous, breadcrumbs, wheat |
| Judaica | Candles, mezuzahs, dreidels, body care |

### Next Step: Product Images

Products currently have no images. To add images from the source site:

1. Scrape product images from `https://singaporejews.com/shop/products/`
2. Match products by name (fuzzy matching)
3. Download images and upload to Sanity Assets API
4. Patch products with image references

See `scripts/assign-product-categories.ts` for the pattern to follow.

---

## Phase C.1: Community Photos ✅

**Status:** Complete
**Completed:** 2026-01-12

### Tasks Completed

- [x] Leadership photos uploaded to Sanity
  - Rabbi Mordechai Abergel photo
  - Rabbi Netanel Rivni photo
- [x] Synagogue photos uploaded to Sanity
  - Maghain Aboth: main image + 1 gallery image
  - Chesed El: main image + 1 gallery image
- [x] Upload script created (`scripts/upload-community-photos.ts`)

### Files Created

```
scripts/
└── upload-community-photos.ts   # Downloads images and patches Sanity documents
```

---

## Phase D: Events & Booking 🟡

**Status:** In Progress (60%)
**Started:** 2026-01-12

### Tasks Completed

- [x] Event schema in Sanity (`src/sanity/schemaTypes/documents/event.ts`)
- [x] Events listing page (`/events`)
- [x] Event detail page (`/events/[slug]`)
- [x] Event types with color-coded badges (community, youth, education, holiday, shabbat, sports)
- [x] 6 sample events seeded and published
- [x] i18n translations (EN + HE)
- [x] Event queries in `src/lib/sanity/queries.ts`
- [x] Event TypeScript types in `src/lib/sanity/types.ts`

### Tasks Remaining

- [ ] RSVP/booking flow
- [ ] Shabbat meal reservations
- [ ] Stripe integration for paid events
- [ ] Email confirmations (mock for demo)
- [ ] Calendar view (optional enhancement)

### Files Created

```
src/
├── app/[locale]/events/
│   ├── page.tsx              # Events listing with type badges
│   └── [slug]/page.tsx       # Event detail with registration link
├── sanity/schemaTypes/documents/
│   └── event.ts              # Event schema with localization
└── lib/sanity/
    ├── queries.ts            # Added event queries
    └── types.ts              # Added Event, EventType types
```

### Sample Events Seeded

| Event | Type | Recurring |
|-------|------|-----------|
| JLI Learning for Teens | Education | Yes (Thursdays) |
| Sunday Football | Sports | Yes (Sundays) |
| VIP Girls Club | Youth | Yes (Monthly) |
| Krav Maga for Ladies | Sports | Yes (Tuesdays) |
| Tu B'Shvat Celebration | Holiday | No |
| Community Purim Party | Holiday | No (Free) |

---

## Phase D.1: Restaurant & Museum Pages ✅

**Status:** Complete
**Completed:** 2026-01-12

### Tasks Completed

- [x] Restaurant page (`/restaurant`) - Awafi Restaurant info
  - Opening hours, contact info, kashrut certification
  - Multi-cuisine display (Indian, Middle Eastern, Chinese, Western)
  - Shabbat meal reservation CTA
- [x] Museum page (`/museum`) - Jews of Singapore Museum
  - Exhibit highlights with icons
  - Notable figures section
  - Visit info and tour booking CTA
- [x] Footer updated with Restaurant link (under "Visit & Support")
- [x] Navigation translations added
- [x] Full i18n support (EN + HE)

### Files Created

```
src/app/[locale]/
├── restaurant/page.tsx       # Awafi Restaurant info page
└── museum/page.tsx           # Jews of Singapore Museum page
```

### Footer Links Updated

Added to "Visit & Support" section:
- Museum → `/museum`
- **Restaurant** → `/restaurant` (new)
- Shop → `/shop`
- Donate → `/donate`
- Member Portal → `/member`

---

## Phase D.2: UI Polish ✅

**Status:** Complete
**Completed:** 2026-01-12

### Tasks Completed

- [x] Homepage synagogue section now fetches dynamically from Sanity
  - Replaced hardcoded cards with data-driven loop
  - Uses SanityImage component with proper responsive sizing
  - Locale-aware content (name, meaning, address)
- [x] JWB logo added to header
  - Downloaded from singaporejews.com
  - Stored at `/public/images/jwb-logo.png`
  - Shows logo + site name on desktop, logo only on mobile
- [x] Favicon and apple-touch-icon added
  - `/public/favicon.ico` (32x32)
  - `/public/apple-touch-icon.png` (270x270)
  - Metadata configured in root layout
- [x] Synagogue image corrections in Sanity
  - Swapped Chesed El main/gallery images (exterior now main)
  - Swapped Maghain Aboth main/gallery images (exterior now main)

### Files Modified

```
src/app/[locale]/page.tsx     # Dynamic synagogue fetching
src/app/layout.tsx            # Added icons metadata
src/components/layout/header.tsx  # Added logo image
public/
├── images/jwb-logo.png       # Header logo
├── favicon.ico               # Browser tab icon
└── apple-touch-icon.png      # iOS home screen icon
```

---

## Phase E: Member Portal & Donations 🔲

**Status:** Not Started

### Tasks

- [ ] NextAuth configuration
- [ ] Member dashboard
- [ ] Profile management
- [ ] Order history
- [ ] Event history
- [ ] Donation page with Stripe
- [ ] Recurring donation support

---

## Phase F: Polish & Optimization 🔲

**Status:** Not Started

### Tasks

- [ ] SEO optimization
- [ ] Performance audit (Lighthouse 90+)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Photo galleries enhancement
- [ ] Museum exhibit/timeline pages (optional expansion)
- [ ] Preview mode for content editors (optional)

---

## Phase G: Launch Preparation 🔲

**Status:** Not Started

### Tasks

- [ ] Final QA
- [ ] Vercel deployment
- [ ] Environment variables configured
- [ ] Analytics (GA4) setup
- [ ] Sitemap and robots.txt

---

## Decisions Log

| Date | Decision | Choice | Rationale |
|------|----------|--------|-----------|
| 2025-01-08 | Framework | Next.js 16.1.1 | Latest stable with Turbopack, React 19 |
| 2025-01-08 | CSS Framework | Tailwind v4 | CSS-native config, OKLCH colors |
| 2025-01-08 | Component Library | shadcn/ui v4 | Customizable, works with Tailwind v4 |
| 2025-01-08 | i18n Library | next-intl | Best App Router support, URL-based routing |
| 2025-01-08 | Locale Strategy | `as-needed` prefix | Only `/he/...` shows prefix, `/` defaults to English |
| 2025-01-08 | Color Format | OKLCH | Tailwind v4 default, perceptually uniform |
| 2025-01-09 | Sanity Studio | Embedded at `/studio` | Single deployment, shared config, simpler DevOps |
| 2025-01-09 | Localization | Field-level (not document) | Keeps translations synchronized, easier tracking |
| 2026-01-11 | Cart State | Zustand | Simple, minimal boilerplate, persists to localStorage |
| 2026-01-11 | Bulk Sanity Operations | Scripts over MCP | See "Bulk Operations Pattern" below |
| 2026-01-12 | Events pricing model | Single price + priceNote | Simple approach; priceNote handles variants like "Kids $15, Adults $25" |
| 2026-01-12 | Restaurant/Museum pages | Static pages (not CMS) | Quick implementation; can migrate to Sanity later if needed |
| 2026-01-12 | Navigation structure | Minimal changes | Keep flat header; Restaurant added to footer only |

---

## Bulk Operations Pattern

**Important:** For bulk Sanity operations (creating/updating many documents), always prefer **scripts** over individual MCP tool calls.

### Why Scripts Beat MCP for Bulk Operations

| Approach | 100 Documents | Context Usage | Atomic |
|----------|---------------|---------------|--------|
| MCP one-by-one | 100 tool calls | ~50,000 tokens | No |
| Script with transaction | 1 bash command | ~500 tokens | Yes |

### When to Use Each

| Task | Approach |
|------|----------|
| Query/read operations | MCP tools (fine for any quantity) |
| Create/update 1-5 documents | MCP tools |
| Create/update 10+ documents | Write a script |
| Bulk mutations with logic | Write a script |

### Script Pattern

See `scripts/assign-product-categories.ts` for the recommended pattern:

```typescript
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Write token required
});

async function main() {
  // 1. Query documents that need updating
  const docs = await client.fetch(`*[_type == "product" && !defined(field)]`);

  // 2. Build a transaction (atomic batch)
  const transaction = client.transaction();
  for (const doc of docs) {
    transaction.patch(doc._id, { set: { field: value } });
  }

  // 3. Commit all changes at once
  await transaction.commit();
}

main().catch(console.error);
```

Run with: `SANITY_API_TOKEN=xxx npx tsx scripts/your-script.ts`

### Getting a Sanity Write Token

1. Go to https://www.sanity.io/manage/project/r3h9xffe
2. Navigate to **API** → **Tokens**
3. Click **Add API Token**
4. Set permissions to **Editor**
5. Copy and use as environment variable

---

## Notes

- **Middleware deprecation warning:** Next.js 16 shows warning about "middleware" → "proxy" convention. This is informational; `next-intl` middleware still works.
- **Design skill:** Use `/jwb-frontend-design` to reference the design system when building components.
- **Scraped data:** Content from singaporejews.com stored for portfolio demo purposes only.
