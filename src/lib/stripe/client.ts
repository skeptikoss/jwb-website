import { loadStripe, Stripe } from "@stripe/stripe-js";

/**
 * Stripe client-side helper
 *
 * Loads Stripe.js on demand and caches the instance.
 * Safe to use in SSR environments - returns null on server.
 */

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
      return Promise.resolve(null);
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
}
