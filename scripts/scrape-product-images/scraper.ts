/**
 * Scraper module - Fetches product data from singaporejews.com
 *
 * Uses Cheerio to parse HTML and extract product name, image URL, and product URL
 * from all pagination pages.
 */

import * as cheerio from "cheerio";
import type { ScrapedProduct, ScrapeResult } from "./types";

const BASE_URL = "https://singaporejews.com/shop/products/";
const PRODUCTS_PER_PAGE = 16;
const REQUEST_DELAY_MS = 500;

/**
 * Sleep helper for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Remove WordPress CDN resize parameters to get full-quality image
 * Example: https://i0.wp.com/.../image.jpg?resize=450%2C450&ssl=1
 *       -> https://i0.wp.com/.../image.jpg?ssl=1
 */
function getFullQualityImageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Keep only ssl param, remove resize/fit/w/h
    const ssl = parsed.searchParams.get("ssl");
    parsed.search = ssl ? `?ssl=${ssl}` : "";
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Fetch a single page and parse products
 */
async function scrapePage(pageNum: number): Promise<ScrapedProduct[]> {
  const url = pageNum === 1 ? BASE_URL : `${BASE_URL}page/${pageNum}/`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page ${pageNum}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const products: ScrapedProduct[] = [];

  // WooCommerce Freshio theme structure:
  // - Product titles in: <h3 class="woocommerce-loop-product__title"><a href="...">Name</a></h3>
  // - Product images in: <img class="attachment-woocommerce_thumbnail"> with data-src or src
  // - Products are in <li> elements with type-product class

  // Find all h3 product titles and work backwards to get associated images
  $("h3.woocommerce-loop-product__title").each((_, element) => {
    const $title = $(element);
    const $link = $title.find("a").first();

    const name = $link.text().trim();
    const productUrl = $link.attr("href") || "";

    // Find the closest product container (li with type-product class)
    const $product = $title.closest("li[class*='type-product']");

    // Find the product image within the container
    // First try attachment-woocommerce_thumbnail, then any img in the product
    let $img = $product.find("img.attachment-woocommerce_thumbnail").first();
    if (!$img.length) {
      $img = $product.find("img").first();
    }

    // Get image URL - prefer data-src (lazy loaded), then src
    // Many images use data-src with a placeholder in src
    let imageUrl = $img.attr("data-src") || "";

    // If data-src is empty, try src but skip base64 placeholders
    if (!imageUrl) {
      const srcUrl = $img.attr("src") || "";
      if (!srcUrl.startsWith("data:")) {
        imageUrl = srcUrl;
      }
    }

    // Skip placeholder images
    if (imageUrl.includes("placeholder") || imageUrl.includes("woocommerce-placeholder")) {
      imageUrl = "";
    }

    // Get full quality image URL
    if (imageUrl) {
      imageUrl = getFullQualityImageUrl(imageUrl);
    }

    // Only add if we have a name and image
    if (name && imageUrl && productUrl) {
      products.push({
        name,
        imageUrl,
        productUrl,
      });
    }
  });

  return products;
}

/**
 * Get total number of pages from the pagination
 */
async function getTotalPages(): Promise<number> {
  const response = await fetch(BASE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch first page: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  // Look for "Showing 1-16 of 989 results" text
  const resultsText = $(".woocommerce-result-count").text();
  const match = resultsText.match(/of\s+(\d+)/);

  if (match) {
    const totalProducts = parseInt(match[1], 10);
    return Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  }

  // Fallback: count pagination links
  const lastPageLink = $(".page-numbers:not(.next):not(.prev)").last().text();
  return parseInt(lastPageLink, 10) || 62; // Default to 62 if can't determine
}

/**
 * Create a progress logger
 */
function createProgressLogger(total: number, label: string) {
  let current = 0;
  const startTime = Date.now();

  return {
    increment(item?: string) {
      current++;
      const percent = ((current / total) * 100).toFixed(1);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = (current / parseFloat(elapsed)).toFixed(2);

      process.stdout.write(
        `\r${label}: ${current}/${total} (${percent}%) - ${rate}/s${item ? ` - ${item}` : ""}`
      );
    },
    done() {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`\n${label} complete: ${current} items in ${elapsed}s`);
    },
  };
}

/**
 * Scrape all products from all pages
 */
export async function scrapeAllProducts(
  verbose = false
): Promise<ScrapeResult> {
  console.log("Determining total pages...");
  const totalPages = await getTotalPages();
  console.log(`Found ${totalPages} pages to scrape`);

  const allProducts: ScrapedProduct[] = [];
  const progress = createProgressLogger(totalPages, "Scraping");

  for (let page = 1; page <= totalPages; page++) {
    try {
      const products = await scrapePage(page);
      allProducts.push(...products);
      progress.increment(`page ${page} (${products.length} products)`);

      if (verbose) {
        console.log(`\n  Page ${page}: ${products.length} products`);
        products.slice(0, 2).forEach((p) => console.log(`    - ${p.name}`));
      }

      // Rate limiting between requests
      if (page < totalPages) {
        await sleep(REQUEST_DELAY_MS);
      }
    } catch (error) {
      console.error(`\nError on page ${page}:`, error);
      // Continue with remaining pages
    }
  }

  progress.done();

  // Deduplicate by product URL
  const seen = new Set<string>();
  const uniqueProducts = allProducts.filter((p) => {
    if (seen.has(p.productUrl)) return false;
    seen.add(p.productUrl);
    return true;
  });

  console.log(
    `Scraped ${allProducts.length} products, ${uniqueProducts.length} unique`
  );

  return {
    products: uniqueProducts,
    scrapedAt: new Date().toISOString(),
    totalPages,
    totalProducts: uniqueProducts.length,
  };
}
