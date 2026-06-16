import { createBrowserClient } from "@supabase/ssr";
import { createClient as createBasicClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function assertEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (.env.local and Vercel project settings)."
    );
  }
}

/**
 * Browser-side Supabase client. Use this inside "use client" components.
 * Reads the session from cookies automatically and keeps it in sync.
 */
export function createBrowserSupabaseClient() {
  assertEnv();
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

/**
 * Plain (non-SSR) Supabase client for server actions that don't need
 * to read the logged-in user's session — e.g. public reads/writes that
 * rely on RLS policies for anonymous access (anonymous trade ad posting).
 * Kept as a simple singleton since it holds no per-request cookie state.
 */
let cachedClient: SupabaseClient | null = null;
export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;
  assertEnv();
  cachedClient = createBasicClient(supabaseUrl!, supabaseAnonKey!);
  return cachedClient;
}

