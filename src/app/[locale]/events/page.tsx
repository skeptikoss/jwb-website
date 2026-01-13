import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { SanityImage } from "@/components/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Calendar, MapPin, DollarSign, Users, CalendarDays, Repeat } from "lucide-react";

import {
  getAllEvents,
  type Locale,
  type EventType,
  getLocalizedValue,
} from "@/lib/sanity";

/**
 * Event type labels for badges
 */
const eventTypeLabels: Record<EventType, { en: string; he: string }> = {
  community: { en: "Community", he: "קהילה" },
  youth: { en: "Youth", he: "נוער" },
  education: { en: "Education", he: "חינוך" },
  holiday: { en: "Holiday", he: "חג" },
  shabbat: { en: "Shabbat", he: "שבת" },
  sports: { en: "Sports", he: "ספורט" },
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
 * Format event date for display
 */
function formatEventDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "he" ? "he-IL" : "en-SG", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format event time for display
 */
function formatEventTime(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(locale === "he" ? "he-IL" : "en-SG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Generate metadata for the Events page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.events");

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
 * Events listing page
 */
export default async function EventsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.events");
  const tCommon = await getTranslations("common");

  const events = await getAllEvents();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <CalendarDays className="h-10 w-10 text-gold" />
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
            </div>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {events.length === 0 ? (
              <div className="rounded-lg border border-warm-gray/30 bg-white p-8 text-center shadow-sm">
                <CalendarDays className="mx-auto h-12 w-12 text-warm-gray/50" />
                <p className="mt-4 font-body text-warm-gray">{t("noEvents")}</p>
                <p className="mt-2 font-body text-sm text-warm-gray/70">
                  {t("checkBack")}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  const name = getLocalizedValue(event.name, locale) || "Event";
                  const location = getLocalizedValue(event.location, locale);
                  const priceNote = getLocalizedValue(event.priceNote, locale);
                  const recurringSchedule = getLocalizedValue(event.recurringSchedule, locale);
                  const typeLabel = event.eventType
                    ? eventTypeLabels[event.eventType]?.[locale] ||
                      eventTypeLabels[event.eventType]?.en
                    : "";
                  const typeColor = event.eventType
                    ? eventTypeColors[event.eventType]
                    : "bg-navy text-cream";

                  return (
                    <Card
                      key={event._id}
                      className="flex flex-col overflow-hidden border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Image or Date Display */}
                      <div className="relative aspect-[16/9] bg-navy/5">
                        {event.mainImage ? (
                          <SanityImage
                            image={event.mainImage}
                            locale={locale}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-navy/10 to-gold/10">
                            <div className="text-center">
                              <span className="font-heading text-4xl font-bold text-navy">
                                {new Date(event.date).getDate()}
                              </span>
                              <span className="block font-ui text-sm uppercase tracking-wider text-charcoal">
                                {new Date(event.date).toLocaleDateString(
                                  locale === "he" ? "he-IL" : "en-SG",
                                  { month: "short" }
                                )}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Type Badge Overlay */}
                        <Badge className={`absolute start-3 top-3 ${typeColor}`}>
                          {typeLabel}
                        </Badge>
                        {/* Recurring Badge */}
                        {event.isRecurring && (
                          <Badge className="absolute end-3 top-3 bg-white/90 text-charcoal">
                            <Repeat className="me-1 h-3 w-3" />
                            {t("recurring")}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="flex flex-1 flex-col p-5">
                        {/* Event Name */}
                        <h2 className="font-heading text-xl font-semibold text-navy">
                          {name}
                        </h2>

                        {/* Date & Time */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-charcoal">
                          <Calendar className="h-4 w-4 text-gold" />
                          <span>
                            {formatEventDate(event.date, locale)} • {formatEventTime(event.date, locale)}
                          </span>
                        </div>

                        {/* Recurring Schedule */}
                        {event.isRecurring && recurringSchedule && (
                          <div className="mt-1 flex items-center gap-2 text-sm text-warm-gray">
                            <Repeat className="h-4 w-4" />
                            <span>{recurringSchedule}</span>
                          </div>
                        )}

                        {/* Location */}
                        {location && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-warm-gray">
                            <MapPin className="h-4 w-4" />
                            <span>{location}</span>
                          </div>
                        )}

                        {/* Price */}
                        {(event.price !== undefined || priceNote) && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-warm-gray">
                            <DollarSign className="h-4 w-4" />
                            <span>
                              {event.price === 0
                                ? t("free")
                                : priceNote || `$${event.price?.toFixed(2)}`}
                            </span>
                          </div>
                        )}

                        {/* Capacity */}
                        {event.capacity && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-warm-gray">
                            <Users className="h-4 w-4" />
                            <span>
                              {t("capacity")}: {event.capacity}
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
                          <Link href={`/events/${event.slug.current}`}>
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
