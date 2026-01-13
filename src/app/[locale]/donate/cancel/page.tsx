import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { XCircle, Heart, Home } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Generate metadata for the cancel page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.donate.cancel");

  return {
    title: t("title"),
    robots: { index: false }, // Don't index cancel pages
  };
}

/**
 * Donation cancelled page
 *
 * Displayed when user cancels during Stripe Checkout.
 * Encourages them to try again without being pushy.
 */
export default async function DonateCancelPage() {
  const t = await getTranslations("pages.donate.cancel");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-cream py-16">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6">
          {/* Cancel Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-warm-gray/10">
            <XCircle className="h-10 w-10 text-warm-gray" />
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-bold text-navy">
            {t("title")}
          </h1>

          {/* Message */}
          <p className="mt-4 font-body text-charcoal">{t("message")}</p>

          {/* Encouragement */}
          <p className="mt-2 font-body text-sm text-warm-gray">
            {t("encouragement")}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="bg-gold text-charcoal hover:bg-gold/90"
            >
              <Link href="/donate">
                <Heart className="me-2 h-4 w-4" />
                {t("tryAgain")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-cream"
            >
              <Link href="/">
                <Home className="me-2 h-4 w-4" />
                {t("backHome")}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
