import { parseICS } from 'node-ical';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const colors = {
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
  reset: '\x1b[0m',
};

function pass(msg) {
  console.log(`${colors.green}  ✔ PASS:${colors.reset} ${msg}`);
}

function fail(msg, err) {
  console.error(`${colors.red}  ✖ FAIL:${colors.reset} ${msg}`);
  if (err) console.error(err);
  process.exit(1);
}

function header(title) {
  console.log(`\n${colors.bold}${colors.cyan}▶ ${title}${colors.reset}`);
}

async function runTests() {
  console.log(`${colors.bold}=== Bookuj End-to-End Use Case Test Runner ===${colors.reset}`);
  console.log(`Testing target: ${BASE_URL}\n`);

  let createdBookingRef = '';

  // -------------------------------------------------------------
  // Step 1: Subdomain Proxy Test
  // -------------------------------------------------------------
  header('Step 1: Subdomain Proxy (gorna-chata.localhost:3000 -> Zakopane)');
  try {
    // In Node.js, fetch with subdomain URL tests proxy resolution cleanly
    const subdomainUrl = BASE_URL.replace('localhost', 'gorna-chata.localhost');
    const res = await fetch(subdomainUrl);

    if (!res.ok) {
      throw new Error(`Expected HTTP 200, received ${res.status}`);
    }

    const html = await res.text();
    if (!html.includes('Zakopane Górska Chata')) {
      throw new Error('Response HTML does not contain target property title "Zakopane Górska Chata"');
    }

    pass('Subdomain proxy correctly rewrote "/" on "gorna-chata" to "/zakopane-gorna-chata"');
  } catch (err) {
    fail('Subdomain proxy test failed', err);
  }

  // -------------------------------------------------------------
  // Step 2: Subdomain iCal Export (/calendar.ics)
  // -------------------------------------------------------------
  header('Step 2: Subdomain iCal Feed (gorna-chata.localhost:3000/calendar.ics)');
  try {
    const subdomainUrl = BASE_URL.replace('localhost', 'gorna-chata.localhost');
    const res = await fetch(`${subdomainUrl}/calendar.ics`);

    if (!res.ok) {
      throw new Error(`Expected HTTP 200, received ${res.status}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/calendar')) {
      throw new Error(`Invalid Content-Type: ${contentType}`);
    }

    const icsText = await res.text();
    if (!icsText.includes('BEGIN:VCALENDAR')) {
      throw new Error('iCal response does not contain BEGIN:VCALENDAR');
    }

    const parsed = parseICS(icsText);
    const eventCount = Object.values(parsed).filter((item) => item.type === 'VEVENT').length;

    pass(`Subdomain iCal export returned valid RFC 5545 feed with ${eventCount} active events`);
  } catch (err) {
    fail('Subdomain iCal export test failed', err);
  }

  // -------------------------------------------------------------
  // Step 3: Direct Guest Booking Submission (POST /api/bookings)
  // -------------------------------------------------------------
  header('Step 3: Direct Guest Booking Submission (POST /api/bookings)');
  try {
    const uniqueNum = Math.floor(100000 + Math.random() * 900000);
    const testRef = `DIR-${uniqueNum}`;
    const bookingPayload = {
      propertySlug: 'zakopane-gorna-chata',
      guestName: 'Jan Tester',
      guestEmail: 'jan.tester@bookuj.pl',
      guestPhone: '+48 601 234 567',
      checkIn: '2026-12-15',
      checkOut: '2026-12-19',
      nights: 4,
      totalPrice: 1996,
      depositAmount: 499,
      paymentMethod: 'blik',
      bookingRef: testRef,
    };

    const res = await fetch(`${BASE_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    if (!data.success || !data.bookingRef) {
      throw new Error('API returned unsuccessful response or missing bookingRef');
    }

    createdBookingRef = data.bookingRef;
    pass(`Booking created successfully with reference: ${createdBookingRef}`);
  } catch (err) {
    fail('Guest booking submission failed', err);
  }

  // -------------------------------------------------------------
  // Step 4: Host 1-Click Confirmation (/api/bookings/confirm)
  // -------------------------------------------------------------
  header(`Step 4: Host 1-Click Deposit Confirmation (${createdBookingRef})`);
  try {
    // 4a. Verify booking info retrieval
    const getRes = await fetch(`${BASE_URL}/api/bookings/confirm?ref=${encodeURIComponent(createdBookingRef)}`);
    if (!getRes.ok) {
      throw new Error(`Failed to fetch booking for review: HTTP ${getRes.status}`);
    }
    const getData = await getRes.json();
    if (!getData.booking || getData.booking.booking_ref !== createdBookingRef) {
      throw new Error(`Retrieved booking ref does not match ${createdBookingRef}`);
    }
    pass(`Retrieved booking record in status: "${getData.booking.status}"`);

    // 4b. Perform host confirmation
    const postRes = await fetch(`${BASE_URL}/api/bookings/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: createdBookingRef }),
    });

    if (!postRes.ok) {
      const errText = await postRes.text();
      throw new Error(`Failed to confirm booking: HTTP ${postRes.status} - ${errText}`);
    }

    const postData = await postRes.json();
    if (!postData.success || postData.booking?.status !== 'confirmed') {
      throw new Error(`Expected status "confirmed", received: "${postData.booking?.status}"`);
    }

    pass(`Host successfully confirmed deposit. Booking status updated to "confirmed"`);
  } catch (err) {
    fail('Host confirmation failed', err);
  }

  // -------------------------------------------------------------
  // Step 5: Two-Way iCal Verification (Zero Overbooking)
  // -------------------------------------------------------------
  header(`Step 5: Two-Way iCal Export Verification (${createdBookingRef} in /api/ical)`);
  try {
    const res = await fetch(`${BASE_URL}/api/ical/zakopane-gorna-chata`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const icsText = await res.text();
    if (!icsText.includes(createdBookingRef)) {
      throw new Error(`Exported .ics feed does not contain newly confirmed booking: ${createdBookingRef}`);
    }

    const parsed = parseICS(icsText);
    let matchedEvent = null;
    for (const key of Object.keys(parsed)) {
      const ev = parsed[key];
      if (ev.type === 'VEVENT' && (ev.uid?.includes(createdBookingRef) || ev.summary?.includes(createdBookingRef))) {
        matchedEvent = ev;
        break;
      }
    }

    if (!matchedEvent) {
      throw new Error(`Could not parse confirmed VEVENT for ${createdBookingRef}`);
    }

    pass(`Found matching VEVENT in iCal feed:`);
    console.log(`     Summary: ${matchedEvent.summary}`);
    console.log(`     Status:  ${matchedEvent.status}`);
    console.log(`     Start:   ${matchedEvent.start?.toISOString().split('T')[0]}`);
    console.log(`     End:     ${matchedEvent.end?.toISOString().split('T')[0]}`);
    pass(`Booking & Airbnb feed will now automatically block these dates!`);
  } catch (err) {
    fail('Two-way iCal verification failed', err);
  }

  console.log(`\n${colors.bold}${colors.green}🎉 ALL 5 END-TO-END USE CASE TESTS PASSED SUCCESSFULLY! 🎉${colors.reset}\n`);
}

runTests();
