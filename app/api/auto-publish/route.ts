
import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

const BASE_TOPICS = [

  // 🔥 High priority — highest search volume
  `Best fruit in Blox Fruits — complete guide`,
  "How to get God Human in Blox Fruits — full guide",
  `Blox Fruits race tier list — best race ranked`,
  `Blox Fruits best fighting style — tier list and guide`,
  `Blox Fruits leveling guide — fastest way to max level`,
  "Blox Fruits Buddha guide — moves, awakening and tips",
  "Blox Fruits Dough combo guide — best combos and moves",
  "Where to find Fist of Darkness in Blox Fruits",
  `Blox Fruits PvP tier list — best fruits for combat`,
  "How to awaken fruits in Blox Fruits — full awakening guide",

  // High priority — medium volume
  `Blox Fruits Dragon fruit guide — moves and combos`,
  `Best sword in Blox Fruits — tier list and guide`,
  "Blox Fruits Dough fruit guide — awakening, moves and grinding",
  `Blox Fruits beginner guide — how to level up fast`,
  `Blox Fruits trading guide — how to get rare fruits fast`,
  `Best race in Blox Fruits — tier list and which to choose`,
  `Blox Fruits Control fruit guide — moves and awakening 2026`,
  "Blox Fruits all bosses guide — locations and drop rates",
  `Blox Fruits best accessories — tier list and where to find`,
  "Blox Fruits Third Sea guide — how to unlock and what to do",

  // Medium priority — evergreen content
  "Blox Fruits Leopard fruit guide — moves, combos and PvP tips",
  "Blox Fruits Kitsune fruit guide — moves, awakening and tips",
  `Blox Fruits best stats build — melee, sword, gun or fruit`,
  "Blox Fruits raid guide — how to complete raids and get fragments",
  "Blox Fruits sea events guide — how to find and beat them",
  "Blox Fruits Magma fruit guide — moves, awakening and grinding",
  "Blox Fruits best fruits for beginners — cheap and effective options",
  `Blox Fruits all working codes — free XP and Beli`,
  
  `Blox Fruits beginner guide — how to level up fast from level 1`,
  `Blox Fruits all working codes — free XP and Beli`,
  `Best PvP fruits in Blox Fruits — tier list and combos`,
  "How to awaken fruits in Blox Fruits — full awakening guide",
  "Blox Fruits Dragon fruit guide — moves, combos and grinding tips",
  `Best race in Blox Fruits — tier list and which to choose`,
  `Blox Fruits trading guide — how to get rare fruits fast`,
  `Blox Fruits Control fruit guide — moves and awakening 2026`,
  `Best sword tier list in Blox Fruits — all swords ranked`,
  "Blox Fruits Dough fruit guide — awakening, moves and combos",
  "Blox Fruits all bosses guide — locations and drop rates",
  `Blox Fruits best accessories — tier list and where to find`,
  "Blox Fruits Third Sea guide — how to unlock and what to do",
  "Blox Fruits Leopard fruit guide — moves, combos and PvP tips",
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
- Output ONLY raw JSON starting with { and ending with }`;

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

async function generateArticle(apiKey: string, topic: string, monthYear: string): Promise<Record<string, unknown> | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 8000,
      system: ARTICLE_SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `Write a complete SEO-optimised article for bloxfruitsai.com about: ${topic}. Today's date is ${monthYear}. Use this EXACT date in the "date" field and calculate the correct "dateISO" format (YYYY-MM-DD). Output ONLY raw JSON starting with { and ending with }.`,
      }],
    }),
  });

  const data = await res.json();
  const text = data.content
    ?.filter((b: { type: string }) => b.type === "text")
    .map((b: { text: string }) => b.text)
    .join("\n") ?? "";

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

    // Check for duplicate in both blog-data.ts AND BlogClient.tsx
    const { content: clientCheck } = await getGithubFile(token, repo, branch, "app/blog/BlogClient.tsx");
    const slugExistsInData = blogData.includes(`slug: "${post.slug}"`);
    const slugExistsInClient = clientCheck.includes(`slug: "${post.slug}"`);
    if (slugExistsInData || slugExistsInClient) {
      return { success: false, error: `Slug "${post.slug}" already exists — skipping duplicate` };
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!apiKey || !token || !repo) {
    return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
  }

const now = new Date();
const year = now.getFullYear();
const monthYear = now.toLocaleString("en-GB", { month: "long", year: "numeric" });
const AUTO_TOPICS = BASE_TOPICS.map(t => `${t} ${year}`);

  // Pick a random topic
  const topic = AUTO_TOPICS[Math.floor(Math.random() * AUTO_TOPICS.length)];
  const results: { topic: string; slug?: string; success: boolean; error?: string }[] = [];

  try {
    const post = await generateArticle(apiKey, topic, monthYear);
    if (!post) {
      results.push({ topic, success: false, error: "Failed to generate article" });
    } else {
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
