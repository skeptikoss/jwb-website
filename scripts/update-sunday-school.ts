/**
 * Update Sunday School Script
 *
 * Updates the Sunday School education program with:
 * - Image from Google Form
 * - Detailed schedule with location, times, and fee
 * - Registration link to Google Form
 *
 * Information sourced from:
 * https://docs.google.com/forms/d/e/1FAIpQLSdgALuYnRomJi6aaSeBT4dAREG8tFvieh9CiAC7rPpZ_p5nEg/viewform
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/update-sunday-school.ts
 *   SANITY_API_TOKEN=xxx npx tsx scripts/update-sunday-school.ts --dry-run
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

// Sunday School document ID
const SUNDAY_SCHOOL_DOC_ID = "f7e74bbf-506a-4fb4-93dc-8a3e96e8928f";

// Image from Google Form og:image
const IMAGE_URL =
  "https://lh6.googleusercontent.com/NYlWfcgS-nLWDgzslsb3-shmW2wjDHflkEP8VejT1-bw3iRYiYzAnuwqR067shi3WSm2_ufW0sWCOZs=w1200-h630-p";

// Registration link (Google Form)
const REGISTRATION_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdgALuYnRomJi6aaSeBT4dAREG8tFvieh9CiAC7rPpZ_p5nEg/viewform";

// Updated schedule information (from Google Form)
const SCHEDULE = {
  en: `Location: Jacob Ballas Centre
24 Waterloo Street, Singapore 187950

Schedule: Sundays, 9:30 AM - 12:00 PM
School Year: 30 school days

Annual Fee: S$1,300`,
  he: `מיקום: מרכז יעקב בלאס
24 רחוב ווטרלו, סינגפור 187950

לוח זמנים: ימי ראשון, 9:30 - 12:00
שנת לימודים: 30 ימי לימוד

שכר לימוד שנתי: 1,300 דולר סינגפורי`,
};

// Updated age range (from Google Form: Ages 4-12)
const AGE_RANGE = {
  en: "Ages 4-12",
  he: "גילאי 4-12",
};

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
 * Update Sunday School education program
 */
async function updateSundaySchool(dryRun: boolean): Promise<void> {
  console.log("\n=== Updating Sunday School Program ===\n");

  if (dryRun) {
    console.log("[DRY RUN] Would update document:", SUNDAY_SCHOOL_DOC_ID);
    console.log("\n[DRY RUN] New schedule (English):");
    console.log(SCHEDULE.en);
    console.log("\n[DRY RUN] New schedule (Hebrew):");
    console.log(SCHEDULE.he);
    console.log("\n[DRY RUN] New age range:", AGE_RANGE.en);
    console.log("[DRY RUN] Registration link:", REGISTRATION_LINK);
    console.log("[DRY RUN] Image URL:", IMAGE_URL);
    return;
  }

  try {
    // Upload image
    console.log("Uploading image...");
    const asset = await uploadImageFromUrl(IMAGE_URL, "sunday-school-banner.jpg");

    // Patch the Sunday School document
    console.log("\nUpdating document...");
    await client
      .patch(SUNDAY_SCHOOL_DOC_ID)
      .set({
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
          alt: {
            en: "Sunday School (Talmud Torah) at Jacob Ballas Centre",
            he: "בית ספר יום ראשון (תלמוד תורה) במרכז יעקב בלאס",
          },
        },
        schedule: SCHEDULE,
        ageRange: AGE_RANGE,
        registrationLink: REGISTRATION_LINK,
      })
      .commit();

    console.log("Document updated successfully!");
  } catch (error) {
    console.error(
      `ERROR: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("=".repeat(50));
  console.log("Sunday School Update Script");
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

  await updateSundaySchool(dryRun);

  console.log("\n" + "=".repeat(50));
  console.log("Update complete!");
  console.log("=".repeat(50));

  if (!dryRun) {
    console.log("\nVerify at:");
    console.log("- Sunday School: http://localhost:3000/education/sunday-school");
    console.log("- Sanity Studio: http://localhost:3000/studio");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
