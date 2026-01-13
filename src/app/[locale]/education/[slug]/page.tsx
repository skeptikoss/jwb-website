import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  Users,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

import {
  getEducationProgramBySlug,
  getEducationProgramSlugs,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for education program detail pages
 */
export async function generateStaticParams() {
  const slugs = await getEducationProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for a specific education program
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const program = await getEducationProgramBySlug(slug);

  if (!program) {
    return { title: "Program Not Found" };
  }

  const name = getLocalizedValue(program.name, locale) || "Education Program";
  const description = getLocalizedValue(program.seo?.metaDescription, locale);

  return {
    title: name,
    description,
    openGraph: { title: name, description },
  };
}

/**
 * Education program detail page
 */
export default async function EducationProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.education");
  const tCommon = await getTranslations("common");

  const program = await getEducationProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const name = getLocalizedValue(program.name, locale) || "Program";
  const ageRange = getLocalizedValue(program.ageRange, locale);
  const schedule = getLocalizedValue(program.schedule, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-16 text-cream lg:py-24">
          {program.mainImage && (
            <div className="absolute inset-0 opacity-20">
              <SanityImage
                image={program.mainImage}
                locale={locale}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/education"
              className="mb-6 inline-flex items-center font-ui text-sm text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="me-2 h-4 w-4" />
              {tCommon("backTo", { page: t("title") })}
            </Link>

            {/* Name */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {name}
            </h1>

            {/* Age Range */}
            {ageRange && (
              <div className="mt-4 flex items-center gap-2 text-cream/80">
                <Users className="h-5 w-5 text-gold" />
                <span className="font-body text-lg">
                  {t("ageRange")}: {ageRange}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left: Main Content */}
              <div className="lg:col-span-2">
                {/* Main Image */}
                {program.mainImage && (
                  <figure className="mb-8 overflow-hidden rounded-lg shadow-md">
                    <SanityImage
                      image={program.mainImage}
                      locale={locale}
                      width={678}
                      height={450}
                      className="h-auto w-full"
                      objectFit="contain"
                    />
                  </figure>
                )}

                {/* Description */}
                {program.description && (
                  <article className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
                    <PortableTextRenderer
                      content={program.description}
                      locale={locale}
                    />
                  </article>
                )}
              </div>

              {/* Right: Info Cards */}
              <div className="space-y-6">
                {/* Schedule Card */}
                {schedule && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                        <Calendar className="h-5 w-5 text-gold" />
                        {t("schedule")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line font-body text-charcoal">
                        {schedule}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Card */}
                {(program.contactName ||
                  program.contactEmail ||
                  program.contactPhone) && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-heading text-lg text-navy">
                        {t("contactProgram")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {program.contactName && (
                        <p className="font-body font-medium text-charcoal">
                          {program.contactName}
                        </p>
                      )}

                      {program.contactEmail && (
                        <a
                          href={`mailto:${program.contactEmail}`}
                          className="flex items-center gap-2 font-body text-sm text-navy hover:text-gold"
                        >
                          <Mail className="h-4 w-4" />
                          {program.contactEmail}
                        </a>
                      )}

                      {program.contactPhone && (
                        <a
                          href={`tel:${program.contactPhone}`}
                          className="flex items-center gap-2 font-body text-sm text-navy hover:text-gold"
                        >
                          <Phone className="h-4 w-4" />
                          {program.contactPhone}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Registration Button */}
                {program.registrationLink && (
                  <Button
                    asChild
                    className="w-full bg-gold text-charcoal hover:bg-gold/90"
                  >
                    <a
                      href={program.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("register")}
                      <ExternalLink className="ms-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
