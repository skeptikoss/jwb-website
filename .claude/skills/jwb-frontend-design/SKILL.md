---
name: jwb-frontend-design
description: Create production-grade frontend interfaces for the Singapore Jewish Welfare Board (JWB) website revamp. Implements the "Heritage Meets Haven" design system with Next.js 14 App Router, Sanity CMS integration, shadcn/ui components, and full Hebrew RTL support. Use when building any JWB pages, components, or features.
---

# JWB Frontend Design System

## Project Context

Building singaporejews.com - a unified community platform for the Jewish Welfare Board of Singapore. The site serves ~2,500 Jewish residents (expats from Israel, America, Australia, Europe) and visitors seeking:
- Community information (synagogues, history, services)
- E-commerce (50-100 kosher products)
- Event booking (Shabbat meals, community events)
- Online donations
- Member portal

## Design Philosophy: "Heritage Meets Haven"

The design bridges Singapore's multicultural modernity with Jewish tradition and Baghdadi heritage. It should feel like walking into a welcoming community center - sophisticated yet approachable, rooted in history yet forward-looking.

**Tone:** Warm hospitality, heritage elegance, community-focused
**NOT:** Generic religious site, sterile corporate, overly ornate

## Color Palette

```css
:root {
  /* Primary */
  --color-navy: #1a365d;          /* Trust, tradition, depth */
  --color-gold: #c9a227;          /* Hospitality, celebration */
  --color-cream: #faf8f5;         /* Warmth, approachability */

  /* Secondary */
  --color-terracotta: #c45d3a;    /* Middle Eastern warmth */
  --color-sage: #7d8c6e;          /* Growth, Ganenu connection */
  --color-sky: #6b9ac4;           /* Singapore sky/sea calm */

  /* Neutrals */
  --color-charcoal: #2d3748;      /* Primary text */
  --color-gray: #8a8680;          /* Secondary text */
  --color-white: #f7f5f2;         /* Backgrounds */

  /* Semantic */
  --color-success: #4a7c59;
  --color-error: #b94a48;
  --color-warning: #c9a227;
}
```

### Tailwind Mapping
```js
// tailwind.config.ts colors
colors: {
  navy: '#1a365d',
  gold: '#c9a227',
  cream: '#faf8f5',
  terracotta: '#c45d3a',
  sage: '#7d8c6e',
  sky: '#6b9ac4',
  charcoal: '#2d3748',
  'warm-gray': '#8a8680',
  'off-white': '#f7f5f2',
}
```

## Typography

### Font Families
| Role | Font | Weights | Use Cases |
|------|------|---------|-----------|
| Headings | Cormorant Garamond | 500, 600, 700 | Page titles, section headers, pull quotes, hero text |
| Body | Source Sans 3 | 400, 600 | Body text, descriptions, UI labels |
| Hebrew | Heebo | 400, 500, 600 | All Hebrew content |
| UI/Accent | DM Sans | 400, 500, 600 | Buttons, navigation, badges, form labels |

### Typography Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Tailwind Font Config
```js
// tailwind.config.ts fontFamily
fontFamily: {
  heading: ['Cormorant Garamond', 'serif'],
  body: ['Source Sans 3', 'sans-serif'],
  hebrew: ['Heebo', 'sans-serif'],
  ui: ['DM Sans', 'sans-serif'],
}
```

## Spacing Scale

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
```

## Visual Elements

### Shadows
- Subtle, warm-toned shadows (not harsh gray)
- Default: `box-shadow: 0 4px 20px rgba(26, 54, 93, 0.08)`
- Elevated: `box-shadow: 0 8px 30px rgba(26, 54, 93, 0.12)`

### Borders
- Gold accent: `1px solid var(--color-gold)` or `border-gold`
- Standard: `1px solid rgba(139, 134, 128, 0.2)`
- Radius: `8px` cards, `6px` buttons, `4px` inputs

### Patterns/Textures
- Subtle geometric patterns inspired by synagogue architecture
- Soft paper/linen textures for backgrounds
- Grain overlay for hero images (opacity: 0.03)

## Component Patterns

### Cards (Events, Products, News)
```tsx
<Card className="bg-white shadow-warm border-t-[3px] border-gold rounded-lg overflow-hidden">
  <div className="aspect-video relative">
    <Image ... />
  </div>
  <CardContent className="p-6">
    <h3 className="font-heading text-xl font-semibold text-charcoal">Title</h3>
    <p className="font-body text-warm-gray text-sm mt-2">Meta info</p>
    <p className="font-body text-charcoal mt-3">Description</p>
    <Button className="mt-4">Action</Button>
  </CardContent>
</Card>
```

### Buttons
```tsx
// Primary - Navy background, cream text, gold hover glow
<Button className="bg-navy text-cream hover:shadow-[0_0_20px_rgba(201,162,39,0.3)] font-ui">
  Primary Action
</Button>

// Secondary - Cream background, navy text, navy border
<Button variant="outline" className="bg-cream text-navy border-navy hover:bg-navy hover:text-cream font-ui">
  Secondary
</Button>

// Accent - Gold background, charcoal text
<Button className="bg-gold text-charcoal hover:bg-gold/90 font-ui">
  Accent
</Button>
```

### Navigation
- Sticky header with cream background (`bg-cream/95 backdrop-blur-sm`)
- Navy text, gold underline on active state
- Hebrew toggle in top right
- Mobile: Slide-out sheet from right

### Forms
- Labels above inputs (font-ui, text-sm, text-charcoal)
- Navy focus ring (`focus:ring-2 focus:ring-navy focus:ring-offset-2`)
- Inline validation with icon + message
- Hebrew fields auto-RTL with `dir="rtl"`

## RTL/Multi-Language Implementation

### URL Structure
```
/en/...  → English (LTR)
/he/...  → Hebrew (RTL)
```

### RTL-Specific Styles
```css
[dir="rtl"] {
  --text-align: right;
}

/* Use logical properties */
.card { margin-inline-start: 1rem; }  /* Not margin-left */
.icon { inset-inline-end: 0.5rem; }   /* Not right */
```

### Layout Flipping Rules
- Navigation items reverse order
- Icons flip (arrows, chevrons) - use CSS `transform: scaleX(-1)` or RTL-aware icons
- Form layouts mirror
- Card grid maintains visual balance

### Implementation with next-intl
```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  const dir = locale === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={locale === 'he' ? 'font-hebrew' : 'font-body'}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## E-commerce Patterns

### Product Cards
```tsx
<div className="group relative">
  <Card className="overflow-hidden">
    <div className="aspect-square relative">
      <Image ... />
      {/* Kosher badge */}
      <Badge className="absolute top-2 right-2 bg-sage text-white">
        Kosher
      </Badge>
      {/* Quick add on hover */}
      <Button
        className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Quick Add
      </Button>
    </div>
    <CardContent className="p-4">
      <h3 className="font-body font-semibold truncate">{name}</h3>
      <p className="text-gold font-ui font-semibold mt-1">${price}</p>
      {stock <= 5 && <p className="text-terracotta text-sm">Only {stock} left</p>}
    </CardContent>
  </Card>
</div>
```

### Cart Drawer
- Sheet component sliding from right
- Item count badge in header (gold circle)
- Clear quantity controls (+/- buttons)
- Sticky checkout button at bottom

### Checkout Flow
- Step indicator with navy/gold theming
- Address form with autocomplete
- Order summary in sticky sidebar (desktop)
- Clear payment method display

## Cultural Considerations

### Imagery Guidelines
- Community-focused (gatherings, celebrations, learning)
- Synagogue architecture (Maghain Aboth, Chesed El)
- Singapore cityscape integration
- Warm, natural lighting - avoid harsh flash

### Jewish Symbols
- Handle with respect and accuracy
- Star of David: sparingly, appropriately (not decorative)
- Menorah, Torah scroll: for relevant contexts only
- No decorative misuse of religious symbols

### Content Tone
- Welcoming to all backgrounds
- Inclusive language
- Avoid assumptions about observance level
- Clear explanations for visitors unfamiliar with traditions

## Technical Requirements

### Stack
- Next.js 14+ App Router
- TypeScript strict mode
- Tailwind CSS with design tokens
- shadcn/ui as component foundation
- Sanity CMS for content
- Stripe for payments

### Performance Targets
- Lighthouse 90+ all categories
- Use `next/image` for all images
- Lazy load below-fold content
- Skeleton loaders during data fetch

### Accessibility (WCAG 2.1 AA)
- Focus visible on all interactive elements
- Color contrast ratios met (4.5:1 text, 3:1 UI)
- Screen reader announcements for dynamic content
- Keyboard navigation support

## File Structure

```
components/
├── ui/               # shadcn/ui customized with JWB theme
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── navigation.tsx
│   └── language-toggle.tsx
├── shop/
│   ├── product-card.tsx
│   ├── cart-drawer.tsx
│   └── checkout-form.tsx
├── events/
│   ├── event-card.tsx
│   ├── calendar.tsx
│   └── rsvp-form.tsx
└── common/
    ├── hero.tsx
    ├── section.tsx
    └── cta-banner.tsx
```

## Quick Reference

### Class Patterns
```tsx
// Hero section
"bg-navy text-cream py-24"

// Section container
"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"

// Card grid
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Gold accent border
"border-l-4 border-gold pl-4"

// Page title
"font-heading text-4xl md:text-5xl font-bold text-navy"

// Section heading
"font-heading text-2xl md:text-3xl font-semibold text-charcoal"
```

### Sanity Content Query Pattern
```ts
// GROQ query for localized content
const query = groq`
  *[_type == "page" && slug.current == $slug][0]{
    "title": title[$locale],
    "content": content[$locale],
    image
  }
`;
```
