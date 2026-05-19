import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "BFV Calculator — Blox Fruits Trade Calculator & Fair Trade Checker",
  description:
    "Free BFV calculator for Blox Fruits. Check if any trade is fair — compare fruit values, demand scores, and Robux prices side-by-side. Instant results, updated daily.",
  alternates: { canonical: "https://www.bloxfruitsai.com/calculator" },
  openGraph: {
    title: "BFV Calculator — Blox Fruits Trade Calculator & Fair Trade Checker",
    description: "Free BFV trade calculator for Blox Fruits. Compare fruit values, demand, and Robux prices side-by-side. Instantly see if a trade is fair, overpay, or underpay.",
    url: "https://www.bloxfruitsai.com/calculator",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Blox Fruits Trade Calculator",
  url: "https://www.bloxfruitsai.com/calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate and compare Blox Fruits trade values side-by-side. Shows if a trade is fair, overpay, or underpay.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
      { "@type": "ListItem", position: 2, name: "Trade Calculator", item: "https://www.bloxfruitsai.com/calculator" },
    ],
  },
};

export default function CalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorClient />
    </>
  );
}
