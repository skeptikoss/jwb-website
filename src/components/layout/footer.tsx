import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  community: [
    { name: "About Us", href: "/about" },
    { name: "History", href: "/history" },
    { name: "The Rabbi", href: "/the-rabbi" },
    { name: "Contact", href: "/contact" },
  ],
  synagogues: [
    { name: "Maghain Aboth", href: "/synagogues/maghain-aboth" },
    { name: "Chesed El", href: "/synagogues/chesed-el" },
    { name: "Service Times", href: "/services" },
    { name: "Travel Info", href: "/travel-info" },
  ],
  programs: [
    { name: "Events", href: "/events" },
    { name: "Education", href: "/education" },
    { name: "Ganenu Preschool", href: "/ganenu-preschool" },
    { name: "Youth Programs", href: "/youth-programs" },
  ],
  visit: [
    { name: "Museum", href: "/museum" },
    { name: "Shop", href: "/shop" },
    { name: "Donate", href: "/donate" },
    { name: "Member Portal", href: "/member" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold text-cream">
                JWB Singapore
              </span>
            </Link>
            <p className="mt-4 font-body text-sm text-cream/80">
              Serving the Jewish community in Singapore since 1878.
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
                href="tel:+6563362189"
                className="flex items-center gap-2 text-sm text-cream/80 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4" />
                +65 6336 2189
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
              Community
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              Synagogues
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.synagogues.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              Programs
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-gold">
              Visit & Support
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.visit.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 transition-colors hover:text-gold"
                  >
                    {link.name}
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
              &copy; {new Date().getFullYear()} Jewish Welfare Board Singapore.
              All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-body text-sm text-cream/60 transition-colors hover:text-gold"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
