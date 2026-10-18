# MVP → Real Host Pages Roadmap

> **Scope:** This document covers the gap between the original demo-only MVP and the ability to
> deploy real, adjustable, client-facing direct-booking pages for individual hosts.
> It does **not** replace `future-roadmap.md` (strategic/post-MVP concepts).

> **Launch market:** Initial rollout targets **Polish hosts** (BLIK, IBAN, PLN pricing).
> Architecture is market-agnostic from day one — every payment method and locale-specific
> field is optional and conditionally rendered.

> **Implementation philosophy:** We are still in the **demo / sales-validation phase**.
> Every feature delivers a convincing, working-feeling experience for a prospective host.
> Real backend plumbing (live iCal sync, real payment processing, email delivery) is deferred
> to future production sprints. Each phase states its implementation mode explicitly.

---

## 🟢 Live State (as of 2026-10-17)

The app is deployed at **https://bookuj.vercel.app**

| Area | Status | Notes |
|---|---|---|
| White-label template engine | ✅ Done | `ThemeProvider` + CSS variable injection |
| 15 property profiles (10 intl + 5 Polish) | ✅ Done | `src/data/sample-properties.json` |
| Clean `/[slug]` routing | ✅ Done | SSG, all slugs pre-rendered |
| `/demo/[slug]` → `/[slug]` redirect | ✅ Done | Backwards compatible |
| Booking calendar + price breakdown | ✅ Done | `react-day-picker`, mock occupancy |
| Payment modal — BLIK/IBAN/deposit/policy | ✅ Done | UI simulation, uses real host fields |
| WhatsApp button (Header + Footer) | ✅ Done | Conditional on `hostInfo.whatsappNumber` |
| Interactive map | ✅ Done | Leaflet + OpenStreetMap |
| Per-property theme (colors, fonts, logo slot) | ✅ Done | `PropertyTheme` interface |
| Extended data model (BLIK, IBAN, deposit, etc.) | ✅ Done | All fields optional |
| 5 Polish showcase host pages | ✅ Done | Zakopane, Mazury, Sopot, Bieszczady, Kraków |
| DemoPropertySwitcher hidden in production | ✅ Done | `NEXT_PUBLIC_SHOW_DEMO_SWITCHER` guard |
| `NEXT_PUBLIC_FEATURED_SLUG` on root `/` | ✅ Done | Per-deployment featured property |
| `.env.example` documenting env vars | ✅ Done | |
| Deployed on Vercel | ✅ Live | https://bookuj.vercel.app |

### Current onboarding workflow (manual, no backend)

```
1. Collect host data (name, photos, BLIK, IBAN, WhatsApp, theme prefs)
2. Add JSON entry to sample-properties.json → push to GitHub
3. Vercel auto-deploys in ~2 min
4. Share link: bookuj.vercel.app/{their-slug}
```

Each host is reachable at `bookuj.vercel.app/{slug}` — one deployment, all hosts, no extra steps.

---

## 📋 Backlog

Items are ordered by priority within each phase. Phases are ordered by when they unblock
the next milestone (sharing with hosts → removing manual steps → full SaaS).

---

### PHASE A — Production polish (no backend needed)
> 🟡 **Mode: Demo simulation, no real integrations.**

- [ ] **A.6 — Subdomain routing middleware** *(deferred — needs custom domain first)*
  - Implement `src/middleware.ts` that reads the hostname, extracts the subdomain, and
    rewrites `zakopane.bookuj.pl/` → `/zakopane-gorna-chata` internally.
  - **Prerequisite:** Buy a custom domain (e.g. `bookuj.pl`) and configure wildcard DNS
    (`CNAME * → cname.vercel-dns.com`). Add each host subdomain individually in Vercel
    project settings (free tier supports this — no wildcard license needed).
  - Until then: path-based URLs (`bookuj.vercel.app/{slug}`) work fine for MVP sharing.

- [x] **A.7 — FAQ section on property pages** ✅
  - Add a searchable FAQ accordion section to `PropertyPage.tsx`, above the booking suite.
  - Data model: add `Property.faq?: { question: string; answer: string }[]`
  - Render only when `faq` array is present and non-empty.
  - Local search: filter visible Q&A items as the guest types (client-side, no API).
  - Add FAQ entries to the 5 Polish showcase properties (3–5 Q&As each).

- [x] **A.8 — Tagline displayed on hero** ✅
  - `property.tagline` is in the data model and now rendered in `PropertyHero.tsx`.
  - Added as an elegant subtitle line below the property title in the hero section.

- [x] **A.9 — Minimum stay enforcement in calendar** ✅
  - In `BookingCalendar.tsx` & `BookingSuite.tsx`: enforce `minimumStay` in desktop & mobile sheet.
  - Inline warning and disabled "Request Direct Reservation" CTA if dates selected are below minimum stay.
  - Minimum stay badge rendered in calendar legend and summary cards.

---

### PHASE B — Data externalisation (remove code-deploy requirement)
> 🟡 **Mode: Real CMS integration, guest-facing simulation continues.**

- [ ] **B.1 — Choose and integrate a headless content source**
  - Options (pick one):
    - **Notion database** — lowest friction, free tier, operator-friendly
    - **Sanity.io** — free tier, rich media, strongly typed schemas
    - **Google Sheets + Sheetson API** — zero cost, familiar to non-technical operators
  - Create a typed data-fetching adapter in `src/lib/propertyData.ts` that falls back
    to local JSON for development.
  - The `Property` TypeScript interface is the source of truth — CMS schema must mirror it.

- [ ] **B.2 — Real host image hosting**
  - Move away from Unsplash placeholder URLs.
  - Upload real host images to Cloudinary (free tier: 25 GB) or Vercel Blob.
  - Update `Property.images[]` to point to CDN URLs.
  - Configure `next.config.ts` `images.remotePatterns` for the new domains.

---

### PHASE C — iCal / Calendar Sync
> 🟡 **Mode: Simulated in C.1, real fetch in C.2–C.3.**

- [ ] **C.1 — iCal mock endpoint (demo)**
  - Add `property.icalUrl?: string` to `Property` interface.
  - Create `src/app/api/mock-ical/route.ts` returning a static `.ics` string with a few
    booked date ranges — shows the feature without a real Airbnb account.
  - Wire `icalUrl` on the Polish showcase properties to point to this mock endpoint.

- [ ] **C.2 — Real iCal fetch + parse**
  - Create `src/lib/icalSync.ts` using `node-ical`.
  - Fetch the `.ics` URL at build time / ISR revalidation and convert `VEVENT` entries
    to ISO date strings for `occupiedDates`.
  - Works transparently for both the mock endpoint (C.1) and real Airbnb/Google Calendar URLs.

- [ ] **C.3 — ISR revalidation**
  - Set `revalidate = 3600` (1 hour) on the `[slug]` page so availability stays fresh
    without a full redeploy.

---

### PHASE D — Host Self-Service Dashboard (first real backend)
> 🔴 **Mode: Auth + database real. Guest-facing payment modal stays UI mock.**

> ⚠️ Requires backend: Supabase (free tier — Postgres + Auth + Storage) recommended.

- [ ] **D.1 — Auth layer**
  - Email/magic-link login via Supabase Auth or NextAuth.js.
  - One host account → one property profile.

- [ ] **D.2 — Host admin panel (`/dashboard`)**
  - Form to input/edit all `Property` fields (including all Phase A optional fields).
  - Live preview iframe (debounced, 500 ms).
  - Image uploader (drag-and-drop → Cloudinary / Supabase Storage).
  - iCal URL field with a "Test sync" button.

- [ ] **D.3 — Per-host subdomain (with custom domain)**
  - Prerequisite: Phase A.6 middleware + custom domain configured.
  - Each host gets `{slug}.bookuj.pl` — added individually in Vercel project settings.
  - Hosts can also CNAME their own domain (`chata.kowalski.pl → bookuj.pl`).

- [ ] **D.4 — Subscription gate**
  - Stripe Billing integration (~49–99 PLN/month per business docs).
  - Paywall on `/dashboard` after trial; guest-facing page always stays public.

---

### PHASE E — Operational Booking Flow (first end-to-end real flow)
> 🔴 **Mode: Guest booking requests actually reach the host. Platform never touches money.**

- [ ] **E.1 — Booking request persistence**
  - DB table: `{ id, propertySlug, guestName, guestEmail, guestPhone, checkIn, checkOut,
    paymentMethod, depositAmount, status, softHoldExpiresAt, createdAt }`
  - On "Book Direct" submit → POST `/api/bookings`.
  - Statuses: `pending_deposit` | `confirmed` | `declined` | `expired`.
  - Confirmation screen shows a real booking reference number.

- [ ] **E.2 — Host notification**
  - Email via Resend or Brevo (free tier) on new booking request.
  - Magic-link one-click approve/decline in the email (no dashboard login needed).
  - Email includes guest's chosen payment method and deposit amount.
  - Optional: WhatsApp notification via WhatsApp Cloud API or Twilio.

- [ ] **E.3 — Soft-hold calendar block**
  - Mark selected dates as `pending` (greyed out) after guest submits.
  - Auto-expire after `property.softHoldHours` (default: 2h, per business docs).
  - In-database overlay — iCal sync still runs in parallel but pending blocks take precedence.

---

## Summary

| Phase | Effort | Backend | Unlocks |
|---|---|---|---|
| **A** (polish + small features) | Low | No | Shareable MVP for real hosts |
| **B** (headless CMS) | Medium | No | No-code host onboarding, real images |
| **C** (iCal sync) | Medium | No (ISR) | Live availability, double-booking prevention |
| **D** (dashboard) | High | Yes | True SaaS, scalable to many hosts |
| **E** (booking flow) | Medium | Yes | Operational bookings, not just demos |

### Immediate next step

> The app is live. **Start sharing `bookuj.vercel.app/{slug}` with first prospective hosts.**
> Collect feedback. Prioritise backlog items based on what hosts actually ask for.
> The next code sprint should be **A.8** (tagline in hero) and **A.9** (min stay enforcement)
> — both are small, self-contained, and make the Polish pages feel more complete.
