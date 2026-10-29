# Bookuj — Bespoke Direct Booking Platform (`bookuj.pl`)

Bookuj is a high-conversion, white-label direct booking showcase and reservation engine for boutique vacation rentals, alpine chalets, and luxury hospitality hosts. It eliminates platform middleman commissions (0% fees) while delivering an Airbnb-grade, branded guest experience.

---

## ⚡ Current Architecture & State

- **Dedicated Host Routes (`/[slug]`):** Each property has its own clean, branded URL (e.g. `/zakopane-gorna-chata`). The root path (`/`) is an informational error page explaining that properties reside on dedicated paths.
- **Supabase-First Data Layer:** Real listings are fetched from Supabase `public.properties` with ISR (`revalidate = 60`). When Supabase is unreachable or unconfigured, the app falls back to `src/data/default-properties.json`.
- **Bilingual (Polish & English):** Domestic and international travelers are fully supported with instant language toggling in the header.
- **Layout Presets:**
  - `boutique`: Editorial storytelling layout for luxury retreats (host backstory, curated comforts split, surroundings map, dark luxury reservation suite).
  - `minimal`: Clean card-grid layout for lofts and modern apartments.
- **Contactless Host Settlement Modal:** Interactive direct reservation request simulation supporting BLIK P2P phone transfer, Direct Bank Wire (IBAN), Revolut/P2P, and Pay on Arrival with booking references.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or later (on macOS with default setup: `/Users/jan/.local/bin/node`)
- npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000/zakopane-gorna-chata](http://localhost:3000/zakopane-gorna-chata) to view the showcase retreat.

### Production Build Verification

Always verify with 0 TypeScript/Turbopack errors:

```bash
export PATH="/Users/jan/.local/bin:$PATH" && npm run build
```

---

## 🗺️ Route Architecture

| Route | Purpose | Behavior |
|---|---|---|
| `/[slug]` | Dedicated Property Listing | Primary host page. Zero demo switcher contamination. Pre-rendered with SSG and kept fresh via ISR (`revalidate = 60`). |
| `/demo/[slug]` | Sales Demo Showcase | Dedicated preview route with `DemoPropertySwitcher` active to switch profiles. |
| `/demo` & `/admin` | Demo Entry Points | Convenience redirects to `/demo/zakopane-gorna-chata`. |
| `/` | Informational Landing Page | Displays "Nie określono obiektu" error page with direct demo link. |
| `/api/revalidate` | On-demand ISR Revalidation | Webhook endpoint to revalidate property cache. |

---

## 🛠️ Data & Configuration

### Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` to configure:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Set to "true" to force offline JSON fallback during local development
NEXT_PUBLIC_USE_LOCAL_DATA=false

# Set to "true" on sales/demo deployments to show the floating property switcher
NEXT_PUBLIC_SHOW_DEMO_SWITCHER=false
```

### Property Data Sources
- **Supabase:** Primary storage (`public.properties`). Seeding data is preserved in `supabase/seed-data.json`.
- **Local Fallback:** Preserved in `src/data/default-properties.json` when running offline.

---

## 📂 Documentation

Full documentation lives in the `docs/` directory:

- **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)** — Comprehensive living architecture & system design guide.
- **[`docs/specs/`](docs/specs/)** — Detailed specifications:
  - `01-prd.md` — Product requirements document & scope.
  - `02-architecture.md` — Component interaction & directory structure.
  - `03-data-model.md` — Data contracts, types & database mapping.
  - `04-ui-ux-spec.md` — Theme engine, layout presets & bilingual microcopy.
  - `05-implementation-plan.md` — Phased implementation milestones.
- **[`docs/roadmap/`](docs/roadmap/)** — Strategic roadmap & host onboarding backlog:
  - `mvp-to-host-pages-roadmap.md` — Host onboarding roadmap & backlog.
  - `future-roadmap.md` — Strategic post-MVP expansion concepts.
