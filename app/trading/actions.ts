"use server";

import { getSupabaseClient } from "@/lib/supabase";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export interface TradeAd {
  id: string;
  created_at: string;
  expires_at: string;
  status: "open" | "completed" | "expired";
  offering: string[];
  wanting: string;
  note: string | null;
  discord_tag: string;
  display_name: string;
  user_id: string | null;
}

export interface CreateTradeAdInput {
  offering: string[];
  wanting: string;
  note?: string;
  discordTag: string;
  displayName?: string;
}

export async function getOpenTradeAds(): Promise<TradeAd[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase env vars not set — /trading will render with no ads until configured.");
    return [];
  }

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("trade_ads")
    .select("id, created_at, expires_at, status, offering, wanting, note, discord_tag, display_name, user_id")
    .eq("status", "open")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("getOpenTradeAds error:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getTradeAdById(id: string): Promise<TradeAd | null> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("trade_ads")
    .select("id, created_at, expires_at, status, offering, wanting, note, discord_tag, display_name, user_id")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getTradeAdById error:", error.message);
    return null;
  }

  return data;
}

export async function createTradeAd(
  input: CreateTradeAdInput
): Promise<{ success: true; id: string } | { success: false; error: string }> {
  const offering = input.offering.filter(Boolean).slice(0, 10);
  const wanting = input.wanting.trim().slice(0, 200);
  const discordTag = input.discordTag.trim().slice(0, 50);
  const displayName = (input.displayName || "Anonymous Trader").trim().slice(0, 40);
  const note = input.note?.trim().slice(0, 300) || null;

  if (offering.length === 0) {
    return { success: false, error: "Add at least one fruit you're offering." };
  }
  if (!wanting) {
    return { success: false, error: "Tell traders what you want in return." };
  }
  if (!discordTag) {
    return { success: false, error: "Add a Discord tag so traders can reach you." };
  }

  // Use the session-aware client so Supabase RLS can attach the logged-in
  // user's id automatically. Anonymous posting still works fine — auth.uid()
  // is simply null in that case, matching the existing RLS policy.
  const supabase = await createServerSupabaseClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("trade_ads")
    .insert({
      offering,
      wanting,
      note,
      discord_tag: discordTag,
      display_name: displayName,
      user_id: userData.user?.id ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("createTradeAd error:", error.message);
    return { success: false, error: "Couldn't post your ad right now. Try again in a moment." };
  }

  revalidatePath("/trading");
  return { success: true, id: data.id };
}

export async function markTradeAdCompleted(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  // Session-aware client — RLS only allows this to succeed if the
  // logged-in user is the original owner of the ad.
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("trade_ads")
    .update({ status: "completed" })
    .eq("id", id);

  if (error) {
    console.error("markTradeAdCompleted error:", error.message);
    return { success: false, error: "Couldn't update this ad. It may require sign-in." };
  }

  revalidatePath("/trading");
  return { success: true };
}
