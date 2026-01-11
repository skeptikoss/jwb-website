"use client";

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";

import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { CartItem, CartSummary, CheckoutButton } from "@/components/shop";
import { useCartStore } from "@/store/cart-store";

/**
 * Full cart page
 *
 * Features:
 * - List of all cart items with quantity controls
 * - Cart summary with shipping calculation
 * - Checkout button
 * - Continue shopping link
 */
export default function CartPage() {
  const t = useTranslations("pages.shop.cart");
  const { items, clearCart } = useCartStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal lg:text-4xl">
            {t("title")}
          </h1>

          {items.length === 0 ? (
            // Empty cart state
            <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-border bg-white p-12 text-center shadow-sm">
              <ShoppingBag className="h-16 w-16 text-warm-gray" />
              <h2 className="mt-4 font-heading text-xl font-semibold text-charcoal">
                {t("emptyTitle")}
              </h2>
              <p className="mt-2 max-w-sm font-body text-warm-gray">
                {t("emptyDescription")}
              </p>
              <Button asChild className="mt-6 bg-navy text-cream hover:bg-navy/90">
                <Link href="/shop">{t("startShopping")}</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
                  {items.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}

                  {/* Actions */}
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
                    <Button asChild variant="outline">
                      <Link href="/shop">{t("continueShopping")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-warm-gray hover:text-terracotta"
                      onClick={clearCart}
                    >
                      {t("clearCart")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
                <div className="mt-4">
                  <CheckoutButton className="w-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
