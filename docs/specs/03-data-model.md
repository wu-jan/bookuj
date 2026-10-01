# Data Model & Type Contract

## 1. TypeScript Interface (`src/types/property.ts`)
```typescript
export interface HostInfo {
  name: string;
  avatar: string;
  phone: string;
}

export interface PropertyTheme {
  primaryColor: string;    // Main background/brand tone (e.g., deep emerald #0F5257 or graphite #1E293B)
  accentColor: string;     // CTA button highlight (e.g., warm gold #D4AF37, vibrant emerald #10B981)
  backgroundColor: string; // Base page canvas background (e.g., off-white #FAFAFA or midnight dark)
  fontStyle: 'sans' | 'serif'; // 'serif' for boutique luxury/cabins, 'sans' for sleek modern lofts
  logoUrl?: string;        // Custom property insignia/logo (falls back to stylized property title)
}

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'PLN';

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  pricePerNight: number;
  currency: SupportedCurrency;
  images: string[];
  amenities: string[];
  occupiedDates: string[]; // ISO date strings (YYYY-MM-DD)
  hostInfo: HostInfo;
  theme: PropertyTheme;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
```

## 2. English Localization & Content Standards
All property profiles in `src/data/sample-properties.json` must be strictly provided in English:
- **Titles:** Evocative and refined names (e.g., "Nordic Glass Sanctuary", "Alpine Vista Chalet", "Whispering Pines Retreat").
- **Locations:** International and picturesque destinations (e.g., "Aspen, Colorado", "Lofoten, Norway", "Zermatt, Switzerland", "Zakopane Highlands, Poland").
- **Descriptions:** Compelling, high-converting direct booking sales copy focusing on privacy, scenic vistas, and bespoke stays.
- **Amenities:** Standard English descriptors formatted for Lucide icon matching, such as:
  - `"High-Speed WiFi"`
  - `"Panoramic Sauna"`
  - `"Private Hot Tub"`
  - `"Fire Pit & Outdoor Lounge"`
  - `"Fully Equipped Chef Kitchen"`
  - `"EV Charging Station"`
  - `"Dedicated Workspace"`
  - `"Mountain & Forest Views"`
  - `"Pet Friendly"`
  - `"Complimentary Artisanal Breakfast"`
