"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, type Locale } from "@/i18n/config";
import { Menu, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Navigation items with translation keys
const navigationKeys = [
  { key: "about", href: "/about" },
  { key: "leadership", href: "/leadership" },
  { key: "synagogues", href: "/synagogues" },
  { key: "events", href: "/events" },
  { key: "shop", href: "/shop" },
  { key: "museum", href: "/museum" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  // Switch to the other locale
  const toggleLocale = () => {
    const newLocale = locale === "en" ? "he" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  // Get the display name for the alternate locale
  const alternateLocale = locale === "en" ? "he" : "en";
  const alternateLocaleName = localeNames[alternateLocale];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-navy">
            {tCommon("siteName")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigationKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="font-ui text-sm font-medium text-charcoal transition-colors hover:text-navy"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            className="text-charcoal hover:text-navy"
            aria-label={`Switch to ${alternateLocaleName}`}
          >
            <Globe className="me-1.5 h-4 w-4" />
            <span className="font-ui text-sm">{alternateLocaleName}</span>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-charcoal hover:text-navy"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <Badge
              variant="default"
              className="absolute -end-1 -top-1 h-5 w-5 rounded-full bg-gold p-0 text-xs text-charcoal"
            >
              0
            </Badge>
          </Button>

          {/* Donate Button */}
          <Button
            asChild
            className="hidden bg-navy text-cream hover:bg-navy/90 sm:inline-flex"
          >
            <Link href="/donate">{t("donate")}</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-cream">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                {navigationKeys.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      className="font-ui text-lg font-medium text-charcoal transition-colors hover:text-navy"
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
                <hr className="my-4 border-border" />
                <SheetClose asChild>
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 font-ui text-sm font-medium text-cream transition-colors hover:bg-navy/90"
                  >
                    {t("donate")}
                  </Link>
                </SheetClose>
                {/* Language toggle in mobile menu */}
                <Button
                  variant="outline"
                  onClick={() => {
                    toggleLocale();
                    setIsOpen(false);
                  }}
                  className="mt-2 border-navy text-navy"
                >
                  <Globe className="me-2 h-4 w-4" />
                  {alternateLocaleName}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
