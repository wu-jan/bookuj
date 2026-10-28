import defaultPropertiesData from '@/data/default-properties.json';
import { Property } from '@/types/property';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

const fallbackProperties: Property[] = defaultPropertiesData as Property[];

function shouldUseLocalData(): boolean {
  if (process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true') {
    return true;
  }
  return !isSupabaseConfigured;
}

export function mapDatabaseRowToProperty(row: any): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    description: row.description,
    pricePerNight: Number(row.price_per_night),
    currency: row.currency,
    images: Array.isArray(row.images) ? row.images : [],
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    occupiedDates: Array.isArray(row.occupied_dates) ? row.occupied_dates : [],
    hostInfo: row.host_info,
    theme: row.theme,
    coordinates: row.coordinates || undefined,
    minimumStay: row.minimum_stay || undefined,
    depositPercent: row.deposit_percent || undefined,
    cancellationPolicy: row.cancellation_policy || undefined,
    tagline: row.tagline || undefined,
    faq: row.faq || undefined,
    defaultLocale: row.default_locale || undefined,
    translations: row.translations || undefined,
    hostBio: row.host_bio || undefined,
    icalUrl: row.ical_url || undefined,
    softHoldHours: row.soft_hold_hours || undefined,
  };
}

/**
 * Fetch all available properties.
 * Reads from Supabase when configured, otherwise falls back to local fallback placeholders.
 */
export async function getAllProperties(): Promise<Property[]> {
  if (shouldUseLocalData()) {
    return fallbackProperties;
  }

  const client = getSupabaseClient();
  if (!client) return fallbackProperties;

  try {
    const { data, error } = await client
      .from('properties')
      .select('*')
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch failed or returned 0 properties, falling back to local defaults:', error?.message);
      return fallbackProperties;
    }

    return data.map(mapDatabaseRowToProperty);
  } catch (err) {
    console.error('Error fetching properties from Supabase:', err);
    return fallbackProperties;
  }
}

/**
 * Fetch a single property by its unique URL slug.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  if (shouldUseLocalData()) {
    return fallbackProperties.find((p) => p.slug === slug);
  }

  const client = getSupabaseClient();
  if (!client) return fallbackProperties.find((p) => p.slug === slug);

  try {
    const { data, error } = await client
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error || !data) {
      // Fallback to local default properties if not found in database or query error
      return fallbackProperties.find((p) => p.slug === slug);
    }

    return mapDatabaseRowToProperty(data);
  } catch (err) {
    console.error(`Error fetching property by slug (${slug}) from Supabase:`, err);
    return fallbackProperties.find((p) => p.slug === slug);
  }
}

/**
 * Fetch all property slugs for static route generation or navigation.
 */
export async function getAllSlugs(): Promise<string[]> {
  if (shouldUseLocalData()) {
    return fallbackProperties.map((p) => p.slug);
  }

  const client = getSupabaseClient();
  if (!client) return fallbackProperties.map((p) => p.slug);

  try {
    const { data, error } = await client
      .from('properties')
      .select('slug');

    if (error || !data || data.length === 0) {
      return fallbackProperties.map((p) => p.slug);
    }

    return data.map((row: { slug: string }) => row.slug);
  } catch {
    return fallbackProperties.map((p) => p.slug);
  }
}

/**
 * Synchronous local helper for components or contexts that need instant sync fallback.
 */
export function getLocalProperties(): Property[] {
  return fallbackProperties;
}
