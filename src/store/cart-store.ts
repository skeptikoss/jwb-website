"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product, CartItem } from "@/lib/sanity/types";

/**
 * Shipping constants for the JWB Singapore shop
 */
export const SHIPPING_RATE = 8; // SGD flat rate
export const FREE_SHIPPING_THRESHOLD = 80; // SGD

/**
 * Cart store interface
 */
interface CartStore {
  // State
  items: CartItem[];

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed values (as functions for reactive updates)
  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getItemQuantity: (productId: string) => number;
}

/**
 * Zustand cart store with localStorage persistence
 *
 * Shipping policy:
 * - Flat rate: $8 SGD for orders under $80
 * - Free shipping: Orders $80+ SGD
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Add a product to the cart
       * If product already exists, increment quantity
       */
      addItem: (product: Product, quantity: number = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.product._id === product._id
        );

        if (existingIndex > -1) {
          // Product exists, update quantity
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity,
          };
          set({ items: newItems });
        } else {
          // New product, add to cart
          set({ items: [...items, { product, quantity }] });
        }
      },

      /**
       * Remove a product from the cart entirely
       */
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product._id !== productId),
        });
      },

      /**
       * Update quantity for a specific product
       * If quantity is 0 or less, removes the item
       */
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product._id === productId ? { ...item, quantity } : item
          ),
        });
      },

      /**
       * Clear all items from the cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Calculate subtotal (sum of all item prices * quantities)
       */
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      /**
       * Calculate shipping cost
       * Free shipping for orders $80+ SGD, otherwise $8 flat rate
       */
      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
      },

      /**
       * Calculate total (subtotal + shipping)
       */
      getTotal: () => {
        return get().getSubtotal() + get().getShipping();
      },

      /**
       * Get total number of items in cart
       */
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      /**
       * Get quantity for a specific product (0 if not in cart)
       */
      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item?.quantity ?? 0;
      },
    }),
    {
      name: "jwb-cart", // localStorage key
      // Only persist the items array, not the functions
      partialize: (state) => ({ items: state.items }),
    }
  )
);
