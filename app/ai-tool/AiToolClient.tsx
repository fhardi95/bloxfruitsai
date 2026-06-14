"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Msg = { role: "ai" | "user"; text: string };

// ─── Response engine (extended from homepage version) ─────────────────────────
const QA: Record<string, string> = {
  pvp: "For PVP in 2026, **Kitsune** is the current #1 — Nine-Tailed Fox transformation doubles damage output and lets you walk on water. **Tiger** (reworked in Update 31) has the Hunt mechanic that chains combos infinitely for skilled players. **Dragon** rounds out the S-tier for its versatility. Pair any of these with Electric Claw or Death Step + Ken Haki V2. Budget pick: **Dough** is still strong A-tier and much cheaper to trade for.",
  boss: "Best boss setup in 2026: **Dragon** or **Buddha** + Superhuman fighting style + Gravity Blade sword. Buddha's huge hitbox hits everything without precision — great for beginners. Dragon is better solo for World 3 and Sea 3 bosses. Bring Haki V2 (Buso) and keep it active during all boss phases. Full Hearts accessory for survival in harder fights.",
  grind: "Fastest XP in 2026: **Buddha** fruit is the #1 grind fruit — transformation increases your hitbox massively, clearing rooms in seconds. Route: Castle on the Sea → Elite Pirates at Skull Palace → Haunted Castle. With Dragon or Blizzard you can clear full zones in under 90 seconds. Always keep Auto-Haki ON. Light fruit is the best budget option for Sea 1 and Sea 2.",
  trade: "Before any trade, use the **BFV Calculator** at bloxfruitsai.com/calculator to check exact values. Current hierarchy: Kitsune > Dragon > Tiger > Dough > Venom > Shadow > Blizzard > Gas. Never trade S-tier for 2× A-tier unless demand is very high. Awakened fruits are worth 30-40% more than unawakened. Check values before every significant trade — they shift after every patch.",
  kitsune: "**Kitsune** is the highest BFV value fruit in the game right now. Nine-Tailed Fox transformation doubles all damage, grants water walking, and speeds up movement. Fox Hunt Z move fires a near-undodgeable tracking projectile at close range. Only obtainable through rare world spawns or player trading — cannot be bought directly from the dealer. Check current BFV value at bloxfruitsai.com/values.",
  dragon: "**Dragon** is the most versatile Mythical fruit — strong in PVP, grinding, AND raids simultaneously. Hybrid and Full Dragon transformations give both damage multiplier and damage reduction. Heatwave Beam covers massive AoE for grinding. Costs 3,500 Robux from dealer if in stock. BFV trade value: 25,000-28,000. Best all-round fruit in Blox Fruits for 2026.",
  buddha: "**Buddha** is the #1 grinding fruit and the best value fruit in the game. Transformation massively increases your hitbox — you hit everything around you without aiming. Ideal for Castle on the Sea, Elite Pirates, and Sea 3 farming. Low PVP ceiling but unmatched PVE efficiency. Highly recommended for new and mid-game players. Very high trade liquidity.",
  dough: "**Dough** is the most sought-after Legendary for PVP. Dough Barrage Z move is a tracking stun combo opener. Strong in both PVP and grinding. BFV value: 12,000-15,000. Great if you cannot afford Mythical tier — it outperforms its trade value in actual gameplay. Awakened version is significantly stronger.",
  race: "For Race V4 in 2026: **Mink** is the best PVP race — Electric Floor movement is the fastest in the game. **Shark** is best for water areas and boss content. **Human** is balanced with strong basic stat bonuses. **Sky** provides useful aerial movement. To unlock V4, complete the Mirage Island trials at level 2450+. Race V4 bonuses stack with your fruit, so pair Mink + Dragon for maximum PVP speed.",
  build: "Best all-round build for 2026: **Dragon** or **Kitsune** fruit + Electric Claw fighting style + Yama sword + Ken Haki V2 + Buso Haki V2. Stat distribution: 2500 Fruit / 2000 Defense / 1000 HP / rest in Sword or Melee depending on your fighting style. For grinding only: Buddha + Superhuman + Gravity Blade + 2000 Fruit / 1500 Defense / rest HP.",
  default: "Great question! I'm your Blox Fruits AI assistant for 2026. I can help with **PVP builds**, **grinding routes**, **boss strategies**, **trade values**, **race recommendations**, and **fruit guides**. Try asking me: 'What's the best fruit for PVP?', 'How do I grind fastest?', or 'Is my trade fair?' 🎮",
};

function getReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("kitsune")) return QA.kitsune;
  if (m.includes("dragon")) return QA.dragon;
  if (m.includes("buddha")) return QA.buddha;
  if (m.includes("dough")) return QA.dough;
  if (m.includes("race") || m.includes("mink") || m.includes("v4")) return QA.race;
  if (m.includes("build") || m.includes("setup") || m.includes("stats")) return QA.build;
  if (m.includes("pvp") || m.includes("best fruit") || m.includes("ranked") || m.includes("tier")) return QA.pvp;
  if (m.includes("boss") || m.includes("raid") || m.includes("farm boss")) return QA.boss;
  if (m.includes("grind") || m.includes("level") || m.includes("xp") || m.includes("fast")) return QA.grind;
  if (m.includes("trade") || m.includes("calculator") || m.includes("worth") || m.includes("value") || m.includes("bfv")) return QA.trade;
  return QA.default;
}

function renderText(txt: string) {
  return txt.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--cyan)">$1</strong>');
}

const SUGGESTIONS = [
  "Best PVP fruit 2026?",
  "Fastest grind route",
  "Is Kitsune worth it?",
  "Trade value help",
  "Best boss setup",
  "Race V4 guide",
];

const FAQS = [
  {
    q: "What is the Blox Fruits AI tool?",
    a: "The Blox Fruits AI tool is a free interactive assistant that answers any question about Blox Fruits — from the best fruits for PVP and grinding to trade values, boss strategies, and build recommendations. It is updated for the 2026 meta and requires no account or login.",
  },
  {
    q: "Which fruit does the AI recommend for PVP in 2026?",
    a: "For PVP in 2026, the AI recommends Kitsune, Dragon, and Tiger as the top S-tier fruits. Kitsune leads with the highest BFV value and dominant transformation. Tiger received a major rework in Update 31 making it the strongest pure PVP fruit for skilled players.",
  },
  {
    q: "What is the best fruit for grinding?",
    a: "Buddha is the best grinding fruit for most players — its transformation increases your hitbox massively, letting you clear rooms without precision. Dragon is the best Mythical-tier grinding fruit. Light is the best budget option for new players.",
  },
  {
    q: "Can the AI help with trade values?",
    a: "Yes — the AI gives instant trade advice based on current BFV community values. For precise numerical comparisons, use the BFV Calculator at bloxfruitsai.com/calculator which shows exact values for every fruit.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes, completely free with no account, login, or subscription needed. Just open the page and start asking questions.",
  },
  {
    q: "What can I ask the Blox Fruits AI?",
    a: "You can ask about best PVP fruits, fastest grinding routes, boss strategies, fair trade values, build recommendations, race guides, and meta tier list questions — all updated for the 2026 Blox Fruits meta.",
  },
];

export default function AiToolClient() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hey! I'm your Blox Fruits AI for 2026. Ask me about fruits, builds, bosses, trades, races, or grinding routes. 🍎",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight);
  }, [msgs]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setInput("");
    setMsgs((prev) => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((prev) => [...prev, { role: "ai", text: getReply(msg) }]);
      setTyping(false);
    }, 700);
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)", color: "var(--text)" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "5rem 5% 2rem", textAlign: "center", background: "radial-gradient(ellipse at center,rgba(0,245,255,0.06) 0%,transparent 70%)" }}>
        <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1.2rem" }}>
          Free AI Tool · No Login Required
        </span>
        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.2rem" }}>
          Blox Fruits <span style={{ color: "var(--cyan)" }}>AI Tool</span>
        </h1>
        <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1.05rem", maxWidth: 580, margin: "0 auto 1rem", lineHeight: 1.75 }}>
          Ask any question and get instant AI answers on the best fruits, PVP builds, grinding routes, boss strategies, and trade values — updated for the 2026 meta.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {["🏆 PVP Builds", "⚡ Grinding Routes", "💰 Trade Values", "👹 Boss Strategies", "🏁 Race Guides"].map((tag) => (
            <span key={tag} style={{ fontSize: "0.8rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: 20 }}>{tag}</span>
          ))}
        </div>
      </section>

      {/* ── Chat Tool ── */}
      <section style={{ padding: "0 5% 3rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", boxShadow: "0 0 60px rgba(0,245,255,0.06)" }}>

          {/* Header bar */}
          <div style={{ padding: "1rem 1.5rem", background: "rgba(0,245,255,0.05)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, background: "var(--green)", borderRadius: "50%", animation: "pulseDot 2s infinite" }} />
            <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", color: "var(--cyan)", letterSpacing: "0.05em" }}>BLOXFRUITS AI · ONLINE · 2026 META</span>
            <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--text-muted)" }}>Updated: Jun 2026</span>
          </div>

          {/* Messages */}
          <div ref={bodyRef} style={{ padding: "1.5rem", minHeight: 300, maxHeight: 400, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 10, flexDirection: m.role === "user" ? "row-reverse" : "row", animation: "fadeUp 0.35s ease both" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, background: m.role === "ai" ? "rgba(0,245,255,0.12)" : "rgba(255,215,0,0.1)", border: m.role === "ai" ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,215,0,0.2)", color: m.role === "ai" ? "var(--cyan)" : "var(--gold)" }}>{m.role === "ai" ? "AI" : "YOU"}</div>
                <div style={{ background: m.role === "user" ? "rgba(255,215,0,0.07)" : "var(--bg-card2)", border: m.role === "user" ? "1px solid rgba(255,215,0,0.15)" : "1px solid var(--border)", borderRadius: 12, padding: "10px 14px", fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", lineHeight: 1.65, maxWidth: "80%" }} dangerouslySetInnerHTML={{ __html: renderText(m.text) }} />
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700, background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.3)", color: "var(--cyan)" }}>AI</div>
                <div style={{ background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 14px" }}>
                  <span style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map((j) => <span key={j} style={{ width: 6, height: 6, background: "var(--cyan)", borderRadius: "50%", opacity: 0.5, animation: `pulseDot 0.8s ${j * 0.2}s infinite` }} />)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          <div style={{ padding: "0.5rem 1.5rem 0" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "0.4rem" }}>
              {SUGGESTIONS.map((q) => (
                <button key={q} onClick={() => send(q)} style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 20, padding: "5px 14px", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.8rem", color: "var(--cyan)", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.03em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.14)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,245,255,0.06)")}
                >{q}</button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem 1.5rem 1.25rem", borderTop: "1px solid var(--border)", display: "flex", gap: 10, marginTop: "0.5rem" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about fruits, builds, trades, bosses..." style={{ flex: 1, background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }} />
            <button onClick={() => send()} style={{ background: "var(--cyan)", border: "none", borderRadius: 10, padding: "10px 18px", color: "var(--bg-deep)", fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s" }}>SEND</button>
          </div>
        </div>

        {/* Tool links */}
        <div style={{ maxWidth: 820, margin: "1.5rem auto 0", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "BFV Calculator", href: "/calculator", icon: "🧮" },
            { label: "Value List", href: "/values", icon: "📊" },
            { label: "Fruit Wiki", href: "/wiki", icon: "📖" },
            { label: "BFV Values", href: "/bfv", icon: "💰" },
          ].map((l) => (
            <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "var(--text-muted)", border: "1px solid var(--border)", padding: "7px 14px", borderRadius: 8, textDecoration: "none", background: "rgba(255,255,255,0.02)", transition: "all 0.2s" }}>
              {l.icon} {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── SEO Paragraph ── */}
      <section style={{ padding: "2rem 5% 3rem", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "2rem 2.25rem" }}>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: "var(--cyan)", marginBottom: "1rem" }}>
            About the Blox Fruits AI Tool
          </h2>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "1rem" }}>
            The <strong style={{ color: "var(--text)" }}>Blox Fruits AI tool</strong> is a free, browser-based assistant built specifically for Roblox Blox Fruits players who want instant, accurate answers without trawling through outdated Reddit posts or long YouTube videos. Whether you need to know the best PVP fruit after the latest patch, the fastest XP grinding route in Sea 3, the current BFV trade value of a Mythical fruit, or the optimal build for your fighting style — the AI answers in seconds, for free, with no account required.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-muted)", marginBottom: "1rem" }}>
            The tool is trained on the <strong style={{ color: "var(--text)" }}>2026 Blox Fruits meta</strong>, covering all fruits through Update 31 including the reworked Tiger fruit, Kitsune's dominance in the BFV trade economy, and the new Race V4 unlock requirements. Unlike static tier list images that go stale after every patch, the AI gives context-aware answers — explaining not just which fruit is best, but <em>why</em> it is best and how to use it effectively in your specific situation.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "var(--text-muted)" }}>
            For more in-depth tools, use the <Link href="/calculator" style={{ color: "var(--cyan)", textDecoration: "none" }}>BFV trade calculator</Link> to verify any trade before accepting it, the <Link href="/values" style={{ color: "var(--cyan)", textDecoration: "none" }}>full fruit value list</Link> to see every fruit ranked by BFV score, or the <Link href="/wiki" style={{ color: "var(--cyan)", textDecoration: "none" }}>Blox Fruits wiki</Link> for detailed ability breakdowns on every fruit in the game.
          </p>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section style={{ padding: "0 5% 5rem", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.3rem", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center" }}>
          Frequently Asked <span style={{ color: "var(--cyan)" }}>Questions</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: `1px solid ${openFaq === i ? "rgba(0,245,255,0.4)" : "var(--border)"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12 }}>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "1rem", fontWeight: 600, color: openFaq === i ? "var(--cyan)" : "var(--text)", letterSpacing: "0.02em" }}>{faq.q}</span>
                <span style={{ color: "var(--cyan)", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1.25rem 1rem", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", lineHeight: 1.75, color: "var(--text-muted)" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
