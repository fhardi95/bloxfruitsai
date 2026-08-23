-- Profiles table + auto-populate trigger for Discord OAuth sign-in
-- Run this in the Supabase SQL editor AFTER trade_ads.sql and AFTER
-- enabling the Discord provider in Authentication > Providers.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  discord_username text,
  discord_avatar_url text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "Public can read profiles" on profiles;
create policy "Public can read profiles"
  on profiles for select
  using (true);

drop policy if exists "Users can update their own profile" on profiles;
create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs in via Discord,
-- pulling their Discord username/avatar from the OAuth metadata.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, discord_username, discord_avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->'custom_claims'->>'global_name'
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
exception
  when others then
    -- Never let a profile-creation hiccup block the actual sign-in.
    -- The user can still authenticate even if this insert fails for
    -- any reason; the profile can be backfilled later.
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
