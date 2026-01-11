/**
 * Uploader module - Downloads images and uploads to Sanity
 *
 * Uses Sanity Assets API to upload images, then patches products
 * with image references in a single transaction.
 */

import { createClient } from "@sanity/client";
import pLimit from "p-limit";
import type { MatchResult, UploadResult, UploadOutput } from "./types";

// Sanity client with write access
const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Must be false for mutations
  token: process.env.SANITY_API_TOKEN,
});

// Concurrency limit for uploads
const CONCURRENT_UPLOADS = 3;

/**
 * Generate a random key for Sanity array items
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 10);
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

      process.stdout.write(
        `\r${label}: ${current}/${total} (${percent}%) - ${elapsed}s${item ? ` - ${item}` : ""}`
      );
    },
    done() {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`\n${label} complete: ${current} items in ${elapsed}s`);
    },
  };
}

/**
 * Download image from URL and upload to Sanity
 */
async function uploadImageFromUrl(
  imageUrl: string,
  filename: string
): Promise<{ _id: string; url: string }> {
  // Fetch image from source
  const response = await fetch(imageUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${imageUrl}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  // Upload to Sanity
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });

  return {
    _id: asset._id,
    url: asset.url,
  };
}

/**
 * Upload all matched images to Sanity
 */
export async function uploadAllImages(
  matches: MatchResult[],
  dryRun = false
): Promise<UploadOutput> {
  // Filter to only matched products with images
  const toUpload = matches.filter(
    (m) => (m.status === "matched" || m.status === "low_confidence") && m.imageUrl
  );

  console.log(`\nUploading ${toUpload.length} images...`);

  if (dryRun) {
    console.log("DRY RUN: Would upload images for:");
    toUpload.slice(0, 5).forEach((m) => {
      console.log(`  - ${m.sanityName}`);
    });
    if (toUpload.length > 5) {
      console.log(`  ... and ${toUpload.length - 5} more`);
    }

    return {
      results: toUpload.map((m) => ({
        sanityId: m.sanityId,
        status: "skipped" as const,
      })),
      stats: {
        total: toUpload.length,
        uploaded: 0,
        failed: 0,
        skipped: toUpload.length,
      },
      uploadedAt: new Date().toISOString(),
    };
  }

  // Check for API token
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error(
      "SANITY_API_TOKEN environment variable is required for uploads"
    );
  }

  const limit = pLimit(CONCURRENT_UPLOADS);
  const results: UploadResult[] = [];
  const progress = createProgressLogger(toUpload.length, "Uploading");

  // Map of sanityId -> asset info for patching
  const assetMap = new Map<string, { assetId: string; productName: string }>();

  // Upload all images with concurrency limit
  await Promise.all(
    toUpload.map((match) =>
      limit(async () => {
        try {
          // Generate filename from product slug
          const filename = `product-${match.sanityId.substring(0, 8)}.jpg`;

          const asset = await uploadImageFromUrl(match.imageUrl!, filename);

          assetMap.set(match.sanityId, {
            assetId: asset._id,
            productName: match.sanityName,
          });

          results.push({
            sanityId: match.sanityId,
            assetId: asset._id,
            imageUrl: asset.url,
            status: "uploaded",
          });

          progress.increment(match.sanityName.substring(0, 30));
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          results.push({
            sanityId: match.sanityId,
            status: "failed",
            error: errorMessage,
          });

          console.error(`\nFailed to upload ${match.sanityName}: ${errorMessage}`);
        }
      })
    )
  );

  progress.done();

  // Now patch all products with images in a single transaction
  const successfulUploads = results.filter((r) => r.status === "uploaded");

  if (successfulUploads.length > 0) {
    console.log(
      `\nPatching ${successfulUploads.length} products with images...`
    );

    const transaction = client.transaction();

    for (const result of successfulUploads) {
      const assetInfo = assetMap.get(result.sanityId);
      if (!assetInfo) continue;

      // Get the product name for alt text
      const match = toUpload.find((m) => m.sanityId === result.sanityId);
      const altText = match?.sanityName || "";

      transaction.patch(result.sanityId, {
        set: {
          images: [
            {
              _type: "image",
              _key: generateKey(),
              asset: {
                _type: "reference",
                _ref: result.assetId,
              },
              alt: {
                en: altText,
                he: "", // Leave Hebrew empty for now
              },
            },
          ],
        },
      });
    }

    try {
      await transaction.commit();
      console.log(`Successfully patched ${successfulUploads.length} products`);
    } catch (error) {
      console.error("Failed to commit transaction:", error);
      throw error;
    }
  }

  const stats = {
    total: toUpload.length,
    uploaded: successfulUploads.length,
    failed: results.filter((r) => r.status === "failed").length,
    skipped: results.filter((r) => r.status === "skipped").length,
  };

  console.log(`\nUpload Summary:`);
  console.log(`  Uploaded: ${stats.uploaded}`);
  console.log(`  Failed:   ${stats.failed}`);
  console.log(`  Skipped:  ${stats.skipped}`);

  return {
    results,
    stats,
    uploadedAt: new Date().toISOString(),
  };
}
