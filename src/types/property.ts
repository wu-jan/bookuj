/**
 * @file property.ts
 * @description Core domain contracts for Bookuj property listings, themes, and localization.
 */

/**
 * Host details and direct contact coordinates.
 */
export interface HostInfo {
  name: string;
  avatar: string;
  phone: string;
  blikPhone?: string;      // Polish BLIK phone number for instant direct settlement
  iban?: string;           // Direct bank wire account number (IBAN format)
  whatsappNumber?: string; // Direct WhatsApp contact phone with country code (e.g. +48...)
}

/**
 * Property branding and visual theme configuration.
 */
export interface PropertyTheme {
  primaryColor: string;    // Main brand tone / header accent
  accentColor: string;     // CTA button highlight (e.g. '#B45A42', '#059669')
  backgroundColor: string; // Base canvas background (e.g. '#FAF9F5', '#FDFCFB')
  fontStyle: 'sans' | 'serif'; // Font family toggle for editorial presentation
  logoUrl?: string;        // Optional custom host logo / insignia URL
  layout?: 'boutique' | 'minimal'; // Layout preset ('boutique' = editorial retreat, 'minimal' = card grid)
}

/**
 * Currencies supported by Bookuj.
 */
export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'PLN';

/**
 * FAQ item for property pre-arrival information.
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Localized override content for multilingual support.
 */
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

/**
 * Primary Property entity representing a direct booking showcase listing.
 * Stored in Supabase `public.properties` or offline fallback `src/data/default-properties.json`.
 */
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

