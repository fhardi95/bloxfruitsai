import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "BFV Calculator Blox Fruits 2026 — Free Trade Value Calculator",
  description:
    "Free BFV trade calculator for Blox Fruits 2026. Add fruits on both sides and instantly see if your trade is fair, Trade Value Calculator — updated June 2026.",
  alternates: { canonical: "https://www.bloxfruitsai.com/calculator" },
  openGraph: {
    title: "BFV Calculator Blox Fruits 2026 — Free Trade Value Calculator",
    description: "Free BFV trade calculator for Blox Fruits 2026. Add fruits on both sides and instantly see if your trade is fair, overpay or underpay. No login needed — updated June 2026.",
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
      {/* Affiliate: gaming gear strip above calculator */}
      <div style={{ background: "rgba(0,245,255,0.04)", borderBottom: "1px solid rgba(0,245,255,0.12)", padding: "0.75rem 5%", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", color: "#7a96b8", letterSpacing: "0.08em" }}>UPGRADE YOUR SETUP →</span>
        {[
          { label: "Gaming Keyboard", href: "https://www.amazon.co.uk/s?k=gaming+keyboard&tag=bloxfruitsai-21", icon: "⌨️" },
          { label: "Gaming Headset", href: "https://www.amazon.co.uk/s?k=gaming+headset&tag=bloxfruitsai-21", icon: "🎧" },
          { label: "Gaming Mouse", href: "https://www.amazon.co.uk/s?k=gaming+mouse&tag=bloxfruitsai-21", icon: "🖱️" },
          { label: "Roblox Gift Card", href: "https://www.amazon.co.uk/s?k=roblox+gift+card&tag=bloxfruitsai-21", icon: "🎮" },
        ].map(item => (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer sponsored"
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "#00f5ff", textDecoration: "none", border: "1px solid rgba(0,245,255,0.2)", padding: "5px 12px", borderRadius: 6 }}>
            <span>{item.icon}</span><span>{item.label}</span>
          </a>
        ))}
      </div>
      <CalculatorClient />
    </>
  );
}
