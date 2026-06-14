import type { Metadata } from "next";
import AiToolClient from "./AiToolClient";

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Blox Fruits AI Tool — Free AI Fruit Finder, Build Helper & Trade Advisor",
  description:
    "Free Blox Fruits AI tool — ask any question and get instant answers on the best fruits, PVP builds, grinding routes, boss strategies, and trade values. Updated for 2026 meta.",
  alternates: { canonical: "https://www.bloxfruitsai.com/ai-tool" },
  keywords: [
    "blox fruits ai tool",
    "blox fruits ai",
    "blox fruits fruit finder",
    "blox fruits ai helper",
    "blox fruits build helper",
    "blox fruits ai advisor",
    "blox fruits best fruit ai",
    "roblox blox fruits ai",
    "blox fruits trade advisor",
    "blox fruits assistant",
  ],
  openGraph: {
    title: "Blox Fruits AI Tool — Free Fruit Finder, Build Helper & Trade Advisor",
    description:
      "Instant AI answers for Blox Fruits — best fruits for PVP and grinding, build recommendations, boss strategies, and trade value advice. Free, no account needed.",
    url: "https://www.bloxfruitsai.com/ai-tool",
    type: "website",
  },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Blox Fruits AI Tool",
      url: "https://www.bloxfruitsai.com/ai-tool",
      description:
        "Free AI-powered tool for Blox Fruits players. Ask any question and get instant answers on fruits, builds, boss strategies, grinding routes, and trade values.",
      applicationCategory: "GameApplication",
      operatingSystem: "Web Browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Instant PVP fruit recommendations",
        "Grinding route optimisation",
        "Boss strategy advice",
        "Trade value guidance",
        "Build recommendations for every playstyle",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Blox Fruits AI tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Blox Fruits AI tool is a free interactive assistant that answers any question about Blox Fruits — from the best fruits for PVP and grinding to trade values, boss strategies, and build recommendations. It is updated for the 2026 meta and available at bloxfruitsai.com/ai-tool with no account required.",
          },
        },
        {
          "@type": "Question",
          name: "Which fruit does the Blox Fruits AI recommend for PVP in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For PVP in 2026, the AI recommends Kitsune, Dragon, and Tiger as the top S-tier fruits. Kitsune leads with the highest BFV trade value and dominant Nine-Tailed Fox transformation. Dragon offers the best all-round versatility across PVP, grinding, and raids. Tiger (formerly Leopard) received a major rework in Update 31 making it the strongest pure PVP fruit for skilled players.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best fruit for grinding in Blox Fruits?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Buddha is the best grinding fruit in Blox Fruits for most players. Its transformation dramatically increases your hitbox, letting you hit multiple NPCs at once with no precision required. For Mythical tier, Dragon is the best grinding fruit thanks to its Heatwave Beam AoE. Light is the best budget option for new players who cannot yet afford Buddha.",
          },
        },
        {
          "@type": "Question",
          name: "Can the Blox Fruits AI tool help with trade values?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — the AI tool gives instant trade value advice based on the current BFV community values. For precise numerical comparisons before any trade, use the dedicated BFV calculator at bloxfruitsai.com/calculator which shows exact values for every fruit in the game.",
          },
        },
        {
          "@type": "Question",
          name: "Is the Blox Fruits AI tool free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the Blox Fruits AI tool at bloxfruitsai.com/ai-tool is completely free with no account, login, or subscription required. Just open the page and start asking questions.",
          },
        },
        {
          "@type": "Question",
          name: "What can I ask the Blox Fruits AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can ask the Blox Fruits AI anything about the game — which fruit is best for PVP, the fastest XP grinding routes, how to beat specific bosses, which trades are fair or unfair, what build to use with a specific fruit, race recommendations, and meta tier list questions. The AI is trained on the current 2026 Blox Fruits meta.",
          },
        },
      ],
    },
  ],
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AiToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiToolClient />
    </>
  );
}
