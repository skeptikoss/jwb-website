import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle, Heart } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface PageProps {
  searchParams: Promise<{ session_id?: string; frequency?: string }>;
}

/**
 * Generate metadata for the success page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.donate.success");

  return {
    title: t("title"),
    robots: { index: false }, // Don't index success pages
  };
}

/**
 * Donation success page
 *
 * Displayed after a successful Stripe Checkout payment.
 * The session_id can be used to fetch session details if needed.
 */
export default async function DonateSuccessPage({ searchParams }: PageProps) {
  const t = await getTranslations("pages.donate.success");
  const params = await searchParams;

  // Check if this was a monthly (recurring) donation
  const isMonthly = params.frequency === "monthly";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-cream py-16">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#4a7c59]/10">
            <CheckCircle className="h-10 w-10 text-[#4a7c59]" />
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-bold text-navy">
            {t("title")}
          </h1>

          {/* Message */}
          <p className="mt-4 font-body text-charcoal">{t("message")}</p>

          {/* Monthly note - only for recurring donations */}
          {isMonthly && (
            <p className="mt-2 font-body text-sm text-warm-gray">
              {t("monthlyNote")}
            </p>
          )}

          {/* Demo notice */}
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4">
            <p className="font-ui text-sm text-charcoal">{t("demoNotice")}</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="bg-navy text-cream hover:bg-navy/90"
            >
              <Link href="/">
                {t("backHome")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gold text-charcoal hover:bg-gold/10"
            >
              <Link href="/donate">
                <Heart className="me-2 h-4 w-4" />
                {t("donateAgain")}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
