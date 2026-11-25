import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPropertyBySlug } from '@/lib/propertyData';
import { buildGuestConfirmationEmail } from '@/lib/email/guestConfirmation';
import { getBookingByRef, confirmBooking } from '@/lib/bookingStore';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get('ref');

  if (!ref) {
    return NextResponse.json({ error: 'Missing booking reference' }, { status: 400 });
  }

  const booking = await getBookingByRef(ref);

  if (!booking) {
    // If even cache doesn't have it, provide a demo fallback if ref starts with DIR-DEMO
    if (ref.startsWith('DIR-DEMO')) {
      return NextResponse.json({
        booking: {
          booking_ref: ref,
          property_slug: 'zakopane-gorna-chata',
          guest_name: 'Jan Kowalski',
          guest_email: 'jan@example.com',
          guest_phone: '+48 601 234 567',
          check_in: '2026-11-28',
          check_out: '2026-12-02',
          nights: 4,
          total_price: 1996,
          deposit_amount: 499,
          payment_method: 'blik',
          status: 'pending_deposit',
        },
      });
    }

    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  return NextResponse.json({ booking });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ref = body.ref || body.bookingRef;

    if (!ref) {
      return NextResponse.json({ error: 'Missing booking reference' }, { status: 400 });
    }

    const updatedBooking = await confirmBooking(ref);

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Send confirmation email to guest via Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey && updatedBooking.guest_email) {
      try {
        const property = await getPropertyBySlug(updatedBooking.property_slug);
        const propertyName = property?.title || 'Obiekt Nestay';
        const resend = new Resend(resendApiKey);
        const fromAddress =
          process.env.HOST_NOTIFICATION_FROM || 'Nestay Reservations <onboarding@resend.dev>';

        await resend.emails.send({
          from: fromAddress,
          to: updatedBooking.guest_email,
          subject: `Rezerwacja potwierdzona [${ref}] — ${propertyName}`,
          html: buildGuestConfirmationEmail({
            propertyName,
            bookingRef: ref,
            guestName: updatedBooking.guest_name,
            checkIn: updatedBooking.check_in,
            checkOut: updatedBooking.check_out,
            nights: updatedBooking.nights || 1,
            totalPrice: updatedBooking.total_price !== null && updatedBooking.total_price !== undefined ? Number(updatedBooking.total_price) : undefined,
            depositAmount: updatedBooking.deposit_amount !== null && updatedBooking.deposit_amount !== undefined ? Number(updatedBooking.deposit_amount) : undefined,
            currency: 'PLN',
            hostName: property?.hostInfo?.name || 'Gospodarz',
            hostPhone: property?.hostInfo?.phone,
            hostEmail: property?.hostInfo?.email,
          }),
        });
      } catch (err) {
        console.warn('[API /api/bookings/confirm] Failed to send guest email:', err);
      }
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
      message: 'Rezerwacja została pomyślnie potwierdzona',
    });
  } catch (error) {
    console.error('[API /api/bookings/confirm] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
