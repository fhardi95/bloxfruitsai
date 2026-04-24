"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FRUITS, TIERS, formatValue, type FruitTier, type FruitCategory } from "@/lib/fruits-data";

const TIER_STYLES: Record<FruitTier, { bg: string; color: string; border: string }> = {
  S: { bg: "rgba(255,215,0,0.12)", color: "var(--gold)", border: "rgba(255,215,0,0.4)" },
  A: { bg: "rgba(0,245,255,0.1)", color: "var(--cyan)", border: "rgba(0,245,255,0.3)" },
  B: { bg: "rgba(46,213,115,0.1)", color: "var(--green)", border: "rgba(46,213,115,0.3)" },
  C: { bg: "rgba(255,165,2,0.1)", color: "#ffa502", border: "rgba(255,165,2,0.3)" },
  D: { bg: "rgba(255,71,87,0.08)", color: "var(--red)", border: "rgba(255,71,87,0.2)" },
};

const RARITY_COLORS: Record<string, string> = {
  Mythical: "#ff6b9d", Legendary: "var(--gold)", Rare: "var(--cyan)", Uncommon: "var(--green)", Common: "var(--text-muted)",
};

function DemandBar({ val }: { val: number }) {
  const color = val >= 8 ? "var(--green)" : val >= 5 ? "var(--orange)" : "var(--red)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${val * 10}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: "0.78rem", fontWeight: 600, color, minWidth: 20 }}>{val}</span>
    </div>
  );
}

export default function ValuesClient() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<FruitTier | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<FruitCategory | "all">("all");
  const [sort, setSort] = useState<"value" | "demand" | "tier" | "name">("value");
  const [viewMode, setViewMode] = useState<"regular" | "permanent">("regular");
  const [viewStyle, setViewStyle] = useState<"grid" | "table">("grid");

  const filtered = useMemo(() => {
    let fruits = [...FRUITS];
    if (search) fruits = fruits.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
    if (tierFilter !== "all") fruits = fruits.filter(f => f.tier === tierFilter);
    if (categoryFilter !== "all") fruits = fruits.filter(f => f.category === categoryFilter);
    fruits.sort((a, b) => {
      if (sort === "value") return (viewMode === "permanent" ? b.permanentValue - a.permanentValue : b.value - a.value);
      if (sort === "demand") return b.demand - a.demand;
      if (sort === "tier") return TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier);
      return a.name.localeCompare(b.name);
    });
    return fruits;
  }, [search, tierFilter, categoryFilter, sort, viewMode]);

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--cyan)" }}>Value List</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "3px 12px", borderRadius: 50, marginBottom: "0.75rem" }}>Updated Daily</div>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Blox Fruits <span style={{ color: "var(--cyan)" }}>Value List</span>
              </h1>
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                {filtered.length} items · Real-time prices, demand ratings & tier rankings
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/calculator" style={{ background: "var(--cyan)", color: "var(--bg-deep)", padding: "10px 20px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Trade Calculator</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "1rem 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {[
            { label: "Total Items", val: FRUITS.length },
            { label: "Mythical", val: FRUITS.filter(f => f.rarity === "Mythical").length },
            { label: "S-Tier", val: FRUITS.filter(f => f.tier === "S").length },
            { label: "Avg Demand", val: (FRUITS.reduce((s, f) => s + f.demand, 0) / FRUITS.length).toFixed(1) },
          ].map(s => (
            <div key={s.label}>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: "var(--cyan)", display: "block" }}>{s.val}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 5%" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.5rem", alignItems: "center" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search fruits..." style={{ flex: "1 1 200px", minWidth: 180, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }} />
          
          {/* Tier filter */}
          <div style={{ display: "flex", gap: 4 }}>
            {(["all", ...TIERS] as const).map(t => (
              <button key={t} onClick={() => setTierFilter(t as FruitTier | "all")} style={{ padding: "7px 12px", borderRadius: 6, border: "1px solid var(--border)", background: tierFilter === t ? "var(--cyan)" : "var(--bg-card)", color: tierFilter === t ? "var(--bg-deep)" : "var(--text-muted)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                {t === "all" ? "All" : t}
              </button>
            ))}
          </div>

          {/* Category */}
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as FruitCategory | "all")} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", outline: "none", cursor: "pointer" }}>
            <option value="all">All Categories</option>
            <option value="Fruit">Fruits</option>
            <option value="Gamepass">Gamepasses</option>
            <option value="Limited">Limiteds</option>
          </select>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value as typeof sort)} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.88rem", outline: "none", cursor: "pointer" }}>
            <option value="value">Sort: Value</option>
            <option value="demand">Sort: Demand</option>
            <option value="tier">Sort: Tier</option>
            <option value="name">Sort: Name</option>
          </select>

          {/* View mode toggle */}
          <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {(["regular","permanent"] as const).map(m => (
              <button key={m} onClick={() => setViewMode(m)} style={{ padding: "8px 14px", background: viewMode === m ? "rgba(0,245,255,0.15)" : "transparent", color: viewMode === m ? "var(--cyan)" : "var(--text-muted)", border: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", letterSpacing: "0.04em" }}>
                {m === "regular" ? "Regular" : "Permanent"}
              </button>
            ))}
          </div>

          {/* Grid/Table toggle */}
          <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
            {(["grid","table"] as const).map(v => (
              <button key={v} onClick={() => setViewStyle(v)} style={{ padding: "8px 14px", background: viewStyle === v ? "rgba(0,245,255,0.15)" : "transparent", color: viewStyle === v ? "var(--cyan)" : "var(--text-muted)", border: "none", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.82rem", cursor: "pointer" }}>
                {v === "grid" ? "⊞" : "☰"}
              </button>
            ))}
          </div>
        </div>

        {/* Grid View */}
        {viewStyle === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
            {filtered.map(fruit => {
              const ts = TIER_STYLES[fruit.tier];
              const displayVal = viewMode === "permanent" ? fruit.permanentValue : fruit.value;
              return (
                <div key={fruit.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", position: "relative", overflow: "hidden", transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: "2rem" }}>{fruit.emoji}</span>
                      <div>
                        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "1rem" }}>{fruit.name}</div>
                        <div style={{ fontSize: "0.72rem", color: RARITY_COLORS[fruit.rarity], fontWeight: 600 }}>{fruit.rarity}</div>
                      </div>
                    </div>
                    <div style={{ ...ts, borderRadius: 7, padding: "4px 10px", fontSize: "0.85rem", fontWeight: 900, fontFamily: "'Orbitron',monospace", border: `1px solid ${ts.border}` }}>{fruit.tier}</div>
                  </div>

                  {/* Value */}
                  <div style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 8, padding: "0.6rem 0.8rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{viewMode === "permanent" ? "Perm Value" : "Value"}</span>
                    <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)" }}>{viewMode === "permanent" ? `${displayVal.toLocaleString()} R$` : formatValue(displayVal)}</span>
                  </div>

                  {/* Demand */}
                  <div style={{ marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Demand</span>
                    </div>
                    <DemandBar val={fruit.demand} />
                  </div>

                  {/* Type & Trend */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                    <span style={{ fontSize: "0.72rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "3px 10px", color: "var(--text-muted)" }}>{fruit.type}</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: fruit.trend === "up" ? "var(--green)" : fruit.trend === "down" ? "var(--red)" : "var(--text-muted)" }}>
                      {fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {viewStyle === "table" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Rajdhani',sans-serif" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Fruit","Tier","Rarity","Value","Perm (R$)","Demand","Type","Trend"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((fruit, i) => {
                  const ts = TIER_STYLES[fruit.tier];
                  return (
                    <tr key={fruit.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.04)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"}
                    >
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: "1.3rem" }}>{fruit.emoji}</span>
                          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{fruit.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px" }}>
                        <span style={{ ...ts, fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 900, padding: "3px 9px", borderRadius: 6, border: `1px solid ${ts.border}` }}>{fruit.tier}</span>
                      </td>
                      <td style={{ padding: "10px 14px", fontSize: "0.85rem", color: RARITY_COLORS[fruit.rarity], fontWeight: 600 }}>{fruit.rarity}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", color: "var(--cyan)", fontWeight: 700 }}>{formatValue(fruit.value)}</td>
                      <td style={{ padding: "10px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.88rem", color: "var(--gold)" }}>{fruit.permanentValue.toLocaleString()}</td>
                      <td style={{ padding: "10px 14px", minWidth: 120 }}><DemandBar val={fruit.demand} /></td>
                      <td style={{ padding: "10px 14px", fontSize: "0.82rem", color: "var(--text-muted)" }}>{fruit.type}</td>
                      <td style={{ padding: "10px 14px", fontSize: "0.82rem", fontWeight: 600, color: fruit.trend === "up" ? "var(--green)" : fruit.trend === "down" ? "var(--red)" : "var(--text-muted)" }}>
                        {fruit.trend === "up" ? "↑ Rising" : fruit.trend === "down" ? "↓ Falling" : "→ Stable"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>
            No fruits found. Try adjusting your filters.
          </div>
        )}
      </div>
    </div>
  );
}
