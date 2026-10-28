'use client';

import React from 'react';
import Image from 'next/image';
import { Property } from '@/types/property';
import { TranslationDictionary, Locale } from '@/lib/translations';

interface BoutiqueHostStoryProps {
  property: Property;
  t: TranslationDictionary;
  locale: Locale;
  isMobileView?: boolean;
  onCheckDates: () => void;
}

export function BoutiqueHostStory({
  property,
  t,
  locale,
  isMobileView = false,
  onCheckDates,
}: BoutiqueHostStoryProps) {
  const hostPhoto = property.images[1] || property.images[0];

  return (
    <section id="about" className="scroll-mt-24 w-full">
      <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-white">
        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} items-stretch`}>
          {/* Left Column: Warm Terracotta Block with Framed Property Photography (as in Zacny Lasek) */}
          <div
            className={`${
              isMobileView ? 'p-5 sm:p-8 min-h-[320px]' : 'lg:col-span-6 p-8 sm:p-12 xl:p-16 flex items-center justify-center'
            } relative`}
            style={{
              backgroundColor: property.theme.primaryColor || '#944933',
            }}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <Image
                src={hostPhoto}
                alt={`${property.title} exterior`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column: Clean, Airy Editorial Story & Host Seal */}
          <div className={`${isMobileView ? 'p-6' : 'lg:col-span-6 p-8 sm:p-12 xl:p-16 flex flex-col justify-center'} bg-white text-stone-900`}>
            {/* Eyebrow */}
            <div className="mb-3">
              <span
                className="text-xs uppercase tracking-[0.25em] font-bold"
                style={{ color: property.theme.accentColor || '#B45A42' }}
              >
                {t.navAbout}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug tracking-tight text-stone-900 mb-6">
              {property.title} to autentyczny azyl, gdzie nowoczesny komfort spotyka się z tradycją.
            </h2>

            {/* Host Insignia Seal */}
            <div className="flex items-center gap-4 my-4 p-4 rounded-2xl bg-stone-50 border border-stone-100 max-w-md">
              <div className="relative h-14 w-14 rounded-full overflow-hidden shrink-0 ring-2 ring-stone-200 shadow-sm">
                <Image
                  src={property.hostInfo.avatar}
                  alt={property.hostInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="font-serif text-base font-bold text-stone-900 block truncate">
                  {property.hostInfo.name}
                </span>
                <span className="text-xs text-stone-500 font-medium block">
                  {locale === 'pl' ? 'Właściciel & Gospodarz obiektu' : 'Owner & Direct Host'}
                </span>
              </div>
            </div>

            {/* Host Bio Story */}
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal mt-2">
              {property.hostBio && (
                <p className="font-serif italic text-base sm:text-lg text-stone-800 leading-relaxed">
                  „{property.hostBio}”
                </p>
              )}

              <p>
                {property.description}
              </p>

              <p className="text-stone-500 text-xs italic">
                {locale === 'pl'
                  ? 'Od lat dbamy o to miejsce z myślą o naszych gościach. Zależy nam, by każdy pobyt był źródłem prawdziwego spokoju i niezapomnianych wspomnień.'
                  : 'We have cared for this haven for years. Our goal is for your stay to be an authentic retreat of tranquility and warm memories.'}
              </p>
            </div>

            {/* Direct Privilege Note & Action */}
            <div className="mt-8 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-500 font-medium">
                {locale === 'pl' ? '0% prowizji pośredników • Rezerwacja bezpośrednia' : '0% portal commission • Direct reservation'}
              </span>

              <button
                type="button"
                onClick={onCheckDates}
                className="font-bold underline hover:no-underline cursor-pointer transition-colors"
                style={{ color: property.theme.accentColor || '#B45A42' }}
              >
                {t.checkDates} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
