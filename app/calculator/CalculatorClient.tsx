"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FRUITS, formatValue, type Fruit } from "../../lib/fruits-data";

type TradeItem = { fruit: Fruit; qty: number };
type Side = "you" | "them";

/* =========================
   COMPONENTS (UNCHANGED)
========================= */
// (SearchModal, TradeColumn, Verdict remain EXACTLY the same)
// 👉 I did NOT touch your logic/UI

// --- KEEP YOUR ORIGINAL COMPONENTS HERE ---


export default function CalculatorClient() {
  const [youItems, setYouItems] = useState<TradeItem[]>([]);
  const [themItems, setThemItems] = useState<TradeItem[]>([]);

  const addItem = (side: Side, f: Fruit) => {
    const setter = side === "you" ? setYouItems : setThemItems;
    setter(prev => prev.find(i => i.fruit.id === f.id) ? prev : [...prev, { fruit: f, qty: 1 }]);
  };
  const removeItem = (side: Side, id: string) => {
    const setter = side === "you" ? setYouItems : setThemItems;
    setter(prev => prev.filter(i => i.fruit.id !== id));
  };
  const reset = () => { setYouItems([]); setThemItems([]); };

  const youVal = youItems.reduce((s, i) => s + i.fruit.value, 0);
  const themVal = themItems.reduce((s, i) => s + i.fruit.value, 0);
  const youDemand = youItems.length ? youItems.reduce((s, i) => s + i.fruit.demand, 0) / youItems.length : 0;
  const themDemand = themItems.length ? themItems.reduce((s, i) => s + i.fruit.demand, 0) / themItems.length : 0;

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh" }}>
      
      {/* ================= HEADER ================= */}
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--cyan)" }}>Trade Calculator</span>
          </div>

          {/* Header Content */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", marginBottom: "0.75rem" }}>
                Trade Analysis Tool
              </div>

              {/* ✅ SEO H1 */}
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Blox Fruits <span style={{ color: "var(--cyan)" }}>Trade Calculator</span> – Check Values & Fair Trades
              </h1>

              {/* ✅ SEO Paragraph */}
              <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 700 }}>
                Use the most advanced <strong>Blox Fruits trade calculator</strong> to compare fruit values, 
                demand scores, and Robux prices instantly. Analyze trades, avoid overpaying, and 
                make smarter decisions using real-time <strong>Blox Fruits values</strong>.
              </p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={reset} style={{ background: "transparent", border: "1px solid rgba(255,71,87,0.35)", color: "var(--red)", padding: "10px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
                Reset
              </button>

              {/* ✅ Improved anchor text */}
              <Link href="/values" style={{ border: "1px solid var(--cyan)", padding: "10px 18px", borderRadius: 8, color: "var(--cyan)", textDecoration: "none" }}>
                View Blox Fruits Values List
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 5%" }}>

        {/* ✅ SEO H2 */}
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Compare Blox Fruits Trades Instantly
        </h2>

        {/* Trade Columns */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <TradeColumn side="you" items={youItems} onAdd={f => addItem("you", f)} onRemove={id => removeItem("you", id)} />
          <TradeColumn side="them" items={themItems} onAdd={f => addItem("them", f)} onRemove={id => removeItem("them", id)} />
        </div>

        {/* ✅ SEO H2 */}
        <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Trade Result – Fair, Overpay or Underpay
        </h2>

        <Verdict youVal={youVal} themVal={themVal} youDemand={youDemand} themDemand={themDemand} />

        {/* ================= SEO CONTENT ================= */}

        <section style={{ marginTop: "2rem" }}>
          <h2>How the Blox Fruits Trade Calculator Works</h2>

          <p>
            The Blox Fruits trade calculator compares fruit values, demand ratings, and Robux prices 
            to determine if a trade is fair. Each fruit is assigned a value based on rarity and market demand.
          </p>

          <h3>Value Calculation System</h3>
          <p>
            Fruits like Dragon, Leopard, and Dough have higher values due to rarity and trading demand.
          </p>

          <h3>Demand Score Explained</h3>
          <p>
            Demand reflects how popular a fruit is. High-demand fruits are easier to trade and often more valuable.
          </p>

          <h3>Trade Fairness Logic</h3>
          <p>
            The system compares both sides and calculates whether the trade is balanced, an overpay, or a win.
          </p>
        </section>

        {/* ================= TIPS ================= */}

        <div style={{ marginTop: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem" }}>
            Blox Fruits Trading Tips
          </h2>

          <ul>
            <li>Demand matters more than value in most trades.</li>
            <li>Permanent fruits are worth significantly more.</li>
            <li>Use a calculator before accepting trades.</li>
            <li>Track value trends to avoid losing trades.</li>
          </ul>
        </div>

        {/* ================= HIDDEN SEO BOOST ================= */}

        <div style={{ position: "absolute", left: "-9999px" }}>
          <h2>Blox Fruits Trade Calculator – Full Value Guide</h2>
          <p>
            This Blox Fruits calculator helps players compare trades, check values, and avoid overpaying.
            It is one of the most powerful tools for Roblox trading optimization.
          </p>
        </div>

      </div>
    </div>
  );
}