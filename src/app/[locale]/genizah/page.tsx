import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import {
  BookOpen,
  ScrollText,
  History,
  MapPin,
  Users,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Header, Footer } from "@/components/layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.genizah");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function GenizahPage() {
  const t = await getTranslations("pages.genizah");

  const highlights = [
    {
      icon: ScrollText,
      title: t("collection.prayerBooks.title"),
      description: t("collection.prayerBooks.description"),
    },
    {
      icon: BookOpen,
      title: t("collection.kabbalah.title"),
      description: t("collection.kabbalah.description"),
    },
    {
      icon: History,
      title: t("collection.historical.title"),
      description: t("collection.historical.description"),
    },
    {
      icon: MapPin,
      title: t("collection.origins.title"),
      description: t("collection.origins.description"),
    },
  ];

  const discoveries = [
    {
      title: t("discoveries.farhi.title"),
      description: t("discoveries.farhi.description"),
    },
    {
      title: t("discoveries.marshall.title"),
      description: t("discoveries.marshall.description"),
    },
    {
      title: t("discoveries.oxford.title"),
      description: t("discoveries.oxford.description"),
    },
    {
      title: t("discoveries.israel.title"),
      description: t("discoveries.israel.description"),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-cream">
        {/* Hero Section */}
      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Badge className="bg-gold/20 text-gold hover:bg-gold/30">
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

      {/* About Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <BookOpen className="h-12 w-12 text-gold" />
              <h2 className="mt-4 font-heading text-3xl font-bold text-navy">
                {t("about.title")}
              </h2>
              <p className="mt-4 font-body text-charcoal">
                {t("about.description")}
              </p>
              <p className="mt-4 font-body text-charcoal/80">
                {t("about.history")}
              </p>
            </div>
            <Card className="border-t-[3px] border-t-gold bg-white">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-navy">
                  {t("about.discovery.title")}
                </h3>
                <p className="mt-3 font-body text-charcoal/80">
                  {t("about.discovery.description")}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-warm-gray">
                  <Users className="h-4 w-4" />
                  <span>{t("about.discovery.leader")}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Collection Highlights */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-navy">
            {t("collection.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-charcoal/80">
            {t("collection.description")}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy/10">
                    <item.icon className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-charcoal/80">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Discoveries */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-gold" />
            <h2 className="font-heading text-3xl font-bold text-navy">
              {t("discoveries.title")}
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-charcoal/80">
            {t("discoveries.description")}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {discoveries.map((discovery, index) => (
              <Card
                key={index}
                className="border-s-[3px] border-s-gold bg-white"
              >
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-navy">
                    {discovery.title}
                  </h3>
                  <p className="mt-2 font-body text-charcoal/80">
                    {discovery.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team & CTA Section */}
      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold">{t("team.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-cream/80">
              {t("team.description")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-gold text-charcoal hover:bg-gold/90"
              >
                <Link href="/museum">{t("team.visitMuseum")}</Link>
              </Button>
              <Button
                asChild
                className="border border-cream bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a
                  href="https://www.shalompoint.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("team.shalomPoint")}
                  <ExternalLink className="ms-2 h-4 w-4" />
                </a>
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
