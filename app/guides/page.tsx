import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Guides Blox Fruits 2026 — Builds PVP, Farm, Tier Lists & Plus",
  description: "Collection complète de guides Blox Fruits pour 2025 en français. Builds PVP, routes de farm, classement des fruits, guide des races et tutoriels débutants — mis à jour après chaque patch.",
  alternates: { canonical: "https://www.bloxfruitsai.fr/guides" },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
