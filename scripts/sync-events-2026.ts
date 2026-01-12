/**
 * Sync Events 2026 Script
 *
 * Syncs events from singaporejews.com for 2026 only.
 * - Updates existing events with real data
 * - Creates new events (Ktantanim)
 * - Removes 2025 events and sample data
 *
 * Source: https://singaporejews.com/shop/jewish-events/
 *
 * Usage:
 *   SANITY_API_TOKEN=xxx npx tsx scripts/sync-events-2026.ts
 *   SANITY_API_TOKEN=xxx npx tsx scripts/sync-events-2026.ts --dry-run
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "r3h9xffe",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Events to DELETE (2025 events and sample data)
const EVENTS_TO_DELETE = [
  "25878843-3c8f-4505-af22-bce2e3c44095", // Sunday Football (2025)
  "68cb2884-3fcc-4666-8a02-2e8b9dd7c1b9", // Community Purim Party (sample)
  "c2f33a67-df26-48f3-80f0-62000b9ba947", // Tu B'Shvat Celebration (sample)
];

// Events to UPDATE (existing 2026 events)
const EVENTS_TO_UPDATE = [
  {
    _id: "fecb6918-b97b-4611-8743-cce58019b282", // JLI Learning for Teens
    data: {
      name: {
        en: "JLI Learning for Teens",
        he: "למידת JLI לנוער",
      },
      eventType: "education",
      date: "2026-01-15T19:30:00+08:00",
      isRecurring: true,
      recurringSchedule: {
        en: "Every Thursday",
        he: "כל יום חמישי",
      },
      location: {
        en: "Jews of Singapore Museum, 24/26 Waterloo St, Singapore 187950",
        he: "מוזיאון יהודי סינגפור, 24/26 רחוב ווטרלו, סינגפור 187950",
      },
      price: 10,
      capacity: 50,
      organizer: "JWB Singapore",
      registrationLink:
        "https://singaporejews.com/shop/events/jli-learning-for-teens-every-thursday/",
      description: {
        en: [
          {
            _key: "p1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "Calling all teens! Join us every Thursday for our JLI learning event special for the teens.",
              },
            ],
          },
          {
            _key: "p2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2",
                _type: "span",
                text: "Time: 7:30 PM - 9:00 PM. Dinner will be served. An event not worth missing!",
              },
            ],
          },
        ],
        he: [
          {
            _key: "p1h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1h",
                _type: "span",
                text: "קוראים לכל בני הנוער! הצטרפו אלינו כל יום חמישי לאירוע הלמידה JLI המיוחד לנוער.",
              },
            ],
          },
          {
            _key: "p2h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2h",
                _type: "span",
                text: "שעה: 19:30 - 21:00. ארוחת ערב תוגש. אירוע שאסור לפספס!",
              },
            ],
          },
        ],
      },
    },
  },
  {
    _id: "ac5cf31b-552c-42b8-bd14-956d8fbf8a92", // VIP Girls Club
    data: {
      name: {
        en: "VIP Girls Club",
        he: "מועדון בנות VIP",
      },
      eventType: "youth",
      date: "2026-01-15T18:00:00+08:00",
      isRecurring: true,
      recurringSchedule: {
        en: "Every Thursday",
        he: "כל יום חמישי",
      },
      location: {
        en: "Jacob Ballas Centre, 24 Waterloo Street, Singapore 187950",
        he: "מרכז יעקב בלאס, 24 רחוב ווטרלו, סינגפור 187950",
      },
      price: 15,
      priceNote: {
        en: "Ages 11-14",
        he: "גילאי 11-14",
      },
      capacity: 65,
      organizer: "JWB Singapore",
      registrationLink:
        "https://singaporejews.com/shop/events/vip-girls-club_2025-2026/",
      description: {
        en: [
          {
            _key: "p1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "A fun, empowering space for girls to connect, learn, and grow together through creative activities, leadership development, and friendship. Inspiring confidence, teamwork, and a strong sense of community.",
              },
            ],
          },
          {
            _key: "p2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2",
                _type: "span",
                text: "Come join us for a vibrant girls club filled with painting, drawing, baking, cooking, and creative workshops. A fun space to explore your passions, learn new skills, and make lasting friendships.",
              },
            ],
          },
        ],
        he: [
          {
            _key: "p1h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1h",
                _type: "span",
                text: "מרחב מהנה ומעצים לבנות להתחבר, ללמוד ולצמוח יחד דרך פעילויות יצירתיות, פיתוח מנהיגות וחברות. השראה לביטחון עצמי, עבודת צוות ותחושת קהילה חזקה.",
              },
            ],
          },
          {
            _key: "p2h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2h",
                _type: "span",
                text: "הצטרפו אלינו למועדון בנות תוסס מלא בציור, רישום, אפייה, בישול וסדנאות יצירה. מרחב כיף לחקור את התשוקות שלכן, ללמוד מיומנויות חדשות וליצור חברויות לכל החיים.",
              },
            ],
          },
        ],
      },
    },
  },
  {
    _id: "142d9778-7710-4a0e-baf3-71d5a57dcdaa", // Krav Maga Ladies
    data: {
      name: {
        en: "Krav Maga Training for Ladies",
        he: "אימון קרב מגע לנשים",
      },
      eventType: "sports",
      date: "2026-01-12T19:30:00+08:00",
      isRecurring: true,
      recurringSchedule: {
        en: "Every Monday",
        he: "כל יום שני",
      },
      location: {
        en: "Jacob Ballas Centre, 24 Waterloo Street, Singapore 187950",
        he: "מרכז יעקב בלאס, 24 רחוב ווטרלו, סינגפור 187950",
      },
      price: 10,
      capacity: 80,
      organizer: "JWB Singapore",
      registrationLink:
        "https://singaporejews.com/shop/events/krav-marga-course-for-ladies_2026/",
      description: {
        en: [
          {
            _key: "p1",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1",
                _type: "span",
                text: "Krav Maga training for ladies focuses on practical self-defense, confidence building, and personal safety. Learn effective techniques to escape real-life threats, improve fitness, and develop mental strength in a supportive, empowering environment designed for women of all experience levels.",
              },
            ],
          },
          {
            _key: "p2",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2",
                _type: "span",
                text: "Wear comfortable exercise clothes and closed shoes. If you have a mouthguard you can bring that along or purchase one from a sports shop/pharmacy (e.g., Decathlon, Watsons).",
              },
            ],
          },
        ],
        he: [
          {
            _key: "p1h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s1h",
                _type: "span",
                text: "אימון קרב מגע לנשים מתמקד בהגנה עצמית מעשית, בניית ביטחון עצמי ובטיחות אישית. למדי טכניקות יעילות להתמודדות עם איומים אמיתיים, שיפור כושר גופני ופיתוח חוזק נפשי בסביבה תומכת ומעצימה.",
              },
            ],
          },
          {
            _key: "p2h",
            _type: "block",
            style: "normal",
            children: [
              {
                _key: "s2h",
                _type: "span",
                text: "לבשי בגדי ספורט נוחים ונעליים סגורות. אם יש לך מגן שיניים את יכולה להביא אותו או לרכוש בחנות ספורט/בית מרקחת.",
              },
            ],
          },
        ],
      },
    },
  },
];

// NEW event to CREATE
const NEW_EVENT = {
  _type: "event",
  name: {
    en: "Ktantanim",
    he: "קטנטנים",
  },
  slug: {
    _type: "slug",
    current: "ktantanim",
  },
  eventType: "youth",
  date: "2026-01-13T10:00:00+08:00",
  isRecurring: true,
  recurringSchedule: {
    en: "Every Tuesday",
    he: "כל יום שלישי",
  },
  location: {
    en: "Jacob Ballas Centre, 24 Waterloo Street, Singapore 187950",
    he: "מרכז יעקב בלאס, 24 רחוב ווטרלו, סינגפור 187950",
  },
  price: 10,
  priceNote: {
    en: "Ages 3-5",
    he: "גילאי 3-5",
  },
  capacity: 65,
  organizer: "JWB Singapore",
  registrationLink:
    "https://singaporejews.com/shop/events/ktantanim-every-tuesday/",
  description: {
    en: [
      {
        _key: "p1",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "s1",
            _type: "span",
            text: "A playful and meaningful experience for little ones! Ktantanim offers art, games, and story time sessions that introduce Jewish traditions and values in a fun, engaging way.",
          },
        ],
      },
      {
        _key: "p2",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "s2",
            _type: "span",
            text: "Perfect for children ages 3-5 years old. Join us every Tuesday morning for creative activities and community building.",
          },
        ],
      },
    ],
    he: [
      {
        _key: "p1h",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "s1h",
            _type: "span",
            text: "חוויה משחקית ומשמעותית לקטנטנים! קטנטנים מציע אומנות, משחקים וסיפורים המציגים מסורות וערכים יהודיים בצורה כיפית ומעניינת.",
          },
        ],
      },
      {
        _key: "p2h",
        _type: "block",
        style: "normal",
        children: [
          {
            _key: "s2h",
            _type: "span",
            text: "מושלם לילדים בגילאי 3-5. הצטרפו אלינו כל יום שלישי בבוקר לפעילויות יצירתיות ובניית קהילה.",
          },
        ],
      },
    ],
  },
};

async function syncEvents(dryRun: boolean): Promise<void> {
  console.log("\n=== Syncing 2026 Events ===\n");

  // 1. Delete old/sample events
  console.log("Step 1: Deleting 2025 and sample events...");
  for (const id of EVENTS_TO_DELETE) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would delete: ${id}`);
    } else {
      try {
        await client.delete(id);
        console.log(`  Deleted: ${id}`);
      } catch (error) {
        console.log(`  Skip (not found): ${id}`);
      }
    }
  }

  // 2. Update existing 2026 events
  console.log("\nStep 2: Updating existing 2026 events...");
  for (const event of EVENTS_TO_UPDATE) {
    if (dryRun) {
      console.log(`  [DRY RUN] Would update: ${event.data.name.en}`);
    } else {
      try {
        await client.patch(event._id).set(event.data).commit();
        console.log(`  Updated: ${event.data.name.en}`);
      } catch (error) {
        console.error(
          `  ERROR updating ${event._id}: ${error instanceof Error ? error.message : error}`
        );
      }
    }
  }

  // 3. Create new event (Ktantanim)
  console.log("\nStep 3: Creating new event (Ktantanim)...");
  if (dryRun) {
    console.log(`  [DRY RUN] Would create: ${NEW_EVENT.name.en}`);
  } else {
    try {
      // Check if event already exists
      const existing = await client.fetch(
        `*[_type == "event" && slug.current == "ktantanim"][0]._id`
      );
      if (existing) {
        console.log(`  Skip (already exists): ${NEW_EVENT.name.en}`);
      } else {
        const created = await client.create(NEW_EVENT);
        console.log(`  Created: ${NEW_EVENT.name.en} (${created._id})`);
      }
    } catch (error) {
      console.error(
        `  ERROR creating Ktantanim: ${error instanceof Error ? error.message : error}`
      );
    }
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("=".repeat(50));
  console.log("Sync Events 2026 Script");
  console.log("=".repeat(50));
  console.log("\nSource: https://singaporejews.com/shop/jewish-events/");

  if (dryRun) {
    console.log("\n*** DRY RUN MODE - No changes will be made ***");
  }

  if (!process.env.SANITY_API_TOKEN && !dryRun) {
    console.error("\nERROR: SANITY_API_TOKEN environment variable is required");
    process.exit(1);
  }

  await syncEvents(dryRun);

  console.log("\n" + "=".repeat(50));
  console.log("Sync complete!");
  console.log("=".repeat(50));

  if (!dryRun) {
    console.log("\nVerify at:");
    console.log("- Events: http://localhost:3000/events");
    console.log("- Sanity Studio: http://localhost:3000/studio");
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
