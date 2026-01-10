import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { SanityImage } from "@/components/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { MapPin } from "lucide-react";

import { getAllSynagogues, type Locale, getLocalizedValue } from "@/lib/sanity";

/**
 * Generate metadata for the Synagogues listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.synagogues");

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
 * Synagogues listing page
 *
 * Displays all synagogues in a card grid with images and basic info.
 */
export default async function SynagoguesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.synagogues");

  // Fetch all synagogues from Sanity
  const synagogues = await getAllSynagogues();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Synagogues Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {synagogues.length === 0 ? (
              <div className="rounded-lg border border-warm-gray/30 bg-white p-8 text-center shadow-sm">
                <p className="font-body text-warm-gray">{t("noContent")}</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {synagogues.map((synagogue) => {
                  const name = getLocalizedValue(synagogue.name, locale) || "Synagogue";
                  const meaning = getLocalizedValue(synagogue.meaningOfName, locale);
                  const description = getLocalizedValue(synagogue.description, locale);

                  return (
                    <Card
                      key={synagogue._id}
                      className="overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Image */}
                      <div className="relative aspect-video bg-warm-gray/20">
                        {synagogue.mainImage ? (
                          <SanityImage
                            image={synagogue.mainImage}
                            locale={locale}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="font-ui text-sm text-warm-gray">
                              Synagogue Image
                            </span>
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        {/* Year Badge */}
                        {synagogue.yearEstablished && (
                          <Badge className="bg-sage text-white">
                            {t("established")} {synagogue.yearEstablished}
                          </Badge>
                        )}

                        {/* Name */}
                        <h2 className="mt-3 font-heading text-2xl font-semibold text-navy">
                          {name}
                        </h2>

                        {/* Meaning of Name */}
                        {meaning && (
                          <p className="mt-1 font-body text-sm italic text-warm-gray">
                            &ldquo;{meaning}&rdquo;
                          </p>
                        )}

                        {/* Description */}
                        {description && (
                          <p className="mt-3 line-clamp-3 font-body text-charcoal">
                            {description}
                          </p>
                        )}

                        {/* Address */}
                        {synagogue.address?.street && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-charcoal">
                            <MapPin className="h-4 w-4 shrink-0 text-gold" />
                            <span>{synagogue.address.street}</span>
                          </div>
                        )}

                        {/* CTA Button */}
                        <Button asChild className="mt-4 bg-navy text-cream hover:bg-navy/90">
                          <Link href={`/synagogues/${synagogue.slug.current}`}>
                            {t("viewDetails")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
