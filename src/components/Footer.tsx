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

  const directPerks = t?.footerDirectPerks ?? (isPl ? '0% Prowizji • Gwarancja Najlepszej Ceny' : '0% Commission • Best Rate Online');
  const hospitality = t?.footerHospitality ?? (isPl ? 'Osobista Gościnność' : 'Personalized Guest Experience');
  const concierge = t?.footerDirectConcierge ?? (isPl ? 'Bezpośrednia rezerwacja u gospodarza & kameralny pobyt' : 'Direct booking concierge & bespoke stay experience');
  const rightsReserved = t?.footerRightsReserved ? t.footerRightsReserved(currentYear, title) : `© ${currentYear} ${title}. All rights reserved.`;

  return (
    <footer className="w-full border-t border-black/5 bg-white/50 backdrop-blur-xs mt-12 sm:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-6 sm:gap-8 ${isMobileView ? '' : 'md:grid-cols-3'} items-center`}>
          {/* Host identity */}
          <div className="flex items-center gap-4">
            <Image
              src={hostInfo.avatar}
              alt={hostInfo.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-200"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {isPl ? 'Gospodarz obiektu' : 'Hosted with care by'}
              </p>
              <p className="text-sm font-semibold text-zinc-900">{hostInfo.name}</p>
            </div>
          </div>

          {/* Direct reservation perks */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{directPerks}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>{hospitality}</span>
            </div>
          </div>

          {/* Direct contact info */}
          <div className="flex flex-wrap items-center md:justify-end gap-3 text-xs text-zinc-600">
            {hostInfo.whatsappNumber && (
              <a
                href={`https://wa.me/${hostInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi+${encodeURIComponent(hostInfo.name.trim().split(' ')[0])}%2C+I%27m+interested+in+booking+${encodeURIComponent(title)}%E2%80%A6`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Host on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white shadow-xs hover:brightness-105 active:scale-95 transition-all bg-[#25D366]"
              >
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
                </svg>
                <span>Chat with Host</span>
              </a>
            )}
            <a
              href={`tel:${hostInfo.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{hostInfo.phone}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>{rightsReserved}</p>
          <p className="text-zinc-400">{concierge}</p>
        </div>
      </div>
    </footer>
  );
}
