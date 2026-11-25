import { createClient } from '@supabase/supabase-js';

export interface BookingRecord {
  id?: string;
  booking_ref: string;
  property_slug: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string | null;
  check_in: string;
  check_out: string;
  nights: number;
  total_price?: number | null;
  deposit_amount?: number | null;
  payment_method?: string;
  special_requests?: string | null;
  status: string;
  confirmed_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// In-memory fallback cache attached to globalThis to persist across dev hot reloads
const globalStore = globalThis as unknown as {
  __nestay_bookings_cache?: Map<string, BookingRecord>;
};

if (!globalStore.__nestay_bookings_cache) {
  globalStore.__nestay_bookings_cache = new Map<string, BookingRecord>();
}

const memoryCache = globalStore.__nestay_bookings_cache;

function getServiceRoleSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Saves a new booking to Supabase public.bookings, falling back to in-memory store
 * if the table does not exist or Supabase is offline.
 */
export async function saveBooking(booking: BookingRecord): Promise<BookingRecord> {
  // Always cache in memory as immediate backup
  memoryCache.set(booking.booking_ref, { ...booking });

  const supabase = getServiceRoleSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          property_slug: booking.property_slug,
          guest_name: booking.guest_name,
          guest_email: booking.guest_email,
          guest_phone: booking.guest_phone,
          check_in: booking.check_in,
          check_out: booking.check_out,
          nights: booking.nights,
          total_price: booking.total_price,
          deposit_amount: booking.deposit_amount,
          payment_method: booking.payment_method,
          special_requests: booking.special_requests,
          booking_ref: booking.booking_ref,
          status: booking.status || 'pending_deposit',
        })
        .select()
        .single();

      if (!error && data) {
        memoryCache.set(booking.booking_ref, data as BookingRecord);
        return data as BookingRecord;
      }

      if (error) {
        console.warn('[bookingStore] Supabase insert failed (fallback to in-memory cache):', error.message);
      }
    } catch (err) {
      console.warn('[bookingStore] Supabase exception (fallback to in-memory cache):', err);
    }
  }

  return booking;
}

/**
 * Retrieves a booking by its reference code (e.g. DIR-134062).
 */
export async function getBookingByRef(ref: string): Promise<BookingRecord | null> {
  const supabase = getServiceRoleSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_ref', ref)
        .single();

      if (!error && data) {
        memoryCache.set(ref, data as BookingRecord);
        return data as BookingRecord;
      }
    } catch (err) {
      // ignore, fall back to memoryCache
    }
  }

  return memoryCache.get(ref) || null;
}

/**
 * Confirms a booking and updates its status to 'confirmed'.
 */
export async function confirmBooking(ref: string): Promise<BookingRecord | null> {
  const now = new Date().toISOString();

  // Update in memory
  const cached = memoryCache.get(ref);
  if (cached) {
    cached.status = 'confirmed';
    cached.confirmed_at = now;
  }

  const supabase = getServiceRoleSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: 'confirmed',
          confirmed_at: now,
        })
        .eq('booking_ref', ref)
        .select()
        .single();

      if (!error && data) {
        memoryCache.set(ref, data as BookingRecord);
        return data as BookingRecord;
      }
    } catch (err) {
      // ignore
    }
  }

  return cached || (await getBookingByRef(ref));
}

/**
 * Returns all active bookings for a property slug (for iCal export).
 */
export async function getBookingsForProperty(propertySlug: string): Promise<BookingRecord[]> {
  const results: BookingRecord[] = [];

  const supabase = getServiceRoleSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('property_slug', propertySlug)
        .neq('status', 'cancelled');

      if (!error && Array.isArray(data)) {
        return data as BookingRecord[];
      }
    } catch (err) {
      // ignore
    }
  }

  // Fallback to memoryCache
  for (const b of memoryCache.values()) {
    if (b.property_slug === propertySlug && b.status !== 'cancelled') {
      results.push(b);
    }
  }

  return results;
}
