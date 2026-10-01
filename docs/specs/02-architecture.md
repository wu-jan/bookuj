# Technical Architecture & System Design

## 1. Overview
The Direct Booking Showcase is built on Next.js (App Router), React 19, TypeScript, and Tailwind CSS. The architecture is engineered around a single-template dynamic rendering model that serves bespoke, branded property pages with zero platform friction.

## 2. Directory Structure
```
bookuj/
├── docs/                        # Specifications, PRD, Data Model, Roadmap
│   ├── roadmap/                 # Strategic concepts & post-MVP roadmap
│   │   └── future-roadmap.md    # 5 strategic expansion initiatives & explorations
│   └── specs/                   # Product specs & architecture (numbered by reading order)
│       ├── README.md            # Specifications index & directory overview
│       ├── 01-prd.md            # Product requirements & MVP scope
│       ├── 02-architecture.md   # System design & component interaction
│       ├── 03-data-model.md     # TypeScript contracts & mock schemas
│       ├── 04-ui-ux-spec.md     # Design tokens & dynamic theme engine
│       └── 05-implementation-plan.md # Phased implementation roadmap
├── src/
│   ├── app/
│   │   ├── demo/[slug]/page.tsx # Dynamic direct booking showcase route
│   │   ├── layout.tsx           # Global root layout with font definitions
│   │   ├── page.tsx             # Root page (featured showcase property)
│   │   └── globals.css          # Tailwind utilities & theme variables
│   ├── components/
│   │   ├── AmenitiesList.tsx             # Standardized amenity badge grid
│   │   ├── BookingCalendar.tsx           # Date-range availability picker (react-day-picker)
│   │   ├── BookingSuite.tsx              # Calendar + rate breakdown reservation suite
│   │   ├── DemoPropertySwitcher.tsx      # Floating development preview switcher
│   │   ├── DirectBookingBenefitsCard.tsx # Host relationship & direct booking advantages card
│   │   ├── Footer.tsx                    # Property host contact & assurance badges
│   │   ├── Header.tsx                    # Custom property logo and brand header
│   │   ├── HostWelcomeCard.tsx           # Host profile and quote card
│   │   ├── MobileBottomCTA.tsx           # Mobile sticky bottom booking CTA
│   │   ├── MobileDeviceFrame.tsx         # Mobile viewport / device frame simulator
│   │   ├── PaymentModal.tsx              # Mock multi-state checkout simulation
│   │   ├── PropertyGallery.tsx           # Visual photo gallery with fullscreen lightbox
│   │   ├── PropertyHero.tsx              # Editorial cinematic hero section
│   │   ├── PropertyMap.tsx               # Property location map
│   │   ├── PropertyPage.tsx              # Primary property showcase layout and orchestrator
│   │   └── ThemeProvider.tsx             # CSS variable injection & font provider
│   ├── data/
│   │   └── sample-properties.json        # 10 comprehensive English mock property profiles
│   ├── lib/
│   │   ├── propertyData.ts               # Data access layer & slug resolution
│   │   └── utils.ts                      # Styling & currency formatting helpers
│   └── types/
│       └── property.ts                   # Core TypeScript contracts (Property, SupportedCurrency)
```

## 3. Core Architectural Principles
1. **Dynamic White-Labeling via CSS Custom Properties:**
   Rather than compounding Tailwind classes, the template relies on CSS variables (`--color-primary`, `--color-accent`, `--color-bg`) injected at the container level by `ThemeProvider`.
2. **Zero Platform Contamination:**
   Guest-facing UI is devoid of marketplace links, platform watermarks, or third-party distractions.
3. **Robust Type Safety & Data Integrity:**
   All mock properties comply strictly with `Property` and `PropertyTheme` interfaces. Slugs are validated with fallback to standard `notFound()` responses.
4. **Mobile-First Responsive Layout:**
   The booking experience provides an intuitive desktop sticky card alongside an ergonomic sticky bottom CTA bar on mobile viewports.
