import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import {
  UtensilsCrossed,
  Clock,
  Phone,
  Mail,
  MapPin,
  Award,
  Calendar,
  ChefHat,
} from "lucide-react";

import type { Locale } from "@/lib/sanity";

/**
 * Generate metadata for the Restaurant page
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.restaurant");

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
 * Restaurant page - Awafi Kosher Restaurant
 */
export default async function RestaurantPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.restaurant");
  const tCommon = await getTranslations("common");

  // Opening hours data
  const hours = [
    { meal: t("hours.breakfast"), time: "8:30am - 9:00am", days: t("hours.daily") },
    { meal: t("hours.lunch"), time: "12:30pm - 2:00pm", days: t("hours.sunThu") },
    { meal: t("hours.dinner"), time: "6:30pm - 8:30pm", days: t("hours.sunThu") },
  ];

  // Menu highlights
  const cuisines = [
    { name: t("cuisine.indian"), icon: "🍛" },
    { name: t("cuisine.middleEastern"), icon: "🧆" },
    { name: t("cuisine.chinese"), icon: "🥢" },
    { name: t("cuisine.western"), icon: "🍝" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <UtensilsCrossed className="h-10 w-10 text-gold" />
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
            </div>
            <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
              {t("subtitle")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Badge className="bg-gold/20 text-gold">
                <Award className="me-1 h-3 w-3" />
                {t("kashrut.badge")}
              </Badge>
              <Badge className="bg-sage/20 text-sage">
                <ChefHat className="me-1 h-3 w-3" />
                {t("cuisine.badge")}
              </Badge>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column: About & Cuisines */}
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
                  </CardContent>
                </Card>

                {/* Cuisine Types */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-xl text-navy">
                      {t("cuisine.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {cuisines.map((cuisine) => (
                        <div
                          key={cuisine.name}
                          className="flex flex-col items-center rounded-lg bg-cream/50 p-4 text-center"
                        >
                          <span className="text-3xl">{cuisine.icon}</span>
                          <span className="mt-2 font-ui text-sm text-charcoal">
                            {cuisine.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Kashrut Info */}
                <Card className="border-s-[3px] border-s-sage bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 font-heading text-xl text-navy">
                      <Award className="h-5 w-5 text-sage" />
                      {t("kashrut.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-charcoal">
                      {t("kashrut.description")}
                    </p>
                    <p className="mt-2 font-ui text-sm text-warm-gray">
                      {t("kashrut.supervisor")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Hours & Contact */}
              <div className="space-y-6">
                {/* Opening Hours Card */}
                <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 font-heading text-lg text-navy">
                      <Clock className="h-5 w-5 text-gold" />
                      {t("hours.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hours.map((slot) => (
                      <div key={slot.meal} className="border-b border-warm-gray/20 pb-3 last:border-0 last:pb-0">
                        <p className="font-body font-medium text-charcoal">
                          {slot.meal}
                        </p>
                        <p className="font-ui text-sm text-warm-gray">
                          {slot.time}
                        </p>
                        <p className="font-ui text-xs text-warm-gray/70">
                          {slot.days}
                        </p>
                      </div>
                    ))}

                    {/* Shabbat Notice */}
                    <div className="rounded-lg bg-terracotta/10 p-3">
                      <p className="font-ui text-sm font-medium text-terracotta">
                        {t("hours.shabbatNote")}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-heading text-lg text-navy">
                      {tCommon("contactUs")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {tCommon("phone")}
                        </p>
                        <a
                          href="tel:+6590880230"
                          className="font-ui text-sm text-navy hover:underline"
                        >
                          +65 9088 0230
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {tCommon("email")}
                        </p>
                        <a
                          href="mailto:awafi@jwb.org.sg"
                          className="font-ui text-sm text-navy hover:underline"
                        >
                          awafi@jwb.org.sg
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gold" />
                      <div>
                        <p className="font-body font-medium text-charcoal">
                          {tCommon("address")}
                        </p>
                        <p className="font-ui text-sm text-warm-gray">
                          {t("contact.address")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shabbat Reservations CTA */}
                <Card className="bg-navy text-cream shadow-sm">
                  <CardContent className="p-6">
                    <Calendar className="h-8 w-8 text-gold" />
                    <h3 className="mt-3 font-heading text-lg font-semibold">
                      {t("reservations.title")}
                    </h3>
                    <p className="mt-2 font-body text-sm text-cream/80">
                      {t("reservations.description")}
                    </p>
                    <Button
                      asChild
                      className="mt-4 w-full bg-gold text-charcoal hover:bg-gold/90"
                    >
                      <Link href="/contact">
                        {t("reservations.cta")}
                      </Link>
                    </Button>
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
