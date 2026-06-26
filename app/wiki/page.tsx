import type { Metadata } from "next";
import WikiClient from "./WikiClient";

export const metadata: Metadata = {
  title: "Blox Fruits Wiki — 47 Fruits, All Moves, Builds & Values 2026",
  description:
    "Blox Fruits wiki with 47 devil fruits — full moveset (Z/X/C/V/F), PVP & PVE tier, best builds, trade value, and demand score for every fruit. Updated 2026.",
  alternates: { canonical: "https://www.bloxfruitsai.com/wiki" },
  openGraph: {
    title: "Blox Fruits Wiki — 47 Fruits, All Moves, Builds & Values 2026",
    description:
      "Blox Fruits wiki with 47 devil fruits — full moveset, PVP & PVE tier, best builds, trade value and demand score for every fruit. Updated 2026.",
    url: "https://www.bloxfruitsai.com/wiki",
    type: "website",
  },
};

export default function WikiPage() {
  return <WikiClient />;
}
