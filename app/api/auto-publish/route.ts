
import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

// IMPORTANT: keep every topic here unique. Duplicate/near-duplicate topics
// previously caused the same article to be generated multiple times under
// different slugs, which Google flagged as "low value / duplicate content"
// and blocked AdSense approval. Before adding a new topic, make sure it
// doesn't overlap with an existing one (check both this list AND
// app/_data/blog-data.ts).
const BASE_TOPICS = [
  // Fruit guides (one per fruit — do not add a second guide for the same fruit)
  `Best fruit in Blox Fruits — complete guide`,
  "Blox Fruits Buddha guide — moves, awakening and tips",
  "Blox Fruits Dough fruit guide — awakening, moves and grinding",
  "Where to find Fist of Darkness in Blox Fruits",
  `Blox Fruits Dragon fruit guide — moves and combos`,
  `Blox Fruits Control fruit guide — moves and awakening`,
  "Blox Fruits Leopard fruit guide — moves, combos and PvP tips",
  "Blox Fruits Kitsune fruit guide — moves, awakening and tips",
  "Blox Fruits Magma fruit guide — moves, awakening and grinding",
  "Blox Fruits Venom fruit guide — moves, awakening and combos",
  "Blox Fruits Spirit fruit guide — moves, awakening and combos",
  "Blox Fruits Blizzard fruit guide — moves, awakening and combos",

  // Progression & mechanics
  "How to get God Human in Blox Fruits — full guide",
  `Blox Fruits leveling guide — fastest way to max level`,
  "How to awaken fruits in Blox Fruits — full awakening guide",
  "Blox Fruits raid guide — how to complete raids and get fragments",
  "Blox Fruits sea events guide — how to find and beat them",
  "Blox Fruits Third Sea guide — how to unlock and what to do",
  "Blox Fruits all bosses guide — locations and drop rates",

  // Rankings & gear (one tier list per category)
  `Blox Fruits race tier list — best race ranked`,
  `Blox Fruits best fighting style — tier list and guide`,
  `Blox Fruits PvP tier list — best fruits for combat`,
  `Best sword in Blox Fruits — tier list and guide`,
  `Blox Fruits best accessories — tier list and where to find`,
  `Blox Fruits best stats build — melee, sword, gun or fruit`,

  // Trading & economy
  `Blox Fruits trading guide — how to get rare fruits fast`,
  "Blox Fruits scam prevention guide — how to trade safely",

  // Codes & new player content
  `Blox Fruits all working codes — free XP and Beli`,
  "Blox Fruits best fruits for beginners — cheap and effective options",
  `Blox Fruits beginner guide — how to level up fast from level 1`,
];


const ARTICLE_SYSTEM_PROMPT = `You are the AI content manager for bloxfruitsai.com — a Next.js website for Blox Fruits (Roblox) players targeting 1 million monthly Google visits and AdSense revenue.

SITE: bloxfruitsai.com | Pages: /, /blog, /guides, /values, /calculator, /wiki
NICHE: Blox Fruits (Roblox) — guides, tier lists, codes, trading values, wiki
OWNER: Based in Newcastle, UK — use UK-friendly English

BLOGPOST JSON FORMAT — output ONLY this JSON, no markdown fences, no explanation:
{
  "slug": "article-slug-here",
  "title": "Article Title Here",
  "excerpt": "155 char max SEO excerpt.",
  "date": "USE_CURRENT_DATE",
  "dateISO": "USE_CURRENT_DATE_ISO",
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
    { "type": "tierrow", "tier": "S", "tierColor": "#ff4757", "label": "Dominant", "fruits": ["Dragon"] },
    { "type": "divider" }
  ]
}

SEO RULES:
- Title must be under 40 characters
- Never repeat Blox Fruits more than once in the title
- Minimum 20 content sections
- Include internal links to bloxfruitsai.com/values, /wiki, /calculator in paragraph text
- Do not reuse a slug, title, or core topic that already exists on the site — each article must cover a distinct subject, not a reworded version of an existing one
- Output ONLY raw JSON starting with { and ending with }`;

function normaliseTopic(s: string): string {
  return s
    .toLowerCase()
    .replace(/[—–\-:().,&]/g, " ")
    .replace(/\b(20\d\d|guide|complete|full|tips|blox fruits|blox fruit)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wordOverlap(a: string, b: string): number {
  const wa = new Set(a.split(" ").filter(Boolean));
  const wb = new Set(b.split(" ").filter(Boolean));
  if (wa.size === 0 || wb.size === 0) return 0;
  const intersection = [...wa].filter(w => wb.has(w)).length;
  const union = new Set([...wa, ...wb]).size;
  return union === 0 ? 0 : intersection / union;
}

function extractExistingTitles(blogData: string): string[] {
  const matches = blogData.matchAll(/"title":\s*"((?:[^"\\]|\\.)*)"/g);
  return [...matches].map(m => m[1]);
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

async function getGithubFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();

  // Files over 1MB come back without `content` from the Contents API —
  // fetch the raw blob instead, which has no such size restriction.
  if (!data.content && data.sha) {
    const blobRes = await fetch(`${GITHUB_API}/repos/${repo}/git/blobs/${data.sha}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!blobRes.ok) throw new Error(`GitHub: could not read blob for ${filePath} (${blobRes.status})`);
    const blobData = await blobRes.json();
    return { content: Buffer.from(blobData.content, "base64").toString("utf8"), sha: data.sha };
  }

  return { content: Buffer.from(data.content, "base64").toString("utf8"), sha: data.sha };
}

async function updateGithubFile(token: string, repo: string, branch: string, filePath: string, newContent: string, sha: string, message: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: Buffer.from(newContent).toString("base64"), sha, branch }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub update failed: ${err.message}`);
  }
}

async function generateArticle(apiKey: string, topic: string, todayDisplay: string): Promise<Record<string, unknown> | null> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-5-mini",
      max_completion_tokens: 8000,
      messages: [{
        role: "system",
        content: ARTICLE_SYSTEM_PROMPT,
      }, {
        role: "user",
        content: `Write a complete SEO-optimised article for bloxfruitsai.com about: ${topic}. Today's date is ${todayDisplay}. Set the "date" field to exactly "${todayDisplay}" — do not use any other date. Output ONLY raw JSON starting with { and ending with }.`,
      }],
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";

  const stripped = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const match = stripped.match(/\{[\s\S]*"slug"[\s\S]*"content"[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

async function publishArticle(token: string, repo: string, branch: string, post: Record<string, unknown>): Promise<{ success: boolean; error?: string }> {
  try {
    const { content: blogData, sha: blogDataSha } = await getGithubFile(token, repo, branch, "app/_data/blog-data.ts");

    // Check for duplicate slug in both blog-data.ts AND BlogClient.tsx.
    // blog-data.ts entries use quoted keys ("slug": "...") while BlogClient.tsx
    // uses unquoted keys (slug: "...") — check both formats in both files.
    const { content: clientCheck } = await getGithubFile(token, repo, branch, "app/blog/BlogClient.tsx");
    const slugPatterns = [`"slug": "${post.slug}"`, `slug: "${post.slug}"`];
    const slugExistsInData = slugPatterns.some(p => blogData.includes(p));
    const slugExistsInClient = slugPatterns.some(p => clientCheck.includes(p));
    if (slugExistsInData || slugExistsInClient) {
      return { success: false, error: `Slug "${post.slug}" already exists — skipping duplicate` };
    }

    // Check for a near-duplicate topic (same subject, different wording/slug).
    // This is what previously let the agent publish 3-4 versions of the same
    // "Kitsune guide" / "trading guide" / "codes" article under different slugs.
    const existingTitles = extractExistingTitles(blogData);
    const newTopicNorm = normaliseTopic(post.title as string);
    const nearDuplicate = existingTitles.find(t => wordOverlap(normaliseTopic(t), newTopicNorm) >= 0.45);
    if (nearDuplicate) {
      return { success: false, error: `Topic too similar to existing article "${nearDuplicate}" — skipping near-duplicate` };
    }

    const serialised = JSON.stringify(post, null, 2).replace(/"/g, '"');
    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";
    if (!blogData.includes(insertMarker)) {
      return { success: false, error: "Could not find BLOG_POSTS array" };
    }

    const updatedBlogData = blogData.replace(insertMarker + "\n", `${insertMarker}\n  ${serialised},\n`);
    await updateGithubFile(token, repo, branch, "app/_data/blog-data.ts", updatedBlogData, blogDataSha, `feat: add "${post.title}" [Daily Agent]`);

    // Update BlogClient.tsx
    const { content: clientContent, sha: clientSha } = await getGithubFile(token, repo, branch, "app/blog/BlogClient.tsx");
    const clientInsertMarker = "const POSTS = [\n";

    if (clientContent.includes(clientInsertMarker)) {
      const categoryColor = (post.categoryColor as string) || "#00f5ff";
      const clientEntry = `  {
    slug: "${post.slug}",
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    date: "${post.date}",
    category: "${post.category}",
    categoryColor: "${categoryColor}",
    categoryBg: "${hexToRgba(categoryColor, 0.08)}",
    categoryBorder: "${hexToRgba(categoryColor, 0.25)}",
    readTime: "${post.readTime}",
    icon: "${post.icon}",
    featured: ${post.featured ? "true" : "false"},
  },\n`;

      const updatedClient = clientContent.replace(clientInsertMarker, clientInsertMarker + clientEntry);
      await updateGithubFile(token, repo, branch, "app/blog/BlogClient.tsx", updatedClient, clientSha, `feat: update blog list with "${post.slug}" [Daily Agent]`);
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function POST(req: NextRequest) {
  // Auth check
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!apiKey || !token || !repo) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

const now = new Date();
const year = now.getFullYear();
const todayDisplay = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const todayISO = now.toISOString().split("T")[0];
const AUTO_TOPICS = BASE_TOPICS.map(t => `${t} ${year}`);

  // Pick a random topic
  const topic = AUTO_TOPICS[Math.floor(Math.random() * AUTO_TOPICS.length)];
  const results: { topic: string; slug?: string; success: boolean; error?: string }[] = [];

  try {
    const post = await generateArticle(apiKey, topic, todayDisplay);
    if (!post) {
      results.push({ topic, success: false, error: "Failed to generate article" });
    } else {
      // Always override whatever date the model produced — giving it only
      // "July 2026" and letting it invent a day + calculate the ISO date
      // itself is unreliable (it tends to default to the 15th). Compute
      // the real date in code instead.
      post.date = todayDisplay;
      post.dateISO = todayISO;
      const publishResult = await publishArticle(token, repo, branch, post);
      results.push({ topic, slug: post.slug as string, ...publishResult });
    }
  } catch (err) {
    results.push({ topic, success: false, error: err instanceof Error ? err.message : "Unknown error" });
  }

  // Trigger Vercel deploy
  let deployTriggered = false;
  const deployHook = process.env.VERCEL_DEPLOY_HOOK;
  if (deployHook && results.some(r => r.success)) {
    try {
      const deployRes = await fetch(deployHook, { method: "POST" });
      deployTriggered = deployRes.ok;
    } catch { /* silent */ }
  }

  // Send push notification for successful articles
  const successfulArticles = results.filter(r => r.success);
  if (successfulArticles.length > 0) {
    const first = successfulArticles[0];
    try {
      await fetch(`https://www.bloxfruitsai.com/api/notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-agent-secret": process.env.AGENT_SECRET || "",
        },
        body: JSON.stringify({
          title: "New on Blox Fruits AI! 🎮",
          message: `New guide just published — check it out now!`,
          url: `https://www.bloxfruitsai.com/blog/${first.slug}`,
        }),
      });
    } catch { /* silent */ }
  }

  return NextResponse.json({ results, deployTriggered });
}
