"use client";
import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { FRUITS, type Fruit } from "../../lib/fruits-data";
import { createTradeAd, type TradeAd } from "./actions";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function FruitPill({ id }: { id: string }) {
  const fruit = FRUITS.find(f => f.id === id);
  if (!fruit) return null;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.78rem",
        background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 6,
        padding: "3px 9px", color: "var(--text)",
      }}
    >
      <span>{fruit.emoji}</span>{fruit.name}
    </span>
  );
}

function PostAdForm({ onPosted }: { onPosted: (ad: TradeAd) => void }) {
  const [offering, setOffering] = useState<Fruit[]>([]);
  const [search, setSearch] = useState("");
  const [wanting, setWanting] = useState("");
  const [note, setNote] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const searchResults = useMemo(() => {
    if (!search) return [];
    return FRUITS.filter(
      f => f.name.toLowerCase().includes(search.toLowerCase()) && !offering.some(o => o.id === f.id)
    ).slice(0, 8);
  }, [search, offering]);

  function addFruit(f: Fruit) {
    if (offering.length >= 10) return;
    setOffering(prev => [...prev, f]);
    setSearch("");
  }

  function removeFruit(id: string) {
    setOffering(prev => prev.filter(f => f.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createTradeAd({
        offering: offering.map(f => f.id),
        wanting,
        note: note || undefined,
        discordTag,
        displayName: displayName || undefined,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      onPosted({
        id: result.id,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "open",
        offering: offering.map(f => f.id),
        wanting,
        note: note || null,
        discord_tag: discordTag,
        display_name: displayName || "Anonymous Trader",
      });

      setOffering([]);
      setWanting("");
      setNote("");
      setDiscordTag("");
      setDisplayName("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14,
        padding: "1.25rem 1.5rem", marginBottom: "2rem",
      }}
    >
      <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text)" }}>
        Post a <span style={{ color: "var(--cyan)" }}>Trade Ad</span>
      </h2>

      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        What are you offering?
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {offering.map(f => (
          <span key={f.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.82rem", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px 4px 10px" }}>
            {f.emoji} {f.name}
            <button type="button" onClick={() => removeFruit(f.id)} aria-label={`Remove ${f.name}`} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem", lineHeight: 1 }}>✕</button>
          </span>
        ))}
      </div>
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search fruits to add (e.g. Dragon)"
          style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }}
        />
        {searchResults.length > 0 && (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, zIndex: 10, maxHeight: 220, overflowY: "auto" }}>
            {searchResults.map(f => (
              <button
                key={f.id} type="button" onClick={() => addFruit(f)}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 12px", background: "none", border: "none", color: "var(--text)", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.9rem" }}
              >
                <span>{f.emoji}</span>{f.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        What do you want in return?
      </label>
      <input
        value={wanting}
        onChange={e => setWanting(e.target.value)}
        placeholder="e.g. Leopard + 2x Mastery, or open to offers"
        required
        style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none", marginBottom: "1rem" }}
      />

      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Note (optional)
      </label>
      <input
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="e.g. Need it permanent, no scammers"
        style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none", marginBottom: "1rem" }}
      />

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Discord tag
          </label>
          <input
            value={discordTag}
            onChange={e => setDiscordTag(e.target.value)}
            placeholder="yourname"
            required
            style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 6, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Display name (optional)
          </label>
          <input
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Anonymous Trader"
            style={{ width: "100%", background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px", color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontSize: "0.95rem", outline: "none" }}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: "var(--red)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{error}</p>
      )}
      {success && (
        <p style={{ color: "var(--green)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Your trade ad is live for 7 days.</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: "var(--cyan)", color: "var(--bg-deep)", border: "none", borderRadius: 8,
          padding: "11px 22px", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem",
          letterSpacing: "0.06em", textTransform: "uppercase", cursor: isPending ? "default" : "pointer",
          opacity: isPending ? 0.6 : 1,
        }}
      >
        {isPending ? "Posting..." : "Post Trade Ad"}
      </button>
    </form>
  );
}

function AdCard({ ad }: { ad: TradeAd }) {
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.15rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>{ad.display_name}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{timeAgo(ad.created_at)}</span>
      </div>

      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Offering</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {ad.offering.map(id => <FruitPill key={id} id={id} />)}
        </div>
      </div>

      <div style={{ marginBottom: ad.note ? 8 : 12 }}>
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Wants</span>
        <span style={{ fontSize: "0.88rem", color: "var(--text)" }}>{ad.wanting}</span>
      </div>

      {ad.note && (
        <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 12, fontStyle: "italic" }}>{ad.note}</p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Contact:</span>
        <span style={{ fontSize: "0.85rem", color: "var(--cyan)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>{ad.discord_tag}</span>
      </div>
    </div>
  );
}

export default function TradingClient({ initialAds }: { initialAds: TradeAd[] }) {
  const [ads, setAds] = useState<TradeAd[]>(initialAds);

  return (
    <div style={{ minHeight: "100vh", padding: "2rem 5% 4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span aria-hidden>/</span>
          <span style={{ color: "var(--cyan)" }}>Trade Ads</span>
        </nav>

        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(1.5rem,3vw,2.3rem)", fontWeight: 700, marginBottom: "0.6rem", lineHeight: 1.2 }}>
          Blox Fruit <span style={{ color: "var(--cyan)" }}>Trade Ads</span>
        </h1>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)", marginBottom: "1.5rem", lineHeight: 1.6, maxWidth: 700 }}>
          Post your <strong style={{ color: "var(--text)" }}>Blox Fruit trade</strong> offer or browse live ads from other traders. Free, no login needed — every ad stays active for 7 days.
        </h2>

        <PostAdForm onPosted={ad => setAds(prev => [ad, ...prev])} />

        <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1.1rem", marginBottom: "1rem" }}>
          Live <span style={{ color: "var(--cyan)" }}>Trades</span> ({ads.length})
        </h2>

        {ads.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            No open trade ads right now — be the first to post one above.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
            {ads.map(ad => <AdCard key={ad.id} ad={ad} />)}
          </div>
        )}

      </div>
    </div>
  );
}
