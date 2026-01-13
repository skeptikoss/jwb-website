/**
 * Stripe donation types
 */

export type DonationFrequency = "once" | "monthly";

export interface DonationCheckoutRequest {
  amount: number;
  frequency: DonationFrequency;
  locale: "en" | "he";
}

export interface DonationCheckoutResponse {
  sessionId: string;
  url: string;
}

export interface DonationError {
  error: string;
}
