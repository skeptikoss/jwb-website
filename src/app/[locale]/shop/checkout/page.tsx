"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

import { Header, Footer } from "@/components/layout";
import { Separator } from "@/components/ui/separator";

import { CheckoutForm, PriceDisplay } from "@/components/shop";
import { useCartStore, FREE_SHIPPING_THRESHOLD } from "@/store/cart-store";
import { getLocalizedValue, type Locale } from "@/lib/sanity/types";
import { urlFor } from "@/sanity/lib/image";

/**
 * Mock checkout page
 *
 * Features:
 * - Order summary sidebar
 * - Contact information form
 * - Shipping address form
 * - Mock payment section
 * - Complete order button
 */
export default function CheckoutPage() {
  const t = useTranslations("pages.shop.checkout");
  const tCart = useTranslations("pages.shop.cart");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const { items, getSubtotal, getShipping, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // Redirect to cart if empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-bold text-charcoal lg:text-4xl">
            {t("title")}
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Checkout Form */}
            <div className="order-2 lg:order-1">
              <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <CheckoutForm />
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              <div className="sticky top-24 rounded-lg border border-border bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-charcoal">
                  {t("orderSummary")}
                </h2>

                {/* Items */}
                <div className="mt-6 space-y-4">
                  {items.map((item) => {
                    const name =
                      getLocalizedValue(item.product.name, locale) || "Product";
                    const image = item.product.images?.[0];
                    const imageUrl = image
                      ? urlFor(image)?.width(80).height(80).url()
                      : null;

                    return (
                      <div
                        key={item.product._id}
                        className="flex items-center gap-4"
                      >
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-cream">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-warm-gray">
                              No Image
                            </div>
                          )}
                          <span className="absolute -end-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-xs text-cream">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-ui text-sm font-medium text-charcoal">
                            {name}
                          </p>
                        </div>
                        <PriceDisplay
                          price={item.product.price * item.quantity}
                          size="sm"
                        />
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-ui text-sm">
                    <span className="text-charcoal">{tCart("subtotal")}</span>
                    <span className="font-medium text-charcoal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-ui text-sm">
                    <span className="text-charcoal">{tCart("shipping")}</span>
                    {shipping === 0 ? (
                      <span className="font-medium text-sage">
                        {tCart("freeShipping")}
                      </span>
                    ) : (
                      <span className="font-medium text-charcoal">
                        ${shipping.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="font-ui text-xs text-warm-gray">
                      {t("freeShippingNote", {
                        amount: (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2),
                      })}
                    </p>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg font-semibold text-charcoal">
                      {tCart("total")}
                    </span>
                    <span className="font-heading text-xl font-bold text-navy">
                      ${total.toFixed(2)} SGD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
