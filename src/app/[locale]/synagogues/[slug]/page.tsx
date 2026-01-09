import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { MapPin, Mail, Phone, Clock, ArrowLeft, CheckCircle } from "lucide-react";

import {
  getSynagogueBySlug,
  getSynagogueSlugs,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all synagogue detail pages
 */
export async function generateStaticParams() {
  const slugs = await getSynagogueSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for a specific synagogue page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const synagogue = await getSynagogueBySlug(slug);

  if (!synagogue) {
    return { title: "Synagogue Not Found" };
  }

  const name = getLocalizedValue(synagogue.name, locale) || "Synagogue";
  const description =
    getLocalizedValue(synagogue.description, locale) ||
    getLocalizedValue(synagogue.seo?.metaDescription, locale);

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
    },
  };
}

/**
 * Service time day labels
 */
const dayLabels: Record<string, { en: string; he: string }> = {
  friday: { en: "Friday Evening", he: "ערב שבת" },
  saturday: { en: "Saturday Morning", he: "שבת בבוקר" },
  "weekday-morning": { en: "Weekday Morning", he: "בוקר חול" },
  "weekday-evening": { en: "Weekday Evening", he: "ערב חול" },
  holiday: { en: "Holiday", he: "חג" },
};

/**
 * Synagogue detail page
 *
 * Shows full synagogue information including history, service times,
 * address, features, and photo gallery.
 */
export default async function SynagogueDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.synagogues");
  const tCommon = await getTranslations("common");

  // Fetch synagogue data
  const synagogue = await getSynagogueBySlug(slug);

  if (!synagogue) {
    notFound();
  }

  // Get localized content
  const name = getLocalizedValue(synagogue.name, locale) || "Synagogue";
  const meaning = getLocalizedValue(synagogue.meaningOfName, locale);
  const description = getLocalizedValue(synagogue.description, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-16 text-cream lg:py-24">
          {/* Background image */}
          {synagogue.mainImage && (
            <div className="absolute inset-0 opacity-20">
              <SanityImage
                image={synagogue.mainImage}
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
              href="/synagogues"
              className="mb-6 inline-flex items-center font-ui text-sm text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="me-2 h-4 w-4" />
              {tCommon("backTo", { page: t("title") })}
            </Link>

            {/* Year Badge */}
            {synagogue.yearEstablished && (
              <Badge className="mb-4 bg-gold text-charcoal">
                {t("established")} {synagogue.yearEstablished}
              </Badge>
            )}

            {/* Name */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {name}
            </h1>

            {/* Meaning */}
            {meaning && (
              <p className="mt-2 font-body text-xl italic text-cream/80">
                &ldquo;{meaning}&rdquo;
              </p>
            )}

            {/* Description */}
            {description && (
              <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
                {description}
              </p>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - History & Content */}
              <div className="lg:col-span-2">
                {/* Main Image */}
                {synagogue.mainImage && (
                  <figure className="mb-8 overflow-hidden rounded-lg shadow-md">
                    <SanityImage
                      image={synagogue.mainImage}
                      locale={locale}
                      width={800}
                      height={500}
                      className="h-auto w-full"
                    />
                  </figure>
                )}

                {/* History Content */}
                {synagogue.history && (
                  <article className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
                    <PortableTextRenderer
                      content={synagogue.history}
                      locale={locale}
                    />
                  </article>
                )}

                {/* Photo Gallery */}
                {synagogue.gallery && synagogue.gallery.length > 0 && (
                  <div className="mt-8">
                    <h2 className="mb-4 font-heading text-2xl font-bold text-navy">
                      {t("gallery")}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {synagogue.gallery.map((image, index) => (
                        <figure
                          key={image.asset._ref || index}
                          className="overflow-hidden rounded-lg shadow-sm"
                        >
                          <SanityImage
                            image={image}
                            locale={locale}
                            width={300}
                            height={200}
                            className="h-auto w-full object-cover"
                          />
                          {image.caption && (
                            <figcaption className="bg-white px-2 py-1 text-xs text-warm-gray">
                              {getLocalizedValue(image.caption, locale)}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Info Cards */}
              <div className="space-y-6">
                {/* Service Times Card */}
                {synagogue.serviceTimes && synagogue.serviceTimes.length > 0 && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                        <Clock className="h-5 w-5 text-gold" />
                        {t("services")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {synagogue.serviceTimes.map((serviceTime) => {
                          const dayLabel =
                            dayLabels[serviceTime.day || ""]?.[locale] ||
                            serviceTime.day;
                          const serviceName = getLocalizedValue(
                            serviceTime.service,
                            locale
                          );

                          return (
                            <li key={serviceTime._key} className="border-b border-warm-gray/20 pb-2 last:border-0 last:pb-0">
                              <div className="font-ui text-sm font-medium text-charcoal">
                                {dayLabel}
                              </div>
                              <div className="flex justify-between">
                                <span className="font-body text-warm-gray">
                                  {serviceName}
                                </span>
                                <span className="font-ui font-medium text-navy">
                                  {serviceTime.time}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Location Card */}
                {synagogue.address && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                        <MapPin className="h-5 w-5 text-gold" />
                        {t("location")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <address className="not-italic">
                        {synagogue.address.street && (
                          <p className="font-body text-charcoal">
                            {synagogue.address.street}
                          </p>
                        )}
                        {synagogue.address.postalCode && (
                          <p className="font-body text-charcoal">
                            {synagogue.address.city || "Singapore"}{" "}
                            {synagogue.address.postalCode}
                          </p>
                        )}
                      </address>

                      {/* Contact info */}
                      <div className="mt-4 space-y-2">
                        {synagogue.contactEmail && (
                          <a
                            href={`mailto:${synagogue.contactEmail}`}
                            className="flex items-center gap-2 font-body text-sm text-navy hover:text-gold"
                          >
                            <Mail className="h-4 w-4" />
                            {synagogue.contactEmail}
                          </a>
                        )}
                        {synagogue.contactPhone && (
                          <a
                            href={`tel:${synagogue.contactPhone}`}
                            className="flex items-center gap-2 font-body text-sm text-navy hover:text-gold"
                          >
                            <Phone className="h-4 w-4" />
                            {synagogue.contactPhone}
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Features Card */}
                {synagogue.features && synagogue.features.length > 0 && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-heading text-lg text-navy">
                        {t("features")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {synagogue.features.map((feature, index) => {
                          const featureText = getLocalizedValue(feature, locale);
                          if (!featureText) return null;
                          return (
                            <li
                              key={index}
                              className="flex items-center gap-2 font-body text-sm text-charcoal"
                            >
                              <CheckCircle className="h-4 w-4 shrink-0 text-sage" />
                              {featureText}
                            </li>
                          );
                        })}
                      </ul>
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
