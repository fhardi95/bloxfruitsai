import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,245,255,0.13)", padding: "3rem 5%", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <Link href="/" style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: "#00f5ff", display: "block", marginBottom: "1rem", textDecoration: "none" }}>
              BLOXFRUITS<span style={{ color: "#ffd700" }}>AI</span>
            </Link>
            <p style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.85rem", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              The smartest AI-powered companion for Roblox Blox Fruits players. Real-time tier lists, trade calculator, and build guides — updated after every patch.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["𝕏","Twitter"],["⊕","Discord"],["▶","YouTube"],["♪","TikTok"]].map(([icon, label]) => (
                <a key={label} href="#" aria-label={label} style={{ width: 36, height: 36, border: "1px solid rgba(0,245,255,0.13)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#7a96b8", textDecoration: "none" }}>{icon}</a>
              ))}
            </div>
          </div>

          {[
            { title: "Tools", links: [{ label: "AI Fruit Finder", href: "/#ai-tool" }, { label: "Tier List", href: "/#tier-list" }, { label: "Value List", href: "/values" }, { label: "Trade Calculator", href: "/calculator" }, { label: "Patch Tracker", href: "#" }] },
            { title: "Guides", links: [{ label: "PVP Builds 2025", href: "#" }, { label: "Best Grinding Routes", href: "#" }, { label: "Fruit Rankings", href: "/values" }, { label: "Race Guide", href: "#" }, { label: "Beginner Guide", href: "#" }] },
            { title: "Company", links: [{ label: "About Us", href: "#" }, { label: "Contact", href: "#" }, { label: "Blog", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Terms of Use", href: "#" }] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a96b8", marginBottom: "1rem", fontWeight: 600 }}>{col.title}</h4>
              <ul style={{ listStyle: "none" }}>
                {col.links.map(l => (
                  <li key={l.label} style={{ marginBottom: 8 }}>
                    <Link href={l.href} style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.88rem" }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(0,245,255,0.13)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", color: "#7a96b8", fontSize: "0.8rem" }}>© 2025 BloxFruitsAI.com · Not affiliated with Roblox Corporation</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(t => (
              <a key={t} href="#" style={{ color: "#7a96b8", textDecoration: "none", fontSize: "0.8rem" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        @media(max-width:900px){ .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width:600px){ .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
