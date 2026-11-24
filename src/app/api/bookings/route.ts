import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { buildBookingEmail } from '@/lib/email/bookingNotification';
import { getPropertyBySlug } from '@/lib/propertyData';
import { saveBooking } from '@/lib/bookingStore';

interface BookingPayload {
  propertySlug?: string;
  property_slug?: string;
  propertyName?: string;
  property_name?: string;
  hostEmail?: string;
  host_email?: string;
  guestName?: string;
  guest_name?: string;
  guestEmail?: string;
  guest_email?: string;
  guestPhone?: string;
  guest_phone?: string;
  checkIn?: string;
  check_in?: string;
  checkOut?: string;
  check_out?: string;
  nights?: number;
  totalPrice?: number;
  total_price?: number;
  depositAmount?: number;
  deposit_amount?: number;
  currency?: string;
  paymentMethod?: string;
  payment_method?: string;
  specialRequests?: string;
  special_requests?: string;
  bookingRef?: string;
  booking_ref?: string;
}

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

export async function POST(req: NextRequest) {
  try {
    const payload: BookingPayload = await req.json();

    const propertySlug = payload.propertySlug || payload.property_slug || 'unknown';
    const guestName = payload.guestName || payload.guest_name;
    const guestEmail = payload.guestEmail || payload.guest_email;
    const guestPhone = payload.guestPhone || payload.guest_phone || null;
    const checkIn = payload.checkIn || payload.check_in;
    const checkOut = payload.checkOut || payload.check_out;
    const nights = Number(payload.nights) || 1;
    const totalPrice = payload.totalPrice ?? payload.total_price ?? null;
    const depositAmount = payload.depositAmount ?? payload.deposit_amount ?? null;
    const paymentMethod = payload.paymentMethod || payload.payment_method || 'direct';
    const specialRequests = payload.specialRequests || payload.special_requests || null;
    const bookingRef =
      payload.bookingRef ||
      payload.booking_ref ||
      `DIR-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!guestName || !guestEmail || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required booking fields (guestName, guestEmail, checkIn, checkOut)' },
        { status: 400 }
      );
    }

    // 1. Persist booking via bookingStore (Supabase public.bookings with in-memory resilient cache)
    await saveBooking({
      property_slug: propertySlug,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
      check_in: checkIn,
      check_out: checkOut,
      nights: nights,
      total_price: totalPrice,
      deposit_amount: depositAmount,
      payment_method: paymentMethod,
      special_requests: specialRequests,
      booking_ref: bookingRef,
      status: 'pending_deposit',
    });

    // 2. Fetch property details for host email if not explicitly provided
    let propertyName = payload.propertyName || payload.property_name;
    let hostEmail = payload.hostEmail || payload.host_email;

    let property: any = null;
    if ((!propertyName || !hostEmail) && propertySlug !== 'unknown') {
      try {
        property = await getPropertyBySlug(propertySlug);
        if (property) {
          if (!propertyName) propertyName = property.title;
          if (!hostEmail) hostEmail = property.hostInfo?.email;
        }
      } catch (err) {
        console.warn('[API /api/bookings] Could not fetch property info for email notification:', err);
      }
    }

    if (!hostEmail) {
      hostEmail = property?.hostInfo?.email || process.env.DEMO_HOST_EMAIL || 'wolszczak.jan@gmail.com';
    }

    propertyName = propertyName || 'Obiekt Bookuj';

    // 3. Send email to host via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && hostEmail) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress =
          process.env.HOST_NOTIFICATION_FROM || 'Bookuj Reservations <onboarding@resend.dev>';

        const origin =
          process.env.NEXT_PUBLIC_SITE_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://bookuj.pl');
        const confirmUrl = `${origin}/bookings/confirm?ref=${bookingRef}`;

        await resend.emails.send({
          from: fromAddress,
          to: hostEmail,
          subject: `Nowa rezerwacja [${bookingRef}] — ${propertyName}`,
          html: buildBookingEmail({
            propertyName,
            propertySlug,
            bookingRef,
            guestName,
            guestEmail,
            guestPhone: guestPhone || undefined,
            checkIn,
            checkOut,
            nights,
            totalPrice: totalPrice !== null ? Number(totalPrice) : undefined,
            depositAmount: depositAmount !== null ? Number(depositAmount) : undefined,
            currency: payload.currency || 'PLN',
            paymentMethod,
            specialRequests: specialRequests || undefined,
            confirmUrl,
          }),
        });
      } catch (emailErr) {
        console.error('[API /api/bookings] Failed to send email via Resend:', emailErr);
      }
    } else if (!resendApiKey) {
      console.warn(
        '[API /api/bookings] RESEND_API_KEY not configured; skipping host notification email'
      );
    } else if (!hostEmail) {
      console.warn(
        '[API /api/bookings] Host email not available for property; skipping host notification email'
      );
    }

    return NextResponse.json({
      success: true,
      bookingRef,
    });
  } catch (error) {
    console.error('[API /api/bookings] Error processing booking request:', error);
    return NextResponse.json(
      { error: 'Internal server error processing booking' },
      { status: 500 }
    );
  }
}
