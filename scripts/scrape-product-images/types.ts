/**
 * TypeScript interfaces for the product image scraping pipeline
 */

// Phase 1: Scraping
export interface ScrapedProduct {
  name: string;
  imageUrl: string;
  productUrl: string;
}

export interface ScrapeResult {
  products: ScrapedProduct[];
  scrapedAt: string;
  totalPages: number;
  totalProducts: number;
}

// Phase 2: Matching
export interface SanityProduct {
  _id: string;
  name: {
    en: string;
    he?: string;
  };
  slug: {
    current: string;
  };
}

export interface MatchResult {
  sanityId: string;
  sanityName: string;
  sourceName: string | null;
  imageUrl: string | null;
  confidence: number;
  status: "matched" | "unmatched" | "low_confidence";
}

export interface MatchOutput {
  matched: MatchResult[];
  unmatched: MatchResult[];
  lowConfidence: MatchResult[];
  stats: {
    total: number;
    matched: number;
    unmatched: number;
    lowConfidence: number;
    matchRate: string;
  };
  matchedAt: string;
}

// Phase 3: Upload
export interface UploadResult {
  sanityId: string;
  assetId?: string;
  imageUrl?: string;
  status: "uploaded" | "failed" | "skipped";
  error?: string;
}

export interface UploadOutput {
  results: UploadResult[];
  stats: {
    total: number;
    uploaded: number;
    failed: number;
    skipped: number;
  };
  uploadedAt: string;
}

// CLI Args
export interface CliArgs {
  dryRun: boolean;
  phase: "all" | "scrape" | "match" | "upload";
  verbose: boolean;
}
