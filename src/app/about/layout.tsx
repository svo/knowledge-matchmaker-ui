import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sean Van Osselaer | Fractional CTO | qual.is",
  description:
    "Fractional CTO specializing in AI-driven development, scalable architecture, and building high-performing engineering teams.",
  openGraph: {
    title: "About Sean Van Osselaer | Fractional CTO | qual.is",
    description:
      "Fractional CTO specializing in AI-driven development, scalable architecture, and building high-performing engineering teams.",
    url: "https://www.knowledge-matchmaker.qual.is/about",
    type: "website",
  },
  alternates: {
    canonical: "https://www.knowledge-matchmaker.qual.is/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
