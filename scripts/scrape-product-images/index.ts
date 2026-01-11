#!/usr/bin/env npx tsx
/**
 * Product Image Scraping Pipeline
 *
 * Scrapes product images from singaporejews.com and uploads them to Sanity CMS.
 *
 * Usage:
 *   npx tsx scripts/scrape-product-images/index.ts [options]
 *
 * Options:
 *   --dry-run        Preview what would happen without making changes
 *   --phase=PHASE    Run only a specific phase: scrape, match, or upload
 *   --verbose        Show detailed output
 *
 * Examples:
 *   # Dry run all phases
 *   npx tsx scripts/scrape-product-images/index.ts --dry-run
 *
 *   # Run only scraping phase
 *   npx tsx scripts/scrape-product-images/index.ts --phase=scrape
 *
 *   # Run matching phase
 *   npx tsx scripts/scrape-product-images/index.ts --phase=match
 *
 *   # Run upload phase (requires SANITY_API_TOKEN)
 *   SANITY_API_TOKEN=xxx npx tsx scripts/scrape-product-images/index.ts --phase=upload
 *
 *   # Run all phases
 *   SANITY_API_TOKEN=xxx npx tsx scripts/scrape-product-images/index.ts
 */

import * as fs from "fs";
import * as path from "path";
import { scrapeAllProducts } from "./scraper";
import { loadSanityProducts, matchProducts } from "./matcher";
import { uploadAllImages } from "./uploader";
import type {
  CliArgs,
  ScrapeResult,
  MatchOutput,
  UploadOutput,
  MatchResult,
} from "./types";

// Data directory for intermediate files
const DATA_DIR = path.join(__dirname, "data");

/**
 * Parse command line arguments
 */
function parseArgs(): CliArgs {
  const args = process.argv.slice(2);

  return {
    dryRun: args.includes("--dry-run"),
    phase: (args.find((a) => a.startsWith("--phase="))?.split("=")[1] ||
      "all") as CliArgs["phase"],
    verbose: args.includes("--verbose") || args.includes("-v"),
  };
}

/**
 * Ensure data directory exists
 */
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Save JSON to file
 */
function saveJson<T>(filename: string, data: T): void {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`Saved to ${filepath}`);
}

/**
 * Load JSON from file
 */
function loadJson<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    throw new Error(`File not found: ${filepath}. Run the previous phase first.`);
  }
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

/**
 * Check if file exists
 */
function fileExists(filename: string): boolean {
  return fs.existsSync(path.join(DATA_DIR, filename));
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const args = parseArgs();

  console.log("=".repeat(60));
  console.log("Product Image Scraping Pipeline");
  console.log("=".repeat(60));
  console.log(`Mode: ${args.dryRun ? "DRY RUN" : "LIVE"}`);
  console.log(`Phase: ${args.phase}`);
  console.log(`Verbose: ${args.verbose}`);
  console.log("=".repeat(60));

  ensureDataDir();

  // Phase 1: Scrape
  if (args.phase === "all" || args.phase === "scrape") {
    console.log("\n" + "=".repeat(60));
    console.log("Phase 1: SCRAPING");
    console.log("=".repeat(60));

    const result = await scrapeAllProducts(args.verbose);
    saveJson("scraped-products.json", result);

    console.log(`\nScraped ${result.totalProducts} products from ${result.totalPages} pages`);
  }

  // Phase 2: Match
  if (args.phase === "all" || args.phase === "match") {
    console.log("\n" + "=".repeat(60));
    console.log("Phase 2: MATCHING");
    console.log("=".repeat(60));

    // Load scraped products
    if (!fileExists("scraped-products.json")) {
      console.error(
        "Error: scraped-products.json not found. Run --phase=scrape first."
      );
      process.exit(1);
    }

    const scrapeResult = loadJson<ScrapeResult>("scraped-products.json");
    console.log(`Loaded ${scrapeResult.products.length} scraped products`);

    // Fetch Sanity products
    const sanityProducts = await loadSanityProducts();

    // Run matching
    const matchResult = matchProducts(scrapeResult.products, sanityProducts);
    saveJson("matched-products.json", matchResult);
  }

  // Phase 3: Upload
  if (args.phase === "all" || args.phase === "upload") {
    console.log("\n" + "=".repeat(60));
    console.log("Phase 3: UPLOAD");
    console.log("=".repeat(60));

    // Load matched products
    if (!fileExists("matched-products.json")) {
      console.error(
        "Error: matched-products.json not found. Run --phase=match first."
      );
      process.exit(1);
    }

    const matchResult = loadJson<MatchOutput>("matched-products.json");

    // Combine matched and low confidence for upload
    const toUpload: MatchResult[] = [
      ...matchResult.matched,
      ...matchResult.lowConfidence,
    ];

    console.log(
      `Found ${toUpload.length} products to upload images for`
    );

    // Check for API token if not dry run
    if (!args.dryRun && !process.env.SANITY_API_TOKEN) {
      console.error("\nError: SANITY_API_TOKEN environment variable required");
      console.error(
        "Get a token from: https://www.sanity.io/manage/project/r3h9xffe/api/tokens"
      );
      process.exit(1);
    }

    const uploadResult = await uploadAllImages(toUpload, args.dryRun);
    saveJson("upload-results.json", uploadResult);
  }

  console.log("\n" + "=".repeat(60));
  console.log("COMPLETE");
  console.log("=".repeat(60));

  if (args.dryRun) {
    console.log("\nThis was a DRY RUN. No changes were made.");
    console.log("Remove --dry-run to execute for real.");
  }
}

// Run main
main().catch((error) => {
  console.error("\nFatal error:", error);
  process.exit(1);
});
