export interface HostInfo {
  name: string;
  avatar: string;
  phone: string;
  blikPhone?: string;
  iban?: string;
  whatsappNumber?: string;
}

export interface PropertyTheme {
  primaryColor: string;    // Main brand tone / header accent
  accentColor: string;     // CTA button highlight
  backgroundColor: string; // Base canvas background
  fontStyle: 'sans' | 'serif'; // Font family toggle
  logoUrl?: string;        // Optional custom logo / insignia
  layout?: 'boutique' | 'minimal' | 'alpine';
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
  minimumStay?: number;
  depositPercent?: number;
  cancellationPolicy?: string;
  tagline?: string;
  faq?: FAQItem[];
  defaultLocale?: 'pl' | 'en';
  translations?: {
    pl?: PropertyLocalizedContent;
    en?: PropertyLocalizedContent;
  };
  hostBio?: string;         // 1-2 sentence personal story shown in boutique host section
  icalUrl?: string;         // Airbnb / Google Calendar .ics URL for live availability sync
  softHoldHours?: number;   // Hours a pending booking holds dates before auto-expiry (default: 2)
}

