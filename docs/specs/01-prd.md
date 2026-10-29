# Product Requirements Document (PRD) – Direct Booking Platform (bookuj.pl)

## 1. Business Goal and Context
Bookuj is a high-converting, white-label direct booking showcase and reservation engine designed for independent vacation rentals, boutique cabins, and bespoke hospitality hosts. It empowers property owners to capture direct, commission-free reservations (0% middleman fees) while providing guests with a luxury, transparent booking experience.

The initial rollout targets **Polish hosts** (BLIK, IBAN, PLN pricing) while maintaining a market-agnostic, bilingual architecture (default Polish or English with runtime language toggling).

## 2. Product Scope & Current Capabilities

### Routing & Property Identity
- **Dedicated Property URLs (`/[slug]`):** Each property has its own clean, branded page (e.g., `/zakopane-gorna-chata`).
- **Informational Root (`/`):** Informational page guiding visitors to specify an authorized property path (`bookuj.pl/twoj-obiekt`).
- **Legacy Route Compatibility (`/demo/[slug]`):** Automatically renders dedicated property showcase pages for backwards compatibility.

### Visual Presentation & Theme Engine
- **Dynamic White-Labeling:** Property-specific brand colors (`--color-primary`, `--color-accent`, `--color-bg`) injected at runtime via `ThemeProvider`.
- **Layout Presets:**
  - `boutique`: Editorial, spacious retreat layout (Host Story, Curated Comforts, Surroundings Map, Dark Reservation Suite) inspired by luxury retreats.
  - `minimal` / standard: Card-grid architecture with dual host/benefits cards, gallery, amenities, and reservation suite.
- **Bilingual Interface:** Full Polish (`pl`) and English (`en`) support with instant runtime language switching.
- **Cinematic Hero:** Full-bleed hero image with Ken Burns animation, tagline, and direct booking guarantee badge.
- **Photo Tour & Fullscreen Lightbox:** Dynamic image showcase with keyboard/swipe fullscreen modal viewer.

### Direct Booking & Settlement Simulation
- **Interactive Calendar:** Date-range selector powered by `react-day-picker` with real-time occupancy preview.
- **Stay Cost Breakdown:** Dynamic calculation of total nights, cleaning & linen fees included ($0/0 zł), and advance deposit percentage.
- **Minimum Stay Enforcement:** Enforced minimum stay rules with informative alerts and CTA state handling.
- **Contactless Host Handoff Modal (`PaymentModal`):**
  - Guest details collection (name, email, special requests).
  - Direct settlement methods: BLIK P2P phone transfer, direct bank wire (IBAN), Revolut/P2P, and Pay on Arrival.
  - Booking confirmation code (`DIR-XXXXXX`) and 1-click clipboard copy for host payment credentials.
  - Soft-hold reassurance (holds dates for configured `softHoldHours` pending deposit settlement).

### Data Layer
- **Supabase-First Architecture:** Real property records stored in Supabase `public.properties`.
- **Offline Fallback:** Seamless fallback to `src/data/default-properties.json` when Supabase is unreachable or unconfigured.
- **ISR Caching:** Incremental Static Regeneration (`revalidate = 60`) on property routes.

## 3. Scope Boundaries & Current Stage
- **Current Mode:** Sales-validation & direct booking concierge demo. Host payments and notifications are high-fidelity simulated handoffs.
- **Deferred / Roadmap:** Live iCal 2-way synchronization, host self-service admin dashboard, subscription billing via Stripe, and transactional email dispatch via Resend/Brevo.
