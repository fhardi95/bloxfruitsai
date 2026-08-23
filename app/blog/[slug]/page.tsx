import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs, BLOG_POSTS, type BlogSection } from "../../_data/blog-data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

// Per-article SEO overrides — title and meta description for key articles
const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "bfv-values-blox-fruits-value-list-2026": {
    title: "BFV Values 2026 — Complete Blox Fruits Value List (All Fruits Ranked)",
    description: "Full Blox Fruits BFV value list for 2026. See every fruit's trade value by tier — Mythical, Legendary, Rare — plus how BFV values are calculated and how to use the free BFV calculator.",
  },
  "blox-fruits-wiki-fruit-guide-abilities-2026": {
    title: "Blox Fruits Wiki 2026 — Full Fruit Guide, Abilities & Devil Fruit List",
    description: "Complete Blox Fruits wiki guide for 2026. Every devil fruit explained — abilities, rarity, grinding tier, PVP rating, awakening cost, and how to get each fruit. Updated for Update 31.",
  },
  "best-pvp-fruit-blox-fruits": {
    title: "Best PVP Fruit Blox Fruits 2026 — Top 10 Tier List & Combos",
    description: "Best PVP fruits in Blox Fruits 2026 ranked. Tiger, Kitsune, Dragon & Dough dominate — see damage rankings, top combos & which fruit fits your playstyle. Updated June 2026.",
  },
  "race-v4-tier-list": {
    title: "Race V4 Tier List Blox Fruits 2026 — Best Race Ranked",
    description: "Every Race V4 ranked for Blox Fruits 2026. Best race for PVP, grinding & boss raids — with top fruit pairings. Updated for the current May/June 2026 meta.",
  },
  "best-pvp-fruits-tier-list-combos-2026": {
    title: "Best PVP Fruit Blox Fruits 2026 — Tier List & Combos",
    description: "Full PVP tier list for Blox Fruits 2026. Every top fruit ranked by damage, mobility & combo potential — pro combos for Tiger, Kitsune, Dragon & Dough.",
  },
  "fastest-leveling-guide-2026": {
    title: "Fast Way to Max Level Blox Fruits 2026 — Complete Guide",
    description: "Fastest way to max level in Blox Fruits 2026. Best fruits, XP stacking, quest routes & grinding spots — level 1 to 2550 as fast as possible.",
  },
  "beginner-guide-level-up-fast-2026": {
    title: "Blox Fruits Beginner Guide 2026 - Level Up to Max Level 2550",
    description: "New to Blox Fruits in 2026? Fastest levelling routes, best starter fruits, stat builds & grinding spots to hit max level 2550 fast. Updated June 2026.",
  },
  "blox-fruits-all-bosses-guide-2026": {
    title: "All Blox Fruits Bosses 2026 — Locations, Drops & Spawn Times",
    description: "Every boss in Blox Fruits 2026 with exact location, spawn timer, drop rates and recommended level. First, Second and Third Sea bosses all covered.",
  },
  "all-bosses-guide-locations-drop-rates-2026": {
    title: "Blox Fruits Boss Guide 2026 — All Locations, Drop Rates & Spawn Timers",
    description: "Complete boss location guide for Blox Fruits 2026. Every boss spawn time, drop rate table and recommended team level — Sea 1, 2 and 3 included.",
  },
  "buddha-guide-moves-awakening-tips": {
    title: "Buddha Fruit Guide 2026 — Moves, Awakening Cost & Best Build",
    description: "Complete Buddha guide for Blox Fruits 2026. All moves explained, full awakening fragment cost, damage reduction stats, best race and grinding setup.",
  },
  "blox-fruits-eggs-guide": {
    title: "Blox Fruits Eggs Guide 2026 — How to Get, Hatch & Best Rewards",
    description: "Full eggs guide for Blox Fruits 2026. How to get eggs, hatch rates, all possible rewards and the fastest way to farm them. Updated June 2026.",
  },
  "dough-fruit-guide-awakening-moves-grinding-2026": {
    title: "Dough Fruit Guide 2026 — Moves, Awakening & Best Grinding Build",
    description: "Dough fruit complete guide for Blox Fruits 2026. All moves, full awakening cost, best race pairing, grinding routes and current BFV trade value.",
  },
  "kitsune-fruit-guide-2026": {
    title: "Kitsune Fruit Guide 2026 — Moves, Awakening & Is It Worth It?",
    description: "Complete Kitsune guide for Blox Fruits 2026. All 5 moves, Spirit Form awakening breakdown, best PVP combos, top builds and current BFV trade value.",
  },
  "kitsune-fruit-guide-awakening-moves-2026": {
    title: "Kitsune Awakening Guide 2026 — Full Moves & Spirit Form Breakdown",
    description: "Full Kitsune awakening guide for Blox Fruits 2026. Fragment costs, Spirit Form moves, best awakening order and whether Kitsune is worth awakening first.",
  },
  "dragon-fruit-guide-moves-combos-2026": {
    title: "Dragon Fruit Guide 2026 — Moves, Combos & Best Builds",
    description: "Dragon fruit full guide for Blox Fruits 2026. All moves, best Dragon Talon combos, S-tier PVP and grinding builds and current BFV trade value.",
  },
  "best-race-tier-list-2026": {
    title: "Best Race Tier List Blox Fruits 2026 — All Races Ranked S to D",
    description: "Full race tier list for Blox Fruits 2026. Every race ranked for PVP, grinding and boss raids — with best fruit pairings for each race. Updated June 2026.",
  },
  "trading-guide-rare-fruits-fast-2026": {
    title: "Blox Fruits Trading Guide 2026 — How to Get Rare Fruits Fast",
    description: "Complete trading guide for Blox Fruits 2026. Best trading strategies, how to value fruits, avoid scams and flip your way to rare fruits like Kitsune and Dragon.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  const override = SEO_OVERRIDES[slug];
  const seoTitle = override?.title ?? post.title;
  const seoDesc = override?.description ?? post.excerpt;

  // Canonical override — point duplicate pages to the primary version
  const CANONICAL_OVERRIDES: Record<string, string> = {
    "best-pvp-fruits-tier-list-combos-2026": "https://www.bloxfruitsai.com/blog/best-pvp-fruit-blox-fruits",
    "dragon-fruit-guide-moves-combos-grinding-2026": "https://www.bloxfruitsai.com/blog/dragon-fruit-guide-moves-combos-2026",
    "kitsune-fruit-guide-moves-awakening-tips": "https://www.bloxfruitsai.com/blog/kitsune-fruit-guide-awakening-moves-2026",
    "trading-guide-2026-get-rare-fruits-fast": "https://www.bloxfruitsai.com/blog/trading-guide-rare-fruits-fast-2026",
    "all-bosses-guide-locations-drop-rates-2026": "https://www.bloxfruitsai.com/blog/blox-fruits-all-bosses-guide-2026",
    "fastest-leveling-guide-2026": "https://www.bloxfruitsai.com/blog/beginner-guide-level-up-fast-2026",
  };
  const canonicalUrl = CANONICAL_OVERRIDES[slug] ?? `https://www.bloxfruitsai.com/blog/${slug}`;
  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: canonicalUrl,
      type: "article",
    },
  };
}

const TIER_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  S: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.35)" },
  A: { bg: "rgba(0,245,255,0.09)", color: "#00f5ff", border: "rgba(0,245,255,0.28)" },
  B: { bg: "rgba(46,213,115,0.09)", color: "#2ed573", border: "rgba(46,213,115,0.28)" },
  C: { bg: "rgba(255,165,2,0.09)", color: "#ffa502", border: "rgba(255,165,2,0.28)" },
  D: { bg: "rgba(255,71,87,0.08)", color: "#ff4757", border: "rgba(255,71,87,0.2)" },
};

function renderSection(s: BlogSection, i: number) {
  switch (s.type) {
    case "paragraph":
      return <p key={i} style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", lineHeight: 1.9, fontSize: "0.97rem", marginBottom: "1.25rem" }}>{s.text}</p>;

    case "heading":
      return <h2 key={i} style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.15rem", fontWeight: 700, color: "var(--cyan)", marginTop: "2.25rem", marginBottom: "1rem", paddingBottom: "0.65rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{s.text}</h2>;

    case "subheading":
      return <h3 key={i} style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginTop: "1.5rem", marginBottom: "0.65rem" }}>{s.text}</h3>;

    case "tip":
      return (
        <div key={i} style={{ background: "rgba(46,213,115,0.07)", border: "1px solid rgba(46,213,115,0.25)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#2ed573", display: "block", marginBottom: 4 }}>PRO TIP</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "warning":
      return (
        <div key={i} style={{ background: "rgba(255,165,2,0.07)", border: "1px solid rgba(255,165,2,0.25)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>⚠️</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#ffa502", display: "block", marginBottom: 4 }}>WARNING</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "info":
      return (
        <div key={i} style={{ background: "rgba(0,245,255,0.07)", border: "1px solid rgba(0,245,255,0.22)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", gap: "0.9rem" }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>ℹ️</span>
          <div>
            <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", fontWeight: 700, color: "#00f5ff", display: "block", marginBottom: 4 }}>NOTE</span>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{s.text}</p>
          </div>
        </div>
      );

    case "list":
      return (
        <ul key={i} style={{ listStyle: "none", marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {s.items?.map((item, j) => (
            <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0, marginTop: 3, fontSize: "0.75rem" }}>◆</span>
              <span style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div key={i} style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Rajdhani',sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {s.headers?.map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows?.map((row, j) => (
                <tr key={j} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: j % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  {row.map((cell, k) => (
                    <td key={k} style={{ padding: "10px 14px", fontSize: "0.88rem", color: k === 0 ? "var(--text)" : "var(--text-muted)", fontWeight: k === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "tierrow": {
      const ts = TIER_STYLES[s.tier!] || TIER_STYLES.B;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "0.85rem 1.25rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
          <div style={{ minWidth: 48, textAlign: "center", fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, padding: "6px 10px", borderRadius: 8, ...ts }}>{s.tier}</div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 70 }}>{s.label}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1 }}>
            {s.fruits?.map(f => (
              <span key={f} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: "0.82rem" }}>{f}</span>
            ))}
          </div>
        </div>
      );
    }

    case "buildcard":
      return (
        <div key={i} style={{ background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 14, padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
            {[
              { label: "Fruit", value: s.build?.fruit, icon: "🍎" },
              { label: "Fighting Style", value: s.build?.style, icon: "🥊" },
              { label: "Sword", value: s.build?.sword, icon: "⚔️" },
              { label: "Stats", value: s.build?.stats, icon: "📈" },
            ].map(f => (
              <div key={f.label} style={{ background: "var(--bg-card2)", borderRadius: 8, padding: "0.6rem 0.8rem" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{f.icon} {f.label}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text)" }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--cyan)" }}>Notes:</strong> {s.build?.note}
          </div>
        </div>
      );

    case "divider":
      return <hr key={i} style={{ border: "none", borderTop: "1px solid var(--border)", margin: "2rem 0" }} />;

    default:
      return null;
  }
}

// FAQ schema data for articles that have FAQ sections
const FAQ_SCHEMA: Record<string, { question: string; answer: string }[]> = {
  "bfv-values-blox-fruits-value-list-2026": [
    { question: "What is the highest BFV value fruit in Blox Fruits right now?", answer: "As of May 2026, Kitsune holds the highest BFV trade value in the game, between 30,000 and 35,000 BFV. Dragon follows at 25,000 to 28,000, and Tiger at 22,000 to 26,000." },
    { question: "Do BFV values change after patches?", answer: "Yes — BFV values shift with every major Blox Fruits update. A buff can increase a fruit's value 20 to 50 percent within days. Always check a live source before trading, especially in the 72 hours following any patch." },
    { question: "Is BFV the same as Robux price?", answer: "No. BFV is the community trade value reflecting real-world supply and demand. Robux price is the fixed dealer cost. A fruit can cost 2,000 Robux but have a BFV trade value of 15,000 because demand exceeds supply." },
    { question: "Where can I check BFV values for free?", answer: "The most accurate free BFV calculator is at bloxfruitsai.com/calculator — showing live community-verified BFV values for every fruit, supporting awakened and unawakened variants." },
  ],
  "blox-fruits-wiki-fruit-guide-abilities-2026": [
    { question: "How many fruits are in Blox Fruits in 2026?", answer: "As of Update 31 in May 2026, there are over 35 unique devil fruits across five rarity tiers — Common, Uncommon, Rare, Legendary, and Mythical." },
    { question: "What is the rarest fruit in Blox Fruits?", answer: "Kitsune is the rarest Mythical-tier fruit in Blox Fruits, with the lowest world spawn probability and no guaranteed dealer availability. It also holds the highest BFV trade value in the game." },
    { question: "Which fruit is best for beginners in Blox Fruits?", answer: "Buddha is the best fruit for beginner and mid-game players. Its transformation increases your hitbox dramatically, making it easy to hit multiple enemies at once, and it excels at grinding, boss fights, and raids." },
    { question: "Can I lose my devil fruit in Blox Fruits?", answer: "Yes — you lose your equipped devil fruit if you eat another one. You can store one fruit in your Inventory Bag to prevent accidental loss. Always store a fruit before eating a new one." },
    { question: "Where can I find a full Blox Fruits wiki with all fruit stats?", answer: "The most up-to-date Blox Fruits wiki is at bloxfruitsai.com/wiki — every fruit with move descriptions, awakening details, and BFV trade values updated after each patch." },
  ],
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  const faqData = FAQ_SCHEMA[slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.dateISO,
        dateModified: post.dateISO,
        author: { "@type": "Organization", name: post.author },
        publisher: { "@type": "Organization", name: "Blox Fruits AI", logo: { "@type": "ImageObject", url: "https://www.bloxfruitsai.com/logo.png" } },
        url: `https://www.bloxfruitsai.com/blog/${slug}`,
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.bloxfruitsai.com/blog/${slug}` },
      },
      ...(faqData ? [{
        "@type": "FAQPage",
        mainEntity: faqData.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ paddingTop: 70, minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.05),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "var(--cyan)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.03, pointerEvents: "none" }} />
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Blog</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "var(--cyan)" }}>{post.category}</span>
            </div>

            {/* Category badge */}
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: post.categoryColor, background: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}40`, padding: "4px 14px", borderRadius: 20 }}>{post.category}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <span style={{ width: 6, height: 6, background: "var(--green)", borderRadius: "50%", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                Updated {post.date}
              </span>
            </div>

            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "1.25rem" }}>
              {post.icon} {post.title}
            </h1>

            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{post.excerpt}</p>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: "var(--cyan)" }}>⏱</span> {post.readTime} read</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: "var(--cyan)" }}>✍️</span> {post.author}</span>
              <Link href="/blog" style={{ fontSize: "0.8rem", color: "var(--cyan)", textDecoration: "none", marginLeft: "auto" }}>← All Posts</Link>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 5%" }}>
          <div>{post.content.map((section, i) => renderSection(section, i))}</div>


          {/* Affiliate banner — shown on codes and trading articles */}
          {(post.category === "Codes" || post.category === "Trading" || slug.includes("codes") || slug.includes("trading") || slug.includes("calculator")) && (
            <div style={{ margin: "2rem 0", background: "linear-gradient(135deg,rgba(255,215,0,0.07),rgba(0,245,255,0.04))", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 14, padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "2rem", flexShrink: 0 }}>🎮</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", fontWeight: 700, color: "#ffd700", letterSpacing: "0.1em", marginBottom: 4 }}>NEED ROBUX?</div>
                <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>Get Roblox Gift Cards — Instant Delivery</div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>The safest way to get Robux. Official gift cards available on Amazon — works worldwide.</div>
              </div>
              <a
                href="https://www.amazon.co.uk/s?k=roblox+gift+card&tag=bloxfruitsai-21"
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{ background: "#ffd700", color: "#020810", fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.08em", padding: "10px 20px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
              >
                VIEW ON AMAZON →
              </a>
            </div>
          )}

          {/* Share / nav */}
          <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}>← Back to Blog</Link>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/values" style={{ background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Value List</Link>
              <Link href="/calculator" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "8px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textDecoration: "none" }}>Trade Calculator</Link>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 5%" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>MORE FROM THE BLOG</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
              {related.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: "block", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", textDecoration: "none", transition: "all 0.2s" }}
                >
                  <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.6rem" }}>{p.icon}</span>
                  <div style={{ fontSize: "0.68rem", color: p.categoryColor, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{p.category}</div>
                  <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.35, marginBottom: "0.5rem" }}>{p.title}</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>⏱ {p.readTime} · {p.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
