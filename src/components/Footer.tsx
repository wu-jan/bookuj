'use client';

import React from 'react';
import { HostInfo } from '@/types/property';
import { TranslationDictionary } from '@/lib/translations';

interface FooterProps {
  title: string;
  hostInfo: HostInfo;
  isMobileView?: boolean;
  locale?: 'pl' | 'en';
  t?: TranslationDictionary;
}

export function Footer({ title, isMobileView = false, locale = 'en', t }: FooterProps) {
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

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-stone-400">
            <span>
              {isPl
                ? 'Bezpośrednia rezerwacja u gospodarza • 0% prowizji'
                : 'Direct reservation with host • 0% commission'}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-stone-500">
              {isPl ? (
                <>
                  Podoba Ci się nasze rozwiązanie? Skontaktuj się z nami{' '}
                  <a
                    href="mailto:kontakt@bookuj.pl"
                    className="text-stone-800 font-medium underline hover:text-stone-950 transition-colors"
                  >
                    tutaj
                  </a>
                </>
              ) : (
                <>
                  Like our solution? Contact us{' '}
                  <a
                    href="mailto:contact@bookuj.pl"
                    className="text-stone-800 font-medium underline hover:text-stone-950 transition-colors"
                  >
                    here
                  </a>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
