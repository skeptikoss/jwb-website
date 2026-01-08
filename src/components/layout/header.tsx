"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Synagogues", href: "/synagogues" },
  { name: "Events", href: "/events" },
  { name: "Shop", href: "/shop" },
  { name: "Museum", href: "/museum" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-navy">
            JWB Singapore
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-ui text-sm font-medium text-charcoal transition-colors hover:text-navy"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-charcoal hover:text-navy"
            aria-label="Toggle language"
          >
            <Globe className="h-5 w-5" />
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
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gold p-0 text-xs text-charcoal"
            >
              0
            </Badge>
          </Button>

          {/* Donate Button */}
          <Button
            asChild
            className="hidden bg-navy text-cream hover:bg-navy/90 sm:inline-flex"
          >
            <Link href="/donate">Donate</Link>
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
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="font-ui text-lg font-medium text-charcoal transition-colors hover:text-navy"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <hr className="my-4 border-border" />
                <SheetClose asChild>
                  <Link
                    href="/donate"
                    className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 font-ui text-sm font-medium text-cream transition-colors hover:bg-navy/90"
                  >
                    Donate
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
