# Discord Sign-In Setup

## 1. Create a Discord Application
1. Go to https://discord.com/developers/applications → New Application
2. Name it (e.g. "BloxFruitsAI Trading")
3. Go to OAuth2 → General. Copy the **Client ID** and **Client Secret**
4. Under OAuth2 → Redirects, add this URL (replace with your real Supabase project ref):
   `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   (Find your project ref in Supabase → Settings → API → Project URL)

## 2. Enable Discord provider in Supabase
1. Supabase Dashboard → Authentication → Providers → Discord → Enable
2. Paste the Discord Client ID and Client Secret from step 1
3. Save

## 3. Add your site's redirect URL in Supabase
Supabase Dashboard → Authentication → URL Configuration:
- Site URL: `https://www.bloxfruitsai.com`
- Redirect URLs: add `https://www.bloxfruitsai.com/auth/callback` and
  `http://localhost:3000/auth/callback` (for local testing)

## 4. Run the new SQL migration
Run `supabase/profiles.sql` in the Supabase SQL editor (after trade_ads.sql,
which should already be applied from the earlier delivery). This creates a
`profiles` table that auto-fills with the Discord username/avatar whenever
someone signs in for the first time.

## 5. Install the new dependency
```
npm install @supabase/ssr
```
(package.json already lists it — Vercel installs it automatically on deploy)

## 6. Files in this delivery
- `middleware.ts` — refreshes the auth session on every request (required by Supabase SSR)
- `lib/supabase.ts` — updated: adds a browser client alongside the existing basic client
- `lib/supabase-server.ts` — new: server-side client that reads the logged-in user from cookies
- `app/auth/actions.ts` — new: signInWithDiscord, signOut, getCurrentUser
- `app/auth/callback/route.ts` — new: OAuth callback Discord redirects to after login
- `app/trading/actions.ts` — updated: createTradeAd/markTradeAdCompleted now use the
  session-aware client so user_id populates for signed-in users; anonymous posting still works
- `app/trading/page.tsx` — updated: fetches the current user and passes it down
- `app/trading/TradingClient.tsx` — updated: sign-in/out button in the header, Discord
  avatar + username shown when logged in, prefilled display name, a ✓ badge on ads posted
  by signed-in users, and a "Mark Completed" button only the ad's owner can see and use

## 7. What this does NOT include yet (by design — Phase 1 only)
- No "my trade ads" management page
- No reputation/rating system
- No profile pages
These were intentionally deferred — this delivery is just sign-in + ownership wired
into the existing trading board. Anonymous posting is still fully supported alongside it.

## 8. Verified before delivery
- `npx tsc --noEmit` — zero errors across the whole repo
- `npx next build` — all 166 routes build successfully, /auth/callback and /trading
  both correctly dynamic, middleware registered and active
- The build does NOT fail even if Supabase/Discord aren't configured yet — getCurrentUser()
  returns null gracefully rather than crashing, so the site keeps working in the meantime
