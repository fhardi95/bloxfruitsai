"use client";
import Link from "next/link";

const GUIDES = [
  {
    href: "/guides/pvp-builds",
    icon: "⚔️",
    tag: "PVP",
    tagColor: "#ff4757",
    tagBg: "rgba(255,71,87,0.1)",
    tagBorder: "rgba(255,71,87,0.3)",
    title: "PVP Builds 2025",
    desc: "The definitive meta build guide. Dragon, Leopard, Dough, and Venom — full stat allocations, fighting styles, swords, and Haki setup for every top build.",
    stats: ["4 Meta Builds", "Fighting Style Tier List", "Haki Guide"],
    readTime: "12 min",
    updated: "Apr 22, 2025",
    featured: true,
  },
  {
    href: "/guides/grinding-routes",
    icon: "🗺️",
    tag: "Grinding",
    tagColor: "#2ed573",
    tagBg: "rgba(46,213,115,0.1)",
    tagBorder: "rgba(46,213,115,0.3)",
    title: "Best Grinding Routes",
    desc: "Optimized XP and Beli farming routes for every level range — Level 1 all the way to 2550. Includes Castle on the Sea endgame breakdown and mastery tips.",
    stats: ["Level 1–2550", "Beli Farming Routes", "2.5M XP/hr Guide"],
    readTime: "10 min",
    updated: "Apr 20, 2025",
    featured: true,
  },
  {
    href: "/guides/fruit-rankings",
    icon: "📊",
    tag: "Tier List",
    tagColor: "#00f5ff",
    tagBg: "rgba(0,245,255,0.1)",
    tagBorder: "rgba(0,245,255,0.25)",
    title: "Fruit Rankings 2025",
    desc: "Every devil fruit ranked S through D across PVP, PVE, and grinding. Includes April 2025 patch changes, best fruit by use case, and trade value rankings.",
    stats: ["28+ Fruits Ranked", "April 2025 Patch", "Use Case Table"],
    readTime: "15 min",
    updated: "Apr 22, 2025",
    featured: true,
  },
  {
    href: "/guides/race-guide",
    icon: "🏁",
    tag: "Race",
    tagColor: "#ffd700",
    tagBg: "rgba(255,215,0,0.1)",
    tagBorder: "rgba(255,215,0,0.3)",
    title: "Race Guide & V4 Awakenings",
    desc: "All 6 races ranked with full V1–V4 breakdowns. Learn how to unlock V4, which race pairs best with your fruit, and what each awakening actually does.",
    stats: ["All 6 Races", "V4 Awakening Guide", "Race+Fruit Pairings"],
    readTime: "11 min",
    updated: "Apr 15, 2025",
    featured: false,
  },
  {
    href: "/guides/beginner-guide",
    icon: "🎮",
    tag: "Beginner",
    tagColor: "#7c3aed",
    tagBg: "rgba(124,58,237,0.1)",
    tagBorder: "rgba(124,58,237,0.3)",
    title: "Beginner Guide — Start Here",
    desc: "New to Blox Fruits? This complete guide covers your first fruit choice, stats allocation, Haki, Sea 1–3 progression, and everything you need to reach max level efficiently.",
    stats: ["Sea 1–3 Roadmap", "Stats Guide", "Haki Explained"],
    readTime: "14 min",
    updated: "Apr 10, 2025",
    featured: false,
  },
];

const QUICK_TIPS = [
  { icon: "💡", tip: "Always have a quest active — no quest = no XP bonus multiplier." },
  { icon: "🔑", tip: "Ken Haki V2 is the most important upgrade for PVP. Get it ASAP." },
  { icon: "💱", tip: "Use the Trade Calculator before accepting any trade offer." },
  { icon: "🐉", tip: "Dragon fruit is the best all-rounder for both PVP and PVE in 2025." },
  { icon: "🔔", tip: "Buddha fruit is the king of grinding — its hitbox clears entire rooms." },
  { icon: "⚡", tip: "Electric Claw and Death Step are the top 2 fighting styles in the meta." },
];

export default function GuidesClient() {
  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>

      {/* Hero Header */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,rgba(0,245,255,0.05) 0%,rgba(0,245,255,0.02) 50%,transparent 100%)", borderBottom: "1px solid var(--border)", padding: "4rem 5% 3rem" }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, background: "var(--cyan)", borderRadius: "50%", filter: "blur(120px)", opacity: 0.04, top: "-100px", right: "-100px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 300, height: 300, background: "var(--gold)", borderRadius: "50%", filter: "blur(100px)", opacity: 0.04, bottom: "-50px", left: "10%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: "var(--cyan)" }}>Guides</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ maxWidth: 620 }}>
              <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>
                Updated April 2025
              </span>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem" }}>
                Blox Fruits <span style={{ color: "var(--cyan)" }}>Guides</span>
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.75 }}>
                AI-powered guides for every aspect of Blox Fruits. From your first fruit to max-level PVP — find exactly what you need, updated after every patch.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { num: "5", label: "Guides" },
                { num: "100K+", label: "Readers" },
                { num: "2025", label: "Updated" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.6rem", fontWeight: 700, color: "var(--cyan)" }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 5%" }}>

        {/* Featured guides — big cards */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "var(--cyan)", letterSpacing: "0.15em" }}>FEATURED GUIDES</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.25rem" }}>
            {GUIDES.filter(g => g.featured).map(guide => (
              <Link key={guide.href} href={guide.href} style={{ textDecoration: "none", display: "block" }}>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "1.75rem", height: "100%", position: "relative", overflow: "hidden", transition: "all 0.3s", cursor: "pointer" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,245,255,0.35)"; el.style.transform = "translateY(-5px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}
                >
                  {/* Top glow line on hover */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${guide.tagColor}, transparent)`, opacity: 0.6 }} />

                  {/* Tag + icon */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: guide.tagColor, background: guide.tagBg, border: `1px solid ${guide.tagBorder}`, padding: "4px 12px", borderRadius: 20 }}>{guide.tag}</span>
                    <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>{guide.icon}</span>
                  </div>

                  {/* Title + desc */}
                  <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.75rem", lineHeight: 1.3 }}>{guide.title}</h2>
                  <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{guide.desc}</p>

                  {/* Stat chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.25rem" }}>
                    {guide.stats.map(s => (
                      <span key={s} style={{ fontSize: "0.72rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "3px 10px", color: "var(--text-muted)" }}>{s}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      <span>⏱ {guide.readTime}</span>
                      <span>📅 {guide.updated}</span>
                    </div>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: guide.tagColor, letterSpacing: "0.06em" }}>READ GUIDE →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All guides */}
        <div style={{ marginBottom: "3rem", marginTop: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.15em" }}>ALL GUIDES</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {GUIDES.filter(g => !g.featured).map(guide => (
              <Link key={guide.href} href={guide.href} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", transition: "all 0.25s", cursor: "pointer" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,245,255,0.3)"; el.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{guide.icon}</span>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.35rem" }}>
                      <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.92rem", fontWeight: 700, color: "var(--text)" }}>{guide.title}</h3>
                      <span style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: guide.tagColor, background: guide.tagBg, border: `1px solid ${guide.tagBorder}`, padding: "2px 9px", borderRadius: 20 }}>{guide.tag}</span>
                    </div>
                    <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.55 }}>{guide.desc.slice(0, 110)}...</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <div style={{ display: "flex", gap: "1rem", fontSize: "0.74rem", color: "var(--text-muted)" }}>
                      <span>⏱ {guide.readTime}</span>
                    </div>
                    <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.06em" }}>READ →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Tips panel */}
        <div style={{ background: "linear-gradient(135deg,rgba(0,245,255,0.04),rgba(255,215,0,0.02))", border: "1px solid rgba(0,245,255,0.18)", borderRadius: 18, padding: "2rem", marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.1em" }}>⚡ QUICK TIPS</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>— Things every Blox Fruits player should know</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "0.85rem" }}>
            {QUICK_TIPS.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "0.85rem 1rem" }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{t.icon}</span>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{t.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
          {[
            { label: "Value List", href: "/values", desc: "Real-time fruit market prices", icon: "📋", color: "var(--cyan)" },
            { label: "Trade Calculator", href: "/calculator", desc: "Check any trade instantly", icon: "💱", color: "var(--gold)" },
            { label: "AI Chat", href: "/#ai-tool", desc: "Ask our AI anything", icon: "🤖", color: "var(--green)" },
            { label: "Latest Blog", href: "/blog", desc: "Patch notes & news", icon: "📰", color: "#ff6b9d" },
          ].map(c => (
            <Link key={c.href} href={c.href} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,245,255,0.25)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "none"; }}
            >
              <span style={{ fontSize: "1.4rem" }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", fontWeight: 700, color: c.color, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontSize: "0.77rem", color: "var(--text-muted)" }}>{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
