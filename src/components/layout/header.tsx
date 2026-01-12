"use client";

import { useState } from "react";
import Image from "next/image";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

// Navigation configuration with dropdowns and direct links
const aboutDropdown = {
  key: "about",
  items: [
    { key: "history", href: "/history" },
    { key: "leadership", href: "/leadership" },
    { key: "contact", href: "/contact" },
  ],
} as const;

const visitDropdown = {
  key: "visit",
  items: [
    { key: "restaurant", href: "/restaurant" },
    { key: "museum", href: "/museum" },
    { key: "travel", href: "/travel" },
  ],
} as const;

const directLinks = [
  { key: "synagogues", href: "/synagogues" },
  { key: "events", href: "/events" },
  { key: "education", href: "/education" },
] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getItemCount());

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
          <Image
            src="/images/jwb-logo.png"
            alt="JWB Singapore"
            width={40}
            height={45}
            className="h-10 w-auto"
            priority
          />
          <span className="hidden font-heading text-xl font-bold text-navy sm:inline">
            {tCommon("siteName")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            {/* About Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "font-ui text-sm font-medium",
                  "bg-transparent text-charcoal",
                  "hover:bg-transparent hover:text-navy",
                  "focus:bg-transparent focus:text-navy",
                  "data-[state=open]:bg-transparent data-[state=open]:text-navy"
                )}
              >
                {t(aboutDropdown.key)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-cream">
                <ul className="w-48 p-2">
                  {aboutDropdown.items.map((item) => (
                    <li key={item.key}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-md px-3 py-2",
                            "font-ui text-sm text-charcoal",
                            "transition-colors hover:bg-navy/5 hover:text-navy"
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Direct Links: Synagogues, Events, Education */}
            {directLinks.map((item) => (
              <NavigationMenuItem key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex h-9 items-center justify-center rounded-md px-4 py-2",
                    "font-ui text-sm font-medium text-charcoal",
                    "transition-colors hover:text-navy"
                  )}
                >
                  {t(item.key)}
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Visit Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "font-ui text-sm font-medium",
                  "bg-transparent text-charcoal",
                  "hover:bg-transparent hover:text-navy",
                  "focus:bg-transparent focus:text-navy",
                  "data-[state=open]:bg-transparent data-[state=open]:text-navy"
                )}
              >
                {t(visitDropdown.key)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-cream">
                <ul className="w-48 p-2">
                  {visitDropdown.items.map((item) => (
                    <li key={item.key}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "block rounded-md px-3 py-2",
                            "font-ui text-sm text-charcoal",
                            "transition-colors hover:bg-navy/5 hover:text-navy"
                          )}
                        >
                          {t(item.key)}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Shop Direct Link */}
            <NavigationMenuItem>
              <Link
                href="/shop"
                className={cn(
                  "inline-flex h-9 items-center justify-center rounded-md px-4 py-2",
                  "font-ui text-sm font-medium text-charcoal",
                  "transition-colors hover:text-navy"
                )}
              >
                {t("shop")}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
          <CartDrawer>
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
                {cartItemCount}
              </Badge>
            </Button>
          </CartDrawer>

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
              <nav className="mt-8 flex flex-col gap-6">
                {/* About Section */}
                <div>
                  <MobileSectionHeader>{t("about")}</MobileSectionHeader>
                  <div className="mt-2 flex flex-col gap-2 ps-3">
                    {aboutDropdown.items.map((item) => (
                      <SheetClose asChild key={item.key}>
                        <Link
                          href={item.href}
                          className="font-ui text-base text-charcoal transition-colors hover:text-navy"
                        >
                          {t(item.key)}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Direct Links: Synagogues, Events, Education */}
                {directLinks.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      className="font-ui text-lg font-medium text-charcoal transition-colors hover:text-navy"
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}

                {/* Visit Section */}
                <div>
                  <MobileSectionHeader>{t("visit")}</MobileSectionHeader>
                  <div className="mt-2 flex flex-col gap-2 ps-3">
                    {visitDropdown.items.map((item) => (
                      <SheetClose asChild key={item.key}>
                        <Link
                          href={item.href}
                          className="font-ui text-base text-charcoal transition-colors hover:text-navy"
                        >
                          {t(item.key)}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Shop */}
                <SheetClose asChild>
                  <Link
                    href="/shop"
                    className="font-ui text-lg font-medium text-charcoal transition-colors hover:text-navy"
                  >
                    {t("shop")}
                  </Link>
                </SheetClose>

                <hr className="my-2 border-border" />

                {/* Donate */}
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

// Helper component for mobile menu section headers
function MobileSectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-ui text-xs font-semibold uppercase tracking-wider text-gold">
      {children}
    </h3>
  );
}
