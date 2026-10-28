'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, MessageCircle, Phone, ArrowRight, HeartHandshake, Sparkles, Compass } from 'lucide-react';
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
  const hostFirstName = property.hostInfo.name.split(' ')[0] || 'Host';
  const cleanWhatsapp = property.hostInfo.whatsappNumber?.replace(/[^0-9]/g, '');
  const encodedPropertyTitle = encodeURIComponent(property.title);
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=Hi+${encodeURIComponent(hostFirstName)}%2C+I%27m+interested+in+booking+${encodedPropertyTitle}%E2%80%A6`
    : undefined;

  return (
    <section id="about" className="scroll-mt-24 w-full">
      <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xs">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-600">
            {t.hostStoryEyebrow}
          </span>
        </div>

        {/* Main Grid: Host Profile Card & Story Narrative */}
        <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} gap-8 lg:gap-12 items-start`}>
          {/* Left Column: Host Portrait & Personal Card */}
          <div className={`${isMobileView ? 'w-full' : 'lg:col-span-4'} flex flex-col items-center sm:items-start text-center sm:text-left`}>
            <div className="relative mb-4">
              <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full ring-4 ring-emerald-600/20 shadow-md">
                <Image
                  src={property.hostInfo.avatar}
                  alt={property.hostInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-emerald-700 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md">
                <ShieldCheck className="h-3 w-3" />
                <span>{t.verifiedHost}</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 tracking-tight">
              {property.hostInfo.name}
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              {t.hostedBy} {property.title}
            </p>

            {/* Direct Contact Actions */}
            <div className="mt-5 w-full flex flex-col sm:flex-row lg:flex-col gap-2.5">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:brightness-105 active:scale-95 bg-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  <span>{t.whatsappHost}</span>
                </a>
              )}

              {property.hostInfo.phone && (
                <a
                  href={`tel:${property.hostInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 shadow-2xs hover:bg-stone-50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-stone-500" />
                  <span>{t.callHost}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Host Bio Quote & Story Narrative */}
          <div className={`${isMobileView ? 'w-full' : 'lg:col-span-8'} flex flex-col justify-between`}>
            {/* Host Personal Quote */}
            {property.hostBio ? (
              <blockquote className="border-l-2 border-emerald-700 pl-4 sm:pl-6 py-1">
                <p className="font-serif italic text-lg sm:text-2xl text-stone-900 leading-relaxed font-normal">
                  „{property.hostBio}”
                </p>
                <cite className="block mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500 not-italic">
                  — {property.hostInfo.name}
                </cite>
              </blockquote>
            ) : (
              <blockquote className="border-l-2 border-emerald-700 pl-4 sm:pl-6 py-1">
                <p className="font-serif italic text-lg sm:text-2xl text-stone-900 leading-relaxed font-normal">
                  {t.welcomeQuote(property.title)}
                </p>
                <cite className="block mt-2 text-xs font-semibold uppercase tracking-wider text-stone-500 not-italic">
                  — {property.hostInfo.name}
                </cite>
              </blockquote>
            )}

            {/* Property Story Narrative */}
            <div className="mt-6 pt-6 border-t border-stone-200/80">
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-500 mb-2">
                {t.aboutThisStay}
              </h4>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {property.description}
              </p>
            </div>

            {/* The Direct Hospitality Promise */}
            <div className="mt-8 pt-6 border-t border-stone-200/80">
              <div className="flex items-center gap-2 mb-3">
                <HeartHandshake className="h-4 w-4 text-emerald-700" />
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                  {t.directHospitalityPromise}
                </h4>
              </div>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                {t.directPromiseDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                    <span>{t.guaranteedBestRate}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-snug">
                    {t.guaranteedBestRateDesc}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-700" />
                    <span>{t.personalHostCare}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-snug">
                    {t.personalHostCareDesc}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 mb-1">
                    <Compass className="h-3.5 w-3.5 text-emerald-700" />
                    <span>{t.flexibleCheckIn}</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-snug">
                    {t.flexibleCheckInDesc}
                  </p>
                </div>
              </div>

              {/* Action trigger */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onCheckDates}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <span>{t.checkDates}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

