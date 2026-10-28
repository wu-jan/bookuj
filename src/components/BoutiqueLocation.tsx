'use client';

import React from 'react';
import { MapPin, ExternalLink, Compass } from 'lucide-react';
import { TranslationDictionary, Locale } from '@/lib/translations';

interface BoutiqueLocationProps {
  lat: number;
  lng: number;
  locationName: string;
  title: string;
  locale?: Locale;
  t: TranslationDictionary;
  isMobileView?: boolean;
}

export function BoutiqueLocation({
  lat,
  lng,
  locationName,
  title,
  locale = 'pl',
  t,
  isMobileView = false,
}: BoutiqueLocationProps) {
  const bbox = `${lng - 0.04}%2C${lat - 0.03}%2C${lng + 0.04}%2C${lat + 0.03}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;

  const sampleDistances =
    locale === 'pl'
      ? [
          { name: 'Szlaki turystyczne i natura', dist: '1,5 km' },
          { name: 'Stacje narciarskie & wyciągi', dist: '2,2 km' },
          { name: 'Baseny termalne & SPA', dist: '7,5 km' },
          { name: 'Tradycyjne karczmy i restauracje', dist: '900 m' },
          { name: 'Centrum miejscowości & sklepy', dist: '3,5 km' },
        ]
      : [
          { name: 'Mountain trails & nature', dist: '1.5 km' },
          { name: 'Ski slopes & lifts', dist: '2.2 km' },
          { name: 'Thermal baths & wellness', dist: '7.5 km' },
          { name: 'Local dining & artisan inns', dist: '900 m' },
          { name: 'Town centre & provisions', dist: '3.5 km' },
        ];

  return (
    <section id="location" className="scroll-mt-24 w-full">
      <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-white">
        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} items-stretch`}>
          {/* Left Column: Typographic Details & Distances (matches Zacny Lasek Screenshot 4) */}
          <div className={`${isMobileView ? 'p-6 sm:p-8' : 'lg:col-span-6 p-8 sm:p-12 xl:p-16 flex flex-col justify-center'} bg-white text-stone-900`}>
            {/* Header */}
            <div className="mb-4">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-stone-400 block mb-1">
                {locale === 'pl' ? 'Okolica & Dojazd' : 'Surroundings & Access'}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-stone-900">
                {locale === 'pl' ? 'LOKALIZACJA:' : 'LOCATION:'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mb-6">
              {title} {locale === 'pl' ? 'położony jest w malowniczej i spokojnej części' : 'is situated in a peaceful and scenic area of'}{' '}
              <strong className="text-stone-900">{locationName}</strong>.{' '}
              {locale === 'pl'
                ? 'To idealne miejsce dla osób ceniących ciszę, górską przyrodę i bliskość najważniejszych atrakcji Podhala.'
                : 'A serene sanctuary for those who value mountain tranquility and close proximity to premier regional highlights.'}
            </p>

            {/* Distances List */}
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block mb-3">
                {locale === 'pl' ? 'Orientacyjne przykładowe odległości:' : 'Sample approximate distances:'}
              </span>
              <div className="space-y-2.5">
                {sampleDistances.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs sm:text-sm text-stone-700 py-1 border-b border-stone-100 last:border-b-0"
                  >
                    <span className="font-medium text-stone-800">{item.name}</span>
                    <span className="font-mono text-stone-500 font-semibold">— {item.dist}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps / OSM Link */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Compass className="h-3.5 w-3.5 text-stone-400" />
                <span>{locationName}</span>
              </div>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                <span>{locale === 'pl' ? 'Otwórz w Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Interactive Map */}
          <div className={`${isMobileView ? 'h-[320px]' : 'lg:col-span-6 min-h-[420px]'} relative bg-stone-100`}>
            <iframe
              title={`Map of ${title}`}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={osmEmbedUrl}
              className="w-full h-full border-0 filter grayscale-[25%] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
