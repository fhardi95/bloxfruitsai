"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export interface CurrentUser {
  id: string;
  discordUsername: string | null;
  discordAvatarUrl: string | null;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) return null;

    const meta = data.user.user_metadata ?? {};
    return {
      id: data.user.id,
      discordUsername: meta.full_name ?? meta.name ?? meta.custom_claims?.global_name ?? null,
      discordAvatarUrl: meta.avatar_url ?? null,
    };
  } catch {
    // Supabase not configured yet — treat as logged out rather than crashing.
    return null;
  }
}

export async function signInWithDiscord() {
  const supabase = await createServerSupabaseClient();
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/trading")}`,
    },
  });

  if (error || !data.url) {
    redirect("/trading?auth_error=1");
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/trading");
}
