import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { SanityImage } from "@/components/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { GraduationCap, Users } from "lucide-react";

import {
  getAllEducationPrograms,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

/**
 * Program type labels for badges
 */
const programTypeLabels: Record<string, { en: string; he: string }> = {
  preschool: { en: "Preschool", he: "גן ילדים" },
  "sunday-school": { en: "Sunday School", he: "בית ספר יום ראשון" },
  "day-school": { en: "Day School", he: "בית ספר יום" },
  adult: { en: "Adult Education", he: "חינוך מבוגרים" },
  youth: { en: "Youth Program", he: "תוכנית נוער" },
};

/**
 * Generate metadata for the Education page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.education");

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
 * Education programs listing page
 */
export default async function EducationPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.education");
  const tCommon = await getTranslations("common");

  const programs = await getAllEducationPrograms();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-10 w-10 text-gold" />
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
            </div>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {programs.length === 0 ? (
              <div className="rounded-lg border border-warm-gray/30 bg-white p-8 text-center shadow-sm">
                <p className="font-body text-warm-gray">{t("noContent")}</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => {
                  const name = getLocalizedValue(program.name, locale) || "Program";
                  const ageRange = getLocalizedValue(program.ageRange, locale);
                  const typeLabel = program.type
                    ? programTypeLabels[program.type]?.[locale] ||
                      programTypeLabels[program.type]?.en
                    : null;

                  return (
                    <Card
                      key={program._id}
                      className="flex flex-col overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] bg-warm-gray/20">
                        {program.mainImage ? (
                          <SanityImage
                            image={program.mainImage}
                            locale={locale}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <GraduationCap className="h-12 w-12 text-warm-gray/50" />
                          </div>
                        )}
                      </div>

                      <CardContent className="flex flex-1 flex-col p-5">
                        {/* Type Badge */}
                        {typeLabel && (
                          <Badge className="mb-2 w-fit bg-sage text-white">
                            {typeLabel}
                          </Badge>
                        )}

                        {/* Name */}
                        <h2 className="font-heading text-xl font-semibold text-navy">
                          {name}
                        </h2>

                        {/* Age Range */}
                        {ageRange && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-warm-gray">
                            <Users className="h-4 w-4" />
                            <span>
                              {t("ageRange")}: {ageRange}
                            </span>
                          </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* CTA */}
                        <Button
                          asChild
                          className="mt-4 bg-navy text-cream hover:bg-navy/90"
                        >
                          <Link href={`/education/${program.slug.current}`}>
                            {tCommon("learnMore")}
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
