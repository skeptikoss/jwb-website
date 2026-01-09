# JWB Website Roadmap

> **Project:** Portfolio demo redesign of singaporejews.com
> **Stack:** Next.js 16 + React 19 + Tailwind v4 + Sanity CMS + Stripe
> **Plan File:** `~/.claude/plans/parsed-orbiting-zebra.md`

---

## Current Status

| Phase | Status | Progress |
|-------|--------|----------|
| A. Foundation | ✅ Complete | 100% |
| B. Core Content | 🔄 In Progress | 85% |
| B.1 Content Fixes | 🔄 In Progress | 0% |
| C. E-commerce | 🔲 Not Started | 0% |
| D. Events & Booking | 🔲 Not Started | 0% |
| E. Member Portal & Donations | 🔲 Not Started | 0% |
| F. Museum & Polish | 🔲 Not Started | 0% |
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

## Phase B.1: Content Fixes 🔄

**Status:** In Progress
**Issue:** Content scraped from singaporejews.com is incomplete. Frontend routes missing for people.

### 1. Missing Frontend Routes (BLOCKING)

No pages exist to display Person documents (Rabbi, Youth Leader):

- [ ] Create `/leadership` or `/people` route
  - [ ] Listing page showing all clergy/staff
  - [ ] Detail page `/leadership/[slug]` for individual profiles
- [ ] Add navigation link in header
- [ ] Add i18n translations for new routes

**Current state:** Person documents exist in Sanity but return 404 on frontend.

### 2. History Page Content Gap

**Sanity document:** `b9bc3d84-9cbd-40a9-815c-667e3e6c7081` (slug: `history`)

Current content is ~250 words. Source has ~1500 words. Missing:

- [ ] First synagogue in 1840 on Synagogue Street (now Financial District)
- [ ] Trustees: Joseph Dwek Cohen, A. Solomon, Joshua M. Joshua, Manasseh Meyer
- [ ] 1931 census: 832 Jews were largest property owners
- [ ] WWII: Japanese invasion 1942, internment, post-war emigration
- [ ] Notable figures: David Marshall (first chief minister), Dr. Yahya Cohen (Surgeon General)
- [ ] Chabad students program since 2002
- [ ] Bnei Akivah shlichot since 2012
- [ ] Ganenu renamed to Manasseh Meyer School in 2008, expanded to primary
- [ ] Jacob Ballas Centre details (opened 2007, facilities)
- [ ] Oral history interview links (National Archives)

**Source URL:** https://singaporejews.com/history-2

### 3. Maghain Aboth Synagogue Content Gap

**Sanity document:** `a56371d9-5ee0-4aba-a65c-075dc2382499` (slug: `maghain-aboth`)

Missing `history` field content:

- [ ] Add full history to `history` (localeBlockContent) field:
  - First synagogue on Synagogue Street (Boat Quay area) in 1841
  - Trustees: Joseph Dwek, Nassim Joseph Ezra, Ezra Ezra Ezekiel
  - Move to Waterloo Street, consecration April 4, 1878
  - Ladies gallery construction by Sir Manasseh Meyer
  - Centenary celebrations with David Marshall, 1.8m gold Menorah
  - National monument status February 27, 1998
  - 125th anniversary in 2004

- [ ] Update service times to full schedule:
  - Shacharit: 7:30am daily (8am Sunday & Public Holidays)
  - Mincha: 6:45pm daily, followed by Arvit
  - Shabbat Shacharit: 9:15am
  - Shabbat Mincha: 6:15pm

**Source URL:** https://singaporejews.com/maghain-aboth-synagogues

### 4. Chesed El Synagogue Content Gap

**Sanity document:** `a716c418-5ae3-4fd9-bc85-7f2d63800c7f` (slug: `chesed-el`)

Missing `history` field content:

- [ ] Add full history to `history` (localeBlockContent) field:
  - Sir Manasseh Meyer's story (poor immigrant → wealthy trader → knighted 1929)
  - Built on private estate, inaugurated 1905
  - Run by Chesed El Synagogue Settlement Trust
  - National monument status
  - Centennial celebration in 2005

- [ ] Update service times:
  - Monday morning services
  - Major holidays schedule

- [ ] Add tour contact: Mr. Sol Solomon 86413570

**Source URL:** https://singaporejews.com/chesed-el-synagogues

### 5. Hebrew Translations

After updating English content:

- [ ] Translate new History page content to Hebrew
- [ ] Translate Maghain Aboth history to Hebrew
- [ ] Translate Chesed El history to Hebrew

### Technical Notes

- Use Firecrawl MCP to scrape full content from source URLs
- Sanity project ID: `r3h9xffe`, dataset: `production`
- Use `patch_document` to update existing documents
- Portable Text block structure: `{_key, _type: "block", style, children: [{_key, _type: "span", text}]}`
- Hebrew content goes in `.he` field, English in `.en` field

---

## Phase C: E-commerce 🔲

**Status:** Not Started

### Tasks

- [ ] Product schema in Sanity
- [ ] Product listing page with filters
- [ ] Product detail page
- [ ] Shopping cart (zustand or context)
- [ ] Stripe checkout integration
- [ ] Order confirmation flow
- [ ] Scrape product data (50-100 items from Elite Kosher Mart)

---

## Phase D: Events & Booking 🔲

**Status:** Not Started

### Tasks

- [ ] Event schema in Sanity
- [ ] Events listing with calendar view
- [ ] Event detail page
- [ ] RSVP/booking flow
- [ ] Shabbat meal reservations
- [ ] Stripe integration for paid events
- [ ] Email confirmations (mock for demo)

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

## Phase F: Museum & Polish 🔲

**Status:** Not Started

### Tasks

- [ ] Museum section design
- [ ] Exhibit/timeline pages
- [ ] Photo galleries
- [ ] SEO optimization
- [ ] Performance audit (Lighthouse 90+)
- [ ] Accessibility audit (WCAG 2.1 AA)

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

---

## Notes

- **Middleware deprecation warning:** Next.js 16 shows warning about "middleware" → "proxy" convention. This is informational; `next-intl` middleware still works.
- **Design skill:** Use `/jwb-frontend-design` to reference the design system when building components.
- **Scraped data:** Content from singaporejews.com stored for portfolio demo purposes only.
