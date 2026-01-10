import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { SanityImage } from "@/components/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { User } from "lucide-react";

import { getAllPeople, type Locale, getLocalizedValue } from "@/lib/sanity";

/**
 * Generate metadata for the Leadership listing page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.leadership");

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
 * Leadership listing page
 *
 * Displays all clergy, staff, and leadership in a card grid.
 */
export default async function LeadershipPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.leadership");

  // Fetch all people from Sanity, ordered by the order field
  const people = await getAllPeople();

  // Get category badge color based on category type
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "clergy":
        return "bg-gold text-charcoal";
      case "staff":
        return "bg-sage text-white";
      case "board":
        return "bg-navy text-white";
      case "educator":
        return "bg-sky text-white";
      default:
        return "bg-warm-gray text-white";
    }
  };

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

        {/* Leadership Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {people.length === 0 ? (
              <div className="rounded-lg border border-warm-gray/30 bg-white p-8 text-center shadow-sm">
                <p className="font-body text-warm-gray">{t("noContent")}</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {people.map((person) => {
                  const role = getLocalizedValue(person.role, locale);

                  return (
                    <Card
                      key={person._id}
                      className="overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Photo */}
                      <div className="relative aspect-[4/3] bg-warm-gray/20">
                        {person.photo ? (
                          <SanityImage
                            image={person.photo}
                            locale={locale}
                            fill
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <User className="h-16 w-16 text-warm-gray/50" />
                          </div>
                        )}
                      </div>

                      <CardContent className="p-6">
                        {/* Category Badge */}
                        <Badge className={getCategoryBadgeClass(person.category)}>
                          {t(`category.${person.category}`)}
                        </Badge>

                        {/* Name */}
                        <h2 className="mt-3 font-heading text-2xl font-semibold text-navy">
                          {person.name}
                        </h2>

                        {/* Role */}
                        {role && (
                          <p className="mt-1 font-body text-warm-gray">
                            {role}
                          </p>
                        )}

                        {/* CTA Button */}
                        <Button asChild className="mt-4 bg-navy text-cream hover:bg-navy/90">
                          <Link href={`/leadership/${person.slug.current}`}>
                            {t("viewProfile")}
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
