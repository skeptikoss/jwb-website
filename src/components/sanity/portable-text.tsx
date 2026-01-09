/**
 * Portable Text renderer for Sanity block content
 *
 * Renders rich text with proper styling following the JWB design system.
 * Handles headings, quotes, links, and inline images.
 */

import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { LocaleBlockContent, Locale } from "@/lib/sanity/types";

interface PortableTextProps {
  /** The localized block content object */
  content: LocaleBlockContent | undefined;
  /** Current locale */
  locale: Locale;
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * Custom components for Portable Text rendering
 * Styled according to the JWB design system
 */
const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-heading text-2xl font-bold text-navy first:mt-0 sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-heading text-xl font-semibold text-navy first:mt-0 sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 font-heading text-lg font-semibold text-charcoal first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 font-body leading-relaxed text-charcoal last:mb-0">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-s-4 border-gold ps-4 font-body italic text-warm-gray">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-2 transition-colors hover:text-gold"
          {...(isExternal && {
            target: "_blank",
            rel: "noopener noreferrer",
          })}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(800).quality(90).url()}
              alt={value.alt || ""}
              width={800}
              height={450}
              className="h-auto w-full"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center font-ui text-sm text-warm-gray">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ms-6 list-disc space-y-2 font-body text-charcoal">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ms-6 list-decimal space-y-2 font-body text-charcoal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

/**
 * Renders Sanity Portable Text content with locale awareness
 *
 * @example
 * ```tsx
 * <PortableTextRenderer
 *   content={page.content}
 *   locale={locale}
 *   className="prose"
 * />
 * ```
 */
export function PortableTextRenderer({
  content,
  locale,
  className = "",
}: PortableTextProps) {
  // Get content for the requested locale, falling back to English
  const localizedContent = content?.[locale] ?? content?.en;

  if (!localizedContent || localizedContent.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableTextReact
        value={localizedContent as PortableTextBlock[]}
        components={components}
      />
    </div>
  );
}
