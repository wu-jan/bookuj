# MVP → Real Host Pages Roadmap

> **Scope:** This document covers the gap between the current demo-only MVP and the ability to
> deploy real, adjustable, client-facing direct-booking pages for individual hosts.
> It does **not** replace `future-roadmap.md` (strategic/post-MVP concepts); it sits one level
> closer — the immediate next sprint(s) needed before any host goes live.

> **Launch market:** Initial rollout targets **Polish hosts** (hence BLIK, IBAN, PLN pricing).
> The architecture must however remain market-agnostic from day one — every payment method
> and locale-specific field is optional and conditionally rendered, so adding a new market
> later (e.g. Vipps for Norway, Revolut for UK) requires only a data change, not a code change.

> **Implementation philosophy (all phases):** We are still in the **demo / sales-validation
> phase**. No phase in this document requires a real third-party integration to be live.
> Every feature must deliver a **convincing, working-feeling experience** for a prospective
> host — enough to say "yes, this is what my page would look like" — while the actual
> backend plumbing (real iCal sync, real payment processing, real email sending) is deferred
> to a future production sprint. Each phase states its implementation mode explicitly.

---

## Current MVP State (what exists today)

| Area | Status | Notes |
|---|---|---|
| Single-template white-label engine | ✅ Done | `ThemeProvider` + CSS variable injection |
| 10 demo property profiles in JSON | ✅ Done | `src/data/sample-properties.json` |
| Dynamic `/demo/[slug]` routing | ✅ Done | Next.js App Router, SSG |
| Booking calendar + price breakdown | ✅ Done | `react-day-picker`, mock occupancy |
| Payment modal (mock, 3-state) | ✅ Done | IBAN / P2P / Pay on arrival — UI only |
| Interactive map | ✅ Done | Leaflet + OpenStreetMap |
| Per-property theme (colors, fonts, logo slot) | ✅ Done | `PropertyTheme` interface |
| Ken Burns hero animation | ✅ Done | CSS-only, zero bundle weight |
| Mobile device frame preview + switcher | ✅ Done | Dev tool only |
| Real host data input (CMS / admin) | ❌ Missing | All data is hardcoded JSON |
| iCal / calendar sync | ❌ Missing | `occupiedDates` is a static array |
| Real payment method routing | ❌ Missing | Modal is cosmetic only |
| Per-host deployment / subdomain | ❌ Missing | One codebase, one URL |
| Host onboarding flow | ❌ Missing | No way for a host to self-configure |
| WhatsApp / direct-contact integration | ❌ Missing | Mentioned in business docs |
| FAQ section | ❌ Missing | Mentioned in business docs |
| Pricing / subscription model | ❌ Missing | SaaS fee defined, not implemented |

---

## Gap Analysis: "Adjustable & Per-Host" Readiness

### ✅ What is already adjustable (needs zero code changes)

The `Property` data contract in `src/types/property.ts` already supports:

- `theme.primaryColor`, `theme.accentColor`, `theme.backgroundColor` — full color palette
- `theme.fontStyle` — `'serif'` vs `'sans'`
- `theme.logoUrl?` — custom logo/insignia (optional)
- `hostInfo` — name, avatar, phone
- `pricePerNight`, `currency`
- `images[]`, `amenities[]`, `coordinates`
- `occupiedDates[]` — static list

**Conclusion:** The visual layer is 100% data-driven. Creating a new host page today requires only adding
a new JSON entry to `sample-properties.json` and deploying. That is the current ceiling.

### ❌ What is NOT adjustable without engineering work

1. **Data source** — adding/editing a host requires a code deploy (JSON in the repo).
2. **Live calendar availability** — `occupiedDates` cannot be synced with the host's real booking calendar.
3. **Payment method display** — the modal has hardcoded placeholder values; host-specific BLIK
   numbers, IBANs, and deposit percentages do not exist in the data model yet.
   BLIK is a Poland-specific P2P method and should be treated like any other optional payment
   option: rendered only when `hostInfo.blikPhone` is present, hidden otherwise.
4. **Per-host URLs** — all hosts share the same domain/subdomain under `/demo/[slug]`.
5. **Host self-service** — there is no admin panel, no onboarding wizard.

---

## Step-by-Step Implementation Plan: Host Pages MVP+

### PHASE A — Sample Showcase Host Pages (No Backend, Demo-Quality)

> 🟡 **Implementation mode: Demo simulation — no real integrations.**
> All data is curated JSON. Payment flows remain UI-only mock simulations.
> The goal is shareable, polished URLs that a prospective host can click through
> and say "this is exactly what my page would look like."

*Goal: Produce polished, shareable URLs for a handful of real or realistic Polish hosts to use
as a sales/demo tool. Data still lives in JSON but is curated per host. This phase is the
immediate sales-validation tool — it does not require any live service to be connected.*

- [ ] **A.1 — Extend the `Property` data model**
  - Add to `HostInfo`: `blikPhone?: string`, `iban?: string`, `whatsappNumber?: string`
  - Add to `Property`: `minimumStay?: number` (nights), `depositPercent?: number` (e.g. `20`
    for 20%), `cancellationPolicy?: string` (free text), `tagline?: string`
  - **All new fields are optional** — absence of a field simply hides that UI element.
    This is the mechanism that makes the template market-agnostic: a Norwegian host without
    `blikPhone` simply never sees the BLIK option.
  - *Verification: `npm run build` — no TypeScript errors.*

- [ ] **A.2 — Update `PaymentModal` to use host data (still mock, no real processing)**
  - **BLIK option:** render only when `hostInfo.blikPhone` is present; show the actual phone
    number so a guest knows where to send the transfer. Flow remains a UI simulation.
  - **Bank Transfer option:** show `hostInfo.iban` when present; otherwise show a generic
    placeholder. Flow remains a UI simulation.
  - **Deposit line:** show `property.depositPercent`% of the total in the pricing breakdown.
    If `depositPercent` is absent, omit the deposit line entirely.
  - **Cancellation Policy:** show `property.cancellationPolicy` as a small note in the
    booking summary state.
  - **Soft-hold copy:** add static copy *"Your selected dates are held for 2 hours pending
    deposit confirmation."* — this is UI copy only, no timer or database logic required.
  - *Verification: modal still compiles and renders for properties missing any of these fields.*

- [ ] **A.3 — WhatsApp direct-contact button (static link, no SDK)**
  - Add a "Chat with Host" CTA button/link that opens:
    `https://wa.me/{whatsappNumber}?text=Hi+{hostFirstName}%2C+I%27m+interested+in+{property.title}…`
  - Render only when `hostInfo.whatsappNumber` is present — invisible for other properties.
  - Add to `Header.tsx` (mobile, near the phone number) and `Footer.tsx` (desktop).
  - No WhatsApp SDK or webhook needed — this is a plain anchor tag.

- [ ] **A.4 — Create 3–5 Polish showcase host pages (curated mock data)**
  - Add 3–5 new entries to `sample-properties.json` representing realistic Polish hosts,
    for example: Zakopane góralska chata, Mazury lakehouse, Tricity seaside apartment,
    Bieszczady off-grid cabin, Kraków Kazimierz loft.
  - Each entry **must** populate: `blikPhone`, `iban`, `whatsappNumber`, `depositPercent`,
    `tagline`, `cancellationPolicy`, and a distinct `theme`.
  - Use realistic-sounding PLN pricing, Polish phone numbers, and Polish IBAN format (PLxx…).
  - Images: continue using Unsplash CDN URLs — real photos come in Phase B.
  - These pages serve as the sales portfolio shown to prospective clients.

- [ ] **A.5 — Dedicated showcase landing URL per host**
  - Move the primary route from `/demo/[slug]` to `/[slug]` so that a host can share
    `bookuj.pl/tatry-peaks-sanctuary` instead of the nested `/demo/` path
  - Keep `/demo/[slug]` as a redirect alias for backwards compatibility
  - *Verification: `generateStaticParams` still covers all slugs.*

---

### PHASE B — Data Externalisation (CMS / Headless)

> 🟡 **Implementation mode: Real CMS integration, but still no live payment or notification logic.**
> This phase ends the code-deploy requirement for adding hosts. Payment flows remain UI-only.

*Goal: Remove the code-deploy requirement. A new host can be onboarded without touching the codebase.
All other guest-facing interactions (calendar, payment modal) remain convincing simulations.*

- [ ] **B.1 — Choose and integrate a headless content source**
  - Options (pick one):
    - **Notion database** — lowest friction, viable for early clients, free tier
    - **Sanity.io** — free tier, rich media, strongly typed schemas
    - **Google Sheets + Sheetson API** — zero cost, familiar to non-technical operators
  - Create a typed data-fetching adapter in `src/lib/propertyData.ts` that falls back
    to the local JSON for development
  - The `Property` TypeScript interface is the source of truth — the CMS schema must
    mirror it exactly, including all optional fields from Phase A.

- [ ] **B.2 — Image hosting**
  - Move away from Unsplash placeholder URLs
  - Upload real host images to Cloudinary (free tier: 25 GB) or Vercel Blob
  - Update `Property.images[]` to point to CDN URLs
  - Configure `next.config.ts` `images.remotePatterns` for the new domains

- [ ] **B.3 — Environment-based property resolution**
  - Allow the root `/` route to be configured per-deployment via an environment variable:
    `FEATURED_PROPERTY_SLUG=tatry-peaks-sanctuary`
  - This enables each Vercel deployment to serve a single host's page as the root

---

### PHASE C — iCal / Calendar Sync (Simulated first, then real)

> 🟡 **Implementation mode: Simulated sync in C.1, real fetch in C.2–C.3.**
> C.1 gives the demo a convincing "live calendar" feeling using a static mock `.ics` response.
> C.2 upgrades it to an actual iCal fetch without changing any UI.

*Goal: `occupiedDates` reflects the host's live Airbnb / Booking.com / Google Calendar availability.
For the demo phase, a hardcoded mock iCal response is sufficient to show the feature end-to-end.*

- [ ] **C.1 — iCal URL field in data model + mock endpoint (demo)**
  - Add `property.icalUrl?: string` to `Property` interface
  - Create a mock API route `src/app/api/mock-ical/route.ts` that returns a static `.ics`
    string with a few booked date ranges — this lets the demo show iCal sync as a working
    concept without needing a real Airbnb account
  - Wire `icalUrl` in the Polish showcase properties from Phase A to point to this mock endpoint

- [ ] **C.2 — Server-side iCal fetch + parse (real)**
  - Create `src/lib/icalSync.ts` using the `node-ical` package
  - On each Next.js build (or via ISR revalidation), fetch the `.ics` URL and convert
    `VEVENT` entries to ISO date strings
  - Inject the parsed array as `occupiedDates` into the property data at render time
  - Works transparently for both the mock endpoint (C.1) and real Airbnb/Google Calendar URLs

- [ ] **C.3 — Incremental Static Regeneration (ISR)**
  - Set `revalidate = 3600` (1 hour) on the `[slug]` page so the calendar stays fresh
    without a full redeploy

---

### PHASE D — Host Self-Service Onboarding (SaaS Dashboard)

> 🔴 **Implementation mode: First real backend. Guest-facing page simulation continues.**
> The dashboard and auth are real. The payment modal on the guest page remains a UI mock.
> Booking notifications (E) are still deferred — hosts configure their page but don't yet
> receive real booking requests through the system.

*Goal: A host can configure their own page without developer involvement.*

> ⚠️ This phase requires a backend (auth + database + API).
> Recommended stack: Supabase (free tier — Postgres + Auth + Storage) or PlanetScale + NextAuth.js.

- [ ] **D.1 — Auth layer**
  - Implement email/magic-link login via NextAuth.js or Supabase Auth
  - Each host has one account mapped to one property profile

- [ ] **D.2 — Host admin panel (`/dashboard`)**
  - Form to input/edit all fields from `Property` interface (including all Phase A optional fields)
  - Live preview iframe showing the rendered page as they type (debounced, 500 ms)
  - Image uploader (drag-and-drop → Cloudinary / Supabase Storage)
  - iCal URL field with a "Test sync" button that calls the Phase C fetch logic

- [ ] **D.3 — Per-host subdomain routing**
  - Each host gets `{slug}.bookuj.pl` via Vercel wildcard domains
  - `middleware.ts` rewrites the subdomain to `/[slug]` internally
  - Hosts can also CNAME their own custom domain (e.g. `chata.kowalski.pl → bookuj.pl`)

- [ ] **D.4 — Subscription gate**
  - Integrate Stripe Billing (monthly subscription, ~49–99 PLN / month per business docs)
  - After free trial / demo period, show a paywall on `/dashboard` if subscription lapsed
  - Guest-facing property page remains fully public (never gate the booking experience)

---

### PHASE E — Payment Notification Hooks

> 🔴 **Implementation mode: First fully operational end-to-end flow.**
> This is the phase where the guest experience stops being a simulation — a real booking
> request reaches the host and can result in a real stay. Payment still flows directly
> between guest and host (platform never touches money — per business model docs).

*Goal: When a guest submits a booking request, the host gets notified and can approve/decline.
Grounded in the payment model documented in "Model płatności i rezerwacji bezpośrednich" (business docs).*

- [ ] **E.1 — Booking request persistence**
  - Store booking requests in a database table:
    `{ id, propertySlug, guestName, guestEmail, guestPhone, checkIn, checkOut, paymentMethod, depositAmount, status, softHoldExpiresAt, createdAt }`
  - On "Book Direct" submit → POST to `/api/bookings`
  - Supported `status` values: `pending_deposit` | `confirmed` | `declined` | `expired`
  - The payment modal confirmation screen should now show a real booking reference number

- [ ] **E.2 — Host notification (Email + optional WhatsApp)**
  - On new booking request: send email to host via Resend or Brevo (free tier)
  - Optional WhatsApp notification via WhatsApp Cloud API (Meta) or Twilio
  - Email contains a magic-link **one-click approve / decline** (no dashboard login required)
  - Email includes guest's chosen payment method and the deposit amount so host knows what to expect

- [ ] **E.3 — Soft-hold calendar block**
  - After guest submits, temporarily mark selected dates as `pending` in the calendar (greyed out)
  - Status reverts to `available` if host does not confirm within `property.softHoldHours`
    (default: `2`, configurable per property per business docs)
  - For iCal-synced hosts, this is an in-database overlay — the iCal fetch still runs in
    parallel but pending blocks take precedence

---

## Summary Table

| Phase | Effort | Backend Required | Unlocks |
|---|---|---|---|
| **A** — Extended data model + polish | Low | No | Real-looking host demo pages, sales tool |
| **B** — Headless CMS | Medium | No (external service) | No-code onboarding, real images |
| **C** — iCal sync | Medium | No (ISR only) | Live availability, double-booking prevention |
| **D** — Self-service dashboard | High | Yes | True SaaS, scalable to many hosts |
| **E** — Booking notifications | Medium | Yes | Operational bookings, not just demos |

---

## Recommended Next Step (immediate)

> Start with **Phase A** — it requires zero backend, zero new dependencies, and produces
> shareable, polished host pages that can be used as a sales and validation tool within
> 1–2 days of work. Each subsequent phase builds cleanly on the previous one.
