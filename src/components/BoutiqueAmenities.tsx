'use client';

import React from 'react';
import Image from 'next/image';
import {
  Wifi,
  Flame,
  Sparkles,
  Car,
  CreditCard,
  Coffee,
  Trees,
  CheckCircle2,
} from 'lucide-react';
import { TranslationDictionary, Locale } from '@/lib/translations';

interface BoutiqueAmenitiesProps {
  amenities: string[];
  image?: string;
  themeColor?: string;
  t: TranslationDictionary;
  locale?: Locale;
  isMobileView?: boolean;
}

export function BoutiqueAmenities({
  amenities,
  image,
  themeColor = '#944933',
  t,
  locale = 'pl',
  isMobileView = false,
}: BoutiqueAmenitiesProps) {
  // Icon selector based on amenity string keyword
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('internet')) {
      return <Wifi className="h-5 w-5" />;
    }
    if (lower.includes('sauna')) {
      return <Sparkles className="h-5 w-5" />;
    }
    if (lower.includes('kominek') || lower.includes('ogień') || lower.includes('fireplace')) {
      return <Flame className="h-5 w-5" />;
    }
    if (lower.includes('parking') || lower.includes('garaż')) {
      return <Car className="h-5 w-5" />;
    }
    if (lower.includes('kawa') || lower.includes('ekspres') || lower.includes('coffee')) {
      return <Coffee className="h-5 w-5" />;
    }
    if (lower.includes('widok') || lower.includes('tatry') || lower.includes('las')) {
      return <Trees className="h-5 w-5" />;
    }
    return <CheckCircle2 className="h-5 w-5" />;
  };

  const getAmenityDescription = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes('sauna')) {
      return locale === 'pl'
        ? 'Prywatna sauna na wyłączność z olejkami eterycznymi i ręcznikami.'
        : 'Private panoramic sauna exclusively for your party with aromatherapy oils.';
    }
    if (lower.includes('kominek') || lower.includes('fireplace')) {
      return locale === 'pl'
        ? 'Zapas suchego drewna bukowego na cały pobyt w cenie rezerwacji.'
        : 'Seasoned beech firewood fully provided for your entire stay.';
    }
    if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('internet')) {
      return locale === 'pl'
        ? 'Światłowodowe łącze o wysokiej przepustowości bez ograniczeń.'
        : 'High-speed fiber connectivity suitable for remote work and streaming.';
    }
    if (lower.includes('parking')) {
      return locale === 'pl'
        ? 'Prywatny, utwardzony parking na terenie posesji, odśnieżany zimą.'
        : 'Private gated on-site parking, regularly cleared during winter.';
    }
    if (lower.includes('kawa') || lower.includes('ekspres')) {
      return locale === 'pl'
        ? 'Świeżo palone ziarna i ekspres ciśnieniowy na powitanie.'
        : 'Freshly roasted artisanal beans and espresso machine on arrival.';
    }
    if (lower.includes('widok') || lower.includes('tatry')) {
      return locale === 'pl'
        ? 'Niezakłócona panorama tatrzańskich szczytów i lasów z tarasu.'
        : 'Unobstructed mountain views across the Tatra peaks and forest.';
    }
    return locale === 'pl'
      ? 'Dostępne w obiekcie bez żadnych ukrytych dopłat.'
      : 'Included in your stay with zero hidden surcharges.';
  };

  return (
    <section id="amenities" className="scroll-mt-24 w-full">
      <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-white">
        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} items-stretch`}>
          {/* Left Column: Photograph of Interior / Living Space (matches Zacny Lasek Screenshot 4) */}
          {image && (
            <div className={`${isMobileView ? 'h-[280px]' : 'lg:col-span-5 min-h-[460px]'} relative bg-stone-900`}>
              <Image
                src={image}
                alt="Property interior and comfort"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Right Column: Solid Warm Color Block with White Typography & Icons */}
          <div
            className={`${
              isMobileView ? 'p-6 sm:p-8' : image ? 'lg:col-span-7 p-8 sm:p-12 xl:p-16' : 'lg:col-span-12 p-8 sm:p-12'
            } flex flex-col justify-center text-white`}
            style={{
              backgroundColor: themeColor,
            }}
          >
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block">
                {locale === 'pl' ? 'DLA WASZEGO KOMFORTU' : 'FOR YOUR COMFORT'}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white mb-6 sm:mb-8">
              {locale === 'pl' ? 'Wyposażenie & Udogodnienia' : 'Bespoke Amenities & Comfort'}
            </h3>

            {/* Curated list with line icons and descriptions */}
            <div className="space-y-4 sm:space-y-5">
              {amenities.slice(0, 6).map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-white mt-0.5">
                    {getAmenityIcon(item)}
                  </div>
                  <div>
                    <strong className="text-sm sm:text-base font-semibold block text-white leading-snug">
                      {item}
                    </strong>
                    <span className="text-xs text-white/80 leading-relaxed block mt-0.5 font-normal">
                      {getAmenityDescription(item)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Direct Payment assurance item as in Zacny Lasek */}
              <div className="flex items-start gap-4 pt-2 border-t border-white/20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 border border-white/20 text-white mt-0.5">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-sm sm:text-base font-semibold block text-white leading-snug">
                    {locale === 'pl' ? 'Wygodne płatności bezpośrednie' : 'Direct payment flexibility'}
                  </strong>
                  <span className="text-xs text-white/80 leading-relaxed block mt-0.5 font-normal">
                    {locale === 'pl'
                      ? 'Płatność błyskawicznym przelewem BLIK na numer telefonu, tradycyjnym przelewem bankowym lub na miejscu.'
                      : 'Instant BLIK mobile transfer, standard bank transfer, or payment upon arrival with zero fees.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
