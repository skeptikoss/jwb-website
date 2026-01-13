import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { SanityImage } from "@/components/sanity/sanity-image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  GraduationCap,
  Users,
  School,
  BookOpen,
  Blocks,
  type LucideIcon,
} from "lucide-react";

import {
  getAllEducationPrograms,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

/**
 * Program type configuration (labels, icons, colors)
 */
const programTypeConfig: Record<
  string,
  { en: string; he: string; icon: LucideIcon; bgColor: string }
> = {
  preschool: {
    en: "Preschool",
    he: "גן ילדים",
    icon: Blocks,
    bgColor: "bg-sage",
  },
  "sunday-school": {
    en: "Sunday School",
    he: "בית ספר יום ראשון",
    icon: BookOpen,
    bgColor: "bg-terracotta",
  },
  "day-school": {
    en: "Day School",
    he: "בית ספר יום",
    icon: School,
    bgColor: "bg-navy",
  },
  adult: {
    en: "Adult Education",
    he: "חינוך מבוגרים",
    icon: GraduationCap,
    bgColor: "bg-sky",
  },
  youth: {
    en: "Youth Program",
    he: "תוכנית נוער",
    icon: Users,
    bgColor: "bg-gold",
  },
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
                  const config = program.type
                    ? programTypeConfig[program.type]
                    : null;
                  const typeLabel = config?.[locale] || config?.en;
                  const IconComponent = config?.icon || GraduationCap;
                  const bgColor = config?.bgColor || "bg-navy";
                  const hasImage = program.mainImage?.asset;

                  return (
                    <Card
                      key={program._id}
                      className="flex flex-col overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Image Header */}
                      {hasImage ? (
                        <div className="relative h-48 w-full bg-cream">
                          <SanityImage
                            image={program.mainImage}
                            alt={name}
                            locale={locale}
                            fill
                            className="object-contain p-4"
                          />
                          <Badge className={`${bgColor} absolute start-3 top-3 text-white`}>
                            {typeLabel}
                          </Badge>
                        </div>
                      ) : (
                        <div
                          className={`${bgColor} flex items-center justify-between px-5 py-4`}
                        >
                          <Badge className="bg-white/20 text-white backdrop-blur-sm">
                            {typeLabel}
                          </Badge>
                          <IconComponent className="h-8 w-8 text-white/80" />
                        </div>
                      )}

                      <CardContent className="flex flex-1 flex-col p-5">
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
