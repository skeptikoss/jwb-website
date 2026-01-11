"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface CheckoutButtonProps {
  className?: string;
}

/**
 * Checkout button that links to the mock checkout page
 * Disabled when cart is empty
 */
export function CheckoutButton({ className }: CheckoutButtonProps) {
  const t = useTranslations("pages.shop.cart");
  const { items } = useCartStore();

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return (
      <Button disabled className={cn("bg-navy text-cream", className)}>
        {t("checkout")}
      </Button>
    );
  }

  return (
    <Button asChild className={cn("bg-navy text-cream hover:bg-navy/90", className)}>
      <Link href="/shop/checkout">
        {t("checkout")}
        <ArrowRight className="ms-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
