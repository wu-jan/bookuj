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



-- ─── Bookuj Supabase Schema: Bookings Table ─────────────────────────────────

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_ref text unique not null,
  property_slug text not null references public.properties (slug) on delete cascade,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in text not null,
  check_out text not null,
  nights integer not null default 1,
  total_price numeric,
  deposit_amount numeric,
  payment_method text not null default 'direct',
  special_requests text,
  status text not null default 'pending_deposit',
  confirmed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast lookup by booking reference and property
create index if not exists idx_bookings_ref on public.bookings (booking_ref);
create index if not exists idx_bookings_property_slug on public.bookings (property_slug);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Policy: Allow service role and authenticated full access
drop policy if exists "Allow service role full access to bookings" on public.bookings;
create policy "Allow service role full access to bookings"
  on public.bookings
  for all
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');
