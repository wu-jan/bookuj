# Direct Booking Concierge MVP – Phased Execution Record

> **Historical Context:** This document records the original execution batches for the Stage 1 Concierge MVP. For the current post-MVP roadmap and host onboarding status, refer to [`docs/roadmap/mvp-to-host-pages-roadmap.md`](../roadmap/mvp-to-host-pages-roadmap.md).

## Core Requirements & Milestones:
1. **Bilingual Engine:** UI microcopy dictionary (`src/lib/translations.ts`) supporting Polish (`pl`) and English (`en`), with dynamic property translation overlay.
2. **White-Label Design Engine:** Dynamic CSS custom properties injection (`--color-primary`, `--color-accent`, `--color-bg`) via `ThemeProvider`.
3. **Zero Platform Branding:** Property pages feature only host-approved branding and direct contact information.
4. **Strict Verification:** Build verification via `export PATH="/Users/jan/.local/bin:$PATH" && npm run build` to ensure zero compilation errors.

---

## BATCH 1: Core Foundation, Theme Engine & Base Layouts (Completed)
- [x] **Step 1.1: TypeScript Type Definitions** (`src/types/property.ts`)
- [x] **Step 1.2: Default Property Data** (`src/data/default-properties.json`)
- [x] **Step 1.3: Data Access Layer with Supabase** (`src/lib/propertyData.ts` & `src/lib/supabase.ts`)
- [x] **Step 1.4: Dynamic White-Label Theme Container** (`src/components/ThemeProvider.tsx`)
- [x] **Step 1.5: Base Layout & Hero Gallery** (`Header`, `Footer`, `PropertyHero`, `PropertyGallery`, `AmenitiesList`)

---

## BATCH 2: Interactive Booking Engine & Payment Simulation (Completed)
- [x] **Step 2.1: Interactive Booking Calendar** (`src/components/BookingCalendar.tsx` with `react-day-picker`)
- [x] **Step 2.2: Dynamic Price Calculator & Booking Suite** (`src/components/BookingSuite.tsx` & `MobileBottomCTA.tsx`)
- [x] **Step 2.3: Checkout Payment Modal** (`src/components/PaymentModal.tsx` with BLIK, IBAN, P2P, on-arrival states)

---

## BATCH 3: Page Integration, Boutique Layout & Host Pages (Completed)
- [x] **Step 3.1: Dedicated Route Architecture (`/[slug]`)**
  - Dedicated property routes with static generation (`generateStaticParams`) and ISR (`revalidate = 60`).
  - Backward-compatible `/demo/[slug]` route.
- [x] **Step 3.2: Boutique Layout Preset & Polish Host Showcases**
  - Added `BoutiqueHostStory`, `BoutiqueAmenities`, `BoutiqueLocation`, and `PropertyFAQ`.
  - Added Polish showcase properties (Zakopane, Mazury, Trójmiasto, Bieszczady, Kraków).
- [x] **Step 3.3: Root Route (`/`) Guard & Demo Switcher Guard**
  - Root route renders informational error page when no property slug is provided.
  - `DemoPropertySwitcher` visibility controlled via `NEXT_PUBLIC_SHOW_DEMO_SWITCHER`.
