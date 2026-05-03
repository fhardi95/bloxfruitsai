import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Classement des Fruits Blox Fruits 2025 — Tier List Complète",
  description: "Classement complet des fruits diaboliques Blox Fruits pour 2025. Chaque fruit évalué en PVP, PVE, farm et valeur d'échange. Mis à jour après chaque patch.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides/fruit-rankings" },
};

const TIER_ITEMS: Record<string, { emoji: string; name: string; note: string }[]> = {
  S: [
    { emoji: "🐉", name: "Dragon", note: "Mobilité + AoE incomparables. Le meilleur all-rounder du jeu. Tier S PVP et PVE." },
    { emoji: "🐆", name: "Léopard", note: "Burst damage le plus élevé en PVP. Combos ultra-rapides. Le plus difficile à maîtriser mais aussi le plus récompensant." },
    { emoji: "🦊", name: "Kitsune", note: "Dernier mythique. Capacités de renard spirituel avec énormes dégâts AoE. Monte rapidement dans le méta." },
    { emoji: "☠️", name: "Venom", note: "Les mares de poison contrent les healers. Dégâts exceptionnels contre les boss. Tier S PVE." },
    { emoji: "🌑", name: "Ombre", note: "Le mode Umbra transforme entièrement le kit. Excellente extension de combos et zone denial." },
  ],
  A: [
    { emoji: "🥐", name: "Dough", note: "Choix PVP consistant. Mouvements rapides, bons dégâts, hitboxes forgiving." },
    { emoji: "❄️", name: "Blizzard", note: "Meilleur élémental pour les deux modes. Gel + AoE est dévastateur." },
    { emoji: "🔥", name: "Phénix", note: "La régénération passive en fait le meilleur fruit de sustain. Idéal pour le farm de boss." },
    { emoji: "⚡", name: "Tonnerre", note: "Vitesse et stuns excellent pour le PVP hit-and-run. Haute mobilité." },
    { emoji: "🔔", name: "Buddha", note: "Le roi incontesté du farm. Hitbox massive, incroyable utilité PVE." },
    { emoji: "🌋", name: "Magma", note: "Les dégâts de sol sont passifs et dévastateurs. Meilleur fruit pour farm de Beli." },
  ],
  B: [
    { emoji: "🕷️", name: "Araignée", note: "Les toiles pour zone denial. Surprenamment efficace entre de bonnes mains." },
    { emoji: "💨", name: "Gaz", note: "Les zones de gaz AoE font bien pression. Fort en PVP d'équipe." },
    { emoji: "💢", name: "Douleur", note: "La réflexion de dégâts et l'utilité en font un pick de niche efficace." },
    { emoji: "🌒", name: "Ténèbres", note: "Les trous noirs sont bons pour les combos. Kit all-round décent." },
    { emoji: "🧊", name: "Glace", note: "Élémental fiable. Bon pour les nouveaux joueurs apprenant Blox Fruits." },
  ],
  C: [
    { emoji: "🌊", name: "Tremblement", note: "Les shockwaves couvrent bien l'espace mais sont très lentes et prévisibles." },
    { emoji: "🌸", name: "Ressort", note: "Le kit rebondissant a une courbe d'apprentissage mais manque de profondeur au haut niveau." },
    { emoji: "🛡️", name: "Barrière", note: "Les boucliers sont situationnellement utiles mais le kit est trop passif globalement." },
    { emoji: "💭", name: "Fumée", note: "Placeholder early game uniquement. À remplacer dès que possible." },
  ],
  D: [
    { emoji: "🔪", name: "Chop", note: "L'immunité aux épées est le seul avantage. Kit extrêmement faible." },
    { emoji: "💣", name: "Bombe", note: "Dégâts médiocres. Complètement surpassé par toutes les autres options." },
    { emoji: "🌀", name: "Spin", note: "Aucune viabilité compétitive. À éviter à tout prix." },
    { emoji: "🚀", name: "Fusée", note: "Le fruit le plus faible de Blox Fruits. Utile uniquement comme matériau de vente." },
  ],
};

function TierCard({ tier, label, items }: { tier: string; label: string; items: { emoji: string; name: string; note: string }[] }) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    S: { bg: "rgba(255,215,0,0.1)", color: "#ffd700", border: "rgba(255,215,0,0.35)" },
    A: { bg: "rgba(0,245,255,0.09)", color: "#00f5ff", border: "rgba(0,245,255,0.28)" },
    B: { bg: "rgba(46,213,115,0.09)", color: "#2ed573", border: "rgba(46,213,115,0.28)" },
    C: { bg: "rgba(255,165,2,0.09)", color: "#ffa502", border: "rgba(255,165,2,0.28)" },
    D: { bg: "rgba(255,71,87,0.08)", color: "#ff4757", border: "rgba(255,71,87,0.2)" },
  };
  const c = colors[tier];
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 900, color: c.color }}>{tier}</div>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map(item => (
          <div key={item.name} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{item.emoji}</span>
            <div>
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{item.name}</span>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", marginTop: 2 }}>{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FruitRankingsPage() {
  return (
    <GuideLayout
      tag="Classement Fruits · Avril 2025"
      title="Classement des"
      titleHighlight="Fruits 2025"
      description="Chaque fruit diabolique de Blox Fruits classé en PVP, PVE, efficacité de farm et valeur d'échange. Mis à jour par notre IA après chaque patch avec données réelles."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Classement des Fruits", href: "/guides/fruit-rankings" }]}
      readTime="15 min de lecture"
    >
      <GuideSection title="Comment on Classe les Fruits" icon="📊">
        <p style={{ marginBottom: "1rem" }}>Notre IA analyse quatre dimensions pour chaque fruit : performance PVP (dégâts, mobilité, combos), efficacité PVE (dégâts boss, AoE, sustain), efficacité de farm (XP/hr, facilité d'utilisation), et valeur d'échange (demande, rareté, stabilité du prix).</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
          {[
            { label: "Poids PVP", val: "35%", color: "var(--cyan)" },
            { label: "Poids PVE", val: "30%", color: "#2ed573" },
            { label: "Farm", val: "20%", color: "var(--gold)" },
            { label: "Valeur Échange", val: "15%", color: "#a78bfa" },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.2rem", fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="Tier List Globale — Avril 2025" icon="🏆" accent="gold">
        {Object.entries(TIER_ITEMS).map(([tier, items]) => {
          const labels: Record<string, string> = { S: "God Tier — Indispensable", A: "Top Tier — Excellent Choix", B: "Solide — Vaut le coup", C: "Moyen — À améliorer dès que possible", D: "À éviter — Ne pas utiliser" };
          return <TierCard key={tier} tier={tier} label={labels[tier]} items={items} />;
        })}
      </GuideSection>

      <GuideSection title="Meilleurs Fruits par Utilisation" icon="🎯" accent="cyan">
        <InfoBox type="info">Différents fruits excellent dans différents scénarios. Utilise ce tableau pour trouver le meilleur fruit selon ton objectif spécifique.</InfoBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.75rem" }}>
          {[
            { use: "Meilleur PVP Global", fruits: "Dragon, Léopard, Dough", icon: "⚔️" },
            { use: "Meilleur pour le Farm", fruits: "Buddha, Magma, Dragon", icon: "🔄" },
            { use: "Meilleur Boss Farm", fruits: "Venom, Phénix, Buddha", icon: "👹" },
            { use: "Meilleur pour Débutants", fruits: "Glace, Magma, Phénix", icon: "🎮" },
            { use: "Meilleure Valeur Échange", fruits: "Kitsune, Dragon, Léopard", icon: "💱" },
            { use: "Meilleure Mobilité", fruits: "Dragon, Kitsune, Tonnerre", icon: "💨" },
          ].map(r => (
            <div key={r.use} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: 6 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", marginBottom: 4 }}>{r.use}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--cyan)" }}>{r.fruits}</div>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
