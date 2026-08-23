export default function IntroSection() {
  return (
    <section id="about-site" style={{ position: "relative", zIndex: 1, padding: "4rem 5% 2rem" }}>
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "2.5rem clamp(1.5rem,4vw,3rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: "clamp(1.3rem,2.6vw,1.8rem)",
            fontWeight: 700,
            marginBottom: "1.1rem",
          }}
        >
          What Blox Fruits AI Actually Does
        </h2>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            color: "var(--text-muted)",
            fontSize: "0.98rem",
            lineHeight: 1.8,
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            Blox Fruits AI started as a way to answer one question players kept running into: is this trade
            actually fair? Robux value lists for Blox Fruits change constantly as new fruits get added, old
            ones get vaulted, and community demand shifts after every update — so a static spreadsheet goes
            stale within days. We built this site to track those changes as they happen and put the numbers
            in one place, instead of scattered across Discord servers and outdated YouTube videos.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Every fruit on this site is rated across four separate categories — PVP, PVE, grinding, and
            trade value — because a fruit that dominates in a boss fight can be a liability in a duel, and a
            fruit nobody wants to fight against might still be worthless to trade. Our tier list, wiki
            entries, and value list are cross-checked against active trading activity and community
            consensus, then rewritten in plain language so new players don&apos;t need to decode Discord
            jargon to understand what a fruit is actually good for.
          </p>
          <p>
            The trade calculator and AI chat tool exist for the same reason: to save you from getting
            scammed on a trade you couldn&apos;t easily verify on your own. We keep updating the underlying
            data after every game patch, and we&apos;re upfront when a value is uncertain rather than
            guessing. If you spot something that&apos;s out of date, the fastest way to flag it is through
            the <a href="/contact" style={{ color: "var(--cyan)" }}>contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
