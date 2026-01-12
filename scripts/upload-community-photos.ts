/**
 * Upload Community Photos Script
 *
 * Uploads photos for:
 * - Leadership (Rabbi photos)
 * - Synagogues (main images and gallery)
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/upload-community-photos.ts
 *   SANITY_API_TOKEN=xxx npx tsx scripts/upload-community-photos.ts --dry-run
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

// Configuration for leadership photos
const LEADERSHIP_PHOTOS = [
  {
    documentId: "8aff755f-908e-4d8c-bc06-d7458466126d",
    name: "Rabbi Mordechai Abergel",
    imageUrl: "https://singaporejews.com/wp-content/uploads/2021/11/723000_1200.jpg",
    filename: "rabbi-mordechai-abergel.jpg",
  },
  {
    documentId: "adfdd1da-8f56-4f32-a58d-dd589fbd0242",
    name: "Rabbi Netanel Rivni",
    imageUrl: "https://singaporejews.com/wp-content/uploads/2021/11/rivni-crop-u14714.jpg",
    filename: "rabbi-netanel-rivni.jpg",
  },
];

// Configuration for synagogue photos
const SYNAGOGUE_PHOTOS = [
  {
    documentId: "a56371d9-5ee0-4aba-a65c-075dc2382499",
    name: "Maghain Aboth Synagogue",
    mainImage: {
      url: "https://singaporejews.com/wp-content/uploads/2021/11/MA-B-scaled.jpg",
      filename: "maghain-aboth-exterior.jpg",
      alt: {
        en: "Maghain Aboth Synagogue exterior view",
        he: "בית הכנסת מגן אבות - מבט חיצוני",
      },
    },
    gallery: [
      {
        url: "https://singaporejews.com/wp-content/uploads/2021/11/MA.png",
        filename: "maghain-aboth-interior.png",
        alt: {
          en: "Maghain Aboth Synagogue interior",
          he: "בית הכנסת מגן אבות - פנים",
        },
        caption: {
          en: "Interior of Maghain Aboth Synagogue",
          he: "פנים בית הכנסת מגן אבות",
        },
      },
    ],
  },
  {
    documentId: "a716c418-5ae3-4fd9-bc85-7f2d63800c7f",
    name: "Chesed El Synagogue",
    mainImage: {
      url: "https://singaporejews.com/wp-content/uploads/2021/11/CE-Synaguge-1-1.png",
      filename: "chesed-el-exterior.png",
      alt: {
        en: "Chesed El Synagogue exterior view",
        he: "בית הכנסת חסד אל - מבט חיצוני",
      },
    },
    gallery: [
      {
        url: "https://singaporejews.com/wp-content/uploads/2021/11/CE-Synaguge-B.jpg",
        filename: "chesed-el-interior.jpg",
        alt: {
          en: "Chesed El Synagogue interior",
          he: "בית הכנסת חסד אל - פנים",
        },
        caption: {
          en: "Interior of Chesed El Synagogue",
          he: "פנים בית הכנסת חסד אל",
        },
      },
    ],
  },
];

/**
 * Generate a random key for Sanity array items
 */
function generateKey(): string {
  return Math.random().toString(36).substring(2, 10);
}

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
 * Upload leadership photos and patch person documents
 */
async function uploadLeadershipPhotos(dryRun: boolean): Promise<void> {
  console.log("\n=== Uploading Leadership Photos ===\n");

  for (const person of LEADERSHIP_PHOTOS) {
    console.log(`\nProcessing: ${person.name}`);

    if (dryRun) {
      console.log(`  [DRY RUN] Would upload: ${person.imageUrl}`);
      console.log(`  [DRY RUN] Would patch document: ${person.documentId}`);
      continue;
    }

    try {
      // Upload image
      const asset = await uploadImageFromUrl(person.imageUrl, person.filename);

      // Patch person document with photo reference
      await client
        .patch(person.documentId)
        .set({
          photo: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`  Patched document: ${person.documentId}`);
    } catch (error) {
      console.error(`  ERROR: ${error instanceof Error ? error.message : error}`);
    }
  }
}

/**
 * Upload synagogue photos and patch synagogue documents
 */
async function uploadSynagoguePhotos(dryRun: boolean): Promise<void> {
  console.log("\n=== Uploading Synagogue Photos ===\n");

  for (const synagogue of SYNAGOGUE_PHOTOS) {
    console.log(`\nProcessing: ${synagogue.name}`);

    if (dryRun) {
      console.log(`  [DRY RUN] Would upload main image: ${synagogue.mainImage.url}`);
      for (const img of synagogue.gallery) {
        console.log(`  [DRY RUN] Would upload gallery image: ${img.url}`);
      }
      console.log(`  [DRY RUN] Would patch document: ${synagogue.documentId}`);
      continue;
    }

    try {
      // Upload main image
      console.log("\n  Main image:");
      const mainAsset = await uploadImageFromUrl(
        synagogue.mainImage.url,
        synagogue.mainImage.filename
      );

      // Upload gallery images
      const galleryAssets: Array<{
        asset: { _id: string };
        alt: { en: string; he: string };
        caption: { en: string; he: string };
      }> = [];

      for (const img of synagogue.gallery) {
        console.log("\n  Gallery image:");
        const asset = await uploadImageFromUrl(img.url, img.filename);
        galleryAssets.push({
          asset: { _id: asset._id },
          alt: img.alt,
          caption: img.caption,
        });
      }

      // Build gallery array with proper structure
      const galleryArray = galleryAssets.map((item) => ({
        _key: generateKey(),
        _type: "image",
        asset: {
          _type: "reference",
          _ref: item.asset._id,
        },
        alt: item.alt,
        caption: item.caption,
      }));

      // Patch synagogue document
      await client
        .patch(synagogue.documentId)
        .set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: mainAsset._id,
            },
            alt: synagogue.mainImage.alt,
          },
          gallery: galleryArray,
        })
        .commit();

      console.log(`\n  Patched document: ${synagogue.documentId}`);
    } catch (error) {
      console.error(`  ERROR: ${error instanceof Error ? error.message : error}`);
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
  console.log("Community Photos Upload Script");
  console.log("=".repeat(50));

  if (dryRun) {
    console.log("\n*** DRY RUN MODE - No changes will be made ***\n");
  }

  if (!process.env.SANITY_API_TOKEN && !dryRun) {
    console.error("ERROR: SANITY_API_TOKEN environment variable is required");
    console.error("Get a token from: https://www.sanity.io/manage/project/r3h9xffe/api/tokens");
    process.exit(1);
  }

  // Upload leadership photos
  await uploadLeadershipPhotos(dryRun);

  // Upload synagogue photos
  await uploadSynagoguePhotos(dryRun);

  console.log("\n" + "=".repeat(50));
  console.log("Upload complete!");
  console.log("=".repeat(50));

  if (!dryRun) {
    console.log("\nVerify at:");
    console.log("- Leadership: http://localhost:3000/leadership");
    console.log("- Synagogues: http://localhost:3000/synagogues");
    console.log("- Sanity Studio: http://localhost:3000/studio");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
