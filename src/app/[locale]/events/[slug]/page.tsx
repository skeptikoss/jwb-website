import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Repeat,
  ExternalLink,
  Building2,
} from "lucide-react";

import {
  getEventBySlug,
  getEventSlugs,
  type Locale,
  type EventType,
  getLocalizedValue,
} from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Event type labels
 */
const eventTypeLabels: Record<EventType, { en: string; he: string }> = {
  community: { en: "Community Event", he: "אירוע קהילתי" },
  youth: { en: "Youth Event", he: "אירוע נוער" },
  education: { en: "Educational Event", he: "אירוע חינוכי" },
  holiday: { en: "Holiday Event", he: "אירוע חג" },
  shabbat: { en: "Shabbat Event", he: "אירוע שבת" },
  sports: { en: "Sports Event", he: "אירוע ספורט" },
};

/**
 * Event type badge colors
 */
const eventTypeColors: Record<EventType, string> = {
  community: "bg-navy text-cream",
  youth: "bg-sage text-white",
  education: "bg-sky text-white",
  holiday: "bg-gold text-charcoal",
  shabbat: "bg-terracotta text-white",
  sports: "bg-charcoal text-cream",
};

/**
 * Format full date and time
 */
function formatFullDateTime(dateString: string, locale: Locale): { date: string; time: string } {
  const date = new Date(dateString);
  const localeStr = locale === "he" ? "he-IL" : "en-SG";

  return {
    date: date.toLocaleDateString(localeStr, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(localeStr, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

/**
 * Generate static paths for event detail pages
 */
export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for a specific event
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Event Not Found" };
  }

  const name = getLocalizedValue(event.name, locale) || "Event";
  const description = getLocalizedValue(event.seo?.metaDescription, locale);

  return {
    title: name,
    description,
    openGraph: { title: name, description },
  };
}

/**
 * Event detail page
 */
export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.events");
  const tCommon = await getTranslations("common");

  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const name = getLocalizedValue(event.name, locale) || "Event";
  const location = getLocalizedValue(event.location, locale);
  const priceNote = getLocalizedValue(event.priceNote, locale);
  const recurringSchedule = getLocalizedValue(event.recurringSchedule, locale);
  const typeLabel =
    eventTypeLabels[event.eventType]?.[locale] ||
    eventTypeLabels[event.eventType]?.en;
  const typeColor = eventTypeColors[event.eventType] || "bg-navy text-cream";

  const { date: formattedDate, time: formattedTime } = formatFullDateTime(
    event.date,
    locale
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-16 text-cream lg:py-24">
          {event.mainImage && (
            <div className="absolute inset-0 opacity-20">
              <SanityImage
                image={event.mainImage}
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
              href="/events"
              className="mb-6 inline-flex items-center font-ui text-sm text-cream/70 transition-colors hover:text-cream"
            >
              <ArrowLeft className="me-2 h-4 w-4" />
              {tCommon("backTo", { page: t("title") })}
            </Link>

            {/* Type Badge */}
            <Badge className={`mb-4 ${typeColor}`}>{typeLabel}</Badge>
            {event.isRecurring && (
              <Badge className="mb-4 ms-2 bg-white/20 text-white">
                <Repeat className="me-1 h-3 w-3" />
                {t("recurring")}
              </Badge>
            )}

            {/* Event Name */}
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {name}
            </h1>

            {/* Date & Time */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-cream/80">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold" />
                <span className="font-body text-lg">{formattedDate}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" />
                <span className="font-body text-lg">{formattedTime}</span>
              </span>
            </div>

            {/* Recurring Schedule */}
            {event.isRecurring && recurringSchedule && (
              <div className="mt-2 flex items-center gap-2 text-cream/70">
                <Repeat className="h-4 w-4" />
                <span className="font-body">{recurringSchedule}</span>
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
                {event.mainImage && (
                  <figure className="mb-8 overflow-hidden rounded-lg shadow-md">
                    <SanityImage
                      image={event.mainImage}
                      locale={locale}
                      width={800}
                      height={450}
                      className="h-auto w-full"
                    />
                  </figure>
                )}

                {/* Description */}
                {event.description && (
                  <article className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
                    <PortableTextRenderer
                      content={event.description}
                      locale={locale}
                    />
                  </article>
                )}

                {/* No description placeholder */}
                {!event.description && (
                  <div className="rounded-lg bg-white p-6 shadow-sm lg:p-8">
                    <p className="font-body text-warm-gray">
                      {t("noDescription")}
                    </p>
                  </div>
                )}
              </div>

              {/* Right: Info Cards */}
              <div className="space-y-6">
                {/* Event Details Card */}
                <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-navy">
                      {t("eventDetails")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {t("date")}
                        </p>
                        <p className="font-body text-sm text-warm-gray">
                          {formattedDate}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {t("time")}
                        </p>
                        <p className="font-body text-sm text-warm-gray">
                          {formattedTime}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    {location && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gold" />
                        <div>
                          <p className="font-body font-medium text-charcoal">
                            {t("location")}
                          </p>
                          <p className="font-body text-sm text-warm-gray">
                            {location}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {t("price")}
                        </p>
                        <p className="font-body text-sm text-warm-gray">
                          {event.price === 0 || event.price === undefined
                            ? t("free")
                            : priceNote || `$${event.price.toFixed(2)} SGD`}
                        </p>
                      </div>
                    </div>

                    {/* Capacity */}
                    {event.capacity && (
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-gold" />
                        <div>
                          <p className="font-body font-medium text-charcoal">
                            {t("capacity")}
                          </p>
                          <p className="font-body text-sm text-warm-gray">
                            {event.capacity} {t("spots")}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Organizer */}
                    {event.organizer && (
                      <div className="flex items-start gap-3">
                        <Building2 className="h-5 w-5 text-gold" />
                        <div>
                          <p className="font-body font-medium text-charcoal">
                            {t("organizer")}
                          </p>
                          <p className="font-body text-sm text-warm-gray">
                            {event.organizer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Registration Button */}
                {event.registrationLink && (
                  <Button
                    asChild
                    className="w-full bg-gold text-charcoal hover:bg-gold/90"
                  >
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("register")}
                      <ExternalLink className="ms-2 h-4 w-4" />
                    </a>
                  </Button>
                )}

                {/* Back to Events */}
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-navy text-navy hover:bg-navy hover:text-cream"
                >
                  <Link href="/events">
                    <ArrowLeft className="me-2 h-4 w-4" />
                    {tCommon("backTo", { page: t("title") })}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
