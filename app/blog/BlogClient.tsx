"use client";
import Link from "next/link";


const POSTS = [
  { slug: "april-2025-patch-analysis", title: "April 2025 Patch Analysis — Dough Buffed, Ice Nerfed", excerpt: "The latest Blox Fruits update reshuffled the meta. Dough returns to A-tier with a significant hitbox buff, Ice loses some PVP dominance, and Kitsune is confirmed as the new strongest mythical fruit.", date: "April 22, 2025", category: "Patch Notes", readTime: "5 min", icon: "🔄" },
  { slug: "kitsune-complete-guide", title: "Kitsune Fruit Complete Guide — Is It Worth It?", excerpt: "Kitsune is the newest mythical Beast fruit in Blox Fruits. We break down every move, damage output, and how it compares to Dragon and Leopard in both PVP and PVE.", date: "April 18, 2025", category: "Fruit Guide", readTime: "8 min", icon: "🦊" },
  { slug: "trade-calculator-launch", title: "We Launched the BloxFruits Trade Calculator", excerpt: "Our new AI-powered trade calculator is live. Add up to 4 items on each side and get an instant verdict — Fair, Overpay, or Underpay. Never get scammed on a trade again.", date: "April 10, 2025", category: "Feature", readTime: "3 min", icon: "💱" },
  { slug: "best-grinding-setup-2025", title: "The Best Grinding Setup in 2025 — Castle on the Sea", excerpt: "Castle on the Sea is now the undisputed #1 XP spot for endgame players. With Dragon or Kitsune you can hit 2.5M+ XP per hour. Here's the complete route breakdown.", date: "April 5, 2025", category: "Grinding", readTime: "7 min", icon: "🏰" },
  { slug: "race-v4-tier-list", title: "Race V4 Tier List — Which Race is Best in 2025?", excerpt: "With all six races now having V4 awakenings available, we rank every race based on PVP impact, PVE utility, and which fruit builds they pair best with.", date: "March 28, 2025", category: "Race Guide", readTime: "6 min", icon: "🏁" },
  { slug: "blox-fruits-trading-tips", title: "10 Trading Tips Every Blox Fruits Player Should Know", excerpt: "Trading is one of the most complex parts of Blox Fruits. These 10 tips — from understanding demand vs value to knowing when to hold vs sell — will make you a better trader immediately.", date: "March 20, 2025", category: "Trading", readTime: "9 min", icon: "💡" },
];

const CATS = ["All", "Patch Notes", "Fruit Guide", "Grinding", "Trading", "Feature", "Race Guide"];

export default function BlogClient() {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span><span style={{ color: "var(--cyan)" }}>Blog</span>
          </div>
          <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>News & Guides</span>
          <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            BloxFruitsAI <span style={{ color: "var(--cyan)" }}>Blog</span>
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7 }}>Patch analysis, meta guides, trading tips, and everything Blox Fruits — updated regularly.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 5%" }}>
        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATS.map((c, i) => (
            <span key={c} style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid var(--border)", fontSize: "0.82rem", cursor: "pointer", background: i === 0 ? "var(--cyan)" : "var(--bg-card)", color: i === 0 ? "var(--bg-deep)" : "var(--text-muted)", fontWeight: i === 0 ? 700 : 400 }}>{c}</span>
          ))}
        </div>

        {/* Featured post */}
        <div style={{ background: "var(--bg-card)", border: "1px solid rgba(0,245,255,0.25)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "3px 10px", borderRadius: 20, letterSpacing: "0.08em" }}>FEATURED</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>{POSTS[0].category}</span>
            </div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1rem,2.5vw,1.4rem)", fontWeight: 700, marginBottom: "0.75rem", lineHeight: 1.3 }}>{POSTS[0].icon} {POSTS[0].title}</h2>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>{POSTS[0].excerpt}</p>
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              <span>📅 {POSTS[0].date}</span>
              <span>⏱ {POSTS[0].readTime}</span>
            </div>
          </div>
          <Link href={`/blog/${POSTS[0].slug}`} style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "10px 20px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", alignSelf: "center" }}>Read →</Link>
        </div>

        {/* Post grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
          {POSTS.slice(1).map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.5rem", textDecoration: "none", display: "block", transition: "all 0.25s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,245,255,0.3)"; el.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "none"; }}
            >
              <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.15)", padding: "3px 10px", borderRadius: 20 }}>{post.category}</span>
              </div>
              <h3 style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.6rem", lineHeight: 1.4 }}>{post.icon} {post.title}</h3>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1rem" }}>{post.excerpt.slice(0, 120)}...</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <span>{post.date}</span>
                <span style={{ color: "var(--cyan)" }}>{post.readTime} read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
