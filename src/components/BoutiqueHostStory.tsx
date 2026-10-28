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
  return (
    <section id="about" className="scroll-mt-24 w-full">
      <div className="rounded-3xl border border-stone-200/80 shadow-xs bg-white p-7 sm:p-12 lg:p-16 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-4">
          <span
            className="text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ color: property.theme.accentColor || '#B45A42' }}
          >
            {t.navAbout}
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug tracking-tight text-stone-900 mb-6">
          {property.title} to autentyczny azyl, gdzie nowoczesny komfort spotyka się z tradycją.
        </h2>

        {/* Host Identity Stamp */}
        <div className="flex items-center gap-3.5 my-6 pb-6 border-b border-stone-100">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden shrink-0 ring-2 ring-stone-200 shadow-xs">
            <Image
              src={property.hostInfo.avatar}
              alt={property.hostInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-serif text-base font-semibold text-stone-900 block">
              {property.hostInfo.name}
            </span>
            <span className="text-xs text-stone-500 font-normal block mt-0.5">
              {locale === 'pl' ? 'Właściciel i Gospodarz obiektu' : 'Owner and Host'}
            </span>
          </div>
        </div>

        {/* Host Bio Story & Description */}
        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
          {property.hostBio && (
            <p className="font-serif italic text-base sm:text-xl text-stone-800 leading-relaxed pl-4 border-l-2 border-stone-300">
              „{property.hostBio}”
            </p>
          )}

          <p className="pt-2">
            {property.description}
          </p>

          <p className="text-stone-500 text-xs sm:text-sm italic">
            {locale === 'pl'
              ? 'Od lat dbamy o to miejsce z myślą o naszych gościach. Zależy nam, by każdy pobyt był źródłem prawdziwego spokoju i niezapomnianych wspomnień.'
              : 'We have cared for this haven for years. Our goal is for your stay to be an authentic retreat of tranquility and warm memories.'}
          </p>
        </div>

        {/* Direct Privilege Note & Action */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-stone-500 font-medium">
            {locale === 'pl' ? '0% prowizji pośredników • Rezerwacja bezpośrednia u gospodarza' : '0% portal commission • Direct reservation with host'}
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
    </section>
  );
}
