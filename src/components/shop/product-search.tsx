"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface ProductSearchProps {
  className?: string;
}

/**
 * Product search input with debounced URL state
 * Searches by product name (English and Hebrew) and SKU
 */
export function ProductSearch({ className }: ProductSearchProps) {
  const t = useTranslations("pages.shop");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [value, setValue] = useState(currentSearch);

  // Update local state when URL changes
  useEffect(() => {
    setValue(currentSearch);
  }, [currentSearch]);

  // Debounced URL update
  const debouncedSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
      <Input
        type="search"
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={handleChange}
        className="h-10 ps-10 pe-10 font-ui"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute end-1 top-1/2 h-8 w-8 -translate-y-1/2 text-warm-gray hover:text-charcoal"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
