import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OneSignalProvider from "@/components/OneSignalProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00f5ff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bloxfruitsai.com"),
  title: {
    default: "Blox Fruits AI — Trade Calculator, Value List & Fruit Guide 2026",
    template: "%s",
  },
  description:
    "Blox Fruits AI is the #1 tool for Roblox Blox Fruits players. Free trade calculator, live fruit value list, BFV values, tier list, and build guides — updated after every patch.",
  keywords: ["blox fruits ai","blox fruits calculator","bfv calculator","blox fruits trade calculator","blox fruits value list","bfv values","blox fruits wiki","blox fruits tier list","blox fruits guide","roblox blox fruits"],
  authors: [{ name: "BloxFruitsAI Team", url: "https://www.bloxfruitsai.com" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.bloxfruitsai.com",
    siteName: "Blox Fruits AI",
    title: "Blox Fruits AI — Best AI Guide, Tier List & Fruit Finder",
    description: "The smartest AI tool for Blox Fruits players. Real-time tier lists, trade calculator, value list, and build guides — updated after every patch.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Blox Fruits AI" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bloxfruitsai",
    title: "Blox Fruits AI — Best AI Guide, Tier List & Fruit Finder",
    description: "The smartest AI tool for Blox Fruits. Real-time tier lists, trade calculator, and build guides.",
    images: ["/og-image.jpg"],
  },
  alternates: { canonical: "https://www.bloxfruitsai.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", url: "https://www.bloxfruitsai.com", name: "Blox Fruits AI", potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.bloxfruitsai.com/values?q={search_term_string}" }, "query-input": "required name=search_term_string" } },
    { "@type": "SoftwareApplication", name: "Blox Fruits AI", url: "https://www.bloxfruitsai.com", applicationCategory: "GameApplication", operatingSystem: "Web Browser", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "Organization", name: "Blox Fruits AI", url: "https://www.bloxfruitsai.com" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8837638493815012"
          crossOrigin="anonymous"
        />
                {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FM0L8PMJRD"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FM0L8PMJRD');
            `,
          }}
        />
      </head>
      <body>
        <OneSignalProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
