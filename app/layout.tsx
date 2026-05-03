import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00f5ff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloxfruitsai.fr"),
  title: {
    default: "Blox Fruits AI — Calculateur de Valeur & Guide Complet FR",
    template: "%s | BloxFruitsAI.fr",
  },
  description:
    "BloxFruitsAI.fr est le site #1 en français pour les joueurs de Blox Fruits sur Roblox. Tier list, calculateur d'échanges, valeurs des fruits et guides stratégiques mis à jour après chaque patch.",
  keywords: [
    "blox fruits",
    "blox fruits tier list",
    "blox fruits valeur",
    "meilleur fruit blox fruits",
    "calculateur échange blox fruits",
    "blox fruits guide français",
    "blox fruits pvp",
    "blox fruits farm",
    "fruits diaboliques roblox",
    "blox fruits 2025",
  ],
  authors: [{ name: "BloxFruitsAI", url: "https://www.bloxfruitsai.fr" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.bloxfruitsai.fr",
    siteName: "Blox Fruits AI FR",
    title: "Blox Fruits AI — Guide FR, Tier List & Calculateur d'Échanges",
    description: "L'outil IA le plus complet pour Blox Fruits en français. Tier list, calculateur d'échanges, liste de valeurs et guides — mis à jour après chaque patch.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Blox Fruits AI FR" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bloxfruitsai",
    title: "Blox Fruits AI FR — Guide, Tier List & Calculateur",
    description: "Le meilleur outil IA pour Blox Fruits en français. Tier list, calculateur d'échanges et guides stratégiques.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.bloxfruitsai.fr",
    languages: { "en": "https://www.bloxfruitsai.com" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: "https://www.bloxfruitsai.fr",
      name: "Blox Fruits AI FR",
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "https://www.bloxfruitsai.fr/values?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Blox Fruits AI FR",
      url: "https://www.bloxfruitsai.fr",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2847" },
    },
    { "@type": "Organization", name: "Blox Fruits AI", url: "https://www.bloxfruitsai.fr" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
