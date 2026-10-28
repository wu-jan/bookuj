import React from 'react';
import Image from 'next/image';
import { HostInfo } from '@/types/property';
import { ShieldCheck, Phone, Heart } from 'lucide-react';
import { TranslationDictionary } from '@/lib/translations';

interface FooterProps {
  title: string;
  hostInfo: HostInfo;
  isMobileView?: boolean;
  locale?: 'pl' | 'en';
  t?: TranslationDictionary;
}

export function Footer({ title, hostInfo, isMobileView = false, locale = 'en', t }: FooterProps) {
  const isPl = locale === 'pl';
  const currentYear = new Date().getFullYear();
  const rightsReserved = t?.footerRightsReserved
    ? t.footerRightsReserved(currentYear, title)
    : `© ${currentYear} ${title}. ${isPl ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}`;

  return (
    <footer className="w-full border-t border-stone-200/60 bg-white/40 mt-12 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 font-sans text-center sm:text-left">
          <p>{rightsReserved}</p>
          <p className="text-stone-400 font-normal">
            {isPl
              ? 'Bezpośrednia rezerwacja u gospodarza • 0% prowizji'
              : 'Direct reservation with host • 0% commission'}
          </p>
        </div>
      </div>
    </footer>
  );
}
