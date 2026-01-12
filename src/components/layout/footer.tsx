"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

// Footer link definitions with translation keys
const footerLinks = {
  community: [
    { key: "aboutUs", href: "/about" },
    { key: "history", href: "/history" },
    { key: "theRabbi", href: "/about/rabbi" },
    { key: "contact", href: "/contact" },
  ],
  synagogues: [
    { key: "maghainAboth", href: "/synagogues/maghain-aboth" },
    { key: "chesedEl", href: "/synagogues/chesed-el" },
    { key: "serviceTimes", href: "/services" },
    { key: "travelInfo", href: "/travel" },
  ],
  programs: [
    { key: "events", href: "/events" },
    { key: "education", href: "/education" },
    { key: "ganenuPreschool", href: "/education/ganenu" },
    { key: "youthPrograms", href: "/education/youth" },
  ],
  visit: [
    { key: "museum", href: "/museum" },
    { key: "restaurant", href: "/restaurant" },
    { key: "shop", href: "/shop" },
    { key: "donate", href: "/donate" },
    { key: "memberPortal", href: "/member" },
  ],
} as const;

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");

  return (
    <footer className="border-t border-border bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-cream">
                {tCommon("siteName")}
              </span>
            </Link>
            <p className="mt-4 font-body text-sm text-cream/80">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:info@singaporejews.com"
                className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4" />
                info@singaporejews.com
              </a>
              <a
                href="tel:+6563372189"
                className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                +65 6337 2189
              </a>
              <div className="flex items-start gap-2 text-sm text-cream/80">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>
                  24 Waterloo Street
                  <br />
                  Singapore 187950
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com/singaporejews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 transition-colors hover:text-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/singaporejews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/80 transition-colors hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              {t("sections.community")}
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              {t("sections.synagogues")}
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.synagogues.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              {t("sections.programs")}
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              {t("sections.visit")}
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.visit.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-cream/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="font-body text-sm text-cream/60">
              &copy; {new Date().getFullYear()} {tCommon("siteName")}.{" "}
              {t("copyright")}
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
