import { parseICS, VEvent } from 'node-ical';
import { format, isBefore, isEqual, addDays } from 'date-fns';
import { generateMockIcs } from '@/app/api/mock-ical/route';

/**
 * Fetches an iCal / .ics feed, parses all VEVENT blocks, and extracts an array of
 * occupied ISO date strings ('YYYY-MM-DD') for every occupied day inclusive.
 *
 * Designed with graceful degradation: any network failure or malformed calendar
 * payload will log a warning and safely return an empty array without crashing page render.
 */
export async function fetchOccupiedDates(icalUrl: string): Promise<string[]> {
  if (!icalUrl || typeof icalUrl !== 'string') {
    return [];
  }

  try {
    let icsContent = '';

    // If pointing to the mock iCal endpoint, resolve in-process to guarantee reliable build-time ISR
    if (icalUrl === '/api/mock-ical' || icalUrl.startsWith('/api/mock-ical')) {
      icsContent = generateMockIcs();
    } else {
      let resolvedUrl = icalUrl;
      if (icalUrl.startsWith('/')) {
        const origin =
          process.env.NEXT_PUBLIC_SITE_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        resolvedUrl = `${origin}${icalUrl}`;
      }

      const response = await fetch(resolvedUrl, {
        next: { revalidate: 3600 },
        headers: {
          'User-Agent': 'Nestay-CalendarSync/1.0',
        },
      });

      if (!response.ok) {
        console.warn(`[iCalSync] Failed to fetch calendar from ${icalUrl}: HTTP ${response.status}`);
        return [];
      }

      icsContent = await response.text();
    }

    if (!icsContent || !icsContent.includes('BEGIN:VCALENDAR')) {
      console.warn(`[iCalSync] Invalid or empty iCal content from ${icalUrl}`);
      return [];
    }

    const parsed = parseICS(icsContent);
    const occupiedDatesSet = new Set<string>();

    for (const key of Object.keys(parsed)) {
      const item = parsed[key];
      if (!item) continue;

      if (item.type === 'VEVENT') {
        const event = item as VEvent;
        if (!event.start) continue;

        const start = new Date(event.start);
        const end = event.end ? new Date(event.end) : new Date(event.start);

        let current = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());

        // Traverse every occupied day inclusive
        while (isBefore(current, endDate) || isEqual(current, endDate)) {
          occupiedDatesSet.add(format(current, 'yyyy-MM-dd'));
          current = addDays(current, 1);
        }
      }
    }

    return Array.from(occupiedDatesSet).sort();
  } catch (error) {
    console.warn(`[iCalSync] Error parsing iCal feed from ${icalUrl}:`, error);
    return [];
  }
}
