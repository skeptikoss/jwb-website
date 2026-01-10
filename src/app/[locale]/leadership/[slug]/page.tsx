import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, ArrowLeft, User } from "lucide-react";

import {
  getPersonBySlug,
  getPersonSlugs,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all leadership detail pages
 */
export async function generateStaticParams() {
  const slugs = await getPersonSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for a specific person page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const person = await getPersonBySlug(slug);

  if (!person) {
    return { title: "Profile Not Found" };
  }

  const role = getLocalizedValue(person.role, locale);
  const description = role ? `${person.name} - ${role}` : person.name;

  return {
    title: person.name,
    description,
    openGraph: {
      title: person.name,
      description,
    },
  };
}

/**
 * Get category badge color based on category type
 */
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

/**
 * Leadership detail page
 *
 * Shows full profile information including photo, biography, and contact info.
 */
export default async function LeadershipDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.leadership");
  const tCommon = await getTranslations("common");

  // Fetch person data
  const person = await getPersonBySlug(slug);

  if (!person) {
    notFound();
  }

  // Get localized content
  const role = getLocalizedValue(person.role, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link
              href="/leadership"
              className="mb-6 inline-flex items-center font-ui text-sm text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="me-2 h-4 w-4" />
              {t("backToLeadership")}
            </Link>

            {/* Category Badge */}
            <Badge className={`mb-4 ${getCategoryBadgeClass(person.category)}`}>
              {t(`category.${person.category}`)}
            </Badge>

            {/* Name */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {person.name}
            </h1>

            {/* Role */}
            {role && (
              <p className="mt-2 font-body text-xl text-cream/80">
                {role}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Photo & Biography */}
              <div className="lg:col-span-2">
                {/* Photo */}
                <figure className="mb-8 overflow-hidden rounded-lg shadow-md">
                  {person.photo ? (
                    <SanityImage
                      image={person.photo}
                      locale={locale}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-warm-gray/20">
                      <User className="h-24 w-24 text-warm-gray/50" />
                    </div>
                  )}
                </figure>

                {/* Biography Content */}
                {person.bio && (
                  <article className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
                    <h2 className="mb-4 font-heading text-2xl font-bold text-navy">
                      {t("biography")}
                    </h2>
                    <PortableTextRenderer
                      content={person.bio}
                      locale={locale}
                    />
                  </article>
                )}
              </div>

              {/* Right Column - Contact Info */}
              <div className="space-y-6">
                {/* Contact Card */}
                {(person.email || person.phone) && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                        {t("contact")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {person.email && (
                          <a
                            href={`mailto:${person.email}`}
                            className="flex items-center gap-3 font-body text-navy transition-colors hover:text-gold"
                          >
                            <Mail className="h-5 w-5 text-gold" />
                            {person.email}
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone}`}
                            className="flex items-center gap-3 font-body text-navy transition-colors hover:text-gold"
                          >
                            <Phone className="h-5 w-5 text-gold" />
                            {person.phone}
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
