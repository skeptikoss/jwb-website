/**
 * Matcher module - Fuzzy matching between scraped and Sanity products
 *
 * Uses Fuse.js for fuzzy string matching with name normalization
 * to handle variations like "(KLP)", "(64oz)", commas, etc.
 */

import Fuse from "fuse.js";
import { createClient } from "@sanity/client";
import type {
  ScrapedProduct,
  SanityProduct,
  MatchResult,
  MatchOutput,
} from "./types";

// Match confidence thresholds
const HIGH_CONFIDENCE_THRESHOLD = 0.3; // Fuse score < 0.3 = high confidence
const LOW_CONFIDENCE_THRESHOLD = 0.5; // Fuse score > 0.5 = skip

// Sanity client for fetching products
const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Read-only, CDN is fine
});

/**
 * Normalize product name for better matching
 *
 * Examples:
 * - "Achva Tahini, Plain 500g (KLP)" -> "achva tahini plain 500g"
 * - "Kedem 100% Pure Grape Juice, Original 1.89L (64oz)" -> "kedem 100 pure grape juice original 1.89l"
 */
export function normalizeName(name: string): string {
  return (
    name
      .toLowerCase()
      // Remove parenthetical info: (KLP), (64oz), (Parve), etc.
      .replace(/\([^)]*\)/g, "")
      // Remove commas
      .replace(/,/g, "")
      // Remove special characters except spaces and alphanumeric
      .replace(/[^a-z0-9\s.]/g, "")
      // Normalize units (add space before unit if missing)
      .replace(/(\d)(ml|g|kg|l|oz)/gi, "$1 $2")
      // Collapse multiple spaces
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Fetch all products from Sanity (excluding drafts)
 */
export async function loadSanityProducts(): Promise<SanityProduct[]> {
  console.log("Fetching products from Sanity...");

  const products = await client.fetch<SanityProduct[]>(
    `*[_type == "product" && !(_id match "drafts.*")]{
      _id,
      name,
      slug
    }`
  );

  console.log(`Found ${products.length} published products in Sanity`);
  return products;
}

/**
 * Match scraped products to Sanity products using fuzzy matching
 */
export function matchProducts(
  scrapedProducts: ScrapedProduct[],
  sanityProducts: SanityProduct[]
): MatchOutput {
  console.log(
    `Matching ${sanityProducts.length} Sanity products against ${scrapedProducts.length} scraped products...`
  );

  // Prepare scraped products with normalized names for Fuse
  const normalizedScraped = scrapedProducts.map((p) => ({
    ...p,
    normalizedName: normalizeName(p.name),
  }));

  // Configure Fuse.js
  const fuse = new Fuse(normalizedScraped, {
    includeScore: true,
    threshold: 0.6, // Allow somewhat loose matches, we'll filter by score
    ignoreLocation: true, // Match anywhere in string
    keys: ["normalizedName"],
  });

  const matched: MatchResult[] = [];
  const unmatched: MatchResult[] = [];
  const lowConfidence: MatchResult[] = [];

  for (const sanityProduct of sanityProducts) {
    const normalizedSanityName = normalizeName(sanityProduct.name.en);
    const results = fuse.search(normalizedSanityName);

    if (results.length > 0) {
      const bestMatch = results[0];
      const score = bestMatch.score ?? 1;
      const confidence = 1 - score;

      const result: MatchResult = {
        sanityId: sanityProduct._id,
        sanityName: sanityProduct.name.en,
        sourceName: bestMatch.item.name,
        imageUrl: bestMatch.item.imageUrl,
        confidence,
        status: "matched",
      };

      if (score <= HIGH_CONFIDENCE_THRESHOLD) {
        // High confidence match
        matched.push(result);
      } else if (score <= LOW_CONFIDENCE_THRESHOLD) {
        // Low confidence - still include but flag it
        result.status = "low_confidence";
        lowConfidence.push(result);
      } else {
        // Score too low, mark as unmatched
        result.status = "unmatched";
        result.sourceName = null;
        result.imageUrl = null;
        result.confidence = 0;
        unmatched.push(result);
      }
    } else {
      // No matches found
      unmatched.push({
        sanityId: sanityProduct._id,
        sanityName: sanityProduct.name.en,
        sourceName: null,
        imageUrl: null,
        confidence: 0,
        status: "unmatched",
      });
    }
  }

  const total = sanityProducts.length;
  const matchedCount = matched.length + lowConfidence.length;
  const matchRate = ((matchedCount / total) * 100).toFixed(1);

  // Log summary
  console.log(`\nMatch Summary:`);
  console.log(`  High confidence: ${matched.length}`);
  console.log(`  Low confidence:  ${lowConfidence.length}`);
  console.log(`  Unmatched:       ${unmatched.length}`);
  console.log(`  Match rate:      ${matchRate}%`);

  // Log some example matches
  if (matched.length > 0) {
    console.log(`\nExample high-confidence matches:`);
    matched.slice(0, 3).forEach((m) => {
      console.log(`  "${m.sanityName}" -> "${m.sourceName}" (${(m.confidence * 100).toFixed(0)}%)`);
    });
  }

  // Log low confidence for review
  if (lowConfidence.length > 0) {
    console.log(`\nLow confidence matches (review recommended):`);
    lowConfidence.slice(0, 5).forEach((m) => {
      console.log(`  "${m.sanityName}" -> "${m.sourceName}" (${(m.confidence * 100).toFixed(0)}%)`);
    });
  }

  // Log unmatched for review
  if (unmatched.length > 0) {
    console.log(`\nUnmatched products:`);
    unmatched.slice(0, 5).forEach((m) => {
      console.log(`  "${m.sanityName}"`);
    });
    if (unmatched.length > 5) {
      console.log(`  ... and ${unmatched.length - 5} more`);
    }
  }

  return {
    matched,
    unmatched,
    lowConfidence,
    stats: {
      total,
      matched: matched.length,
      unmatched: unmatched.length,
      lowConfidence: lowConfidence.length,
      matchRate: `${matchRate}%`,
    },
    matchedAt: new Date().toISOString(),
  };
}
