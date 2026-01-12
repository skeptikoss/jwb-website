import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  Landmark,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Calendar,
  Star,
  History,
} from "lucide-react";

import type { Locale } from "@/lib/sanity";

/**
 * Generate metadata for the Museum page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.museum");

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
 * Museum page - Jews of Singapore Museum
 */
export default async function MuseumPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.museum");
  const tCommon = await getTranslations("common");

  // Exhibit highlights
  const exhibits = [
    {
      title: t("exhibits.pioneers.title"),
      description: t("exhibits.pioneers.description"),
      icon: Users,
    },
    {
      title: t("exhibits.commerce.title"),
      description: t("exhibits.commerce.description"),
      icon: Star,
    },
    {
      title: t("exhibits.heritage.title"),
      description: t("exhibits.heritage.description"),
      icon: History,
    },
    {
      title: t("exhibits.community.title"),
      description: t("exhibits.community.description"),
      icon: BookOpen,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Landmark className="h-10 w-10 text-gold" />
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
            </div>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-gold/20 text-gold">
                <History className="me-1 h-3 w-3" />
                {t("badge.history")}
              </Badge>
              <Badge className="bg-sage/20 text-sage">
                <Users className="me-1 h-3 w-3" />
                {t("badge.heritage")}
              </Badge>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column: About & Exhibits */}
              <div className="space-y-6 lg:col-span-2">
                {/* About Card */}
                <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-xl text-navy">
                      {t("about.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-charcoal leading-relaxed">
                      {t("about.description")}
                    </p>
                    <p className="mt-4 font-body text-charcoal leading-relaxed">
                      {t("about.mission")}
                    </p>
                  </CardContent>
                </Card>

                {/* Exhibit Highlights */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-xl text-navy">
                      {t("exhibits.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {exhibits.map((exhibit) => (
                        <div
                          key={exhibit.title}
                          className="rounded-lg border border-warm-gray/20 bg-cream/50 p-4"
                        >
                          <div className="flex items-center gap-2 text-navy">
                            <exhibit.icon className="h-5 w-5 text-gold" />
                            <h3 className="font-heading font-semibold">
                              {exhibit.title}
                            </h3>
                          </div>
                          <p className="mt-2 font-body text-sm text-charcoal">
                            {exhibit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notable Figures */}
                <Card className="border-s-[3px] border-s-sage bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 font-heading text-xl text-navy">
                      <Star className="h-5 w-5 text-sage" />
                      {t("figures.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-charcoal">
                      {t("figures.description")}
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        <span className="font-body text-sm text-charcoal">
                          {t("figures.sassoon")}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        <span className="font-body text-sm text-charcoal">
                          {t("figures.menasseh")}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        <span className="font-body text-sm text-charcoal">
                          {t("figures.marshall")}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Visit Info */}
              <div className="space-y-6">
                {/* Visit Info Card */}
                <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                      <Clock className="h-5 w-5 text-gold" />
                      {t("visit.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-body font-medium text-charcoal">
                        {t("visit.hours")}
                      </p>
                      <div className="mt-1 space-y-0.5 font-ui text-sm text-warm-gray">
                        <p>{t("visit.hoursWeekday")}</p>
                        <p>{t("visit.hoursFriday")}</p>
                        <p className="italic">{t("visit.hoursClosed")}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-body font-medium text-charcoal">
                        {t("visit.admission")}
                      </p>
                      <p className="font-ui text-sm text-warm-gray">
                        {t("visit.admissionDetail")}
                      </p>
                    </div>

                    {/* Booking Requirement Notice */}
                    <div className="rounded-lg bg-gold/10 p-3">
                      <p className="font-body font-medium text-charcoal">
                        {t("visit.booking")}
                      </p>
                      <p className="mt-1 font-ui text-sm text-warm-gray">
                        {t("visit.bookingDetail")}
                      </p>
                    </div>

                    {/* Guided Tours Notice */}
                    <div className="rounded-lg bg-sky/10 p-3">
                      <p className="font-ui text-sm font-medium text-sky">
                        {t("visit.toursNote")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                      <MapPin className="h-5 w-5 text-gold" />
                      {t("location.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-body font-medium text-charcoal">
                        {tCommon("address")}
                      </p>
                      <p className="font-ui text-sm text-warm-gray">
                        {t("location.address")}
                      </p>
                    </div>

                    <div>
                      <p className="font-body font-medium text-charcoal">
                        {t("location.access")}
                      </p>
                      <p className="font-ui text-sm text-warm-gray">
                        {t("location.accessDetail")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Book a Visit CTA */}
                <Card className="bg-navy text-cream shadow-sm">
                  <CardContent className="p-6">
                    <Calendar className="h-8 w-8 text-gold" />
                    <h3 className="mt-3 font-heading text-lg font-semibold">
                      {t("tour.title")}
                    </h3>
                    <p className="mt-2 font-body text-sm text-cream/80">
                      {t("tour.description")}
                    </p>
                    <Button
                      asChild
                      className="mt-4 w-full bg-gold text-charcoal hover:bg-gold/90"
                    >
                      <a
                        href="https://calendly.com/jewsofsingapore"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("tour.cta")}
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Links */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-navy">
                      {t("related.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link
                      href="/history"
                      className="flex items-center gap-2 rounded-lg p-2 font-ui text-sm text-navy transition-colors hover:bg-cream/50"
                    >
                      <History className="h-4 w-4 text-gold" />
                      {t("related.history")}
                    </Link>
                    <Link
                      href="/synagogues"
                      className="flex items-center gap-2 rounded-lg p-2 font-ui text-sm text-navy transition-colors hover:bg-cream/50"
                    >
                      <Landmark className="h-4 w-4 text-gold" />
                      {t("related.synagogues")}
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
