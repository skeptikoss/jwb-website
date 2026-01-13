import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Heart } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { DonationForm } from "@/components/donate";
import { Badge } from "@/components/ui/badge";

/**
 * Generate metadata for the donation page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.donate");

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

/**
 * Donation page with Stripe Checkout integration
 *
 * Features:
 * - Preset donation amounts ($18, $36, $72, $180, $360 - chai multiples)
 * - Custom amount input
 * - One-time and monthly recurring options
 * - Secure Stripe Checkout redirect
 */
export default async function DonatePage() {
  const t = await getTranslations("pages.donate");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <Badge className="mb-4 bg-gold/20 text-gold hover:bg-gold/30">
              <Heart className="me-1 h-3 w-3" />
              {t("badge")}
            </Badge>

            {/* Title */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
              <DonationForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
