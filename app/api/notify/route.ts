import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-agent-secret");
  if (!process.env.AGENT_SECRET || secret !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { title, message, url } = await req.json();

  const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_REST_API_KEY;

  if (!appId || !apiKey) {
    return NextResponse.json({ error: "OneSignal not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        included_segments: ["All"],
        headings: { en: title || "New on Blox Fruits AI!" },
        contents: { en: message || "A new article has been published." },
        url: url || "https://www.bloxfruitsai.com/blog",
        chrome_web_icon: "https://www.bloxfruitsai.com/icon.png",
        firefox_icon: "https://www.bloxfruitsai.com/icon.png",
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: res.ok, data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
