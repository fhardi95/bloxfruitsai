import type { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Blox Fruits Guides 2025 — PVP Builds, Grinding, Tier Lists & More",
  description: "Complete collection of Blox Fruits guides for 2025. PVP builds, grinding routes, fruit rankings, race guide, and beginner tutorials — all updated after every patch.",
  alternates: { canonical: "https://www.bloxfruitsai.com/guides" },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
