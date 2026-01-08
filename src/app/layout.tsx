import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Source_Sans_3,
  Heebo,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

// Heading font - Elegant serif with heritage feel
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Body font - Clean, highly readable, excellent language support
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

// Hebrew font - Modern Hebrew matching Source Sans feel
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// UI/Accent font - Modern geometric for buttons, navigation
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jewish Welfare Board Singapore",
    template: "%s | JWB Singapore",
  },
  description:
    "The Jewish Welfare Board of Singapore serves the local Jewish community and visitors with synagogue services, kosher food, events, and community programs.",
  keywords: [
    "Jewish Singapore",
    "Synagogue Singapore",
    "Kosher Singapore",
    "JWB Singapore",
    "Maghain Aboth",
    "Chesed El",
    "Jewish community",
  ],
  authors: [{ name: "Jewish Welfare Board Singapore" }],
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: "Jewish Welfare Board Singapore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`
          ${cormorant.variable}
          ${sourceSans.variable}
          ${heebo.variable}
          ${dmSans.variable}
          font-body antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
