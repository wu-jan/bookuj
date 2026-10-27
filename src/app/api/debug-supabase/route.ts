import { NextResponse } from 'next/server';
import { isSupabaseConfigured, getSupabaseClient } from '@/lib/supabase';
import { getPropertyBySlug } from '@/lib/propertyData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_DATA;

  let dbError = null;
  let dbRow = null;

  const client = getSupabaseClient();
  if (client) {
    const { data, error } = await client
      .from('properties')
      .select('id, slug, title, price_per_night')
      .eq('slug', 'zakopane-gorna-chata')
      .maybeSingle();

    dbError = error?.message || null;
    dbRow = data;
  }

  const prop = await getPropertyBySlug('zakopane-gorna-chata');

  return NextResponse.json({
    env: {
      hasUrl: Boolean(rawUrl),
      urlPrefix: rawUrl ? `${rawUrl.slice(0, 20)}...` : null,
      hasKey: Boolean(rawKey),
      keyLength: rawKey ? rawKey.length : 0,
      useLocalData: useLocal ?? null,
      isSupabaseConfigured,
    },
    directQuery: {
      hasClient: Boolean(client),
      error: dbError,
      row: dbRow,
    },
    propertyDataResult: {
      title: prop?.title,
      pricePerNight: prop?.pricePerNight,
    },
    serverTime: new Date().toISOString(),
  });
}
