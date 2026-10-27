-- ─── Bookuj Supabase Schema: Properties Table ─────────────────────────────────

create table if not exists public.properties (
  id text primary key,
  slug text unique not null,
  title text not null,
  location text not null,
  description text not null,
  price_per_night numeric not null,
  currency text not null default 'PLN',
  images jsonb not null default '[]'::jsonb,
  amenities jsonb not null default '[]'::jsonb,
  occupied_dates jsonb not null default '[]'::jsonb,
  host_info jsonb not null,
  theme jsonb not null,
  coordinates jsonb,
  minimum_stay integer default 1,
  deposit_percent integer default 10,
  cancellation_policy text,
  tagline text,
  faq jsonb,
  default_locale text default 'pl',
  translations jsonb,
  host_bio text,
  ical_url text,
  soft_hold_hours integer default 2,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index on slug for fast lookups
create index if not exists idx_properties_slug on public.properties (slug);

-- Enable Row Level Security (RLS)
alter table public.properties enable row level security;

-- Policy: Allow public read access to properties (guests can view showcase pages)
drop policy if exists "Allow public read access to properties" on public.properties;
create policy "Allow public read access to properties"
  on public.properties
  for select
  using (true);

-- Policy: Allow service_role full management
drop policy if exists "Allow service role full access to properties" on public.properties;
create policy "Allow service role full access to properties"
  on public.properties
  for all
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');

