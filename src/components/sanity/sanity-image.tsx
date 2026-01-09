/**
 * Next.js Image wrapper for Sanity images
 *
 * Provides a convenient wrapper around next/image that handles:
 * - Sanity image URL generation with proper sizing
 * - Hotspot/crop data from Sanity
 * - Locale-aware alt text
 * - Placeholder blur generation
 */

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType, Locale } from "@/lib/sanity/types";

interface SanityImageProps {
  /** Sanity image object */
  image: SanityImageType | undefined;
  /** Alt text (falls back to image.alt[locale] if provided) */
  alt?: string;
  /** Current locale for localized alt text */
  locale?: Locale;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Fill mode (ignores width/height) */
  fill?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** Additional className */
  className?: string;
  /** Priority loading (above the fold) */
  priority?: boolean;
  /** Object fit style */
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  /** Sizes attribute for responsive images */
  sizes?: string;
}

/**
 * Renders a Sanity image with Next.js Image optimization
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SanityImage image={page.mainImage} width={800} height={450} />
 *
 * // With locale-aware alt text
 * <SanityImage image={synagogue.mainImage} locale="he" width={600} height={400} />
 *
 * // Fill mode for responsive containers
 * <SanityImage image={hero.image} fill className="object-cover" />
 * ```
 */
export function SanityImage({
  image,
  alt,
  locale = "en",
  width = 800,
  height = 450,
  fill = false,
  quality = 85,
  className = "",
  priority = false,
  objectFit,
  sizes,
}: SanityImageProps) {
  if (!image?.asset) {
    return null;
  }

  // Build the image URL with Sanity's image pipeline
  const imageUrl = urlFor(image)
    .width(fill ? 1200 : width)
    .height(fill ? Math.round(1200 * (height / width)) : height)
    .quality(quality)
    .auto("format")
    .url();

  // Generate a low-quality placeholder for blur
  const blurUrl = urlFor(image).width(20).quality(30).blur(10).url();

  // Get alt text: prefer explicit alt, then localized image.alt, then empty
  const altText = alt ?? image.alt?.[locale] ?? image.alt?.en ?? "";

  // Build style object for object-fit
  const style = objectFit ? { objectFit } : undefined;

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className={className}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurUrl}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={style}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={altText}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder="blur"
      blurDataURL={blurUrl}
      sizes={sizes}
      style={style}
    />
  );
}

/**
 * Get image dimensions from aspect ratio
 * Useful for calculating height from width based on common aspect ratios
 */
export function getImageDimensions(
  width: number,
  aspectRatio: "16:9" | "4:3" | "1:1" | "3:2" | "2:3" | "9:16"
): { width: number; height: number } {
  const ratios: Record<string, number> = {
    "16:9": 16 / 9,
    "4:3": 4 / 3,
    "1:1": 1,
    "3:2": 3 / 2,
    "2:3": 2 / 3,
    "9:16": 9 / 16,
  };
  const ratio = ratios[aspectRatio] || 16 / 9;
  return {
    width,
    height: Math.round(width / ratio),
  };
}
