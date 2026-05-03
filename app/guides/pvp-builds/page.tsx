import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, StepList } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Meilleurs Builds PVP Blox Fruits 2025 — Guide Complet",
  description: "Les meilleurs builds PVP Blox Fruits pour 2025. Dragon, Léopard, Kitsune — configurations complètes avec stats, style de combat, épée et Haki pour dominer chaque combat.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides/pvp-builds" },
};

const BUILDS = [
  {
    name: "Dragon — Tout Terrain", tier: "S", icon: "🐉", fruit: "Dragon", style: "Electric / Death Step", sword: "True Triple Katana", haki: "Ken V2 + Buso V2",
    stats: { fruit: 2500, melee: 2500, defense: 1500, sword: 0 },
    pros: ["Mobilité aérienne incomparable", "Dégâts AoE massifs", "Polyvalent PVP et PVE"],
    cons: ["Difficile à maîtriser", "Coût élevé en Robux"],
    combo: "Z (Dragon Fang) → X (Dragon Breath) → C (Infernal Dragon) → Electric Claw Z → M1 spam",
  },
  {
    name: "Léopard — PVP Pur", tier: "S", icon: "🐆", fruit: "Léopard", style: "Death Step", sword: "Yama", haki: "Ken V2 + Buso V2",
    stats: { fruit: 2500, melee: 2000, defense: 1000, sword: 0 },
    pros: ["Burst damage le plus élevé du jeu", "Combos ultra-rapides", "Mobilité excellente"],
    cons: ["Courbe d'apprentissage très élevée", "Peu efficace en PVE"],
    combo: "Z (Leopard Barrage) → Death Step Z → X (Leopard Rush) → C → M1",
  },
  {
    name: "Dough — Équilibré", tier: "A", icon: "🥐", fruit: "Dough", style: "Electric Fighting Style", sword: "True Triple Katana", haki: "Ken V2 + Buso V2",
    stats: { fruit: 2000, melee: 2500, defense: 1500, sword: 0 },
    pros: ["Hitboxes collantes très forgiving", "Bon dégâts consistants", "Accessible aux débutants PVP"],
    cons: ["Moins de mobilité que Dragon/Léopard", "Méta moins dominant qu'avant"],
    combo: "X (Dough Launcher) → Electric Z → Z (Dough Fist) → M1 combo → C finisher",
  },
];

export default function PvpBuildsPage() {
  return (
    <GuideLayout
      tag="Guide PVP · Méta 2025"
      title="Meilleurs Builds"
      titleHighlight="PVP 2025"
      description="Configurations complètes PVP pour les meilleurs fruits en 2025. Stats, style de combat, épée et Haki — tout ce qu'il faut pour dominer chaque serveur."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Builds PVP", href: "/guides/pvp-builds" }]}
      readTime="12 min de lecture"
    >
      <GuideSection title="Règles de Base du PVP" icon="⚔️">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
          {[
            "Ken Haki (Observation) est OBLIGATOIRE en PVP — il te permet d'esquiver les attaques automatiquement.",
            "Buso Haki V2 augmente tes dégâts de 15% et te permet d'attaquer les joueurs en mode Elemental.",
            "La gestion d'énergie est cruciale — ne gaspille pas toutes tes capacités dès le début du combat.",
            "La mobilité bat souvent les dégâts — un joueur mobile qui harcèle est plus difficile à battre qu'un joueur statique puissant.",
            "Pratique tes combos dans une zone privée avant de PVP — la mémoire musculaire fait toute la différence.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0 }}>◆</span>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{tip}</p>
            </div>
          ))}
        </div>
        <InfoBox type="tip">Le style de combat le plus polyvalent pour le PVP est Electric Fighting Style — bonne vitesse, bon combo extension, et accessible à mid-game.</InfoBox>
      </GuideSection>

      <GuideSection title="Top 3 Builds PVP 2025" icon="🏆" accent="gold">
        {BUILDS.map(b => (
          <div key={b.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", marginBottom: "1.25rem" }}>
            <div style={{ padding: "1rem 1.25rem", background: "rgba(0,245,255,0.04)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.5rem" }}>{b.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700 }}>{b.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Fruit: {b.fruit} · Style: {b.style}</div>
                </div>
              </div>
              <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.85rem", fontWeight: 900, color: "#ffd700", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 6, padding: "4px 12px" }}>Tier {b.tier}</span>
            </div>
            <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Répartition Stats</div>
                {Object.entries(b.stats).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: "0.85rem" }}>
                    <span style={{ color: "var(--text-muted)", textTransform: "capitalize" }}>{k === "fruit" ? "Fruit Blox" : k === "melee" ? "Corps à Corps" : k === "defense" ? "Défense" : "Épée"}</span>
                    <span style={{ color: "var(--cyan)", fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "0.8rem" }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Épée: </span><span style={{ color: "var(--text)" }}>{b.sword}</span>
                </div>
                <div style={{ fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-muted)" }}>Haki: </span><span style={{ color: "var(--text)" }}>{b.haki}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Points Forts / Faibles</div>
                {b.pros.map(p => <div key={p} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: "0.83rem", color: "var(--green)" }}>✓ <span style={{ color: "var(--text-muted)" }}>{p}</span></div>)}
                {b.cons.map(c => <div key={c} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: "0.83rem", color: "var(--red, #ff4757)" }}>✗ <span style={{ color: "var(--text-muted)" }}>{c}</span></div>)}
              </div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Combo Principal</div>
                <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "0.75rem", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.85rem", color: "var(--cyan)", lineHeight: 1.7 }}>{b.combo}</div>
              </div>
            </div>
          </div>
        ))}
      </GuideSection>

      <GuideSection title="Comment Débloquer le Ken Haki V2" icon="👁️" accent="cyan">
        <InfoBox type="info">Ken Haki V2 est essentiel pour le PVP compétitif. Il te donne un rayon d'esquive automatique beaucoup plus grand et la capacité de voir les joueurs invisibles.</InfoBox>
        <StepList steps={[
          { title: "Atteins le niveau 1500+", desc: "Ken Haki V2 nécessite d'avoir atteint la Mer 3 et le niveau requis. Grinde jusqu'au niveau 1500 minimum." },
          { title: "Trouve le maître Haki en Mer 3", desc: "Il se trouve sur l'île Mirage près du Château de la Mer. Il te donnera la quête de déblocage de Ken V2." },
          { title: "Complète le défi d'esquive", desc: "Tu dois esquiver un certain nombre d'attaques en utilisant le Ken de base. Pratique contre des boss plutôt que des joueurs." },
          { title: "Active et maxe Ken V2", desc: "Une fois débloqué, maîtrise le Ken en PVP. Plus tu esquives avec, plus le rayon s'améliore automatiquement." },
        ]} />
      </GuideSection>
    </GuideLayout>
  );
}
