import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const GITHUB_API = "https://api.github.com";

// Accepts either the logged-in dashboard cookie (browser calls) or the
// x-agent-secret header (external callers like the GitHub Actions cron job).
async function isAuthorised(req: NextRequest) {
  if (!process.env.AGENT_SECRET) return false;

  const headerSecret = req.headers.get("x-agent-secret");
  if (headerSecret === process.env.AGENT_SECRET) return true;

  const cookieStore = await cookies();
  const authed = cookieStore.get("agent_authed")?.value === "1";
  return authed;
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

async function getFile(token: string, repo: string, branch: string, filePath: string) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}?ref=${branch}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) throw new Error(`GitHub: could not read ${filePath} (${res.status})`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf8");
  return { content, sha: data.sha };
}

async function updateFile(
  token: string,
  repo: string,
  branch: string,
  filePath: string,
  newContent: string,
  sha: string,
  message: string
) {
  const res = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: Buffer.from(newContent).toString("base64"),
      sha,
      branch,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub update failed: ${err.message}`);
  }
  return res.json();
}

export async function POST(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN or GITHUB_REPO not set in environment variables." },
      { status: 500 }
    );
  }

  try {
    const { post } = await req.json();

    if (!post?.slug || !post?.title || !post?.content) {
      return NextResponse.json(
        { error: "Invalid post — slug, title, and content are required." },
        { status: 400 }
      );
    }

    // ── 1. Read blog-data.ts from GitHub ─────────────────────────────────
    const { content: blogData, sha: blogDataSha } = await getFile(
      token, repo, branch, "app/_data/blog-data.ts"
    );

    // ── 2. Check for duplicate slug ───────────────────────────────────────
    if (blogData.includes(`slug: "${post.slug}"`)) {
      return NextResponse.json(
        { error: `Article "${post.slug}" already exists.` },
        { status: 409 }
      );
    }

    // ── 3. Serialise post and insert into blog-data.ts ────────────────────
    const serialised = JSON.stringify(post, null, 2).replace(/"/g, '"');

    const insertMarker = "export const BLOG_POSTS: BlogPost[] = [";
    if (!blogData.includes(insertMarker)) {
      return NextResponse.json(
        { error: "Could not find BLOG_POSTS array in blog-data.ts" },
        { status: 500 }
      );
    }

    const updatedBlogData = blogData.replace(
      insertMarker + "\n",
      `${insertMarker}\n  ${serialised},\n`
    );

    // ── 4. Read BlogClient.tsx from GitHub ────────────────────────────────
    const { content: clientContent, sha: clientSha } = await getFile(
      token, repo, branch, "app/blog/BlogClient.tsx"
    );

    const clientInsertMarker = "const POSTS = [\n";
    let updatedClient = clientContent;

    if (clientContent.includes(clientInsertMarker)) {
      const categoryBg = hexToRgba(post.categoryColor || "#00f5ff", 0.08);
      const categoryBorder = hexToRgba(post.categoryColor || "#00f5ff", 0.25);

      const clientEntry = `  {
    slug: "${post.slug}",
    title: ${JSON.stringify(post.title)},
    excerpt: ${JSON.stringify(post.excerpt)},
    date: "${post.date}",
    category: "${post.category}",
    categoryColor: "${post.categoryColor}",
    categoryBg: "${categoryBg}",
    categoryBorder: "${categoryBorder}",
    readTime: "${post.readTime}",
    icon: "${post.icon}",
    featured: ${post.featured ? "true" : "false"},
  },\n`;

      updatedClient = clientContent.replace(
        clientInsertMarker,
        clientInsertMarker + clientEntry
      );
    }

    // ── 5. Push both files to GitHub ──────────────────────────────────────
    await updateFile(
      token, repo, branch,
      "app/_data/blog-data.ts",
      updatedBlogData,
      blogDataSha,
      `feat: add article "${post.title}" [AI Agent]`
    );

    await updateFile(
      token, repo, branch,
      "app/blog/BlogClient.tsx",
      updatedClient,
      clientSha,
      `feat: update blog list with "${post.slug}" [AI Agent]`
    );

    // ── 6. Trigger Vercel deploy hook ─────────────────────────────────────
    let deployTriggered = false;
    let deployError = null;

    const deployHook = process.env.VERCEL_DEPLOY_HOOK;
    if (deployHook) {
      try {
        const deployRes = await fetch(deployHook, { method: "POST" });
        deployTriggered = deployRes.ok;
        if (!deployRes.ok) deployError = `Deploy hook returned ${deployRes.status}`;
      } catch {
        deployError = "Failed to call deploy hook";
      }
    } else {
      deployError = "VERCEL_DEPLOY_HOOK not set";
    }

    return NextResponse.json({
      success: true,
      slug: post.slug,
      deployTriggered,
      deployError,
      liveUrl: `https://www.bloxfruitsai.com/blog/${post.slug}`,
    });
  } catch (err) {
    console.error("Publish error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}

// ── GET: count published articles ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!(await isAuthorised(req))) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    return NextResponse.json({ count: 0, slugs: [] });
  }

  try {
    const { content } = await getFile(token, repo, branch, "app/_data/blog-data.ts");
    const slugs = [...content.matchAll(/slug: "([^"]+)"/g)]
      .map((m) => m[1])
      .filter((s) => s !== "string");
    return NextResponse.json({ count: slugs.length, slugs });
  } catch {
    return NextResponse.json({ count: 0, slugs: [] });
  }
}
