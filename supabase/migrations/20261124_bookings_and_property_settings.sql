-- ─── Bookuj Migration: Bookings Table & Host Setting Columns ────────────────
-- Run this in Supabase Dashboard -> SQL Editor

-- 1. Add new host configuration columns to public.properties
alter table public.properties 
  add column if not exists payment_methods jsonb default '["blik", "iban"]'::jsonb,
  add column if not exists allow_pay_on_arrival boolean default false,
  add column if not exists direct_contact_enabled boolean default true;

-- Update Zakopane property settings
update public.properties
set 
  payment_methods = '["blik", "iban"]'::jsonb,
  allow_pay_on_arrival = false,
  direct_contact_enabled = true
where slug = 'zakopane-gorna-chata';

-- 2. Create public.bookings table for direct reservation requests
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

-- Indexes for fast queries
create index if not exists idx_bookings_ref on public.bookings (booking_ref);
create index if not exists idx_bookings_property_slug on public.bookings (property_slug);

-- Enable RLS
alter table public.bookings enable row level security;

-- Policy: Allow service role and authenticated full access
drop policy if exists "Allow service role full access to bookings" on public.bookings;
create policy "Allow service role full access to bookings"
  on public.bookings
  for all
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');
