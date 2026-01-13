import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { getAllSynagogues, getUpcomingEvents, getLocalizedValue, type Locale } from "@/lib/sanity";
import { SanityImage } from "@/components/sanity/sanity-image";

/**
 * Fetch Shabbat times from Hebcal API for Singapore
 */
interface ShabbatTimes {
  candleLighting: string | null;
  havdalah: string | null;
  parsha: string | null;
}

async function getShabbatTimes(): Promise<ShabbatTimes> {
  try {
    // Singapore coordinates and timezone
    const params = new URLSearchParams({
      cfg: "json",
      latitude: "1.3521",
      longitude: "103.8198",
      tzid: "Asia/Singapore",
      M: "on", // Include Havdalah time
    });

    const response = await fetch(
      `https://www.hebcal.com/shabbat?${params.toString()}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Shabbat times");
    }

    const data = await response.json();

    // Extract candle lighting and havdalah times from items
    let candleLighting: string | null = null;
    let havdalah: string | null = null;
    let parsha: string | null = null;

    for (const item of data.items || []) {
      if (item.category === "candles") {
        // Format: "2026-01-16T18:58:00+08:00" -> "6:58 PM"
        const date = new Date(item.date);
        candleLighting = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Singapore",
        });
      } else if (item.category === "havdalah") {
        const date = new Date(item.date);
        havdalah = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Singapore",
        });
      } else if (item.category === "parashat") {
        parsha = item.title;
      }
    }

    return { candleLighting, havdalah, parsha };
  } catch (error) {
    console.error("Error fetching Shabbat times:", error);
    return { candleLighting: null, havdalah: null, parsha: null };
  }
}

export default async function Home() {
  const t = await getTranslations("home");
  const tCommon = await getTranslations("common");
  const locale = (await getLocale()) as Locale;

  // Fetch data in parallel
  const [synagogues, upcomingEvents, shabbatTimes] = await Promise.all([
    getAllSynagogues(),
    getUpcomingEvents(1), // Get next upcoming event
    getShabbatTimes(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-24 text-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-6 font-body text-lg text-cream/80 sm:text-xl">
                {t("hero.description")}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-charcoal hover:bg-gold/90"
                >
                  <Link href="/events">
                    {t("hero.ctaEvents")}
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border border-cream bg-transparent text-cream hover:bg-cream/10"
                >
                  <Link href="/about">{t("hero.ctaLearnMore")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Shabbat Times Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    {t("shabbatTimes.title")}
                  </CardTitle>
                  {shabbatTimes.parsha && (
                    <p className="font-body text-xs text-warm-gray">{shabbatTimes.parsha}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-body text-sm text-charcoal">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>
                        {t("shabbatTimes.candleLighting")}:{" "}
                        {shabbatTimes.candleLighting || "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>
                        {t("shabbatTimes.havdalah")}:{" "}
                        {shabbatTimes.havdalah || "—"}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/synagogues"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    {t("shabbatTimes.viewServices")}
                    <ArrowRight className="ms-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Events Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    {t("events.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-2 font-body text-sm text-charcoal">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gold" />
                        <span className="line-clamp-1">
                          {getLocalizedValue(upcomingEvents[0].name, locale)}
                        </span>
                      </div>
                      <p className="text-warm-gray">
                        {new Date(upcomingEvents[0].date).toLocaleDateString(
                          locale === "he" ? "he-IL" : "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            timeZone: "Asia/Singapore",
                          }
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="font-body text-sm text-warm-gray">
                      {t("events.noUpcoming")}
                    </p>
                  )}
                  <Link
                    href="/events"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    {t("events.allEvents")}
                    <ArrowRight className="ms-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Shop Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    {t("shop.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-charcoal">
                    {t("shop.description")}
                  </p>
                  <Link
                    href="/shop"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    {t("shop.browse")}
                    <ArrowRight className="ms-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Donate Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    {t("donate.title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-charcoal">
                    {t("donate.description")}
                  </p>
                  <Link
                    href="/donate"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    {t("donate.makeDonation")}
                    <ArrowRight className="ms-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Synagogues Section */}
        <section className="bg-off-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                {t("synagogues.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-warm-gray">
                {t("synagogues.description")}
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {synagogues.map((synagogue) => (
                <Card key={synagogue._id} className="overflow-hidden bg-white shadow-sm">
                  <div className="relative aspect-video bg-warm-gray/20">
                    {synagogue.mainImage ? (
                      <SanityImage
                        image={synagogue.mainImage}
                        locale={locale}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-ui text-sm text-warm-gray">
                          {getLocalizedValue(synagogue.name, locale)}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    {synagogue.yearEstablished && (
                      <Badge className="bg-sage text-white">
                        Est. {synagogue.yearEstablished}
                      </Badge>
                    )}
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-navy">
                      {getLocalizedValue(synagogue.name, locale)}
                    </h3>
                    {synagogue.meaningOfName && (
                      <p className="mt-2 font-body text-warm-gray">
                        &ldquo;{getLocalizedValue(synagogue.meaningOfName, locale)}&rdquo;
                        {synagogue.description && (
                          <> - {getLocalizedValue(synagogue.description, locale)}</>
                        )}
                      </p>
                    )}
                    {synagogue.address?.street && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-charcoal">
                        <MapPin className="h-4 w-4 text-gold" />
                        <span>{synagogue.address.street}</span>
                      </div>
                    )}
                    <Button asChild className="mt-4 bg-navy text-cream">
                      <Link href={`/synagogues/${synagogue.slug.current}`}>
                        {tCommon("learnMore")}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gold py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-charcoal/80">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-navy text-cream hover:bg-navy/90"
              >
                <Link href="/events">{t("cta.rsvp")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-cream"
              >
                <Link href="/contact">{t("cta.contact")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
