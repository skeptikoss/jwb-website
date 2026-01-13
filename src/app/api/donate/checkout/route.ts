import { NextRequest, NextResponse } from "next/server";
import { createDonationCheckoutSession } from "@/lib/stripe/server";
import type { DonationCheckoutRequest } from "@/lib/stripe/types";

/**
 * Allowed origins for donation requests
 * Add your production domain(s) here
 */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  // Add production domains here:
  // "https://your-domain.com",
  // "https://jwb-singapore.vercel.app",
];

/**
 * POST /api/donate/checkout
 *
 * Creates a Stripe Checkout session for donations.
 * Supports both one-time and recurring monthly donations.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DonationCheckoutRequest;
    const { amount, frequency, locale } = body;

    // Validate origin
    const origin = request.headers.get("origin");
    const validOrigin = origin && ALLOWED_ORIGINS.some((allowed) =>
      origin === allowed || origin.endsWith(".vercel.app")
    );

    if (!validOrigin && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Invalid origin" },
        { status: 403 }
      );
    }

    const safeOrigin = validOrigin ? origin : "http://localhost:3000";

    // Validate amount
    if (typeof amount !== "number" || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount: minimum donation is $1" },
        { status: 400 }
      );
    }

    if (amount > 100000) {
      return NextResponse.json(
        { error: "Invalid amount: maximum donation is $100,000" },
        { status: 400 }
      );
    }

    // Validate frequency
    if (!["once", "monthly"].includes(frequency)) {
      return NextResponse.json(
        { error: "Invalid frequency: must be 'once' or 'monthly'" },
        { status: 400 }
      );
    }

    // Validate locale
    if (!["en", "he"].includes(locale)) {
      return NextResponse.json(
        { error: "Invalid locale: must be 'en' or 'he'" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout session
    const session = await createDonationCheckoutSession({
      amount,
      frequency,
      locale,
      origin: safeOrigin,
    });

    if (!session.url) {
      throw new Error("No checkout URL returned from Stripe");
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    // Check for specific Stripe errors
    if (error instanceof Error) {
      // Don't expose internal error details to client
      return NextResponse.json(
        { error: "Failed to create checkout session. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
