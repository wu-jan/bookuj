# UI/UX Specification & Theme Engine

## Dynamic White-Label Branding Engine
The property page rendered at `/demo/[slug]` (and defaulted on `/`) MUST dynamically adapt its styling and visual identity according to `property.theme`:

1. **CSS Variables Injection:**
   The root template component injects dynamic CSS variables into the container or wrapper:
   ```tsx
   style={{
     '--color-primary': theme.primaryColor,
     '--color-accent': theme.accentColor,
     '--color-bg': theme.backgroundColor,
   } as React.CSSProperties}
   ```

2. **Component Adaptation:**
   - **"Book Direct" Primary CTA:** Uses `--color-accent` for maximum visual hierarchy, clear conversion intent, and accessible contrast.
   - **Header & Brand Emblem:** If the property provides a `logoUrl`, display the bespoke emblem/logo. Otherwise, display the property title in stylized typography. There must be ZERO platform logos or vendor marks.
   - **Typography Switching:** Headers and key brand elements toggle dynamically (`font-serif` vs. `font-sans`) matching the property's architectural aesthetic (e.g., luxury alpine lodge uses serif; minimalist glamping uses sans-serif).

3. **Zero-Distraction Experience:**
   The page must feature no external navigation, directory links, or cross-promotions. The host must feel that this is 100% their proprietary, boutique direct booking channel.

4. **Single Universal Template Architecture:**
   The application is not a directory or aggregator portal. There is strictly **one core showcase template engine** that dynamically renders content and themes based on the selected property model:
   - Dynamic route `/demo/[slug]` renders the property template.
   - Root route `/` renders the primary featured showcase property.
   - A discrete, collapsible floating developer pill in the corner allows reviewers and stakeholders to switch between all 10 property configurations seamlessly without altering the guest-facing UI.

5. **Standardized UI Microcopy (100% English):**
   - **Hero/Header:** `"Direct Booking Guaranteed"`, `"Reserve Directly with the Host"`.
   - **Calendar & Availability:** `"Select Dates"`, `"Check-in"`, `"Check-out"`, `"Minimum stay"`, `"Occupied"`, `"Available"`.
   - **Pricing Breakdown:** `"/ night"`, `"Nights"`, `"Cleaning fee"`, `"Service fee (Direct - 0%)"`, `"Total Price"`.
   - **Booking Actions & Modal:** `"Book Direct"`, `"Complete Direct Reservation"`, `"Instant Confirmation"`, `"Select Payment Method"`, `"Credit or Debit Card"`, `"Apple Pay / Google Pay"`, `"Instant Wire Transfer"`, `"Processing Reservation..."`, `"Payment Confirmed"`, `"Reservation Successfully Confirmed! A booking itinerary has been sent to your host."`.