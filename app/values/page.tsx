import type { Metadata } from "next";
import ValuesClient from "./ValuesClient";

export const metadata: Metadata = {
  title: "Blox Fruits Value List — All Fruit Prices & Demand",
  description:
    "Complete Blox Fruits value list. Real-time market prices, demand ratings, trend indicators and rarity tiers for every devil fruit, gamepass, and limited item.",
  alternates: { canonical: "https://www.bloxfruitsai.com/values" },
  openGraph: {
    title: "Blox Fruits Value List 2025 — All Fruit Prices & Demand",
    description: "Real-time market values, demand scores, and rarity tiers for all Blox Fruits items.",
    url: "https://www.bloxfruitsai.com/values",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Blox Fruits Value List 2025",
  url: "https://www.bloxfruitsai.com/values",
  description: "Complete real-time value list for all Blox Fruits devil fruits, gamepasses, and limited items.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
      { "@type": "ListItem", position: 2, name: "Value List", item: "https://www.bloxfruitsai.com/values" },
    ],
  },
};

export default function ValuesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ValuesClient />
    </>
  );
}
