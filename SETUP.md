# Trade Ads feature — setup instructions

## 1. Create the Supabase table
In your Supabase project dashboard → SQL Editor, paste and run the contents
of `supabase/trade_ads.sql`. This creates the `trade_ads` table with row
level security policies (public read, anonymous insert, owner-only update/delete).

## 2. Add environment variables
You need two values from your Supabase project (Settings → API):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the "anon public" key, NOT the service role key)

Add both to:
- `.env.local` for local dev (create this file, it's gitignored)
- Vercel → Project Settings → Environment Variables (for Production + Preview)

## 3. Install the new dependency
```
npm install @supabase/supabase-js
```
(package.json already lists it — this just installs it locally / Vercel
will install it automatically on next deploy)

## 4. Files in this delivery
- `app/trading/page.tsx` — server component, metadata, fetches ads
- `app/trading/TradingClient.tsx` — client component, post form + ad grid
- `app/trading/actions.ts` — server actions (create, list, mark completed)
- `lib/supabase.ts` — Supabase client singleton
- `supabase/trade_ads.sql` — table schema + RLS policies (run this in Supabase)
- `components/Navbar.tsx` — added "Trading" nav link
- `components/Footer.tsx` — added "Trade Ads" footer link
- `app/sitemap.ts` — added /trading to sitemap

## 5. Optional: auto-expire old ads
The SQL file includes a commented-out query at the bottom:
```sql
update trade_ads set status = 'expired' where status = 'open' and expires_at < now();
```
Options to run this on a schedule:
- Supabase pg_cron (if enabled on your plan) — schedule it directly in Postgres
- A Vercel Cron Job hitting a small API route that runs this query
Not required for launch — ads already get excluded from the listing once
`expires_at` has passed (the `getOpenTradeAds` query filters on this), so
this is just for keeping the table tidy long-term.

## 6. Verified before delivery
- `npx tsc --noEmit` — zero errors across the whole repo
- `npx next build` — all 124 routes build successfully, /trading correctly
  renders as dynamic (ƒ), and the build does NOT fail even if Supabase env
  vars are missing (falls back to an empty ad list with a console warning)
