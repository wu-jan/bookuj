# Data Model & Type Contract

## 1. TypeScript Interface (`src/types/property.ts`)

```typescript
export interface HostInfo {
  name: string;
  avatar: string;
  phone: string;
  blikPhone?: string;      // Polish BLIK phone number for instant direct settlement
  iban?: string;           // Direct bank wire account number (IBAN format)
  whatsappNumber?: string; // Direct WhatsApp contact phone with country code (e.g. +48...)
}

export interface PropertyTheme {
  primaryColor: string;    // Main brand tone / header accent (e.g., #1E293B)
  accentColor: string;     // CTA button highlight (e.g., #059669, #B45A42)
  backgroundColor: string; // Base canvas background (e.g., #FDFCFB, #FAF9F5)
  fontStyle: 'sans' | 'serif'; // Font family toggle for editorial presentation
  logoUrl?: string;        // Optional custom host logo / insignia URL
  layout?: 'boutique' | 'minimal'; // Layout preset ('boutique' default for retreats)
}

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'PLN';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PropertyLocalizedContent {
  title?: string;
  tagline?: string;
  location?: string;
  description?: string;
  amenities?: string[];
  cancellationPolicy?: string;
  faq?: FAQItem[];
  hostBio?: string;
}

export interface Property {
  id: string;
  slug: string;             // Unique URL slug used for dedicated routing /[slug]
  title: string;
  location: string;
  description: string;
  pricePerNight: number;
  currency: SupportedCurrency;
  images: string[];
  amenities: string[];
  occupiedDates: string[];  // ISO date strings (YYYY-MM-DD)
  hostInfo: HostInfo;
  theme: PropertyTheme;
  coordinates?: {
    lat: number;
    lng: number;
  };
  minimumStay?: number;     // Minimum number of nights required to book
  depositPercent?: number;  // Advance deposit percentage (e.g. 30 for 30%)
  cancellationPolicy?: string;
  tagline?: string;         // Short subtitle rendered beneath property title
  faq?: FAQItem[];
  defaultLocale?: 'pl' | 'en'; // Primary language of the listing ('pl' for Polish stays)
  translations?: {
    pl?: PropertyLocalizedContent;
    en?: PropertyLocalizedContent;
  };
  hostBio?: string;         // 1-2 sentence personal story shown in boutique host section
  icalUrl?: string;         // External calendar .ics URL (Airbnb, Google Calendar)
  softHoldHours?: number;   // Hours a pending booking holds dates before auto-expiry (default: 2)
}
```

## 2. Bilingual Architecture & Localization Standards

Bookuj uses a dual-layer localization engine:

1. **UI Microcopy Dictionary (`src/lib/translations.ts`):**
   - Pre-translated interface labels, form placeholders, badges, and button text in `pl` (Polish) and `en` (English).
   - Strongly-typed `TranslationDictionary` interface ensuring 100% parity across languages.

2. **Dynamic Listing Content Localization (`getLocalizedProperty`):**
   - Each property listing specifies its `defaultLocale` (`'pl'` or `'en'`).
   - The base property fields contain content in the default locale.
   - Alternate language strings live under `property.translations[locale]` (e.g., `property.translations.en`).
   - When a guest toggles language in the header, `getLocalizedProperty(property, locale)` dynamically overlays translated fields onto the property object.

## 3. Database Schema Mapping (Supabase `public.properties`)

In Supabase, column names use snake_case and are mapped to camelCase via `mapDatabaseRowToProperty()` in `src/lib/propertyData.ts`:

| Database Column | TypeScript Property Field | Type |
|---|---|---|
| `id` | `id` | `string` |
| `slug` | `slug` | `string` |
| `title` | `title` | `string` |
| `location` | `location` | `string` |
| `description` | `description` | `string` |
| `price_per_night` | `pricePerNight` | `number` |
| `currency` | `currency` | `'USD' \| 'EUR' \| 'GBP' \| 'PLN'` |
| `images` | `images` | `string[]` |
| `amenities` | `amenities` | `string[]` |
| `occupied_dates` | `occupiedDates` | `string[]` |
| `host_info` | `hostInfo` | `HostInfo (JSONB)` |
| `theme` | `theme` | `PropertyTheme (JSONB)` |
| `coordinates` | `coordinates` | `{ lat: number, lng: number } (JSONB)` |
| `minimum_stay` | `minimumStay` | `number \| null` |
| `deposit_percent` | `depositPercent` | `number \| null` |
| `cancellation_policy` | `cancellationPolicy` | `string \| null` |
| `tagline` | `tagline` | `string \| null` |
| `faq` | `faq` | `FAQItem[] (JSONB)` |
| `default_locale` | `defaultLocale` | `'pl' \| 'en' \| null` |
| `translations` | `translations` | `Record<string, PropertyLocalizedContent> (JSONB)` |
| `host_bio` | `hostBio` | `string \| null` |
| `ical_url` | `icalUrl` | `string \| null` |
| `soft_hold_hours` | `softHoldHours` | `number \| null` |
