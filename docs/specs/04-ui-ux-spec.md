# UI/UX Specification & Theme Engine

## 1. Dynamic White-Label Branding Engine

Every property page rendered at `/[slug]` dynamically adapts its visual identity according to `property.theme`:

1. **CSS Variables Injection (`ThemeProvider`):**
   The root layout container injects CSS custom properties:
   ```tsx
   style={{
     '--color-primary': theme.primaryColor,
     '--color-accent': theme.accentColor,
     '--color-bg': theme.backgroundColor,
     backgroundColor: theme.backgroundColor,
   } as React.CSSProperties}
   ```

2. **Component Adaptation:**
   - **Primary Action Buttons:** Styled with `--color-accent` for consistent conversion focus and visual hierarchy.
   - **Header & Brand Emblem:** If the host provides a `logoUrl`, display the bespoke logo image. Otherwise, display the property title in stylized typography. There are ZERO platform watermarks or competitor ads.
   - **Typography Balance:** Editorial titles and quotes use `font-serif` (Playfair Display) in the boutique preset, while UI controls, buttons, dates, and tables use `font-sans` (Geist Sans) for clarity.

## 2. Layout Presets

The application supports distinct layout presets tailored to different property aesthetics:

### `boutique` Preset (Luxury Cabins, Mountain Chalets, Country Retreats)
- **Cinematic Rounded Hero:** Full-bleed photograph with Ken Burns animation and direct rate capsule.
- **Section 1: Host Story & Backstory (`BoutiqueHostStory`):** Editorial card introducing the host, personal photo, and host bio.
- **Section 2: Curated Comforts Split (`BoutiqueAmenities`):** High-resolution interior photo paired with bespoke amenities list.
- **Section 3: Setting & Surroundings Map (`BoutiqueLocation`):** Approximate privacy-preserving location with travel distance pins.
- **Section 4: Searchable Host FAQ (`PropertyFAQ`):** Client-side instant filter for house rules and pre-arrival queries.
- **Section 5: Dark-Themed Luxury Reservation Area:** High-contrast booking suite with calendar and instant rate calculator.

### `minimal` Preset (Urban Lofts, Modern Apartments)
- **Direct Card Grid:** Two-column split featuring `HostWelcomeCard` and `DirectBookingBenefitsCard`.
- **Photo Tour Gallery (`PropertyGallery`):** Responsive grid of property spaces with fullscreen viewer.
- **Amenity Badges (`AmenitiesList`):** Grid of icon-supported amenities.
- **Reservation Suite (`BookingSuite`):** Clean white container with date picker and pricing summary.

## 3. Bilingual Microcopy System

All interface elements are fully localized into Polish (`pl`) and English (`en`) via `src/lib/translations.ts`:
- **Header:** Direct booking portal status, instant host contact links (Phone, WhatsApp), and language toggle.
- **Calendar & Availability:** Travel dates, check-in, check-out, minimum stay requirements, occupied/available states.
- **Price Breakdown:** Nightly rate, cleaning fee (included free / 0 zł), total stay cost, advance deposit percentage.
- **Payment Modal:** Host handoff assurance, payment method selection (BLIK, IBAN, Revolut/P2P, On Arrival), reference code dispatch.
