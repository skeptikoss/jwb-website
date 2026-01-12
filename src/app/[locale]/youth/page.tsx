import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import {
  Users,
  Utensils,
  Calendar,
  Heart,
  Sparkles,
  PartyPopper,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { Header, Footer } from "@/components/layout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.youth");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function YouthPage() {
  const t = await getTranslations("pages.youth");

  const activities = [
    {
      icon: Utensils,
      title: t("activities.shabbat.title"),
      description: t("activities.shabbat.description"),
    },
    {
      icon: PartyPopper,
      title: t("activities.social.title"),
      description: t("activities.social.description"),
    },
    {
      icon: Sparkles,
      title: t("activities.holiday.title"),
      description: t("activities.holiday.description"),
    },
    {
      icon: Heart,
      title: t("activities.community.title"),
      description: t("activities.community.description"),
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
          <div className="mx-auto max-w-3xl text-center">
            <Users className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy">
              {t("about.title")}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal">
              {t("about.description")}
            </p>
            <p className="mt-4 font-body text-charcoal/80">
              {t("about.mission")}
            </p>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-navy">
            {t("activities.title")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="border-t-[3px] border-t-gold bg-cream"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-navy/10 p-3">
                      <activity.icon className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-navy">
                        {activity.title}
                      </h3>
                      <p className="mt-2 font-body text-charcoal/80">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-navy">
            {t("programs.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center font-body text-charcoal/80">
            {t("programs.description")}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="mx-auto h-10 w-10 text-sky" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {t("programs.ktantanim.title")}
                </h3>
                <p className="mt-2 font-body text-sm text-charcoal/80">
                  {t("programs.ktantanim.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Sparkles className="mx-auto h-10 w-10 text-terracotta" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {t("programs.vipGirls.title")}
                </h3>
                <p className="mt-2 font-body text-sm text-charcoal/80">
                  {t("programs.vipGirls.description")}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="mx-auto h-10 w-10 text-sage" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {t("programs.jli.title")}
                </h3>
                <p className="mt-2 font-body text-sm text-charcoal/80">
                  {t("programs.jli.description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-cream/80">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-gold text-charcoal hover:bg-gold/90"
              >
                <Link href="/events">{t("cta.viewEvents")}</Link>
              </Button>
              <Button
                asChild
                className="border border-cream bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                <Link href="/contact">{t("cta.contact")}</Link>
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
