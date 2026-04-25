"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FRUITS, formatValue, type Fruit } from "../../lib/fruits-data";

type TradeItem = { fruit: Fruit; qty: number };
type Side = "you" | "them";

function SearchModal({ onSelect, onClose }: { onSelect: (f: Fruit) => void; onClose: () => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q) return FRUITS.slice(0, 16);
    return FRUITS.filter(f => f.name.toLowerCase().includes(q.toLowerCase())).slice(0, 20);
  }, [q]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(2,8,16,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", color: "var(--cyan)" }}>Select Item</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        </div>
        <div style={{ padding: "0.75rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search fruits, gamepasses..." style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }} />
        </div>
        <div style={{ overflowY: "auto", padding: "0.5rem" }}>
          {results.map(f => (
            <button key={f.id} onClick={() => { onSelect(f); onClose(); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "0.75rem 1rem", background: "none", border: "none", cursor: "pointer", borderRadius: 10, transition: "background 0.15s", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(0,245,255,0.07)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "none"}
            >
              <span style={{ fontSize: "1.5rem" }}>{f.emoji}</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{f.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{f.rarity} · {f.type}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", color: "var(--cyan)", fontWeight: 700 }}>{formatValue(f.value)}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Demand: {f.demand}/10</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TradeColumn({ side, items, onAdd, onRemove }: { side: Side; items: TradeItem[]; onAdd: (f: Fruit) => void; onRemove: (id: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const totalValue = items.reduce((s, i) => s + i.fruit.value, 0);
  const totalRobux = items.reduce((s, i) => s + i.fruit.permanentValue, 0);
  const avgDemand = items.length ? (items.reduce((s, i) => s + i.fruit.demand, 0) / items.length) : 0;
  const isYou = side === "you";

  return (
    <>
      {modalOpen && <SearchModal onSelect={onAdd} onClose={() => setModalOpen(false)} />}
      <div style={{ flex: 1, minWidth: 280, background: "var(--bg-card)", border: `1px solid ${isYou ? "rgba(0,245,255,0.25)" : "rgba(255,215,0,0.2)"}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "1.25rem 1.5rem", background: isYou ? "rgba(0,245,255,0.06)" : "rgba(255,215,0,0.05)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: isYou ? "var(--cyan)" : "var(--gold)" }}>{isYou ? "YOUR OFFER" : "THEIR OFFER"}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.72rem", color: "var(--text-muted)" }}>TOTAL VALUE</div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: isYou ? "var(--cyan)" : "var(--gold)" }}>{formatValue(totalValue)}</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
          {[
            { label: "Value", val: formatValue(totalValue) },
            { label: "Robux", val: totalRobux.toLocaleString() },
            { label: "Demand", val: `${avgDemand.toFixed(1)}/10` },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, padding: "0.75rem 0", textAlign: "center", borderRight: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 700, color: "var(--text)" }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Items */}
        <div style={{ flex: 1, padding: "1rem", display: "flex", flexDirection: "column", gap: 8, minHeight: 200 }}>
          {items.length === 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 120, color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 10 }}>
              Add items to this side
            </div>
          )}
          {items.map(item => (
            <div key={item.fruit.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.65rem 0.9rem", position: "relative" }}>
              <span style={{ fontSize: "1.4rem" }}>{item.fruit.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.fruit.name}</div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.fruit.rarity} · Demand {item.fruit.demand}/10</div>
              </div>
              <div style={{ textAlign: "right", marginRight: 8 }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", color: isYou ? "var(--cyan)" : "var(--gold)", fontWeight: 700 }}>{formatValue(item.fruit.value)}</div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{item.fruit.permanentValue.toLocaleString()} R$</div>
              </div>
              <button onClick={() => onRemove(item.fruit.id)} style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,71,87,0.15)", border: "1px solid rgba(255,71,87,0.3)", color: "var(--red)", fontSize: "0.65rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
            </div>
          ))}
        </div>

        {/* Add button */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--border)" }}>
          <button onClick={() => setModalOpen(true)} disabled={items.length >= 4} style={{ width: "100%", padding: "10px", background: "transparent", border: `1px dashed ${isYou ? "rgba(0,245,255,0.3)" : "rgba(255,215,0,0.25)"}`, borderRadius: 10, color: isYou ? "var(--cyan)" : "var(--gold)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: items.length >= 4 ? "not-allowed" : "pointer", transition: "all 0.2s", opacity: items.length >= 4 ? 0.4 : 1 }}>
            + Add Item {items.length > 0 && `(${items.length}/4)`}
          </button>
        </div>
      </div>
    </>
  );
}

function Verdict({ youVal, themVal, youDemand, themDemand }: { youVal: number; themVal: number; youDemand: number; themDemand: number }) {
  if (youVal === 0 && themVal === 0) return (
    <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", fontSize: "0.9rem" }}>
      Add items to both sides to see the verdict
    </div>
  );

  const valueDiff = themVal - youVal;
  const pct = youVal > 0 ? Math.abs(valueDiff / youVal) * 100 : 0;
  const demandScore = (youDemand + themDemand) / 2;

  let verdict: string, color: string, emoji: string, desc: string;
  if (youVal === 0 || themVal === 0) { verdict = "Incomplete"; color = "var(--text-muted)"; emoji = "⚖️"; desc = "Add items to both sides"; }
  else if (pct <= 8) { verdict = "Fair Trade"; color = "var(--green)"; emoji = "✅"; desc = `Values are within ${pct.toFixed(1)}% — this is a fair deal!`; }
  else if (valueDiff > 0) { verdict = "You're Underpaying"; color = "var(--cyan)"; emoji = "🎉"; desc = `You're getting ${formatValue(valueDiff)} more in value — great deal for you!`; }
  else { verdict = "You're Overpaying"; color = "var(--red)"; emoji = "⚠️"; desc = `You're giving ${formatValue(Math.abs(valueDiff))} more than you're getting. Consider a better offer.`; }

  const barWidth = youVal > 0 && themVal > 0 ? (youVal / (youVal + themVal)) * 100 : 50;

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.3rem", fontWeight: 700, color, marginBottom: "0.4rem" }}>{verdict}</div>
      <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{desc}</p>

      {/* Value bar */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.75rem" }}>
          <span style={{ color: "var(--cyan)" }}>Your offer: {formatValue(youVal)}</span>
          <span style={{ color: "var(--gold)" }}>Their offer: {formatValue(themVal)}</span>
        </div>
        <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 5, overflow: "hidden", display: "flex" }}>
          <div style={{ width: `${barWidth}%`, background: "var(--cyan)", transition: "width 0.5s ease" }} />
          <div style={{ flex: 1, background: "var(--gold)" }} />
        </div>
      </div>

      {/* Difference */}
      {youVal > 0 && themVal > 0 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: "0.8rem" }}>
            Δ Value: <strong style={{ color: valueDiff >= 0 ? "var(--green)" : "var(--red)" }}>{valueDiff >= 0 ? "+" : ""}{formatValue(valueDiff)}</strong>
          </span>
          <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: "0.8rem" }}>
            Avg Demand: <strong style={{ color: demandScore >= 7 ? "var(--green)" : demandScore >= 4 ? "var(--orange)" : "var(--red)" }}>{demandScore.toFixed(1)}/10</strong>
          </span>
          <span style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "4px 14px", fontSize: "0.8rem" }}>
            Ratio: <strong style={{ color: "var(--text)" }}>{youVal > 0 ? (themVal / youVal).toFixed(2) : "—"}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

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
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,rgba(0,245,255,0.04),transparent)", borderBottom: "1px solid var(--border)", padding: "3rem 5% 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "var(--cyan)" }}>Trade Calculator</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "3px 12px", borderRadius: 50, marginBottom: "0.75rem" }}>Trade Analysis</div>
              <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Trade <span style={{ color: "var(--cyan)" }}>Calculator</span>
              </h1>
        <div>
          <h3 style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "3px 12px", borderRadius: 50, marginBottom: "0.75rem" }}>
            Blox Fruits Trade Analysis Tool
          </h3>
		  
		  
          <h2 style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "1rem", marginBottom: "0.5rem" }}>
            Check trade fairness, fruit values, demand scores, and Robux prices instantly
          </h2>

          <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            The <strong>Blox Fruits Value Calculator</strong> helps players analyze trades in Roblox Blox Fruits with precision. 
            Compare fruit values, demand levels, and in-game prices to see if your trade is fair or profitable. 
            This powerful <strong>Blox Fruits trade calculator</strong> gives real-time insights so you can avoid bad trades 
            and maximize your value every time.
          </p>
        </div>
		  
		  
		  
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={reset} style={{ background: "transparent", border: "1px solid rgba(255,71,87,0.35)", color: "var(--red)", padding: "10px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,71,87,0.08)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >Reset</button>
              <Link href="/values" style={{ background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan)", padding: "10px 18px", borderRadius: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>View Values</Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 5%" }}>
        {/* Trade Columns */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <TradeColumn side="you" items={youItems} onAdd={f => addItem("you", f)} onRemove={id => removeItem("you", id)} />

          {/* VS divider */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: 50, padding: "1rem 0" }}>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.4rem", fontWeight: 900, color: "var(--text-muted)", padding: "8px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12 }}>VS</div>
          </div>

          <TradeColumn side="them" items={themItems} onAdd={f => addItem("them", f)} onRemove={id => removeItem("them", id)} />
        </div>

        {/* Verdict */}
        <Verdict youVal={youVal} themVal={themVal} youDemand={youDemand} themDemand={themDemand} />

        {/* Tips */}
        <div style={{ marginTop: "1.5rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.8rem", color: "var(--cyan)", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>TRADING TIPS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "0.75rem" }}>
            {["Demand matters more than raw value — a high-demand fruit is easier to trade away.","Permanent fruits are worth significantly more than regular versions.","S-tier fruits like Dragon and Leopard always have trading power regardless of meta shifts.","Check the trend indicator — rising fruits gain value; falling fruits may drop further."].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "var(--cyan)", fontSize: "0.85rem", marginTop: 2, flexShrink: 0 }}>◆</span>
                <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.84rem", lineHeight: 1.6 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
