/**
 * Upload Education Program Images Script
 *
 * Uploads images for education programs from external URLs.
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/upload-education-images.ts
 *   SANITY_API_TOKEN=xxx npx tsx scripts/upload-education-images.ts --dry-run
 */

import { createClient } from "@sanity/client";

// Sanity client with write access
const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Configuration for education program images
// Document IDs from Sanity query:
// - Ganenu: 388c631e-ae49-481b-b7ab-fc1c3a46eda3
// - SMMIS: bc365d5c-8230-4df7-9896-9af7f52bacb1
// - Sunday School: f7e74bbf-506a-4fb4-93dc-8a3e96e8928f
const EDUCATION_IMAGES = [
  {
    documentId: "388c631e-ae49-481b-b7ab-fc1c3a46eda3",
    name: "Ganenu Preschool",
    imageUrl: "https://singaporejews.com/wp-content/uploads/2023/07/logo_ganenu_small-300x199.png",
    filename: "ganenu-logo.png",
    alt: {
      en: "Ganenu Preschool Logo",
      he: "לוגו גן גננו",
    },
  },
  {
    documentId: "bc365d5c-8230-4df7-9896-9af7f52bacb1",
    name: "Sir Manasseh Meyer International School",
    imageUrl: "https://singaporejews.com/wp-content/uploads/2021/11/smm.png",
    filename: "smmis-logo.png",
    alt: {
      en: "Sir Manasseh Meyer International School (SMMIS) Logo",
      he: "לוגו בית הספר הבינלאומי סר מנשה מייר",
    },
  },
  {
    documentId: "f7e74bbf-506a-4fb4-93dc-8a3e96e8928f",
    name: "Sunday School (Talmud Torah)",
    imageUrl: "https://singaporejews.com/wp-content/uploads/2021/11/Sunday-school1.jpeg",
    filename: "sunday-school.jpeg",
    alt: {
      en: "Sunday School Students",
      he: "תלמידי בית הספר ליום ראשון",
    },
  },
];

/**
 * Download image from URL and upload to Sanity
 */
async function uploadImageFromUrl(
  imageUrl: string,
  filename: string
): Promise<{ _id: string; url: string }> {
  console.log(`  Downloading: ${imageUrl}`);

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
  console.log(`  Downloaded: ${(buffer.length / 1024).toFixed(1)} KB`);

  console.log(`  Uploading to Sanity...`);
  const asset = await client.assets.upload("image", buffer, {
    filename,
  });

  console.log(`  Uploaded: ${asset._id}`);
  return {
    _id: asset._id,
    url: asset.url,
  };
}

/**
 * Upload education program images and patch documents
 */
async function uploadEducationImages(dryRun: boolean): Promise<void> {
  console.log("\n=== Uploading Education Program Images ===\n");

  for (const program of EDUCATION_IMAGES) {
    console.log(`\nProcessing: ${program.name}`);

    if (dryRun) {
      console.log(`  [DRY RUN] Would upload: ${program.imageUrl}`);
      console.log(`  [DRY RUN] Would patch document: ${program.documentId}`);
      continue;
    }

    try {
      // Upload image
      const asset = await uploadImageFromUrl(program.imageUrl, program.filename);

      // Patch education program document with mainImage reference
      await client
        .patch(program.documentId)
        .set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
            alt: program.alt,
          },
        })
        .commit();

      console.log(`  Patched document: ${program.documentId}`);
    } catch (error) {
      console.error(
        `  ERROR: ${error instanceof Error ? error.message : error}`
      );
    }
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("=".repeat(50));
  console.log("Education Program Images Upload Script");
  console.log("=".repeat(50));

  if (dryRun) {
    console.log("\n*** DRY RUN MODE - No changes will be made ***\n");
  }

  if (!process.env.SANITY_API_TOKEN && !dryRun) {
    console.error("ERROR: SANITY_API_TOKEN environment variable is required");
    console.error(
      "Get a token from: https://www.sanity.io/manage/project/r3h9xffe/api/tokens"
    );
    process.exit(1);
  }

  // Upload education program images
  await uploadEducationImages(dryRun);

  console.log("\n" + "=".repeat(50));
  console.log("Upload complete!");
  console.log("=".repeat(50));

  if (!dryRun) {
    console.log("\nVerify at:");
    console.log("- Education: http://localhost:3000/education");
    console.log("- Sanity Studio: http://localhost:3000/studio");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
