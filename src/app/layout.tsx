import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowledge Matchmaker | qual.is",
  description:
    "Map your thinking to the literature. Submit your draft and discover resonances, conflicts, blind spots, and open spaces in the existing body of work.",
  metadataBase: new URL("https://www.knowledge-matchmaker.qual.is"),
  openGraph: {
    title: "Knowledge Matchmaker | qual.is",
    description:
      "Map your thinking to the literature. Submit your draft and discover resonances, conflicts, blind spots, and open spaces in the existing body of work.",
    url: "https://www.knowledge-matchmaker.qual.is",
    siteName: "Knowledge Matchmaker",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.knowledge-matchmaker.qual.is",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-mode="system">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#005FCC" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#005FCC" />
      </head>
      <body
        className={`${inter.className} bg-accent-1 text-accent-3 dark:bg-accent-3 dark:text-accent-1`}
      >
        <div id="__next" className="min-h-screen">
          <header className="sticky top-0 z-50 bg-accent-1/95 dark:bg-accent-3/95 backdrop-blur-sm border-b border-primary/10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 flex justify-between items-center h-12">
              <span className="text-sm font-medium text-primary dark:text-primary-dark">
                qual.is
              </span>
              <ThemeSwitcher />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
