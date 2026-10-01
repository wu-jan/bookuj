export interface HostInfo {
  name: string;
  avatar: string;
  phone: string;
}

export interface PropertyTheme {
  primaryColor: string;    // Main brand tone / header accent
  accentColor: string;     // CTA button highlight
  backgroundColor: string; // Base canvas background
  fontStyle: 'sans' | 'serif'; // Font family toggle
  logoUrl?: string;        // Optional custom logo / insignia
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

