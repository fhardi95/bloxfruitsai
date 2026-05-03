import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, StepList } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Guide Débutant Blox Fruits 2025 — Commencer ici",
  description: "Nouveau sur Blox Fruits ? Ce guide complet pour débutants couvre tout — premier fruit, stats, Haki, progression par mer et comment atteindre le niveau maximum efficacement en 2025.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides/beginner-guide" },
};

export default function BeginnerGuidePage() {
  return (
    <GuideLayout
      tag="Guide Débutant · Commencer Ici"
      title="Guide Débutant"
      titleHighlight="Blox Fruits 2025"
      description="Tu n'as jamais joué à Blox Fruits ? Ce guide couvre tout ce que tu dois savoir — de ton tout premier fruit au niveau maximum. Écrit pour les vrais débutants en 2025."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Guide Débutant", href: "/guides/beginner-guide" }]}
      readTime="14 min de lecture"
    >
      <GuideSection title="Qu'est-ce que Blox Fruits ?" icon="🎮">
        <p style={{ marginBottom: "1rem" }}>Blox Fruits est un jeu Roblox inspiré de l'anime One Piece. Tu fais monter en niveau ton personnage, manges des fruits diaboliques pour obtenir des pouvoirs spéciaux, et explores trois mers remplies d'ennemis, de boss et d'autres joueurs. L'objectif est d'atteindre le niveau maximum (actuellement 2550), débloquer les capacités les plus puissantes et dominer en PVP.</p>
        <InfoBox type="info">Blox Fruits est l'un des jeux Roblox les plus joués de tous les temps, avec des milliards de visites. Les mises à jour arrivent régulièrement — notre tier list et liste de valeurs se mettent à jour après chaque patch pour te maintenir à jour.</InfoBox>
      </GuideSection>

      <GuideSection title="Commencer — Les 30 Premières Minutes" icon="🚀" accent="cyan">
        <StepList steps={[
          { title: "Choisis ta voie de départ", desc: "Tu commences sur l'Île de Départ. Parle au Marchand de Fruits Blox pour acheter ton premier fruit. Pour les débutants, Glace ou Magma sont des options abordables et puissantes en début de jeu." },
          { title: "Complète ta première quête", desc: "Parle au Donneur de Quête (l'icône point d'exclamation). Aie toujours une quête active — sans quête, tu ne gagnes aucun bonus d'XP des kills." },
          { title: "Comprends les stats", desc: "Tu obtiens des points de stats à chaque niveau. En début de jeu : mets des points en Corps à Corps (si tu utilises un style de combat), en Fruit (si tu utilises ton fruit diabolique), ou en Défense. Ne les disperse pas." },
          { title: "Mange un fruit diabolique", desc: "Achètes-en un chez le Marchand ou trouve-en un qui apparaît aléatoirement dans le monde (ils apparaissent sous les arbres chaque heure). Le manger te donne des pouvoirs spéciaux." },
          { title: "Débloque des Épées", desc: "Les épées sont ton attaque M1 principale. Obtiens le Coutelas chez le Marchand d'Épées sur l'Île de Départ. Aie toujours une épée équipée — les attaques M1 construisent ta maîtrise." },
        ]} />
      </GuideSection>

      <GuideSection title="Comprendre les Fruits Diaboliques" icon="🍎" accent="gold">
        <p style={{ marginBottom: "1rem" }}>Les fruits diaboliques sont le cœur de Blox Fruits. Il y a trois types :</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { type: "Naturel", desc: "Type Logia. Généralement AoE et élémental. Exemples : Glace, Magma, Ténèbres. Idéal pour les débutants.", icon: "🌿", color: "var(--green)" },
            { type: "Élémental", desc: "Type Paramecia. Basé sur la transformation ou les capacités. Exemples : Dough, Tremblement, Ressort.", icon: "⚗️", color: "var(--cyan)" },
            { type: "Bête", desc: "Type Zoan. Te transforme en animaux. Généralement les plus puissants. Exemples : Dragon, Léopard, Phénix.", icon: "🦁", color: "var(--gold)" },
          ].map(t => (
            <div key={t.type} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", fontWeight: 700, color: t.color, marginBottom: 6 }}>{t.type}</div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
        <InfoBox type="tip">Pour ton premier fruit, achète <strong>Magma</strong> chez le Marchand de Fruits Blox (~850K Beli). Il est puissant jusqu'en Mer 3 et excellent pour le farm comme le PVE. Il ne te décevra pas comme fruit de départ.</InfoBox>
      </GuideSection>

      <GuideSection title="Guide de Répartition des Stats" icon="📈" accent="cyan">
        <p style={{ marginBottom: "1rem" }}>Les points de stats sont permanents — dépense-les judicieusement. Voici la répartition recommandée en début de jeu :</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { stat: "Fruit / Blox Fruit", pct: "60%", desc: "Augmente les dégâts de tes mouvements de fruit. Maxe ça si tu utilises ton fruit comme source principale de dégâts.", color: "var(--cyan)" },
            { stat: "Défense / Corps à Corps", pct: "25%", desc: "Augmente tes PV et ta réduction de dégâts. Essentiel pour la survie en Mer 2 et au-delà.", color: "#2ed573" },
            { stat: "Épée", pct: "15%", desc: "N'investis ici que si tu prévois d'utiliser l'épée comme principale. Sinon, ignore complètement.", color: "var(--gold)" },
          ].map(s => (
            <div key={s.stat} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", fontWeight: 700, color: s.color, minWidth: 48 }}>{s.pct}</div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem", marginBottom: 2 }}>{s.stat}</div>
                <div style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <InfoBox type="warning">Tu peux réinitialiser tes stats grâce à un objet de reset dans la boutique du jeu. Ne stresse pas trop au début — un reset est toujours disponible si tu fais une erreur.</InfoBox>
      </GuideSection>

      <GuideSection title="Les Trois Mers — Chemin de Progression" icon="🗺️" accent="gold">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { sea: "Mer 1", range: "Niveau 1–700", color: "var(--green)", desc: "De l'île de départ aux Skylands et au Colosseum. Concentre-toi sur les quêtes, l'apprentissage de tes mouvements et les premières améliorations d'épée.", tips: ["Fais chaque quête au moins une fois", "Obtiens ton premier style de combat du Maître des Auras", "Débloque le Buso Haki avant de quitter la Mer 1"] },
            { sea: "Mer 2", range: "Niveau 700–1500", color: "var(--cyan)", desc: "Kingdom of Rose et îles environnantes. Meilleurs ennemis, quêtes plus complexes et accès aux premiers boss raids. C'est ici que tu te sérialises sur ton build.", tips: ["Débloque le Haki d'Observation (Ken) dès que possible", "Complète la chaîne de quêtes du Colosseum pour des fragments", "Commence à farmer des fragments pour l'éveil de fruit"] },
            { sea: "Mer 3", range: "Niveau 1500–2550", color: "var(--gold)", desc: "L'endgame. Haunted Castle, Castle on the Sea et Élites Pirates. La Race V4, l'éveil de fruit V2 et le PVP deviennent le focus principal. Les meilleures récompenses et fruits les plus rares sont ici.", tips: ["Éveille ton fruit — la différence est massive", "Obtiens ta Race V4 depuis l'Île du Mousquetaire", "Rejoins un équipage pour les boss Elite Raids"] },
          ].map(s => (
            <div key={s.sea} style={{ background: "var(--bg-card)", border: `1px solid ${s.color}30`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "0.9rem 1.25rem", background: `${s.color}08`, borderBottom: `1px solid ${s.color}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: s.color }}>{s.sea}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "'Orbitron',monospace" }}>{s.range}</span>
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "0.75rem" }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {s.tips.map(tip => (
                    <div key={tip} style={{ display: "flex", gap: 8, fontSize: "0.83rem" }}>
                      <span style={{ color: s.color, flexShrink: 0 }}>✓</span>
                      <span style={{ color: "var(--text-muted)" }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideLayout>
  );
}
