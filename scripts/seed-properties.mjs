import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically load .env.local if present
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = rawUrl?.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ Missing Supabase credentials.');
  console.error('Please provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).');
  console.error('\nUsage:');
  console.error('  SUPABASE_URL=https://xyz.supabase.co SUPABASE_SERVICE_ROLE_KEY=ey... node scripts/seed-properties.mjs\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const dataPath = fs.existsSync(path.resolve(__dirname, '../supabase/seed-data.json'))
  ? path.resolve(__dirname, '../supabase/seed-data.json')
  : path.resolve(__dirname, '../src/data/default-properties.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const properties = JSON.parse(rawData);

console.log(`Loaded ${properties.length} properties from ${dataPath}`);

const rows = properties.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  location: p.location,
  description: p.description,
  price_per_night: p.pricePerNight,
  currency: p.currency,
  images: p.images,
  amenities: p.amenities,
  occupied_dates: p.occupiedDates,
  host_info: p.hostInfo,
  theme: p.theme,
  coordinates: p.coordinates || null,
  minimum_stay: p.minimumStay || 1,
  deposit_percent: p.depositPercent || 10,
  cancellation_policy: p.cancellationPolicy || null,
  tagline: p.tagline || null,
  faq: p.faq || null,
  default_locale: p.defaultLocale || (p.currency === 'PLN' ? 'pl' : 'en'),
  translations: p.translations || null,
  host_bio: p.hostBio || null,
  ical_url: p.icalUrl || null,
  soft_hold_hours: p.softHoldHours || 2,
}));

async function seed() {
  console.log(`Seeding ${rows.length} rows to "properties" table in Supabase...`);
  const { data, error } = await supabase
    .from('properties')
    .upsert(rows, { onConflict: 'id' })
    .select('id, slug, title');

  if (error) {
    console.error('❌ Supabase seed failed:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data?.length || rows.length} properties to Supabase!`);
}

seed();

