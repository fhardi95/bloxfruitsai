-- Trade Ads table for /trading feature
-- Run this in the Supabase SQL editor for your bloxfruitsai project.

create table if not exists trade_ads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  status text not null default 'open' check (status in ('open', 'completed', 'expired')),

  -- what the poster is OFFERING (array of fruit ids from fruits-data.ts, e.g. ['dragon','kitsune'])
  offering text[] not null default '{}',
  -- what the poster WANTS in return (free text, e.g. "Leopard + 2x Mastery" or "open to offers")
  wanting text not null,

  -- optional extra context from the poster
  note text,

  -- contact method shown on the ad (Discord tag is the only supported method for v1)
  discord_tag text not null,

  -- display name shown on the ad (not auth-verified in v1, anonymous posting allowed)
  display_name text not null default 'Anonymous Trader',

  -- optional: set if posted by a logged-in user (nullable, anonymous allowed)
  user_id uuid references auth.users(id) on delete set null
);

create index if not exists trade_ads_status_idx on trade_ads (status);
create index if not exists trade_ads_created_at_idx on trade_ads (created_at desc);
create index if not exists trade_ads_expires_at_idx on trade_ads (expires_at);

alter table trade_ads enable row level security;

-- Anyone can read open ads (this is a public trading board)
create policy "Public can read trade ads"
  on trade_ads for select
  using (true);

-- Anyone (anonymous or logged in) can create an ad
create policy "Anyone can insert trade ads"
  on trade_ads for insert
  with check (true);

-- Only the original poster (if logged in) can update/close their own ad
create policy "Owners can update their own ads"
  on trade_ads for update
  using (auth.uid() = user_id);

create policy "Owners can delete their own ads"
  on trade_ads for delete
  using (auth.uid() = user_id);

-- Optional: a scheduled function/cron (Supabase pg_cron or a Vercel cron hitting an API route)
-- should periodically run:
--   update trade_ads set status = 'expired' where status = 'open' and expires_at < now();
