import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import {
  Droplets,
  Clock,
  MapPin,
  Phone,
  DollarSign,
  Calendar,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Header, Footer } from "@/components/layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.mikvah");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function MikvahPage() {
  const t = await getTranslations("pages.mikvah");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
      {/* Hero Section */}
      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Badge className="bg-sky/20 text-sky hover:bg-sky/30">
              {t("badge")}
            </Badge>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Droplets className="mx-auto h-12 w-12 text-sky" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy">
              {t("about.title")}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal">
              {t("about.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Mikvah Cards */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Men's Mikvah */}
            <Card className="border-t-[3px] border-t-navy">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-navy/10 p-2">
                    <Users className="h-6 w-6 text-navy" />
                  </div>
                  <CardTitle className="font-heading text-2xl text-navy">
                    {t("mens.title")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("mens.location")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("mens.locationDetail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("mens.hours")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("mens.hoursDetail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("mens.cost")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("mens.costWeekday")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("mens.costFriday")}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-cream p-4">
                  <p className="font-body text-sm text-charcoal/80">
                    {t("mens.keyNote")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Women's Mikvah */}
            <Card className="border-t-[3px] border-t-terracotta">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-terracotta/10 p-2">
                    <Droplets className="h-6 w-6 text-terracotta" />
                  </div>
                  <CardTitle className="font-heading text-2xl text-navy">
                    {t("womens.title")}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("womens.location")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("womens.locationDetail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("womens.appointment")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("womens.appointmentDetail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-gray" />
                  <div>
                    <p className="font-ui text-sm font-medium text-charcoal">
                      {t("womens.cost")}
                    </p>
                    <p className="font-body text-sm text-charcoal/70">
                      {t("womens.costDetail")}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 rounded-lg bg-cream p-4">
                  <p className="font-ui text-sm font-medium text-charcoal">
                    {t("womens.contacts")}
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-warm-gray" />
                    <a
                      href="tel:+6596739184"
                      className="font-body text-sm text-navy hover:text-gold"
                    >
                      Simcha Abergel: +65 9673 9184
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-warm-gray" />
                    <a
                      href="tel:+6592327095"
                      className="font-body text-sm text-navy hover:text-gold"
                    >
                      Odelia Rivni: +65 9232 7095
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-2xl border-t-[3px] border-t-gold bg-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-heading text-2xl font-bold text-navy">
                {t("classes.title")}
              </h3>
              <p className="mt-4 font-body text-charcoal/80">
                {t("classes.description")}
              </p>
              <Button
                asChild
                className="mt-6 bg-navy text-cream hover:bg-navy/90"
              >
                <Link href="/contact">{t("classes.cta")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location CTA */}
      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {t("location.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-cream/80">
              {t("location.address")}
            </p>
            <Button
              asChild
              className="mt-8 bg-gold text-charcoal hover:bg-gold/90"
            >
              <Link href="/travel">{t("location.directions")}</Link>
            </Button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
