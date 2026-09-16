# Technical Architecture & System Design

## 1. Overview
The Direct Booking Showcase is built on Next.js (App Router), React 19, TypeScript, and Tailwind CSS. The architecture is engineered around a single-template dynamic rendering model that serves bespoke, branded property pages with zero platform friction.

## 2. Directory Structure
```
bookuj/
├── docs/                        # Specifications, PRD, Data Model, UI/UX Specs
│   ├── prd.md                   # Product Requirements Document
│   ├── data_model.md            # TypeScript interfaces & localization standards
│   ├── ui_ux_spec.md            # White-label engine & UI microcopy specification
│   ├── ARCHITECTURE.md          # System design & component interaction
│   └── IMPLEMENTATION_PLAN.md   # Step-by-step roadmap
├── src/
│   ├── app/
│   │   ├── demo/[slug]/page.tsx # Dynamic direct booking showcase route
│   │   ├── layout.tsx           # Global root layout with font definitions
│   │   ├── page.tsx             # Root page (featured showcase property)
│   │   └── globals.css          # Tailwind utilities & theme variables
│   ├── components/
│   │   ├── ThemeProvider.tsx    # CSS variable injection & font provider
│   │   ├── Header.tsx           # Custom property logo and brand header
│   │   ├── HeroGallery.tsx      # Responsive visual asset gallery
│   │   ├── AmenitiesList.tsx    # Standardized amenity badge grid
│   │   ├── BookingCalendar.tsx  # Date-range availability picker (react-day-picker)
│   │   ├── BookingCard.tsx      # Dynamic rate breakdown & CTA trigger
│   │   ├── PaymentModal.tsx     # Mock multi-state checkout simulation
│   │   ├── PropertySwitcher.tsx # Floating development preview switcher
│   │   └── Footer.tsx           # Property host contact & assurance badges
│   ├── data/
│   │   └── properties.json      # 10 comprehensive English mock property profiles
│   ├── lib/
│   │   ├── properties.ts        # Data access layer & slug resolution
│   │   └── utils.ts             # Styling helpers (clsx, tailwind-merge)
│   └── types/
│       └── property.ts          # Core TypeScript contracts
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
