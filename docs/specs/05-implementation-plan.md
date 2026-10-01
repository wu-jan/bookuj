# Direct Booking Concierge MVP – Step-by-Step Implementation Plan

## Overview & Execution Rules
This plan breaks down the Concierge MVP (Stage 1) implementation into 3 manageable batches[cite: 1, 2]. 

### Non-Negotiable Requirements:
1. **100% English:** All UI strings, mock data (`sample-properties.json`), code comments, TypeScript types, and documentation must be strictly in English.
2. **White-Label Design Engine:** Each property page must dynamically apply its custom CSS theme (primary, accent, background colors, and font styles)[cite: 2].
3. **Zero Platform Branding:** Property pages must display only the host's property branding to feel like a bespoke direct booking website[cite: 2, 3].
4. **Strict Verification:** Run `npm run build` after completing every sub-step to guarantee a zero-error compilation state.

---

## BATCH 1: Core Foundation, Theme Engine & Base Layouts

- [x] **Step 1.1: TypeScript Type Definitions**
  - Create `src/types/property.ts` defining `HostInfo`, `PropertyTheme` (primaryColor, accentColor, backgroundColor, fontStyle, logoUrl), `SupportedCurrency`, and `Property` interfaces[cite: 2].
  - *Verification:* Run `npm run build`.

- [x] **Step 1.2: English Mock Database**
  - Create `src/data/sample-properties.json` containing detailed, realistic data for 10 distinct properties (e.g., "Alpine Glass Chalet", "Pine Forest Haven")[cite: 1, 2].
  - Include English descriptions, locations, amenities, Unsplash image URLs, `occupiedDates` ISO strings, host details, and distinct `theme` configurations[cite: 1, 2].
  - *Verification:* Run `npm run build`.

- [x] **Step 1.3: Data Access Layer**
  - Create `src/lib/propertyData.ts` with helper functions: `getAllProperties()`, `getPropertyBySlug(slug: string)`, and `getAllSlugs()`[cite: 1, 2].
  - *Verification:* Run `npm run build`.

- [x] **Step 1.4: Dynamic White-Label Theme Container & Typography**
  - Configure a premium serif font (e.g., `Playfair_Display` from `next/font/google` alongside `Geist`) in `src/app/layout.tsx` so `font-serif` renders elegantly.
  - Build a wrapper/theme provider component in `src/components/ThemeProvider.tsx` that injects dynamic CSS custom properties (`--color-primary`, `--color-accent`, `--color-bg`) and applies appropriate font classes (`font-sans` vs `font-serif`) based on `property.theme`[cite: 2].
  - *Verification:* Run `npm run build`.

- [x] **Step 1.5: Base Layout & Hero Gallery**
  - Build `src/components/Header.tsx` (displays property logo or title, zero platform branding) and `src/components/Footer.tsx`[cite: 2].
  - Build `src/components/PropertyGallery.tsx` and `src/components/PropertyHero.tsx` featuring responsive image layout and Ken Burns motion[cite: 2].
  - Build `src/components/AmenitiesList.tsx` rendering Lucide icons for each amenity[cite: 2].
  - *Verification:* Run `npm run build`.

---

## BATCH 2: Interactive Booking Engine & Payment Simulation

- [x] **Step 2.1: Interactive Booking Calendar**
  - Install and configure `react-day-picker` inside `src/components/BookingCalendar.tsx`[cite: 1, 2].
  - Highlight and disable all dates specified in the property's `occupiedDates` array[cite: 1, 2].
  - Implement date range selection (check-in / check-out) and calculate total nights[cite: 2].

- [x] **Step 2.2: Dynamic Price Calculator & Booking Suite**
  - Build `src/components/BookingSuite.tsx` and `src/components/MobileBottomCTA.tsx` displaying rate per night, total calculated price, and direct reservation perks[cite: 2].

- [x] **Step 2.3: Checkout Payment Modal (Mock)**
  - Build `src/components/PaymentModal.tsx` triggered by the "Book Direct" button[cite: 2].
  - **State A:** Booking summary & direct payment method selector (Direct Bank Transfer / IBAN, Instant P2P / Revolut, Pay on Arrival)[cite: 2].
  - **State B:** Loading / processing spinner simulation (1.2 seconds)[cite: 2].
  - **State C:** Confirmation screen ("Direct Booking Requested! The host has been notified.")[cite: 2].
  - *Verification:* Run `npm run build`.

---

## BATCH 3: Page Integration, Showcase Landing & QA

- [x] **Step 3.1: Dynamic Route `/demo/[slug]` & PropertyPage Orchestration**
  - Assemble all extracted components inside `src/components/PropertyPage.tsx` and render via `src/app/demo/[slug]/page.tsx`.
  - Handle Next.js async `params` (`await params`).
  - Wrap the layout inside `ThemeProvider` to inject CSS variables and dynamic font family.
  - Integrate `notFound()` for invalid slugs.

- [x] **Step 3.2: Root Route (`/`) & Discrete Dev Switcher**
  - Make `src/app/page.tsx` render the default `PropertyPage` using the featured showcase property.
  - Add `src/components/DemoPropertySwitcher.tsx` (collapsible floating pill in corner with mobile device frame toggle) so testers can effortlessly preview how the template engine adapts to all 10 property configurations without polluting the host's direct booking page.

- [x] **Step 3.3: Final Build & Responsive QA**
  - Run full `npm run build` and ensure zero TypeScript, ESLint, or CSS errors.
  - Test responsive layout, calendar range selection, payment flow simulation, and theme switching across all 10 property profiles.