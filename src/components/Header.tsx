import React from 'react';
import Image from 'next/image';
import { PropertyTheme } from '@/types/property';
import { ShieldCheck, Phone, Globe } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { TranslationDictionary, Locale } from '@/lib/translations';

interface HeaderProps {
  title: string;
  theme: PropertyTheme;
  t: TranslationDictionary;
  locale: Locale;
  onToggleLocale?: () => void;
  hasTranslations?: boolean;
  hostPhone?: string;
  hostWhatsapp?: string;
  hostName?: string;
  hostAvatar?: string;
  pricePerNight?: number;
  currency?: string;
  onCheckAvailability?: () => void;
  isMobileView?: boolean;
}


export function Header({
  title,
  theme,
  t,
  locale,
  onToggleLocale,
  hasTranslations = false,
  hostPhone,
  hostWhatsapp,
  hostName,
  hostAvatar,
  pricePerNight,
  currency,
  onCheckAvailability,
  isMobileView = false,
}: HeaderProps) {
  const hostFirstName = hostName?.trim().split(' ')[0] || 'Host';
  const cleanWhatsapp = hostWhatsapp?.replace(/[^0-9]/g, '');
  const encodedPropertyTitle = encodeURIComponent(title);
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=Hi+${encodeURIComponent(hostFirstName)}%2C+I%27m+interested+in+booking+${encodedPropertyTitle}%E2%80%A6`
    : undefined;

  const isBoutique = theme.layout === 'boutique';

  const scrollToAnchor = (anchorId: string) => {
    if (anchorId === 'reserve' && onCheckAvailability) {
      onCheckAvailability();
      return;
    }
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`w-full border-b border-black/5 bg-white/95 backdrop-blur-md sticky ${isMobileView ? 'top-[37px]' : 'top-0'} z-40`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between ${isMobileView ? 'px-3 py-2.5' : 'px-4 py-3 sm:px-6 lg:px-8'}`}>
        {/* Brand identity: Custom Logo or Stylized Title + Host Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          {hostAvatar && (
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full ring-2 ring-emerald-500/20 shrink-0">
              <Image
                src={hostAvatar}
                alt={hostName || 'Host'}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            {theme.logoUrl ? (
              <Image
                src={theme.logoUrl}
                alt={title}
                width={40}
                height={40}
                className="h-9 w-auto object-contain"
              />
            ) : (
              <span
                className={`text-base sm:text-lg font-bold tracking-tight transition-colors block truncate max-w-[150px] sm:max-w-xs ${
                  theme.fontStyle === 'serif' ? 'font-serif' : 'font-sans'
                }`}
                style={{ color: 'var(--color-primary, #18181b)' }}
              >
                {title}
              </span>
            )}
            {hostName && (
              <span className="text-[11px] text-zinc-500 font-medium block truncate">
                {locale === 'pl' ? 'Bezpośredni kontakt:' : 'Hosted directly by'} <strong className="text-zinc-800">{hostName}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Boutique Desktop Navigation Links */}
        {isBoutique && !isMobileView && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-wide text-zinc-600">
            <button
              type="button"
              onClick={() => scrollToAnchor('about')}
              className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
            >
              {t.navAbout}
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('gallery')}
              className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
            >
              {t.navGallery}
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('amenities')}
              className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
            >
              {t.navAmenities}
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('location')}
              className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
            >
              {t.navLocation}
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('reserve')}
              className="hover:text-emerald-700 font-bold transition-colors cursor-pointer py-1"
            >
              {t.navReserve}
            </button>
          </nav>
        )}

        {/* Header Badges & Direct Booking Assurance */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {hasTranslations && onToggleLocale && (
            <button
              type="button"
              onClick={onToggleLocale}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer"
              title="Toggle Polish / English"
            >
              <Globe className="h-3.5 w-3.5 text-zinc-500" />
              <span className="uppercase">{locale === 'pl' ? 'EN' : 'PL'}</span>
            </button>
          )}

          {!isMobileView && (
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t.directGuestPortal}</span>
            </div>
          )}

          {!isMobileView && pricePerNight && (
            <div className="hidden lg:flex items-baseline gap-1 text-xs">
              <span className="text-base font-bold text-zinc-900">{formatCurrency(pricePerNight, currency)}</span>
              <span className="text-zinc-500">{t.perNight}</span>
            </div>
          )}

          {/* WhatsApp Button (when hostWhatsapp is present) */}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Host on WhatsApp"
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-medium text-white shadow-xs hover:brightness-105 active:scale-95 transition-all bg-[#25D366]"
            >
              <svg
                className="h-3.5 w-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
              </svg>
              <span>{isMobileView ? 'WhatsApp' : t.whatsappHost}</span>
            </a>
          )}

          {onCheckAvailability && (
            <button
              type="button"
              onClick={onCheckAvailability}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-95 cursor-pointer shrink-0"
              style={{
                backgroundColor: theme.accentColor || 'var(--color-accent, #10B981)',
              }}
            >
              <span>{t.checkAvailability}</span>
            </button>
          )}

          {!isMobileView && hostPhone && (
            <a
              href={`tel:${hostPhone}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{t.contactHost}</span>
            </a>
          )}
        </div>
      </div>

      {/* Boutique Mobile Sub-Navigation Bar */}
      {isBoutique && (
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 px-3 sm:px-4 border-t border-zinc-100 bg-white/95 text-xs no-scrollbar">
          <button
            type="button"
            onClick={() => scrollToAnchor('about')}
            className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium whitespace-nowrap hover:bg-zinc-200 transition-colors shrink-0"
          >
            {t.navAbout}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('gallery')}
            className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium whitespace-nowrap hover:bg-zinc-200 transition-colors shrink-0"
          >
            {t.navGallery}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('amenities')}
            className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium whitespace-nowrap hover:bg-zinc-200 transition-colors shrink-0"
          >
            {t.navAmenities}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('location')}
            className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium whitespace-nowrap hover:bg-zinc-200 transition-colors shrink-0"
          >
            {t.navLocation}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('reserve')}
            className="px-3 py-1 rounded-full bg-emerald-700 text-white font-medium whitespace-nowrap hover:bg-emerald-800 transition-colors shrink-0"
          >
            {t.navReserve}
          </button>
        </div>
      )}
    </header>
  );
}
