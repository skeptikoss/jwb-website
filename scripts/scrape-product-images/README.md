# Product Image Scraper

Scrapes product images from the source website (singaporejews.com) and uploads them to Sanity CMS.

## Quick Summary

- **What it does:** Downloads product images from the source shop and matches them to our Sanity products by name
- **Result:** 74 out of 100 products now have images
- **When to re-run:** When new products are added and need images from the source site

## Usage

```bash
# Install dependencies (if not already done)
npm install

# Run all phases (scrape → match → upload)
SANITY_API_TOKEN=xxx npx tsx scripts/scrape-product-images/index.ts

# Or run phases individually
npx tsx scripts/scrape-product-images/index.ts --phase=scrape   # Fetch from source
npx tsx scripts/scrape-product-images/index.ts --phase=match    # Match to Sanity
SANITY_API_TOKEN=xxx npx tsx scripts/scrape-product-images/index.ts --phase=upload  # Upload images

# Preview without making changes
npx tsx scripts/scrape-product-images/index.ts --dry-run
```

**Get a Sanity token:** https://www.sanity.io/manage/project/r3h9xffe/api/tokens (needs Editor permission)

## How It Works

```
Phase 1: SCRAPE          Phase 2: MATCH           Phase 3: UPLOAD
─────────────────        ──────────────────       ─────────────────
Fetch 62 pages     →     Fuzzy match names   →   Download images
from source site         using Fuse.js            Upload to Sanity
                                                  Patch products
     ↓                        ↓                        ↓
scraped-products.json   matched-products.json   upload-results.json
(593 products)          (74 matched, 26 not)    (74 uploaded)
```

## Why Some Products Don't Match

26 products couldn't be matched because:
- Name differences (e.g., our "Carmel Tirosh White Grape Juice 1L" vs source's "Carmel Tirosh Grape Juice, White Grape 1L")
- Product doesn't exist on source site
- Product was out of stock (no image available)

**Unmatched products are logged in:** `data/matched-products.json`

## Technical Notes

### Source Site Structure (singaporejews.com)

The source uses WordPress + WooCommerce with "Freshio" theme:
- Product titles: `<h3 class="woocommerce-loop-product__title">`
- Images use lazy loading: `data-src` attribute (not `src`)
- Images hosted on: `i0.wp.com` (WordPress CDN)

### Safe to Re-run

- Sanity deduplicates images by content hash (won't create duplicates)
- Only patches products that successfully match
- Intermediate results saved in `data/` folder for resumability

## Files

| File | Purpose |
|------|---------|
| `index.ts` | CLI entry point with `--phase` and `--dry-run` options |
| `scraper.ts` | Fetches and parses HTML from source site |
| `matcher.ts` | Fuse.js fuzzy matching against Sanity products |
| `uploader.ts` | Downloads images and uploads to Sanity |
| `types.ts` | TypeScript interfaces |
| `data/` | Intermediate JSON files (gitignored) |

## Troubleshooting

**"0 products found"** → Source site HTML structure may have changed. Inspect the actual HTML and update selectors in `scraper.ts`.

**Low match rate** → Adjust `threshold` in `matcher.ts` (lower = stricter, higher = looser).

**Upload fails** → Check your `SANITY_API_TOKEN` has Editor permissions.
