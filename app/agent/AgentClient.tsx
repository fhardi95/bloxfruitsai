"use client";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TaskType =
  | "auto_publish"
  | "write_article"
  | "keywords"
  | "update_codes"
  | "seo_audit"
  | "content_calendar"
  | "meta_tags"
  | "patch_analysis";

type PublishStatus = "idle" | "publishing" | "success" | "error";

interface ParsedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColor: string;
  readTime: string;
  icon: string;
  author: string;
  featured: boolean;
  content: unknown[];
}

interface AgentMessage {
  role: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  task?: TaskType;
  codeBlock?: string;
  codeLabel?: string;
  parsedPost?: ParsedPost | null;
}

interface Task {
  id: TaskType;
  label: string;
  icon: string;
  description: string;
  prompt: string;
  color: string;
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

const TASKS: Task[] = [
  {
    id: "write_article",
    label: "Write SEO Article",
    icon: "✍️",
    description: "Generate a full article ready to auto-publish",
    color: "#00f5ff",
    prompt:
      "Write a new SEO-optimised article for bloxfruitsai.com. Choose the highest-traffic topic not yet covered on the site. Output ONLY a valid JSON object (no markdown fences, no explanation) matching the BlogPost format exactly, so it can be auto-published. Use today's date: May 22, 2026 (dateISO: 2026-05-22).",
  },
  {
    id: "keywords",
    label: "Keyword Research",
    icon: "🔍",
    description: "Find low-competition keywords to target",
    color: "#ffd700",
    prompt:
      "Do keyword research for bloxfruitsai.com. Find 15 high-traffic, low-competition Blox Fruits search queries perfect for a site trying to reach 1 million monthly Google views. Group them by intent (Informational / Commercial) and difficulty (Easy / Medium). Format as a markdown table.",
  },
  {
    id: "update_codes",
    label: "Refresh Codes Article",
    icon: "🎁",
    description: "Rewrite the codes page for this month",
    color: "#2ed573",
    prompt:
      "Rewrite the Blox Fruits codes article for bloxfruitsai.com for May 2026. Output ONLY a valid JSON object matching the BlogPost format exactly (slug: 'blox-fruits-codes-may-2026'), so it can be auto-published. Include a codes table, redemption guide, and tips.",
  },
  {
    id: "seo_audit",
    label: "SEO Audit",
    icon: "📊",
    description: "Get a prioritised SEO improvement plan",
    color: "#ff6b35",
    prompt:
      "Perform a detailed SEO audit for bloxfruitsai.com. Pages: /, /blog, /guides, /values, /calculator, /wiki. Niche: Blox Fruits (Roblox). Goal: 1 million monthly Google visits and AdSense revenue. Give a prioritised action list: Quick Wins (this week), Medium Term (this month), Long Term (3+ months). Be specific.",
  },
  {
    id: "content_calendar",
    label: "Content Calendar",
    icon: "📅",
    description: "Generate a 30-day publishing schedule",
    color: "#a855f7",
    prompt:
      "Create a 30-day content calendar for bloxfruitsai.com targeting 1 million monthly views. For each article: title, target keyword, monthly search volume (estimated), competition (Easy/Medium/Hard), content type, publish date. Format as a markdown table. Prioritise articles a new site can rank for within 90 days.",
  },
  {
    id: "meta_tags",
    label: "Generate Meta Tags",
    icon: "🏷️",
    description: "Optimised title & description for every page",
    color: "#ff4757",
    prompt:
      "Generate optimised SEO meta tags for all pages on bloxfruitsai.com: home, /blog, /guides, /values, /calculator, /wiki, and the 5 most important blog articles. Title tag max 60 chars. Meta description max 155 chars. Format as a markdown table with columns: Page, Title Tag, Meta Description, Notes.",
  },
  {
    id: "patch_analysis",
    label: "Patch Analysis Article",
    icon: "🔄",
    description: "Write an update analysis article",
    color: "#ffa502",
    prompt:
      "Write a Blox Fruits Update 29 (Control Update) patch analysis article for bloxfruitsai.com. Output ONLY a valid JSON object matching the BlogPost format exactly (slug: 'blox-fruits-update-29-patch-analysis'), so it can be auto-published. Cover: Dungeon Mode, Trinkets, Control rework, Yin-Yang fruit, Tiger rename, meta tier list changes.",
  },
];

// ─── Auto-publish topics ──────────────────────────────────────────────────────
const now = new Date();
const MONTH_YEAR = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
const YEAR = now.getFullYear();

const AUTO_TOPICS = [

  // 🔥 High priority — highest search volume
  `Best fruit in Blox Fruits ${YEAR} — complete guide`,
  "How to get God Human in Blox Fruits — full guide",
  `Blox Fruits race tier list ${YEAR} — best race ranked`,
  `Blox Fruits best fighting style ${YEAR} — tier list and guide`,
  `Blox Fruits leveling guide ${YEAR} — fastest way to max level`,
  "Blox Fruits Buddha guide — moves, awakening and tips",
  "Blox Fruits Dough combo guide — best combos and moves",
  "Where to find Fist of Darkness in Blox Fruits",
  `Blox Fruits PvP tier list ${YEAR} — best fruits for combat`,
  "How to awaken fruits in Blox Fruits — full awakening guide",

  // High priority — medium volume
  `Blox Fruits Dragon fruit guide ${YEAR} — moves and combos`,
  `Best sword in Blox Fruits ${YEAR} — tier list and guide`,
  "Blox Fruits Dough fruit guide — awakening, moves and grinding",
  `Blox Fruits beginner guide ${YEAR} — how to level up fast`,
  `Blox Fruits trading guide ${YEAR} — how to get rare fruits fast`,
  `Best race in Blox Fruits ${YEAR} — tier list and which to choose`,
  `Blox Fruits Control fruit guide — moves and awakening ${YEAR}`,
  "Blox Fruits all bosses guide — locations and drop rates",
  `Blox Fruits best accessories ${YEAR} — tier list and where to find`,
  "Blox Fruits Third Sea guide — how to unlock and what to do",

  // Medium priority — evergreen content
  "Blox Fruits Leopard fruit guide — moves, combos and PvP tips",
  "Blox Fruits Kitsune fruit guide — moves, awakening and tips",
  `Blox Fruits best stats build ${YEAR} — melee, sword, gun or fruit`,
  "Blox Fruits raid guide — how to complete raids and get fragments",
  "Blox Fruits sea events guide — how to find and beat them",
  "Blox Fruits Magma fruit guide — moves, awakening and grinding",
  "Blox Fruits best fruits for beginners — cheap and effective options",
  `Blox Fruits all working codes ${MONTH_YEAR} — free XP and Beli`,
  
  `Blox Fruits beginner guide ${YEAR} — how to level up fast from level 1`,
  `Blox Fruits all working codes ${MONTH_YEAR} — free XP and Beli`,
  `Best PvP fruits in Blox Fruits ${YEAR} — tier list and combos`,
  "How to awaken fruits in Blox Fruits — full awakening guide",
  "Blox Fruits Dragon fruit guide — moves, combos and grinding tips",
  `Best race in Blox Fruits ${YEAR} — tier list and which to choose`,
  `Blox Fruits trading guide ${YEAR} — how to get rare fruits fast`,
  `Blox Fruits Control fruit guide — moves and awakening ${YEAR}`,
  `Best sword tier list in Blox Fruits ${YEAR} — all swords ranked`,
  "Blox Fruits Dough fruit guide — awakening, moves and combos",
  `How to get Robux free for Blox Fruits — legit methods ${YEAR}`,
  "Blox Fruits all bosses guide — locations and drop rates",
  `Blox Fruits best accessories ${YEAR} — tier list and where to find`,
  "Blox Fruits Third Sea guide — how to unlock and what to do",
  "Blox Fruits Leopard fruit guide — moves, combos and PvP tips",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tryParsePost(text: string): ParsedPost | null {
  try {
    const stripped = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const match = stripped.match(/\{[\s\S]*"slug"[\s\S]*"content"[\s\S]*\}/);
    if (!match) return null;
    const obj = JSON.parse(match[0]);
    if (obj.slug && obj.title && Array.isArray(obj.content)) return obj as ParsedPost;
    return null;
  } catch {
    return null;
  }
}

function extractCodeBlock(text: string): { prose: string; code: string; label: string } | null {
  const match = text.match(/```(\w*)\n([\s\S]*?)```/);
  if (!match) return null;
  return {
    label: match[1] || "code",
    code: match[2],
    prose: text.replace(/```[\s\S]*?```/, "").trim(),
  };
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// No client-side secret needed — the browser is already authenticated via the
// httpOnly "agent_authed" cookie set on login, which the API routes check.

const ARTICLE_SYSTEM_PROMPT = `You are the AI content manager for bloxfruitsai.com — a Next.js website for Blox Fruits (Roblox) players targeting 1 million monthly Google visits and AdSense revenue.

SITE: bloxfruitsai.com | Pages: /, /blog, /guides, /values, /calculator, /wiki
NICHE: Blox Fruits (Roblox) — guides, tier lists, codes, trading values, wiki
STACK: Next.js 15, TypeScript, Tailwind, deployed on Vercel
OWNER: Based in Manchester, UK — use UK-friendly English

BLOGPOST JSON FORMAT (when writing articles, output ONLY this JSON, no markdown fences):
{
  "slug": "article-slug-here",
  "title": "Article Title Here",
  "excerpt": "155 char max SEO excerpt.",
  "date": "May 22, 2026",
  "dateISO": "2026-05-22",
  "category": "Category Name",
  "categoryColor": "#00f5ff",
  "readTime": "X min",
  "icon": "🎯",
  "author": "BloxFruitsAI Team",
  "featured": false,
  "content": [
    { "type": "paragraph", "text": "..." },
    { "type": "heading", "text": "..." },
    { "type": "subheading", "text": "..." },
    { "type": "tip", "text": "..." },
    { "type": "warning", "text": "..." },
    { "type": "info", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "table", "headers": ["Col1","Col2"], "rows": [["r1c1","r1c2"]] },
    { "type": "tierrow", "tier": "S", "tierColor": "#ff4757", "label": "Dominant", "fruits": ["🐉 Dragon"] },
    { "type": "divider" }
  ]
}

SEO RULES:
- Title must be under 40 characters (site appends " | BloxFruitsAI")
- Never repeat "Blox Fruits" more than once in the title
- Minimum 20 content sections for a comprehensive article

GOALS:
- Every article targets a specific keyword with high monthly search volume
- Articles should be 1,500–2,500 words (many content sections)
- Include internal links to bloxfruitsai.com/values, /wiki, /calculator in paragraph text
- High RPM = target US/UK search audiences
- For article tasks: output ONLY the raw JSON object with NO markdown fences, NO backticks, NO explanation. Start your response with { and end with }`;

// ─── Component ────────────────────────────────────────────────────────────────

export default function AgentClient() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      role: "system",
      content:
        "🤖 BloxFruitsAI Content Agent is online.\n\nI can write full SEO articles and publish them directly to your site — no copy-pasting needed. Pick a task or type a custom instruction.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [publishStatus, setPublishStatus] = useState<Record<number, PublishStatus>>({});
  const [publishResult, setPublishResult] = useState<Record<number, string>>({});
  const [articleCount, setArticleCount] = useState(14);
  const [autoPublishing, setAutoPublishing] = useState(false);
  const [autoProgress, setAutoProgress] = useState<{ current: number; total: number; log: string[] }>({ current: 0, total: 3, log: [] });
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, autoProgress.log]);

  // Load current article count on mount
  useEffect(() => {
    fetch("/api/publish")
      .then((r) => r.json())
      .then((d) => { if (d.count) setArticleCount(d.count); })
      .catch(() => {});
  }, []);

  // ── Auto-publish 3 articles ───────────────────────────────────────────────

  async function autoPublish() {
    if (autoPublishing || loading) return;
    setAutoPublishing(true);
    setAutoProgress({ current: 0, total: 3, log: [] });

    const addLog = (msg: string) =>
      setAutoProgress((prev) => ({ ...prev, log: [...prev.log, msg] }));

    const now = new Date();
const MONTH_YEAR = now.toLocaleString("en-GB", { month: "long", year: "numeric" });

    // Pick 3 random unique topics
    const shuffled = [...AUTO_TOPICS].sort(() => Math.random() - 0.5).slice(0, 3);

    for (let i = 0; i < 3; i++) {
      const topic = shuffled[i];
      setAutoProgress((prev) => ({ ...prev, current: i + 1 }));
      addLog(`📝 Article ${i + 1}/3: Generating "${topic.split("—")[0].trim()}"...`);

      try {
        // Generate article via AI
        const res = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-5",
            max_tokens: 8000,
            system: ARTICLE_SYSTEM_PROMPT,
            messages: [{ role: "user", content: `Write a complete SEO-optimised article for bloxfruitsai.com about: ${topic}. Use today's date: ${MONTH_YEAR} (year: ${YEAR}). All dates in the article must use ${MONTH_YEAR}. Output ONLY raw JSON starting with { and ending with }.` }],
          }),
        });

        const data = await res.json();
        const text = data.content
          ?.filter((b: { type: string }) => b.type === "text")
          .map((b: { text: string }) => b.text)
          .join("\n") ?? "";

        const stripped = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const match = stripped.match(/\{[\s\S]*"slug"[\s\S]*"content"[\s\S]*\}/);

        if (!match) {
          addLog(`⚠️ Article ${i + 1} — JSON parse failed, skipping.`);
          continue;
        }

        const post = JSON.parse(match[0]);
        addLog(`✅ Generated: "${post.title}" — publishing to GitHub...`);

        // Publish to GitHub
        const pubRes = await fetch("/api/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post }),
        });

        const pubData = await pubRes.json();

        if (!pubRes.ok) {
          addLog(`⚠️ Publish failed: ${pubData.error}`);
        } else {
          addLog(`🚀 Published! → bloxfruitsai.com/blog/${post.slug}`);
          setArticleCount((c) => c + 1);
        }
      } catch (err) {
        addLog(`❌ Error on article ${i + 1}: ${String(err)}`);
      }

      // Wait 10s between articles to avoid GitHub rate limits
      if (i < 2) {
        addLog(`⏳ Waiting 10 seconds before next article...`);
        await new Promise((r) => setTimeout(r, 10000));
      }
    }

    addLog(`🎉 Done! Vercel is deploying all 3 articles now (~2 min).`);
    setAutoPublishing(false);
  }

  // ── Send message ──────────────────────────────────────────────────────────

  async function sendMessage(userText: string, task?: TaskType) {
    if (!userText.trim() || loading) return;
    setLoading(true);

    const userMsg: AgentMessage = { role: "user", content: userText, timestamp: new Date(), task };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const newHistory = [...history, { role: "user", content: userText }];

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 8000,
          system: ARTICLE_SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      const data = await res.json();
      const text = data.content
        ?.filter((b: { type: string }) => b.type === "text")
        .map((b: { text: string }) => b.text)
        .join("\n") ?? "No response.";

      const extracted = extractCodeBlock(text);
      const parsedPost = tryParsePost(extracted?.code ?? text);

      const agentMsg: AgentMessage = {
        role: "agent",
        content: extracted ? (extracted.prose || "Here is the generated code:") : parsedPost ? `✅ Article generated: **${parsedPost.title}**\n\nReady to publish directly to your site — click **Publish Now** below.` : text,
        timestamp: new Date(),
        codeBlock: extracted?.code,
        codeLabel: extracted?.label,
        parsedPost,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setHistory([...newHistory, { role: "assistant", content: text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "⚠️ Error connecting to AI. Please check your API key and try again.", timestamp: new Date() },
      ]);
    }

    setLoading(false);
  }

  async function publishPost(msgIdx: number, post: ParsedPost) {
    setPublishStatus((prev) => ({ ...prev, [msgIdx]: "publishing" }));

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setPublishStatus((prev) => ({ ...prev, [msgIdx]: "error" }));
        setPublishResult((prev) => ({ ...prev, [msgIdx]: data.error || "Unknown error" }));
        return;
      }

      setPublishStatus((prev) => ({ ...prev, [msgIdx]: "success" }));
      setPublishResult((prev) => ({
        ...prev,
        [msgIdx]: data.deployTriggered
          ? `🚀 Published! Deploying now — live at bloxfruitsai.com/blog/${data.slug} in ~2 minutes.`
          : `✅ Saved to GitHub! Vercel will auto-deploy shortly.`,
      }));
      setArticleCount((c) => c + 1);

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: data.deployTriggered
            ? `🚀 Article "${post.title}" published and deploying to bloxfruitsai.com/blog/${post.slug}`
            : `✅ Article "${post.title}" saved to GitHub.`,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setPublishStatus((prev) => ({ ...prev, [msgIdx]: "error" }));
      setPublishResult((prev) => ({ ...prev, [msgIdx]: "Network error — could not reach publish API." }));
    }
  }

  function handleTask(task: Task) {
    setActiveTask(task.id);
    sendMessage(task.prompt, task.id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function copyCode(code: string, idx: number) {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  function clearChat() {
    setMessages([
      {
        role: "system",
        content: "🤖 BloxFruitsAI Content Agent is online.\n\nChat cleared. Pick a task or type a custom instruction.",
        timestamp: new Date(),
      },
    ]);
    setHistory([]);
    setActiveTask(null);
  }

  const targetArticles = 150;
  const articlePct = Math.min(100, Math.round((articleCount / targetArticles) * 100));

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-deep)", fontFamily: "'Inter','Rajdhani',sans-serif", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(0,245,255,0.1)", background: "rgba(6,15,30,0.97)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#2ed573", boxShadow: "0 0 8px #2ed573", animation: "pulseDot 2s infinite" }} />
            <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "0.06em" }}>
              AI CONTENT AGENT
            </h1>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>— bloxfruitsai.com</span>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: "0.2rem", fontFamily: "'Inter',sans-serif" }}>
            Writes → Saves → Deploys automatically
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
          <div style={{ padding: "0.35rem 0.8rem", border: "1px solid rgba(46,213,115,0.3)", borderRadius: 7, background: "rgba(46,213,115,0.07)", color: "#2ed573", fontSize: "0.72rem", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>
            CLAUDE SONNET 4
          </div>
          <button onClick={clearChat} style={{ padding: "0.35rem 0.8rem", border: "1px solid rgba(0,245,255,0.15)", borderRadius: 7, background: "transparent", color: "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
            CLEAR
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 148px)" }}>

        {/* Sidebar */}
        <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid rgba(0,245,255,0.08)", background: "rgba(6,15,30,0.5)", overflowY: "auto", padding: "1.1rem 0.85rem" }}>

          <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.15em", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, marginBottom: "0.7rem", paddingLeft: "0.2rem" }}>QUICK TASKS</p>

          {/* ── AUTO-PUBLISH BUTTON ── */}
          <button
            onClick={autoPublish}
            disabled={autoPublishing || loading}
            style={{
              width: "100%",
              marginBottom: "0.75rem",
              padding: "0.75rem 0.8rem",
              borderRadius: 9,
              border: "1px solid rgba(46,213,115,0.4)",
              background: autoPublishing ? "rgba(46,213,115,0.05)" : "rgba(46,213,115,0.12)",
              color: "#2ed573",
              cursor: autoPublishing || loading ? "not-allowed" : "pointer",
              textAlign: "left",
              opacity: autoPublishing || loading ? 0.7 : 1,
              transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.2rem" }}>
              <span style={{ fontSize: "0.95rem" }}>🚀</span>
              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.84rem", color: "#2ed573" }}>
                {autoPublishing ? `Publishing ${autoProgress.current}/3...` : "Auto-Publish 3 Articles"}
              </span>
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(46,213,115,0.7)", fontFamily: "'Inter',sans-serif", lineHeight: 1.4, paddingLeft: "1.4rem" }}>
              {autoPublishing ? "Working… do not close this tab" : "Generate & publish 3 SEO articles in one click"}
            </p>
          </button>

          {/* Auto-publish progress log */}
          {autoProgress.log.length > 0 && (
            <div style={{ marginBottom: "0.75rem", padding: "0.65rem", borderRadius: 7, background: "rgba(0,0,0,0.35)", border: "1px solid rgba(46,213,115,0.15)", maxHeight: 160, overflowY: "auto" }}>
              {autoProgress.log.map((line, i) => (
                <p key={i} style={{
                  fontSize: "0.63rem",
                  color: line.startsWith("❌") ? "#ff4757" : line.startsWith("⚠️") ? "#ffa502" : line.startsWith("🎉") ? "#ffd700" : "#2ed573",
                  fontFamily: "'Inter',sans-serif",
                  lineHeight: 1.5,
                  marginBottom: "0.15rem",
                }}>{line}</p>
              ))}
            </div>
          )}

          <div style={{ height: "1px", background: "rgba(0,245,255,0.08)", marginBottom: "0.75rem" }} />

          {TASKS.map((task) => (
            <button key={task.id} onClick={() => handleTask(task)} disabled={loading || autoPublishing} style={{ width: "100%", marginBottom: "0.45rem", padding: "0.65rem 0.8rem", borderRadius: 9, border: `1px solid ${activeTask === task.id ? task.color + "44" : "rgba(0,245,255,0.07)"}`, background: activeTask === task.id ? task.color + "0f" : "rgba(8,18,36,0.7)", cursor: loading || autoPublishing ? "not-allowed" : "pointer", textAlign: "left", opacity: loading || autoPublishing ? 0.55 : 1, transition: "all 0.15s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.2rem" }}>
                <span style={{ fontSize: "0.95rem" }}>{task.icon}</span>
                <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.84rem", color: activeTask === task.id ? task.color : "var(--text)" }}>{task.label}</span>
              </div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", lineHeight: 1.4, paddingLeft: "1.4rem" }}>{task.description}</p>
            </button>
          ))}

          {/* Goal tracker */}
          <div style={{ marginTop: "1.25rem", padding: "0.9rem", borderRadius: 9, border: "1px solid rgba(0,245,255,0.1)", background: "rgba(0,245,255,0.03)" }}>
            <p style={{ fontSize: "0.65rem", color: "var(--cyan)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.75rem" }}>GOAL TRACKER</p>

            <div style={{ marginBottom: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", marginBottom: "0.25rem" }}>
                <span>Articles published</span>
                <span style={{ color: "var(--cyan)" }}>{articleCount} / {targetArticles}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(0,245,255,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${articlePct}%`, background: "var(--cyan)", borderRadius: 2, transition: "width 0.4s" }} />
              </div>
            </div>

            <div style={{ marginBottom: "0.65rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", marginBottom: "0.25rem" }}>
                <span>Monthly views target</span>
                <span style={{ color: "var(--cyan)" }}>0 / 1M</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(0,245,255,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "1%", background: "#ffd700", borderRadius: 2 }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif", marginBottom: "0.25rem" }}>
                <span>AdSense revenue</span>
                <span style={{ color: "#2ed573" }}>$0 / $1,500</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(46,213,115,0.08)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "1%", background: "#2ed573", borderRadius: 2 }} />
              </div>
            </div>
          </div>

          {/* Setup checklist */}
          <div style={{ marginTop: "1rem", padding: "0.9rem", borderRadius: 9, border: "1px solid rgba(255,165,2,0.15)", background: "rgba(255,165,2,0.04)" }}>
            <p style={{ fontSize: "0.65rem", color: "#ffa502", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "0.6rem" }}>SETUP CHECKLIST</p>
            {[
              { label: "ANTHROPIC_API_KEY set", done: true },
              { label: "AGENT_SECRET set", done: true },
              { label: "GITHUB_TOKEN set", done: true },
              { label: "VERCEL_DEPLOY_HOOK set", done: true },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                <span style={{ fontSize: "0.75rem", color: item.done ? "#2ed573" : "#ffa502" }}>{item.done ? "✅" : "⬜"}</span>
                <span style={{ fontSize: "0.68rem", color: item.done ? "var(--text-muted)" : "#ffa502", fontFamily: "'Inter',sans-serif" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

            {messages.map((msg, idx) => (
              <div key={idx}>

                {msg.role === "system" && (
                  <div style={{ textAlign: "center", padding: "0.85rem 1.25rem", background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.1)", borderRadius: 10, color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "'Inter',sans-serif", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>
                )}

                {msg.role === "user" && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ maxWidth: "70%", background: "rgba(0,245,255,0.09)", border: "1px solid rgba(0,245,255,0.22)", borderRadius: "14px 14px 4px 14px", padding: "0.7rem 1rem" }}>
                      <p style={{ color: "var(--text)", fontSize: "0.88rem", fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>{msg.content}</p>
                      <p style={{ fontSize: "0.65rem", color: "rgba(0,245,255,0.45)", marginTop: "0.35rem", textAlign: "right", fontFamily: "'Inter',sans-serif" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}

                {msg.role === "agent" && (
                  <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                    <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(0,245,255,0.09)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>🤖</div>
                    <div style={{ flex: 1, minWidth: 0 }}>

                      <div style={{ background: "rgba(10,22,40,0.85)", border: "1px solid rgba(0,245,255,0.09)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1.05rem" }}>
                        <p style={{ color: "var(--text)", fontSize: "0.88rem", fontFamily: "'Inter',sans-serif", lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{msg.content}</p>
                      </div>

                      {msg.codeBlock && !msg.parsedPost && (
                        <div style={{ marginTop: "0.65rem", borderRadius: 9, border: "1px solid rgba(0,245,255,0.13)", overflow: "hidden" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.45rem 0.9rem", background: "rgba(0,245,255,0.05)", borderBottom: "1px solid rgba(0,245,255,0.09)" }}>
                            <span style={{ fontSize: "0.68rem", color: "var(--cyan)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>{(msg.codeLabel || "code").toUpperCase()}</span>
                            <button onClick={() => copyCode(msg.codeBlock!, idx)} style={{ padding: "0.25rem 0.7rem", borderRadius: 5, border: "1px solid rgba(0,245,255,0.25)", background: copiedIdx === idx ? "rgba(46,213,115,0.12)" : "transparent", color: copiedIdx === idx ? "#2ed573" : "var(--cyan)", fontSize: "0.68rem", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.05em", transition: "all 0.15s" }}>
                              {copiedIdx === idx ? "✓ COPIED" : "📋 COPY"}
                            </button>
                          </div>
                          <pre style={{ padding: "0.9rem", overflowX: "auto", fontSize: "0.75rem", lineHeight: 1.6, color: "#a8d8ff", fontFamily: "'Courier New',monospace", background: "#020810", maxHeight: 360, overflowY: "auto" }}>
                            {msg.codeBlock}
                          </pre>
                        </div>
                      )}

                      {msg.parsedPost && (
                        <div style={{ marginTop: "0.75rem", borderRadius: 10, border: "1px solid rgba(46,213,115,0.25)", overflow: "hidden", background: "rgba(46,213,115,0.04)" }}>
                          <div style={{ padding: "0.85rem 1rem", borderBottom: "1px solid rgba(46,213,115,0.12)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                              <span style={{ fontSize: "1.1rem" }}>{msg.parsedPost.icon}</span>
                              <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{msg.parsedPost.title}</span>
                            </div>
                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                              {[
                                { label: msg.parsedPost.category, color: msg.parsedPost.categoryColor },
                                { label: msg.parsedPost.readTime + " read", color: "#7a96b8" },
                                { label: msg.parsedPost.content.length + " sections", color: "#7a96b8" },
                                { label: "/blog/" + msg.parsedPost.slug, color: "#ffd700" },
                              ].map((tag) => (
                                <span key={tag.label} style={{ fontSize: "0.68rem", padding: "0.2rem 0.55rem", borderRadius: 20, border: `1px solid ${tag.color}33`, color: tag.color, fontFamily: "'Inter',sans-serif" }}>{tag.label}</span>
                              ))}
                            </div>
                          </div>

                          <div style={{ padding: "0.85rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                            {(!publishStatus[idx] || publishStatus[idx] === "idle") && (
                              <>
                                <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ padding: "0.55rem 1.25rem", borderRadius: 8, border: "1px solid rgba(46,213,115,0.5)", background: "rgba(46,213,115,0.12)", color: "#2ed573", fontSize: "0.84rem", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.06em", transition: "all 0.15s" }}>
                                  🚀 PUBLISH NOW
                                </button>
                                <button onClick={() => copyCode(JSON.stringify(msg.parsedPost, null, 2), idx)} style={{ padding: "0.55rem 1rem", borderRadius: 8, border: "1px solid rgba(0,245,255,0.2)", background: "transparent", color: "var(--cyan)", fontSize: "0.84rem", cursor: "pointer", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>
                                  {copiedIdx === idx ? "✓ COPIED" : "📋 COPY JSON"}
                                </button>
                                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "'Inter',sans-serif" }}>
                                  Publish saves to GitHub and deploys automatically
                                </span>
                              </>
                            )}

                            {publishStatus[idx] === "publishing" && (
                              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <div style={{ display: "flex", gap: "4px" }}>
                                  {[0,1,2].map(i => (
                                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#2ed573", animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                  ))}
                                </div>
                                <span style={{ fontSize: "0.84rem", color: "#2ed573", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>PUBLISHING & DEPLOYING...</span>
                              </div>
                            )}

                            {publishStatus[idx] === "success" && (
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "0.84rem", color: "#2ed573", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>{publishResult[idx]}</p>
                                <a href={`/blog/${msg.parsedPost.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: "0.72rem", color: "var(--cyan)", fontFamily: "'Inter',sans-serif", textDecoration: "underline", marginTop: "0.25rem", display: "inline-block" }}>
                                  View article →
                                </a>
                              </div>
                            )}

                            {publishStatus[idx] === "error" && (
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "0.84rem", color: "#ff4757", fontFamily: "'Rajdhani',sans-serif", fontWeight: 700 }}>⚠️ {publishResult[idx]}</p>
                                <button onClick={() => publishPost(idx, msg.parsedPost!)} style={{ fontSize: "0.72rem", color: "var(--cyan)", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", textDecoration: "underline", marginTop: "0.25rem" }}>
                                  Try again
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.35rem", paddingLeft: "0.2rem", fontFamily: "'Inter',sans-serif" }}>{formatTime(msg.timestamp)}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "rgba(0,245,255,0.09)", border: "1px solid rgba(0,245,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", flexShrink: 0 }}>🤖</div>
                <div style={{ background: "rgba(10,22,40,0.85)", border: "1px solid rgba(0,245,255,0.09)", borderRadius: "4px 14px 14px 14px", padding: "0.85rem 1.05rem", display: "flex", gap: "5px", alignItems: "center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cyan)", animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid rgba(0,245,255,0.09)", padding: "0.9rem 1.25rem", background: "rgba(6,15,30,0.9)" }}>

            <div style={{ display: "flex", gap: "0.45rem", marginBottom: "0.65rem", flexWrap: "wrap" }}>
              {[
                "Write a beginner guide article and publish it",
                "Research the best keywords for this week",
                "Update codes page for May 2026 and publish",
                "Give me a content calendar for the next 30 days",
              ].map((s) => (
                <button key={s} onClick={() => { setInput(s); textareaRef.current?.focus(); }} disabled={loading || autoPublishing} style={{ padding: "0.3rem 0.7rem", borderRadius: 20, border: "1px solid rgba(0,245,255,0.15)", background: "rgba(0,245,255,0.04)", color: "var(--text-muted)", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.15s", opacity: loading || autoPublishing ? 0.5 : 1 }}>
                  {s}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.65rem", alignItems: "flex-end" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type an instruction… (Enter to send, Shift+Enter for new line)"
                disabled={loading || autoPublishing}
                rows={2}
                style={{ flex: 1, background: "rgba(10,22,40,0.85)", border: "1px solid rgba(0,245,255,0.18)", borderRadius: 9, padding: "0.65rem 0.9rem", color: "var(--text)", fontSize: "0.88rem", fontFamily: "'Inter',sans-serif", resize: "none", outline: "none", lineHeight: 1.5 }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || autoPublishing || !input.trim()}
                style={{ padding: "0.65rem 1.1rem", borderRadius: 9, border: "1px solid rgba(0,245,255,0.35)", background: loading || autoPublishing || !input.trim() ? "rgba(0,245,255,0.04)" : "rgba(0,245,255,0.13)", color: loading || autoPublishing || !input.trim() ? "var(--text-muted)" : "var(--cyan)", cursor: loading || autoPublishing || !input.trim() ? "not-allowed" : "pointer", fontSize: "1.05rem", transition: "all 0.15s", flexShrink: 0 }}>
                {loading ? "⏳" : "➤"}
              </button>
            </div>

            <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "0.45rem", fontFamily: "'Inter',sans-serif", textAlign: "center" }}>
              Articles are saved to <code style={{ color: "var(--cyan)", background: "rgba(0,245,255,0.07)", padding: "0 3px", borderRadius: 3 }}>GitHub</code> and deployed via Vercel automatically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
