import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/**
 * Generate metadata for success page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.shop.checkout.success");

  return {
    title: t("title"),
  };
}

/**
 * Checkout success page
 *
 * Simple thank you page shown after completing a mock order.
 */
export default async function CheckoutSuccessPage() {
  const t = await getTranslations("pages.shop.checkout.success");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center bg-cream px-4">
        <div className="mx-auto max-w-md text-center">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
            <CheckCircle className="h-10 w-10 text-sage" />
          </div>

          {/* Title */}
          <h1 className="mt-6 font-heading text-3xl font-bold text-charcoal">
            {t("title")}
          </h1>

          {/* Message */}
          <p className="mt-4 font-body text-charcoal">
            {t("message")}
          </p>

          {/* Demo notice */}
          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/10 p-4">
            <p className="font-ui text-sm text-charcoal">
              {t("demoNotice")}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="bg-navy text-cream hover:bg-navy/90">
              <Link href="/shop">{t("continueShopping")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t("backToHome")}</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
