"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#tier-list", label: "Tier List" },
    { href: "/values", label: "Value List" },
    { href: "/calculator", label: "Calculator" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5%", height: 70,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(2,8,16,0.97)" : "rgba(2,8,16,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,245,255,0.12)",
          transition: "background 0.3s",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, border: "2px solid var(--cyan)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: "rgba(0,245,255,0.08)" }}>🍎</div>
          <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 900, color: "var(--cyan)", letterSpacing: "0.04em" }}>
            BLOXFRUITS<span style={{ color: "var(--gold)" }}>AI</span>
          </span>
        </Link>

        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }} className="desktop-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} style={{
              color: pathname === l.href.split("#")[0] && !l.href.includes("#") ? "var(--cyan)" : "var(--text-muted)",
              textDecoration: "none", fontSize: "0.88rem", fontWeight: 500,
              letterSpacing: "0.07em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href.split("#")[0] && !l.href.includes("#") ? "var(--cyan)" : "var(--text-muted)")}
            >{l.label}</Link>
          ))}
          <Link href="/calculator" style={{
            background: "transparent", border: "1px solid var(--cyan)", color: "var(--cyan)",
            padding: "8px 20px", borderRadius: 6, fontFamily: "'Rajdhani',sans-serif",
            fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none", transition: "all 0.25s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--cyan)"; (e.currentTarget as HTMLElement).style.color = "var(--bg-deep)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--cyan)"; }}
          >Try Free</Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer", padding: 4, background: "none", border: "none" }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--cyan)", borderRadius: 2 }} />)}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
          background: "rgba(2,8,16,0.97)", borderBottom: "1px solid var(--border)",
          padding: "1.5rem 5%", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "1rem", fontWeight: 500, padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}
            >{l.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .desktop-links{display:none!important}
          .hamburger{display:flex!important}
        }
      `}</style>
    </>
  );
}
