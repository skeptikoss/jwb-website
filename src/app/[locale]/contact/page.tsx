import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Header, Footer } from "@/components/layout";
import { PortableTextRenderer, SanityImage } from "@/components/sanity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone } from "lucide-react";

import {
  getPageBySlug,
  getSiteSettings,
  type Locale,
  getLocalizedValue,
} from "@/lib/sanity";

/**
 * Generate metadata for the Contact page
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const page = await getPageBySlug("contact");
  const t = await getTranslations("pages.contact");

  if (!page) {
    return { title: t("title") };
  }

  const title = getLocalizedValue(page.title, locale) || t("title");
  const description =
    getLocalizedValue(page.excerpt, locale) ||
    getLocalizedValue(page.seo?.metaDescription, locale);

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

/**
 * Contact page with form and contact information
 *
 * The form is frontend-only for this demo - no backend submission.
 */
export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.contact");
  const tCommon = await getTranslations("common");

  // Fetch page content and site settings
  const [page, settings] = await Promise.all([
    getPageBySlug("contact"),
    getSiteSettings(),
  ]);

  const title = page
    ? getLocalizedValue(page.title, locale) || t("title")
    : t("title");
  const excerpt = page ? getLocalizedValue(page.excerpt, locale) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy py-16 text-cream lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {excerpt && (
              <p className="mt-4 max-w-2xl font-body text-lg text-cream/80">
                {excerpt}
              </p>
            )}
          </div>
        </section>

        {/* Content Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Contact Form */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-navy">
                    {tCommon("contactUs")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block font-ui text-sm font-medium text-charcoal"
                      >
                        {t("form.name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="border-warm-gray/30 focus:border-gold focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block font-ui text-sm font-medium text-charcoal"
                      >
                        {t("form.email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="border-warm-gray/30 focus:border-gold focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-1 block font-ui text-sm font-medium text-charcoal"
                      >
                        {t("form.subject")}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        className="border-warm-gray/30 focus:border-gold focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block font-ui text-sm font-medium text-charcoal"
                      >
                        {t("form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full rounded-md border border-warm-gray/30 px-3 py-2 font-body text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-navy text-cream hover:bg-navy/90"
                    >
                      {t("form.submit")}
                    </Button>

                    <p className="text-center font-ui text-xs text-warm-gray">
                      Demo only - form submissions are not processed.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Right: Contact Info & Content */}
              <div className="space-y-6">
                {/* Contact Info Card */}
                {settings?.contactInfo && (
                  <Card className="border-t-[3px] border-t-gold bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-heading text-lg text-navy">
                        {tCommon("contactUs")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {settings.contactInfo.address?.street && (
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                          <div className="font-body text-charcoal">
                            <p className="font-medium">{tCommon("address")}</p>
                            <p>{settings.contactInfo.address.street}</p>
                            {settings.contactInfo.address.postalCode && (
                              <p>
                                {settings.contactInfo.address.city || "Singapore"}{" "}
                                {settings.contactInfo.address.postalCode}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {settings.contactInfo.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-gold" />
                          <div className="font-body">
                            <p className="font-medium text-charcoal">
                              {tCommon("email")}
                            </p>
                            <a
                              href={`mailto:${settings.contactInfo.email}`}
                              className="text-navy hover:text-gold"
                            >
                              {settings.contactInfo.email}
                            </a>
                          </div>
                        </div>
                      )}

                      {settings.contactInfo.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-gold" />
                          <div className="font-body">
                            <p className="font-medium text-charcoal">
                              {tCommon("phone")}
                            </p>
                            <a
                              href={`tel:${settings.contactInfo.phone}`}
                              className="text-navy hover:text-gold"
                            >
                              {settings.contactInfo.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Page Content */}
                {page?.content && (
                  <Card className="bg-white shadow-sm">
                    <CardContent className="pt-6">
                      <PortableTextRenderer
                        content={page.content}
                        locale={locale}
                      />
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
