import { NextResponse } from 'next/server';
import { addDays, format } from 'date-fns';

export function generateMockIcs(baseDate = new Date()): string {
  const r1Start = addDays(baseDate, 5);
  const r1End = addDays(baseDate, 9);

  const r2Start = addDays(baseDate, 17);
  const r2End = addDays(baseDate, 22);

  const r3Start = addDays(baseDate, 34);
  const r3End = addDays(baseDate, 39);

  const r4Start = addDays(baseDate, 48);
  const r4End = addDays(baseDate, 53);

  const ranges = [
    { uid: 'airbnb-mock-001@nestay.co', start: r1Start, end: r1End, summary: 'Reserved (Airbnb)' },
    { uid: 'booking-mock-002@nestay.co', start: r2Start, end: r2End, summary: 'Reserved (Booking.com)' },
    { uid: 'airbnb-mock-003@nestay.co', start: r3Start, end: r3End, summary: 'Reserved (Airbnb)' },
    { uid: 'booking-mock-004@nestay.co', start: r4Start, end: r4End, summary: 'Reserved (Booking.com)' },
  ];

  const nowStamp = format(baseDate, "yyyyMMdd'T'HHmmss'Z'");

  const events = ranges
    .map(
      (r) => `BEGIN:VEVENT
UID:${r.uid}
DTSTAMP:${nowStamp}
DTSTART;VALUE=DATE:${format(r.start, 'yyyyMMdd')}
DTEND;VALUE=DATE:${format(r.end, 'yyyyMMdd')}
SUMMARY:${r.summary}
STATUS:CONFIRMED
END:VEVENT`
    )
    .join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Nestay//Mock Airbnb and Booking Calendar Sync//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Booking & Airbnb Zakopane Górna Chata
${events}
END:VCALENDAR`;
}

export async function GET() {
  const ics = generateMockIcs();
  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="calendar.ics"',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
