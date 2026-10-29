# Technical Architecture & System Design

## 1. Overview
Bookuj is built on **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. It operates as a white-label direct booking engine where each property is served on a dedicated route (`/[slug]`), powered by a dynamic theme engine and a Supabase-backed data layer with an offline JSON fallback.

## 2. Directory Structure

```
bookuj/
├── AGENTS.md                        # Master guidelines for AI agents & contributors
├── CLAUDE.md                        # Quick developer & AI cheat sheet
├── README.md                        # Developer onboarding & deployment guide
├── docs/                            # Specifications, Architecture, & Roadmap
│   ├── ARCHITECTURE.md              # Living technical architecture guide
│   ├── specs/                       # Product requirements & specifications
│   │   ├── README.md                # Specifications overview
│   │   ├── 01-prd.md                # Product requirements
│   │   ├── 02-architecture.md       # System design & component interaction
│   │   ├── 03-data-model.md         # TypeScript contracts & data schema
│   │   ├── 04-ui-ux-spec.md         # UI/UX design tokens & theme engine
│   │   └── 05-implementation-plan.md# Phased implementation roadmap
│   └── roadmap/
│       ├── future-roadmap.md        # Strategic long-term concepts
│       └── mvp-to-host-pages-roadmap.md # Host onboarding roadmap & backlog
├── src/
│   ├── app/
│   │   ├── [slug]/                  # Dedicated property routes (SSG + ISR)
│   │   │   ├── not-found.tsx        # 404 handler for invalid property slugs
│   │   │   └── page.tsx             # Primary property route (revalidate = 60)
│   │   ├── api/
│   │   │   └── revalidate/route.ts  # On-demand ISR revalidation webhook
│   │   ├── demo/[slug]/             # Legacy demo route (renders showcase page)
│   │   │   └── page.tsx
│   │   ├── globals.css              # Tailwind CSS theme variables & DayPicker styling
│   │   ├── layout.tsx               # Root layout (Geist Sans, Mono & Playfair Display)
│   │   ├── not-found.tsx            # Global 404 page
│   │   └── page.tsx                 # Root informational error page ("Nie określono obiektu")
│   ├── components/
│   │   ├── AmenitiesList.tsx        # Standardized amenity badge grid
│   │   ├── BookingCalendar.tsx      # Date-range availability picker (react-day-picker)
│   │   ├── BookingSuite.tsx         # Reservation suite (calendar + price breakdown)
│   │   ├── BoutiqueAmenities.tsx    # Split image + comforts layout (boutique preset)
│   │   ├── BoutiqueHostStory.tsx    # Editorial host story & photo card (boutique preset)
│   │   ├── BoutiqueLocation.tsx     # Map + travel distances card (boutique preset)
│   │   ├── DemoPropertySwitcher.tsx # Floating demo switcher (enabled in preview mode)
│   │   ├── DirectBookingBenefitsCard.tsx # Direct booking perks comparison card
│   │   ├── Footer.tsx               # Host contact, guarantees & copyright
│   │   ├── Header.tsx               # Custom property logo, language switcher & contact CTA
│   │   ├── HostWelcomeCard.tsx      # Host avatar & quote card (standard preset)
│   │   ├── MobileBottomCTA.tsx      # Mobile sticky bottom booking CTA bar
│   │   ├── MobileDeviceFrame.tsx    # Viewport simulator (iPhone 15 Pro frame)
│   │   ├── PaymentModal.tsx         # Direct reservation & contactless settlement modal
│   │   ├── PropertyFAQ.tsx          # Searchable accordion FAQ with client filtering
│   │   ├── PropertyGallery.tsx      # Spaces & atmosphere photo gallery
│   │   ├── PropertyGalleryModal.tsx # Fullscreen photo lightbox modal
│   │   ├── PropertyHero.tsx         # Full-bleed cinematic hero section
│   │   ├── PropertyMap.tsx          # Leaflet / OpenStreetMap interactive map
│   │   ├── PropertyPage.tsx         # Primary orchestrator for property layout presets
│   │   └── ThemeProvider.tsx        # CSS custom properties injector (--color-primary, etc.)
│   ├── data/
│   │   └── default-properties.json  # Offline fallback property listings
│   ├── lib/
│   │   ├── propertyData.ts          # Data access layer (Supabase fetch + JSON fallback)
│   │   ├── supabase.ts              # Supabase client singleton & env validator
│   │   ├── translations.ts          # Bilingual translation dictionary (PL/EN)
│   │   └── utils.ts                 # Formatting & currency helpers
│   └── types/
│       └── property.ts              # Core TypeScript interfaces (Property, Theme, etc.)
├── supabase/
│   └── seed-data.json               # Seed listings for database initialization
└── tsconfig.json                    # TypeScript compiler configuration
```

## 3. Core Architectural Principles

1. **Dedicated Property Routing (`/[slug]`):**
   Root `/` serves as an informational guard. Properties live on dedicated paths (`/[slug]`), pre-rendered at build time via `generateStaticParams` and kept fresh via ISR (`revalidate = 60`).

2. **Supabase-First with Graceful Fallback:**
   `src/lib/propertyData.ts` queries Supabase `public.properties`. If unconfigured or unreachable, it falls back to `src/data/default-properties.json`.

3. **Dynamic White-Labeling:**
   Visual branding is injected via CSS custom properties (`--color-primary`, `--color-accent`, `--color-bg`) at the page root by `ThemeProvider`.

4. **Bilingual Foundation (English + Local Language):**
   Properties define a `defaultLocale` (`'pl'` or `'en'`). Dynamic overrides in `property.translations[locale]` are resolved at runtime via `getLocalizedProperty()`.

5. **Layout Presets:**
   - `boutique`: Immersive, editorial storytelling for luxury retreats and cabins.
   - `minimal`: Structured card-based presentation for lofts and urban apartments.
