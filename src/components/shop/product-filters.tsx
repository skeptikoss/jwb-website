"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getLocalizedValue, type ProductCategory, type Locale } from "@/lib/sanity/types";

interface ProductFiltersProps {
  categories: ProductCategory[];
  className?: string;
}

/**
 * Product category filter component
 * Desktop: horizontal pill buttons
 * Mobile: filter button opens drawer
 */
export function ProductFilters({ categories, className }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations("pages.shop");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categorySlug) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }

    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Desktop filters */}
      <div className="hidden flex-wrap gap-2 md:flex">
        <button
          onClick={() => handleCategoryChange(null)}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-2 font-ui text-sm transition-colors",
            !currentCategory
              ? "bg-navy text-cream"
              : "bg-cream text-charcoal hover:bg-navy/10"
          )}
        >
          {t("allProducts")}
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryChange(category.slug.current)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 font-ui text-sm transition-colors",
              currentCategory === category.slug.current
                ? "bg-navy text-cream"
                : "bg-cream text-charcoal hover:bg-navy/10"
            )}
          >
            {getLocalizedValue(category.name, locale) || "Category"}
          </button>
        ))}
      </div>

      {/* Mobile filter button and drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden"
            size="sm"
          >
            <Filter className="me-2 h-4 w-4" />
            {t("filters")}
            {currentCategory && (
              <span className="ms-2 rounded-full bg-navy px-2 py-0.5 text-xs text-cream">
                1
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-cream">
          <SheetHeader>
            <SheetTitle className="font-heading text-xl">
              {t("filterByCategory")}
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-2">
            <SheetClose asChild>
              <button
                onClick={() => handleCategoryChange(null)}
                className={cn(
                  "rounded-lg px-4 py-3 text-start font-ui text-sm transition-colors",
                  !currentCategory
                    ? "bg-navy text-cream"
                    : "bg-white text-charcoal hover:bg-navy/10"
                )}
              >
                {t("allProducts")}
              </button>
            </SheetClose>

            {categories.map((category) => (
              <SheetClose asChild key={category._id}>
                <button
                  onClick={() => handleCategoryChange(category.slug.current)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-start font-ui text-sm transition-colors",
                    currentCategory === category.slug.current
                      ? "bg-navy text-cream"
                      : "bg-white text-charcoal hover:bg-navy/10"
                  )}
                >
                  {getLocalizedValue(category.name, locale) || "Category"}
                </button>
              </SheetClose>
            ))}
          </div>

          {/* Clear filters */}
          {currentCategory && (
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleCategoryChange(null)}
              >
                <X className="me-2 h-4 w-4" />
                {t("clearFilters")}
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
