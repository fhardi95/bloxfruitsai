import type { Metadata } from "next";
import Link from "next/link";

// ─── SEO METADATA ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "BFV Calculator & Values — Check Every Blox Fruits Trade 2026",
  description:
    "BFV calculator + full value list for every Blox Fruit in 2026. Check trade value, demand score (1–10), and Robux price for 45 fruits instantly. Is your trade fair? Find out free.",
  alternates: { canonical: "https://www.bloxfruitsai.com/bfv" },
  keywords: [
    "bfv",
    "bfv values",
    "bfv calculator",
    "bfv trade",
    "bfv value",
    "bfv trade calculator",
    "bfv calc",
    "blox fruits values",
    "blox fruits value list",
    "blox fruits trade calculator",
    "bfv blox fruits",
    "blox fruits bfv",
  ],
  openGraph: {
    title: "BFV Calculator & Values — Check Every Blox Fruits Trade 2026",
    description:
      "BFV calculator + full value list for every Blox Fruit in 2026. Check trade value, demand score (1–10), and Robux price for 45 fruits instantly. Free.",
    url: "https://www.bloxfruitsai.com/bfv",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "BFV Calculator & Values — Check Every Blox Fruits Trade 2026",
    description:
      "BFV calculator + full value list for every Blox Fruit. Check trade value, demand and Robux price instantly. Free.",
  },
};

// ─── JSON-LD STRUCTURED DATA ───────────────────────────────────────────────────
const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BFV — Blox Fruits Values & Trade Calculator 2026",
  description:
    "Complete guide to BFV (Blox Fruits Values): what it means, how the value system works, and how to use the free BFV trade calculator to check every trade in 2026.",
  url: "https://www.bloxfruitsai.com/bfv",
  datePublished: "2026-05-29",
  dateModified: "2026-05-29",
  author: { "@type": "Organization", name: "BloxFruitsAI", url: "https://www.bloxfruitsai.com" },
  publisher: { "@type": "Organization", name: "BloxFruitsAI", url: "https://www.bloxfruitsai.com" },
  mainEntityOfPage: "https://www.bloxfruitsai.com/bfv",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bloxfruitsai.com" },
    { "@type": "ListItem", position: 2, name: "BFV — Blox Fruits Values", item: "https://www.bloxfruitsai.com/bfv" },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does BFV mean in Blox Fruits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BFV stands for Blox Fruits Values. It is the community-maintained system that assigns a numerical trade value to every devil fruit in the game. Players use BFV values to determine whether a trade is fair, an overpay, or an underpay.",
      },
    },
    {
      "@type": "Question",
      name: "What is the highest BFV value fruit in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As of 2026, Kitsune holds the highest BFV value in Blox Fruits, followed by Dragon, Leopard, and Venom. These fruits have extremely high demand and are the hardest to obtain, pushing their BFV values to the top of the list.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use the BFV calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go to bloxfruitsai.com/calculator. Select the fruits on your side and the fruits on the other player's side. The BFV calculator instantly shows the total value on each side and tells you if the trade is fair, an overpay, or an underpay.",
      },
    },
    {
      "@type": "Question",
      name: "What is demand in BFV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Demand in BFV is a score from 1 to 10 that shows how many players are actively looking for a specific fruit right now. A fruit with demand 9-10 is very easy to trade away quickly. High demand is just as important as high value — a fruit worth a lot on paper is useless if nobody wants it.",
      },
    },
    {
      "@type": "Question",
      name: "What is a perm fruit and how does it affect BFV value?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A permanent (perm) fruit means you keep it after dying or resetting. Because of this, perm fruits have significantly higher BFV values than regular versions of the same fruit. For example, Perm Kitsune is worth far more than a regular Kitsune in the BFV value system.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find the full BFV value list?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The complete BFV value list for all Blox Fruits devil fruits is at bloxfruitsai.com/values. It shows every fruit's trade value, demand score, Robux price, and tier — updated daily.",
      },
    },
  ],
};

// ─── VALUE TIER TABLE DATA ─────────────────────────────────────────────────────
const tiers = [
  {
    tier: "S+",
    color: "#ff4757",
    fruits: [
      { name: "Kitsune", bfv: "~6,500", demand: 10, note: "Highest value in game" },
      { name: "Dragon", bfv: "~5,200", demand: 9, note: "God-tier PVP & grinding" },
    ],
  },
  {
    tier: "S",
    color: "#ffd700",
    fruits: [
      { name: "Leopard", bfv: "~4,800", demand: 9, note: "Top PVP fruit" },
      { name: "Venom", bfv: "~3,500", demand: 8, note: "Elite PVP combos" },
      { name: "Gas", bfv: "~3,200", demand: 8, note: "Fast & deadly" },
    ],
  },
  {
    tier: "A+",
    color: "#00f5ff",
    fruits: [
      { name: "Dough", bfv: "~2,800", demand: 8, note: "Meta grinding fruit" },
      { name: "Shadow", bfv: "~2,400", demand: 7, note: "Strong PVP utility" },
      { name: "Rumble", bfv: "~2,100", demand: 7, note: "Excellent AOE" },
    ],
  },
  {
    tier: "A",
    color: "#2ed573",
    fruits: [
      { name: "Buddha", bfv: "~1,800", demand: 9, note: "Best grinding fruit — high demand" },
      { name: "Phoenix", bfv: "~1,600", demand: 7, note: "Healing support" },
      { name: "Blizzard", bfv: "~1,400", demand: 6, note: "Strong elemental" },
    ],
  },
];

// ─── PAGE COMPONENT ────────────────────────────────────────────────────────────
export default function BFVPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div style={{ background: "var(--bg-deep)", minHeight: "100vh", paddingTop: 90 }}>

        {/* ── HERO ── */}
        <section style={{ textAlign: "center", padding: "60px 5% 40px", borderBottom: "1px solid var(--border)" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
            <ol style={{ display: "flex", justifyContent: "center", gap: 8, listStyle: "none", fontSize: 13, color: "var(--text-muted)" }}>
              <li><Link href="/" style={{ color: "var(--cyan)", textDecoration: "none" }}>Home</Link></li>
              <li style={{ color: "var(--text-muted)" }}>›</li>
              <li aria-current="page" style={{ color: "var(--text)" }}>BFV — Blox Fruits Values</li>
            </ol>
          </nav>

          <div style={{ display: "inline-block", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "var(--cyan)", letterSpacing: "0.08em", marginBottom: 16 }}>
            UPDATED DAILY · 2026 PATCH
          </div>

          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
            BFV — <span style={{ color: "var(--cyan)" }}>Blox Fruits Values</span><br />
            & Trade Calculator 2026
          </h1>

          <p style={{ maxWidth: 640, margin: "0 auto 32px", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
            BFV (Blox Fruits Values) is the community standard for trading devil fruits in Blox Fruits. Every fruit has a BFV value, demand score, and Robux price. Use the free calculator below to check any trade instantly.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="https://www.bloxfruitsai.com/calculator"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--cyan)", color: "#020810",
                fontFamily: "'Orbitron',monospace", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.06em",
                padding: "14px 28px", borderRadius: 10, textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              🧮 BFV CALCULATOR
            </Link>
            <Link
              href="https://www.bloxfruitsai.com/values"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent",
                border: "1px solid var(--cyan)", color: "var(--cyan)",
                fontFamily: "'Orbitron',monospace", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.06em",
                padding: "14px 28px", borderRadius: 10, textDecoration: "none",
              }}
            >
              📊 FULL VALUE LIST
            </Link>
          </div>
        </section>

        {/* ── WHAT IS BFV ── */}
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "60px 5%" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 20 }}>
            What Is BFV in Blox Fruits?
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16, fontSize: "1.05rem" }}>
            <strong style={{ color: "var(--text)" }}>BFV stands for Blox Fruits Values</strong> — the community-maintained system that assigns every devil fruit in Blox Fruits a numerical trade value. When a player says a fruit is &quot;worth 2,000 BFV&quot; or asks for &quot;BFV value&quot;, they are referring to this standardised value chart.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 16, fontSize: "1.05rem" }}>
            BFV values are not set by the game developers — they are determined by the trading community based on supply, demand, meta performance, and rarity. A fruit that gets buffed in a patch will often see its BFV value rise within hours as demand increases.
          </p>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1.05rem" }}>
            BloxFruitsAI tracks BFV values across the community daily, so you always have the most accurate and up-to-date information before you enter any trade.
          </p>
        </section>

        {/* ── QUICK STATS ── */}
        <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "40px 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
            {[
              { label: "Fruits Tracked", value: "80+", sub: "all devil fruits" },
              { label: "Updated", value: "Daily", sub: "after every patch" },
              { label: "Top BFV Value", value: "~6,500", sub: "Kitsune fruit" },
              { label: "Most Wanted", value: "Buddha", sub: "demand score: 9/10" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: "20px 16px", background: "var(--bg-card2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 900, color: "var(--cyan)", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BFV VALUE TIER TABLE ── */}
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "60px 5%" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 8 }}>
            BFV Value Tier List 2026
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: "0.95rem" }}>
            Top fruits by BFV trade value. For the full list of all 80+ fruits see the{" "}
            <Link href="https://www.bloxfruitsai.com/values" style={{ color: "var(--cyan)", textDecoration: "none" }}>complete BFV value list</Link>.
          </p>

          {tiers.map((t) => (
            <div key={t.tier} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "1.1rem", color: t.color, background: `${t.color}18`, border: `1px solid ${t.color}40`, borderRadius: 8, padding: "4px 14px" }}>
                  {t.tier}
                </div>
                <div style={{ flex: 1, height: 1, background: `${t.color}25` }} />
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {t.fruits.map((f) => (
                  <div key={f.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px" }}>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "1rem" }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{f.note}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>BFV</div>
                      <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, color: t.color, fontSize: "0.95rem" }}>{f.bfv}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Demand</div>
                      <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, color: f.demand >= 9 ? "#ff4757" : f.demand >= 7 ? "#ffd700" : "var(--green)", fontSize: "0.95rem" }}>{f.demand}/10</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link
              href="https://www.bloxfruitsai.com/values"
              style={{ color: "var(--cyan)", fontSize: 14, textDecoration: "none", borderBottom: "1px solid rgba(0,245,255,0.3)", paddingBottom: 2 }}
            >
              View all 80+ fruits on the full BFV value list →
            </Link>
          </div>
        </section>

        {/* ── HOW BFV WORKS ── */}
        <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 32 }}>
              How the BFV Value System Works
            </h2>
            <div style={{ display: "grid", gap: 24 }}>
              {[
                {
                  icon: "📈",
                  title: "Trade Value",
                  body: "Every fruit's BFV value is a number that reflects how much other valuable fruit you could reasonably expect in exchange. Higher BFV = more valuable in trades. Values shift with patches, meta changes, and community demand.",
                },
                {
                  icon: "🔥",
                  title: "Demand Score (1–10)",
                  body: "Demand measures how actively the community is seeking a fruit right now. A fruit with demand 9–10 is easy to trade quickly. A fruit with demand 3–4 may have a decent BFV value but be very hard to move — making both numbers equally important.",
                },
                {
                  icon: "💎",
                  title: "Permanent Fruits (Perm BFV)",
                  body: "Permanent fruits keep their power even after you die or reset. Because of this guarantee, perm versions of any fruit carry a much higher BFV value than the regular version. Always check whether a trade involves a regular or perm fruit before agreeing.",
                },
                {
                  icon: "⚡",
                  title: "BFV Changes After Patches",
                  body: "When Blox Fruits releases an update that buffs or nerfs a fruit, its BFV value changes within hours. A major buff can double a fruit's value overnight. BloxFruitsAI updates BFV values daily so you are never trading on outdated data.",
                },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 20, padding: "20px 24px", background: "var(--bg-card2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BFV CALCULATOR CTA ── */}
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "60px 5%" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 16 }}>
            Use the Free BFV Calculator
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 24, fontSize: "1.05rem" }}>
            Knowing BFV values is step one — but checking an actual trade in seconds is where the real edge is. The <strong style={{ color: "var(--text)" }}>BloxFruitsAI BFV Calculator</strong> lets you add fruits to both sides of any trade and instantly see:
          </p>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 32, display: "grid", gap: 10 }}>
            {[
              "✅  Total BFV value on each side of the trade",
              "✅  Whether the trade is fair, an overpay, or an underpay",
              "✅  Demand scores for every fruit involved",
              "✅  Robux equivalent prices for permanent fruits",
              "✅  Instant result — no login required, completely free",
            ].map((item) => (
              <li key={item} style={{ color: "var(--text-muted)", fontSize: "0.95rem", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ flexShrink: 0 }}>{item.slice(0, 2)}</span>
                <span>{item.slice(3)}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link
              href="https://www.bloxfruitsai.com/calculator"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--cyan)", color: "#020810",
                fontFamily: "'Orbitron',monospace", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.06em",
                padding: "14px 32px", borderRadius: 10, textDecoration: "none",
              }}
            >
              🧮 OPEN BFV CALCULATOR
            </Link>
            <Link
              href="https://www.bloxfruitsai.com/values"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "transparent", border: "1px solid var(--cyan)", color: "var(--cyan)",
                fontFamily: "'Orbitron',monospace", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.06em",
                padding: "14px 32px", borderRadius: 10, textDecoration: "none",
              }}
            >
              📊 VIEW BFV VALUE LIST
            </Link>
          </div>
        </section>

        {/* ── HOW TO TRADE ── */}
        <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 32 }}>
              How to Check a BFV Trade — Step by Step
            </h2>
            <ol style={{ listStyle: "none", padding: 0, display: "grid", gap: 16 }}>
              {[
                { step: "01", title: "Check both fruits on the BFV value list", desc: "Before entering any trade, look up both fruits at bloxfruitsai.com/values. Note the BFV value and demand score for each." },
                { step: "02", title: "Open the BFV Calculator", desc: "Go to bloxfruitsai.com/calculator. Add the fruits you are offering on your side and the fruits the other player is offering on their side." },
                { step: "03", title: "Read the result", desc: "The calculator shows total BFV on each side and marks the trade as Fair, Overpay (you are paying too much), or Underpay (you are getting a good deal)." },
                { step: "04", title: "Factor in demand", desc: "A fruit worth 2,000 BFV with demand 4 is harder to re-trade than a fruit worth 1,800 BFV with demand 9. Always check demand before finalising." },
                { step: "05", title: "Confirm and trade", desc: "Once both sides are within 10–15% BFV of each other and demand is acceptable, the trade is considered fair in the community." },
              ].map((item) => (
                <li key={item.step} style={{ display: "flex", gap: 20, padding: "20px 24px", background: "var(--bg-card2)", borderRadius: 12, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "1.3rem", color: "rgba(0,245,255,0.3)", flexShrink: 0, minWidth: 36 }}>{item.step}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 6 }}>{item.title}</h3>
                    <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ maxWidth: 820, margin: "0 auto", padding: "60px 5%" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)", marginBottom: 32 }}>
            BFV — Frequently Asked Questions
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              {
                q: "What does BFV mean in Blox Fruits?",
                a: "BFV stands for Blox Fruits Values. It is the community-maintained trading value system that assigns a number to every devil fruit, used to determine if trades are fair.",
              },
              {
                q: "What is the highest BFV value fruit in 2026?",
                a: "Kitsune currently holds the highest BFV value at around 6,500, followed by Dragon (~5,200), Leopard (~4,800), and Venom (~3,500). These values update with every patch.",
              },
              {
                q: "How do I use the BFV calculator?",
                a: "Go to bloxfruitsai.com/calculator, add fruits to both sides of the trade, and the tool instantly shows you total BFV on each side and whether the deal is fair.",
              },
              {
                q: "Do BFV values change?",
                a: "Yes. BFV values change after every patch, when a fruit gets buffed or nerfed, when a new fruit is added, or when community demand shifts. BloxFruitsAI updates values daily.",
              },
              {
                q: "What is perm BFV value?",
                a: "A permanent (perm) fruit retains its power after death or reset. Perm versions have much higher BFV values than regular versions because of this permanence.",
              },
              {
                q: "Is the BFV calculator free?",
                a: "Yes. The BloxFruitsAI BFV calculator is completely free — no account, no download, no payment. Just open it and start checking trades.",
              },
            ].map((item) => (
              <details key={item.q} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                <summary style={{ padding: "16px 20px", cursor: "pointer", fontWeight: 600, color: "var(--text)", fontSize: "0.95rem", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ color: "var(--cyan)", fontSize: 18, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: "0 20px 16px", color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.9rem", borderTop: "1px solid var(--border)" }}>
                  <p style={{ paddingTop: 12 }}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── RELATED LINKS ── */}
        <section style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "40px 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 20 }}>
              More BFV Tools & Guides
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {[
                { href: "/calculator", label: "BFV Trade Calculator", icon: "🧮" },
                { href: "/values", label: "Full BFV Value List", icon: "📊" },
                { href: "/wiki", label: "Fruit Wiki", icon: "📖" },
                { href: "/blog/best-pvp-fruit-blox-fruits", label: "Best PVP Fruits 2026", icon: "⚔️" },
                { href: "/guides/fruit-rankings", label: "Fruit Rankings", icon: "🏆" },
                { href: "/blog/trading-guide-2026-get-rare-fruits-fast", label: "Trading Guide 2026", icon: "🔄" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 10, textDecoration: "none", color: "var(--text)", fontSize: "0.9rem", transition: "border-color 0.2s" }}
                >
                  <span>{l.icon}</span>
                  <span>{l.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
