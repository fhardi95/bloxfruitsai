import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Guide des Races Blox Fruits 2025 — Tier List & Éveils V4",
  description: "Guide complet des races Blox Fruits pour 2025. Tier list des meilleures races, prérequis pour l'éveil V4 et quelle race s'associe le mieux avec chaque build.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides/race-guide" },
};

const RACES = [
  { name: "Cyborg", v1: "Défense améliorée et laser pectoral.", v2: "Laser amélioré et bouclier d'énergie passif.", v3: "Combinaison Cyborg complète avec ailes mécaniques et résistance aux dégâts supérieure.", v4: "Mode Machine : buff défensif massif, canon à énergie, quasi-invulnérabilité pendant 30 secondes.", bestWith: "Venom, Dragon", icon: "🤖" },
  { name: "Ghoul", v1: "Vol de vie à chaque coup — idéal pour le sustain.", v2: "Taux de vol de vie amélioré + boost de vitesse la nuit.", v3: "Forme Faucheur avec capacité faux et vol de vie en AoE.", v4: "Mode Mort : vol de vie amplifié, aura de peur, dégâts massifs en bas de vie.", bestWith: "Dragon, Dough", icon: "👻" },
  { name: "Humain", v1: "Stats de base, aucun passif spécial.", v2: "+5% dégâts et vitesse de déplacement.", v3: "+10% bonus global de stats.", v4: "Spécialisation Sniper : boost de dégâts à distance massif, immunité aux reculs.", bestWith: "N'importe quel / Builds PVP", icon: "👤" },
  { name: "Ange", v1: "Capacités de glisse et de vol débloquées plus tôt.", v2: "Attaque de blast sacré et amélioration de vitesse.", v3: "Ailes d'ange complètes avec aura de soin pour les alliés proches.", v4: "Mode Séraphin : rayon divin, vitesse de vol doublée, soin de groupe.", bestWith: "Phénix, Blizzard", icon: "😇" },
  { name: "Lapin", v1: "Vitesse de déplacement de base la plus rapide du jeu.", v2: "Vitesse améliorée + capacité de dash rapide.", v3: "L'amplification de vitesse te rend quasi insaisissable.", v4: "Mode Flash : vitesse niveau téléportation, immunité aux effets de ralentissement, dashes avec traînée.", bestWith: "Léopard, Tonnerre", icon: "🐰" },
  { name: "Requin", v1: "Immunité à l'eau — peut nager à pleine vitesse.", v2: "Vitesse de nage + boost de dégâts d'attaque aquatique.", v3: "Avantage en combat sous-marin + dash torpille.", v4: "Forme Léviathan : AoE aquatique dévastatrice, immunité totale à l'eau, invocation de beast des mers.", bestWith: "Blizzard, Magma", icon: "🦈" },
];

export default function RaceGuidePage() {
  return (
    <GuideLayout
      tag="Guide Races · Tous les Éveils V4"
      title="Guide des Races &"
      titleHighlight="Éveils V4"
      description="Chaque race de Blox Fruits classée et expliquée — de V1 à l'éveil V4. Découvre quelle race s'associe le mieux avec ton build et comment débloquer V4 efficacement."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Guide des Races", href: "/guides/race-guide" }]}
      readTime="11 min de lecture"
    >
      <GuideSection title="Tier List des Races 2025" icon="🏆" accent="gold">
        <InfoBox type="info">Les races affectent significativement ton style de jeu. Choisir la bonne race selon ton fruit peut te donner un avantage décisif en PVP et en PVE.</InfoBox>
        {[
          { tier: "S", label: "Meilleures Races", color: "#ffd700", items: [{ icon: "🤖", name: "Cyborg V4", note: "Le mode Machine est le meilleur racial défensif du jeu. Essentiel pour les builds PVP tanky." }, { icon: "🐰", name: "Lapin V4", note: "La vitesse du mode Flash est inégalée. S'associe parfaitement avec des fruits à mobilité comme Léopard et Tonnerre." }] },
          { tier: "A", label: "Excellentes", color: "#00f5ff", items: [{ icon: "👻", name: "Ghoul V4", note: "Le vol de vie du mode Mort en bas de vie peut complètement retourner les combats. Excellent avec Dragon." }, { icon: "🦈", name: "Requin V4", note: "L'AoE de la forme Léviathan est massive. Meilleure pour le contenu maritime et le PVP d'équipe." }] },
          { tier: "B", label: "Bonnes", color: "#2ed573", items: [{ icon: "😇", name: "Ange V4", note: "Le soin du Séraphin est excellent en jeu d'équipe. Moins impactant en PVP solo." }, { icon: "👤", name: "Humain V4", note: "Le boost de dégâts Sniper est de niche. Bon pour les builds à distance spécifiques mais surpassé globalement." }] },
        ].map(t => (
          <div key={t.tier} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${t.color}18`, border: `1px solid ${t.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron',monospace", fontSize: "0.9rem", fontWeight: 900, color: t.color }}>{t.tier}</div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.label}</span>
            </div>
            {t.items.map(item => (
              <div key={item.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", display: "flex", gap: 12, marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.icon}</span>
                <div><div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{item.name}</div><p style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{item.note}</p></div>
              </div>
            ))}
          </div>
        ))}
      </GuideSection>

      <GuideSection title="Toutes les Races — V1 à V4" icon="📖">
        <InfoBox type="info">L'éveil V4 nécessite de compléter l'épreuve de race sur l'Île du Mousquetaire — un parcours chronométré unique à chaque race. Tu dois être au moins Niveau 2000 pour le tenter.</InfoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {RACES.map(r => (
            <div key={r.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "1rem 1.25rem", background: "rgba(0,245,255,0.04)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
                  <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700 }}>{r.name}</span>
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--cyan)", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 20, padding: "3px 12px" }}>Meilleur avec : {r.bestWith}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 0 }}>
                {([["V1", r.v1], ["V2", r.v2], ["V3", r.v3], ["V4 ★", r.v4]] as [string, string][]).map(([v, desc], i) => (
                  <div key={v} style={{ padding: "0.85rem 1rem", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 700, color: v.includes("4") ? "var(--gold)" : "var(--cyan)", marginBottom: 4 }}>{v}</div>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Comment Débloquer V4" icon="🔓" accent="cyan">
        <InfoBox type="warning">V4 nécessite le Niveau 2000+ et compléter l'épreuve spécifique à ta race sur l'Île du Mousquetaire. Chaque épreuve est différente — Lapin est un parcours de vitesse, Requin requiert du combat sous-marin, etc.</InfoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { step: "Atteindre le Niveau 2000+", desc: "Les épreuves V4 sont verrouillées tant que tu n'as pas atteint le seuil de niveau. Grinde jusqu'au max d'abord." },
            { step: "Visiter l'Île du Mousquetaire", desc: "Située en Mer 3. Parle au PNJ correspondant à ta race pour commencer l'épreuve." },
            { step: "Compléter l'épreuve de race", desc: "Chaque épreuve a une limite de 3 minutes. Entraîne-toi sur la route avant de tenter pour de vrai." },
            { step: "Récupérer l'objet d'éveil", desc: "Après la complétion, tu reçois l'objet core V4. Équipe-le pour débloquer V4 définitivement." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron',monospace", fontSize: "0.7rem", fontWeight: 700, color: "var(--cyan)", flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: 2 }}>{s.step}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
