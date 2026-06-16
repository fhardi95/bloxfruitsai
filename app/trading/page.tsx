import type { Metadata } from "next";
import { getOpenTradeAds } from "./actions";
import TradingClient from "./TradingClient";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Blox Fruit Trade Ads — Post & Browse Trades 2026",
  description:
    "Post your Blox Fruit trade ad or browse live offers from other traders. Free, no login needed. Find fair trades for Dragon, Kitsune, Leopard and every other devil fruit.",
  alternates: { canonical: "https://www.bloxfruitsai.com/trading" },
  openGraph: {
    title: "Blox Fruit Trade Ads — Post & Browse Trades 2026",
    description:
      "Post your Blox Fruit trade ad or browse live offers from other traders. Free, no login needed.",
    url: "https://www.bloxfruitsai.com/trading",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Blox Fruit Trade Ads",
  url: "https://www.bloxfruitsai.com/trading",
  description:
    "Live community trade board for Blox Fruits. Post offers, browse open trades, and connect with traders.",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
      { "@type": "ListItem", position: 2, name: "Trade Ads", item: "https://www.bloxfruitsai.com/trading" },
    ],
  },
};

export default async function TradingPage() {
  const ads = await getOpenTradeAds();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TradingClient initialAds={ads} />
    </>
  );
}
