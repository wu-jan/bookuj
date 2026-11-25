import { getPropertyBySlug } from '@/lib/propertyData';
import { getBookingsForProperty, BookingRecord } from '@/lib/bookingStore';

/**
 * Formats a Date or ISO string ('YYYY-MM-DD' or ISO timestamp) into 'YYYYMMDD' for VALUE=DATE.
 */
function toIcalDateString(dateStr: string): string {
  const clean = dateStr.split('T')[0].replace(/-/g, '');
  return clean;
}

/**
 * Formats a timestamp into UTC ISO format for DTSTAMP (e.g. 20261123T140000Z).
 */
function toIcalDateTimeUtc(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Generates an RFC 5545 compliant VCALENDAR (.ics) string for a property slug,
 * blocking dates reserved directly via Nestay so Booking.com and Airbnb can import them.
 */
export async function generatePropertyIcs(slug: string): Promise<string> {
  const property = await getPropertyBySlug(slug);
  const propertyTitle = property?.title || slug;
  const dtstamp = toIcalDateTimeUtc();

  const bookings: BookingRecord[] = await getBookingsForProperty(slug);

  // If no DB bookings found and slug is zakopane demo, add showcase baseline demo booking
  if (bookings.length === 0 && slug === 'zakopane-gorna-chata') {
    bookings.push({
      booking_ref: 'DIR-DEMO26',
      property_slug: slug,
      check_in: '2026-11-28',
      check_out: '2026-12-02',
      guest_name: 'Gość Nestay',
      guest_email: 'gosc@nestay.co',
      nights: 4,
      status: 'confirmed',
    });
  }

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nestay.co//Property Calendar Sync 1.0//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${propertyTitle.replace(/[,;]/g, '')} (Nestay Direct)`,
    'X-WR-TIMEZONE:Europe/Warsaw',
  ];

  for (const b of bookings) {
    if (!b.check_in || !b.check_out) continue;

    const startDate = toIcalDateString(b.check_in);
    const endDate = toIcalDateString(b.check_out);
    const uid = `${b.booking_ref || b.id || Math.random().toString(36).substring(7)}@nestay.co`;
    const summary = `Nestay Direct: ${b.booking_ref || 'Rezerwacja'}`;
    const description = `Rezerwacja bezpośrednia przez Nestay.co\\nStatus: ${b.status || 'confirmed'}`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtstamp}`);
    lines.push(`DTSTART;VALUE=DATE:${startDate}`);
    lines.push(`DTEND;VALUE=DATE:${endDate}`);
    lines.push(`SUMMARY:${summary}`);
    lines.push(`DESCRIPTION:${description}`);
    lines.push('STATUS:CONFIRMED');
    lines.push('TRANSP:OPAQUE');
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');

  return lines.join('\r\n') + '\r\n';
}
