import type { Metadata } from "next";
import { getOpenTradeAds } from "./actions";
import { getCurrentUser } from "../auth/actions";
import TradingClient from "./TradingClient";

export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Blox Fruit Trade Ads — Post & Browse Blox Fruits Trades 2026",
  description:
    "Free Blox Fruit trading board — post your trade ad or browse live offers from real traders. No login needed. Find fair Blox Fruits trades for Dragon, Kitsune, Leopard and every devil fruit.",
  alternates: { canonical: "https://www.bloxfruitsai.com/trading" },
  openGraph: {
    title: "Blox Fruit Trade Ads — Post & Browse Blox Fruits Trades 2026",
    description:
      "Free Blox Fruit trading board. Post your trade ad or browse live offers from other traders. No login needed — updated live.",
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I post a Blox Fruit trade ad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the form at the top of this page. Search and add the fruits you're offering, type what you want in return, add your Discord tag so traders can reach you, and post. No account or login is required — your ad goes live instantly and stays active for 7 days.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Blox Fruit trading board free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — posting and browsing Blox Fruit trade ads on BloxFruitsAI is completely free. There are no fees, no premium tiers, and no login requirement to post a trade.",
      },
    },
    {
      "@type": "Question",
      name: "How long do Blox Fruit trade ads stay active?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every trade ad stays live for 7 days from the moment it's posted. After that it's automatically removed from the board. You can post a new ad anytime if your trade is still available.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if a Blox Fruit trade is fair before accepting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Check the trade value and demand score for each fruit using the Blox Fruit calculator and value list before agreeing to a trade. A fair trade usually means both sides are within a similar value range, though demand also affects how easy a fruit is to trade again later.",
      },
    },
    {
      "@type": "Question",
      name: "How do I avoid scams when trading Blox Fruits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only trade in-game through the official trade menu, never give items away first, double-check exactly what's being offered before confirming, and be cautious of deals that seem too good to be true. Using a trusted middleman for high-value trades is common practice in the community.",
      },
    },
    {
      "@type": "Question",
      name: "Can I trade gamepasses and limiteds on this board?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the trade ad form supports any item in our Blox Fruit value list, including fruits, gamepasses, and limited items. Just search for the item name when building your offer.",
      },
    },
  ],
};

export default async function TradingPage() {
  const [ads, user] = await Promise.all([getOpenTradeAds(), getCurrentUser()]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <TradingClient initialAds={ads} currentUser={user} />
    </>
  );
}
