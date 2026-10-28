'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PropertyTheme } from '@/types/property';
import { ShieldCheck, Phone, Globe, MessageCircle, ChevronDown } from 'lucide-react';
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
  onOpenGallery?: () => void;
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
  onOpenGallery,
  isMobileView = false,
}: HeaderProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className={`w-full max-w-full overflow-x-clip border-b border-black/5 bg-white/95 backdrop-blur-md sticky ${isMobileView ? 'top-[37px]' : 'top-0'} z-40`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between ${isMobileView ? 'px-3 py-2' : 'px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3'}`}>
        {/* Brand identity: Custom Logo or Stylized Title + Host Badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
          {hostAvatar && (
            <div className="relative h-7 w-7 sm:h-9 sm:w-9 overflow-hidden rounded-full ring-2 ring-stone-200 shrink-0">
              <Image
                src={hostAvatar}
                alt={hostName || 'Host'}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            {theme.logoUrl ? (
              <Image
                src={theme.logoUrl}
                alt={title}
                width={40}
                height={40}
                className="h-7 sm:h-9 w-auto object-contain"
              />
            ) : (
              <span
                className={`text-sm sm:text-xl font-bold tracking-tight transition-colors block truncate max-w-[125px] xs:max-w-[160px] sm:max-w-xs ${
                  theme.fontStyle === 'serif' ? 'font-serif' : 'font-sans'
                }`}
                style={{ color: 'var(--color-primary, #18181b)' }}
              >
                {title}
              </span>
            )}
            {hostName && !isBoutique && (
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
              onClick={() => onOpenGallery ? onOpenGallery() : scrollToAnchor('gallery')}
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
              className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
            >
              {t.navReserve}
            </button>
          </nav>
        )}

        {/* Right Action Elements */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {isBoutique ? (
            /* ==========================================================
             * BOUTIQUE CLEAN RIGHT BAR: Contact + REZERWACJA + Persistent Language
             * ========================================================== */
            <>
              {/* Expandable Contact Dropdown (compact & responsive) */}
              {(hostPhone || whatsappUrl) && (
                <div className="relative" ref={contactRef}>
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    className="inline-flex items-center justify-center gap-1 rounded-full border border-stone-200 bg-white p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-stone-800 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                    aria-label="Direct host contact options"
                  >
                    <Phone className="h-3.5 w-3.5 text-stone-600 shrink-0" />
                    <span className="hidden sm:inline font-mono text-[11px]">{hostPhone || t.contactHost}</span>
                    <ChevronDown className={`h-3 w-3 text-stone-400 transition-transform duration-200 ${isContactOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isContactOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white p-4 shadow-2xl border border-stone-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-stone-100">
                        {hostAvatar && (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 ring-1 ring-stone-200">
                            <Image src={hostAvatar} alt={hostName || 'Host'} fill className="object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-stone-900 block truncate">{hostName}</span>
                          <span className="text-[10px] text-stone-500 block">
                            {locale === 'pl' ? 'Bezpośredni kontakt z gospodarzem' : 'Direct Host Contact'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {hostPhone && (
                          <a
                            href={`tel:${hostPhone}`}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 bg-stone-50 hover:bg-stone-100 transition-colors"
                          >
                            <Phone className="h-4 w-4 text-emerald-700 shrink-0" />
                            <div className="text-left">
                              <span className="block text-[10px] font-normal text-stone-500">{t.callHost}</span>
                              <span className="font-mono text-xs">{hostPhone}</span>
                            </div>
                          </a>
                        )}

                        {whatsappUrl && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold text-white bg-[#25D366] hover:brightness-105 transition-all shadow-2xs"
                          >
                            <MessageCircle className="h-4 w-4 shrink-0 fill-current" />
                            <span>{t.whatsappHost}</span>
                          </a>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-stone-100 text-[10px] text-stone-400 text-center">
                        {locale === 'pl' ? '0% prowizji • Prywatna gościnność' : '0% commission • Private hospitality'}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Single Bold REZERWACJA Button with FIXED width so it never shifts when toggling languages */}
              {onCheckAvailability && (
                <button
                  type="button"
                  onClick={onCheckAvailability}
                  className="w-[84px] sm:w-[110px] inline-flex items-center justify-center rounded-xl py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shrink-0 text-center"
                  style={{
                    backgroundColor: theme.accentColor || '#B45A42',
                  }}
                >
                  <span>{locale === 'pl' ? 'Rezerwacja' : 'Reserve'}</span>
                </button>
              )}
            </>
          ) : (
            /* ==========================================================
             * STANDARD LAYOUT HEADER BADGES & BUTTONS
             * ========================================================== */
            <>
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

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Host on WhatsApp"
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 sm:px-3 text-[11px] sm:text-xs font-medium text-white shadow-xs hover:brightness-105 active:scale-95 transition-all bg-[#25D366]"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
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
            </>
          )}

          {/* Persistent Fixed-Width Language Switcher in Far Upper-Right Corner */}
          {hasTranslations && onToggleLocale && (
            <button
              type="button"
              onClick={onToggleLocale}
              className="w-11 h-7.5 sm:w-13 sm:h-8.5 shrink-0 inline-flex items-center justify-center gap-1 rounded-full border border-stone-200 bg-white text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
              title="Toggle Polish / English"
            >
              <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-stone-400 shrink-0" />
              <span className="font-mono text-[11px] font-bold w-4 text-center">{locale === 'pl' ? 'EN' : 'PL'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Boutique Mobile Sub-Navigation Bar */}
      {isBoutique && (
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto py-2 px-3 sm:px-4 border-t border-stone-100 bg-white/95 text-xs no-scrollbar touch-pan-x w-full max-w-full">
          <button
            type="button"
            onClick={() => scrollToAnchor('about')}
            className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium whitespace-nowrap hover:bg-stone-200 transition-colors shrink-0"
          >
            {t.navAbout}
          </button>
          <button
            type="button"
            onClick={() => onOpenGallery ? onOpenGallery() : scrollToAnchor('gallery')}
            className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium whitespace-nowrap hover:bg-stone-200 transition-colors shrink-0"
          >
            {t.navGallery}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('amenities')}
            className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium whitespace-nowrap hover:bg-stone-200 transition-colors shrink-0"
          >
            {t.navAmenities}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('location')}
            className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium whitespace-nowrap hover:bg-stone-200 transition-colors shrink-0"
          >
            {t.navLocation}
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('reserve')}
            className="px-3 py-1 rounded-full bg-stone-900 text-white font-medium whitespace-nowrap hover:bg-stone-800 transition-colors shrink-0"
          >
            {t.navReserve}
          </button>
        </div>
      )}
    </header>
  );
}
