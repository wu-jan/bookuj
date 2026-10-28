'use client';

import React from 'react';
import { TranslationDictionary, Locale } from '@/lib/translations';

interface BoutiqueAmenitiesProps {
  amenities: string[];
  t: TranslationDictionary;
  locale?: Locale;
  isMobileView?: boolean;
}

export function BoutiqueAmenities({
  amenities,
  t,
  locale = 'pl',
  isMobileView = false,
}: BoutiqueAmenitiesProps) {
  return (
    <section id="amenities" className="scroll-mt-24 w-full">
      <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500">
              {locale === 'pl' ? 'Komfort & Wyposażenie' : 'Comfort & Curated Details'}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-stone-900 tracking-tight">
            {t.curatedAmenitiesTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
            {t.curatedAmenitiesSubtitle}
          </p>
        </div>

        {/* Typography-First Curated Amenities Grid */}
        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-x-8 gap-y-4`}>
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 py-3 border-b border-stone-100 hover:border-emerald-600/30 transition-colors group"
            >
              <span className="font-serif text-emerald-700 text-lg select-none leading-tight shrink-0 group-hover:translate-x-0.5 transition-transform">
                —
              </span>
              <span className="font-serif text-base sm:text-lg text-stone-800 font-normal leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Boutique Footnote */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-400">
          <span>
            {locale === 'pl'
              ? 'Wszystkie udogodnienia wliczone w cenę rezerwacji bezpośredniej bez dodatkowych opłat.'
              : 'All amenities included in direct booking rate with zero hidden surcharges.'}
          </span>
          <span className="font-serif italic text-stone-500">
            {locale === 'pl' ? 'Prywatna gościnność bez kompromisów' : 'Private hospitality without compromise'}
          </span>
        </div>
      </div>
    </section>
  );
}

