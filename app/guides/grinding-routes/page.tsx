import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideSection, InfoBox, StepList } from "@/components/guides/GuideSection";

export const metadata: Metadata = {
  title: "Meilleures Routes de Farm Blox Fruits 2025 — Guide XP Complet",
  description: "Les meilleures routes de farm Blox Fruits pour chaque tranche de niveau en 2025. Maximise ton XP par heure, le farm de Beli et les drops de boss avec notre guide optimisé par IA.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides/grinding-routes" },
};

const ROUTES = [
  { range: "Niv 1–100", zone: "Île de Départ → Jungle", fruit: "N'importe quel fruit", xp: "~45K/hr", notes: "Complète toutes les quêtes avant de partir. Ne passe pas les zones de spawn Bandits et Gorilles." },
  { range: "Niv 100–300", zone: "Middle Town → Skylands", fruit: "N'importe quel / Fumée", xp: "~120K/hr", notes: "Les ennemis de Sky Island donnent beaucoup d'XP. Utilise des mouvements à distance pour farmer plus vite." },
  { range: "Niv 300–700", zone: "Barren Island → Colosseum", fruit: "Glace ou Magma", xp: "~280K/hr", notes: "Le sol de Magma nettoie des spawns entiers passivement. La chaîne de gel de Glace regroupe les ennemis." },
  { range: "Niv 700–1200", zone: "Forgotten Island → Usoapp", fruit: "Buddha ou Phénix", xp: "~520K/hr", notes: "La hitbox de Buddha nettoie des pièces entières. Reste aux PNJ du village Usoapp pour des spawns denses." },
  { range: "Niv 1200–1800", zone: "Mer 2 — Kingdom of Rose", fruit: "Buddha / Magma", xp: "~900K/hr", notes: "La chaîne de quêtes du Détective Militaire donne le meilleur XP en Mer 2. Tourne en boucle sans arrêt." },
  { range: "Niv 1800–2300", zone: "Mer 3 — Haunted Castle", fruit: "Buddha ou Dragon", xp: "~1.8M/hr", notes: "Le spawn des Élites Pirates est le meilleur spot de farm dans cette tranche. Dense et respawn rapide." },
  { range: "Niv 2300–2550", zone: "Castle on the Sea", fruit: "Dragon / Kitsune", xp: "~2.5M/hr", notes: "Meilleur farm endgame. Dragon nettoie l'étage entier en une rotation. Chemin le plus rapide vers le niveau max." },
];

export default function GrindingRoutesPage() {
  return (
    <GuideLayout
      tag="Guide Farm · Tous Niveaux"
      title="Meilleures Routes de"
      titleHighlight="Farm 2025"
      description="Routes XP et Beli optimisées pour chaque tranche de niveau. De l'île de départ au niveau maximum — sache exactement où farmer, quel fruit utiliser et quelles quêtes enchaîner."
      breadcrumb={[{ label: "Guides", href: "/guides" }, { label: "Routes de Farm", href: "/guides/grinding-routes" }]}
      readTime="10 min de lecture"
    >
      <GuideSection title="Règles Générales de Farm" icon="📋">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
          {[
            "Aie toujours une quête active — sans quête, pas de multiplicateur de bonus d'XP.",
            "Garde l'Auto-Haki ACTIVÉ pendant le farm pour gagner de la maîtrise en passif.",
            "Utilise le fruit Buddha si tu l'as — l'avantage de hitbox rend tous les spots 2-3x plus rapides.",
            "Les drops de Beli augmentent avec le niveau des ennemis — ne farme pas en dessous de ta tranche de niveau.",
            "Change de serveur si ton spot est pris — les serveurs frais ont des pools d'ennemis complets.",
          ].map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <span style={{ color: "var(--cyan)", flexShrink: 0 }}>◆</span>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{tip}</p>
            </div>
          ))}
        </div>
        <InfoBox type="tip">Le gamepass 2x Maîtrise double l'XP vers les mouvements. Si tu peux te l'offrir (499 Robux), il se rentabilise en quelques heures de farm économisées.</InfoBox>
      </GuideSection>

      <GuideSection title="Tableau des Routes Niveau par Niveau" icon="🗺️" accent="gold">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Niveau", "Zone", "Meilleur Fruit", "XP/Heure", "Notes"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROUTES.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                  <td style={{ padding: "12px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 700, whiteSpace: "nowrap" }}>{r.range}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{r.zone}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{r.fruit}</td>
                  <td style={{ padding: "12px 14px", fontFamily: "'Orbitron',monospace", fontSize: "0.82rem", color: "var(--green)", fontWeight: 700 }}>{r.xp}</td>
                  <td style={{ padding: "12px 14px", fontSize: "0.83rem", color: "var(--text-muted)", maxWidth: 260 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GuideSection>

      <GuideSection title="Farm Endgame — Castle on the Sea" icon="🏰" accent="cyan">
        <InfoBox type="info">Castle on the Sea est le spot de farm endgame #1 pour les joueurs 2300+. Avec Dragon ou Kitsune tu peux atteindre 2.5M+ XP par heure de manière consistante.</InfoBox>
        <StepList steps={[
          { title: "Prends la quête Pirate Raid", desc: "Située à l'entrée du Château. Cette quête s'enchaîne le plus vite et donne le plus d'XP par complétion à ce niveau." },
          { title: "Nettoie les ennemis du rez-de-chaussée", desc: "Utilise le mouvement Z de Dragon (Dragon Fang) pour balayer tout le couloir d'entrée en une rotation. L'AoE de Kitsune fonctionne aussi bien." },
          { title: "Monte dans la cour supérieure", desc: "Le spawn du Capitaine Maudit au niveau supérieur donne un bonus d'XP. Nettoie-le entre les boucles de quête." },
          { title: "Enchaîne les quêtes sans t'arrêter", desc: "Dès que ta quête est complète, accepte immédiatement la suivante. Zéro temps mort entre les chaînes est la clé du max XP/hr." },
          { title: "Change de serveur toutes les 30-45 minutes", desc: "Les serveurs accumulent des joueurs AFK qui réduisent les taux de spawn des ennemis. Serveurs frais = spawns complets = farm plus rapide." },
        ]} />
      </GuideSection>
    </GuideLayout>
  );
}
