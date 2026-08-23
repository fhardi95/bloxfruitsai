const TRUST_POINTS = [
  {
    icon: "🔄",
    title: "Updated Every Patch",
    text: "When Blox Fruits ships a balance change, we re-check every affected fruit's tier, moves, and value within days — not months.",
  },
  {
    icon: "📊",
    title: "Data, Not Guesswork",
    text: "Values and tiers are built from actual in-game stats, move data, and observed trading activity — not vibes or copy-pasted numbers.",
  },
  {
    icon: "🆓",
    title: "Free, No Login",
    text: "Every tool — value list, trade calculator, tier list, build guides — is free to use with no account required.",
  },
];

export default function ReviewsSection() {
  return (
    <section style={{ position: "relative", zIndex: 1, padding: "6rem 5%" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", padding: "4px 14px", borderRadius: 50, marginBottom: "1rem" }}>Why Trust This Data</span>
        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.6rem,3.5vw,2.6rem)", fontWeight: 700 }}>How We Keep It <span style={{ color: "var(--cyan)" }}>Accurate</span></h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.4rem", maxWidth: 1100, margin: "0 auto" }}>
        {TRUST_POINTS.map((t, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.75rem" }}>
            <div style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{t.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem" }}>{t.title}</h3>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
