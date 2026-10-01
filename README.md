# Bookuj — Bespoke Direct Booking Showcase

Bookuj is a high-conversion, white-label direct booking showcase platform for boutique vacation rentals and luxury hospitality hosts. It eliminates platform middleman fees (0% commissions) while preserving a premium guest reservation experience.

## ✨ Key Features

- **Cinematic Property Showcase**: Hero imagery with dynamic presentation, authentic gallery with fullscreen lightbox, and rich host storytelling.
- **Dynamic White-Label Theming**: Custom brand colors, background hues, typography, and logos powered by CSS variable injection (`ThemeProvider`).
- **Direct Reservation Engine**: Airbnb-grade interactive date range calendar (`react-day-picker`) with real-time stay cost breakdown and transparent deposit calculation.
- **Simulation Checkout Modal**: Direct host communication and mock multi-state payment flow (IBAN, instant wire, pay on arrival).
- **Mobile Device Simulation**: Built-in iPhone 15 Pro frame preview with viewport toggling for responsive testing.
- **Demo Concierge Switcher**: Floating preview controller to switch instantly between 10 curated luxury profiles.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or later
- npm or pnpm

### Installation & Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the default showcase property.

### Production Build

```bash
npm run build
npm run start
```

## 🗺️ Route Architecture

- `/` — Primary featured showcase property.
- `/demo/[slug]` — Static showcase route for any property profile (e.g. `/demo/nordic-glass-sanctuary`, `/demo/alpine-summit-chalet`).

## 🛠️ Adding or Editing Properties

Mock properties and profiles are stored in:
```
src/data/sample-properties.json
```

Each property profile adheres strictly to the `Property` interface defined in `src/types/property.ts`, including:
- Unique `slug`, `title`, `location`, and `description`
- `pricePerNight` and `currency` (`USD` | `EUR` | `GBP` | `PLN`)
- `images` (Unsplash CDN or local assets)
- `amenities` and `occupiedDates` (ISO strings: `YYYY-MM-DD`)
- `hostInfo` (name, avatar, phone)
- `theme` (`primaryColor`, `accentColor`, `backgroundColor`, `fontStyle`)
- Optional `coordinates` (`lat`, `lng`) for interactive maps

## 📱 Developer Tools: Demo Property Switcher

A floating preview pill (`DemoPropertySwitcher`) appears on screen during development:
- **Switch Profiles**: Jump immediately across all 10 mock property profiles.
- **Device Viewport Toggle**: Switch between Desktop Layout and an interactive Mobile Device Frame (iPhone 15 Pro simulation).

## 📂 Documentation

Full documentation lives in the `docs/` directory, organized by topic and reading order:

### Specifications (`docs/specs/`)
- [01-prd.md](docs/specs/01-prd.md) — Product requirements document & MVP scope.
- [02-architecture.md](docs/specs/02-architecture.md) — Technical architecture & system design.
- [03-data-model.md](docs/specs/03-data-model.md) — Data contracts, types & localization standards.
- [04-ui-ux-spec.md](docs/specs/04-ui-ux-spec.md) — UI/UX design specifications & theme engine.
- [05-implementation-plan.md](docs/specs/05-implementation-plan.md) — Phased implementation roadmap.

### Strategic Roadmap (`docs/roadmap/`)
- [future-roadmap.md](docs/roadmap/future-roadmap.md) — 5 strategic post-MVP expansion ideas (AI hero cinemagraph, contactless payment handoff, attribute tagging, map enhancements, brand naming).
