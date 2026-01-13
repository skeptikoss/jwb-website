import Stripe from "stripe";

/**
 * Stripe server-side SDK instance
 *
 * Requires STRIPE_SECRET_KEY environment variable to be set.
 * This should ONLY be used in server-side code (API routes, server components).
 */

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === "production") {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

export const stripe = new Stripe(stripeSecretKey || "sk_test_placeholder", {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

/**
 * Create a donation checkout session
 */
export async function createDonationCheckoutSession({
  amount,
  frequency,
  locale,
  origin,
}: {
  amount: number;
  frequency: "once" | "monthly";
  locale: "en" | "he";
  origin: string;
}): Promise<Stripe.Checkout.Session> {
  const isRecurring = frequency === "monthly";
  const amountInCents = Math.round(amount * 100);

  const session = await stripe.checkout.sessions.create({
    mode: isRecurring ? "subscription" : "payment",
    line_items: [
      {
        price_data: {
          currency: "sgd",
          unit_amount: amountInCents,
          product_data: {
            name: isRecurring
              ? "Monthly Donation to JWB Singapore"
              : "Donation to JWB Singapore",
            description: isRecurring
              ? "Recurring monthly support for our community"
              : "One-time support for our community",
          },
          ...(isRecurring && {
            recurring: {
              interval: "month",
            },
          }),
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/${locale}/donate/success?session_id={CHECKOUT_SESSION_ID}&frequency=${frequency}`,
    cancel_url: `${origin}/${locale}/donate/cancel`,
    metadata: {
      locale,
      frequency,
      source: "website",
    },
  });

  return session;
}
