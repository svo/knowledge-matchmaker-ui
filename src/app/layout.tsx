import Footer from "@/app/_components/footer";
import { Navigation } from "@/app/_components/navigation";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Engineering Leadership & Fractional CTO | SVO | qual.is`,
  description: `Fractional CTO and engineering leadership specialist. AI-driven development, scalable architecture for growing companies.`,
  metadataBase: new URL("https://www.knowledge-matchmaker.qual.is"),
  keywords: `Sean Van Osselaer, SVO, fractional CTO, engineering leadership, technical strategy, fractional CTO Australia`,
  authors: [
    {
      name: "Sean Van Osselaer",
      url: "https://www.knowledge-matchmaker.qual.is",
    },
  ],
  creator: "Sean Van Osselaer",
  publisher: "Sean Van Osselaer",
  openGraph: {
    title: "Engineering Leadership & Fractional CTO | SVO | qual.is",
    description:
      "Fractional CTO and engineering leadership specialist. AI-driven development, scalable architecture for growing companies.",
    url: "https://www.knowledge-matchmaker.qual.is",
    siteName: "qual.is",
    images: [HOME_OG_IMAGE_URL],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Leadership & Fractional CTO | SVO | qual.is",
    description:
      "Fractional CTO and engineering leadership specialist. AI-driven development, scalable architecture for growing companies.",
    images: [HOME_OG_IMAGE_URL],
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
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="dd0b2581-9ffc-4bcb-8423-6973b138c1e4"
          data-domains="qual.is,www.knowledge-matchmaker.qual.is"
        ></script>
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
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://www.knowledge-matchmaker.qual.is/#website",
                name: "Engineering Leadership & Fractional CTO | SVO | qual.is",
                url: "https://www.knowledge-matchmaker.qual.is",
                description:
                  "Fractional CTO and engineering leadership specialist. AI-driven development, scalable architecture for growing companies.",
                author: {
                  "@id": "https://www.knowledge-matchmaker.qual.is/about",
                },
              },
              {
                "@type": "Person",
                "@id": "https://www.knowledge-matchmaker.qual.is/about",
                name: "Sean Van Osselaer",
                givenName: "Sean",
                familyName: "Van Osselaer",
                alternateName: "SVO",
                url: "https://www.knowledge-matchmaker.qual.is",
                jobTitle: "Fractional CTO",
                description:
                  "Fractional CTO specializing in AI-driven development, scalable architecture, and building high-performing engineering teams.",
                sameAs: [
                  "https://github.com/svo",
                  "https://www.linkedin.com/in/5v0/",
                ],
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://www.knowledge-matchmaker.qual.is/#service",
                name: "Fractional CTO Services",
                provider: {
                  "@id": "https://www.knowledge-matchmaker.qual.is/about",
                },
                serviceType: "Fractional CTO Services",
                description:
                  "Engineering leadership, AI-driven development strategy, software architecture, team scaling, and technical strategy consulting.",
                areaServed: "Global",
                url: "https://www.knowledge-matchmaker.qual.is/about",
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.knowledge-matchmaker.qual.is/svo#faq",
                name: "Fractional CTO Services FAQ",
                url: "https://www.knowledge-matchmaker.qual.is/about",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is a Fractional CTO?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A Fractional CTO is a part-time Chief Technology Officer who provides strategic technical leadership to growing companies without the full-time commitment and cost. I work with multiple clients to deliver the same high-level technical strategy, team leadership, and architectural guidance that a full-time CTO would provide, but on a flexible engagement model that scales with your needs.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How does fractional CTO work vs full-time hiring?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Fractional CTO services offer immediate expertise without the 6-12 month hiring process. You get proven technical leadership from day one, with the flexibility to scale engagement up or down based on your company's growth stage and needs. This approach is ideal for companies that need senior technical guidance but aren't ready for a full-time executive hire.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What size companies benefit most from fractional CTO services?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Growing companies with 10-100 employees typically see the greatest value from fractional CTO services. This includes startups scaling beyond their founding team, established companies launching digital initiatives, and businesses experiencing technical bottlenecks that impact growth. If you have engineering challenges but can't justify a full-time CTO salary, fractional services bridge that gap perfectly.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do you measure success in a fractional CTO engagement?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Success is measured through concrete improvements: faster deployment cycles, reduced system downtime, improved team performance metrics, and alignment between technical strategy and business objectives. I establish clear OKRs at engagement start, including things like lead time for changes, deployment frequency, mean time to recovery, change failure rate, and team satisfaction scores. Regular reviews ensure we're delivering measurable value.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What's the typical engagement timeline and process?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Engagements typically start with an assessment to understand your technical landscape, team dynamics, and growth objectives. From there, we establish ongoing strategic guidance that might include weekly leadership meetings, monthly architecture reviews, quarterly strategic planning, and as-needed project oversight. Engagements are flexible and can evolve from intensive implementation phases to ongoing advisory relationships.",
                    },
                  },
                ],
              },
            ],
          })}
        </script>
      </head>
      <body
        className={cn(
          inter.className,
          "bg-accent-1 text-accent-3 dark:bg-accent-3 dark:text-accent-1"
        )}
      >
        <div id="__next" className="min-h-screen">
          <Navigation />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
