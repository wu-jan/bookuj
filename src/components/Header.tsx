import React from 'react';
import Image from 'next/image';
import { PropertyTheme } from '@/types/property';
import { ShieldCheck, Phone } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface HeaderProps {
  title: string;
  theme: PropertyTheme;
  hostPhone?: string;
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
  hostPhone,
  hostName,
  hostAvatar,
  pricePerNight,
  currency,
  onCheckAvailability,
  isMobileView = false,
}: HeaderProps) {

  return (
    <header className={`w-full border-b border-black/5 bg-white/90 backdrop-blur-md sticky ${isMobileView ? 'top-[37px]' : 'top-0'} z-40`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between ${isMobileView ? 'px-3 py-2.5' : 'px-4 py-3.5 sm:px-6 lg:px-8'}`}>
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
                className="text-base sm:text-xl font-bold tracking-tight transition-colors block truncate max-w-[160px] sm:max-w-xs"
                style={{ color: 'var(--color-primary, #18181b)' }}
              >
                {title}
              </span>
            )}
            {hostName && (
              <span className="text-[11px] text-zinc-500 font-medium block truncate">
                Hosted directly by <strong className="text-zinc-800">{hostName}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Header Badges & Direct Booking Assurance */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {!isMobileView && (
            <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Direct Rate • No Hidden Fees</span>
            </div>
          )}

          {!isMobileView && pricePerNight && (
            <div className="hidden lg:flex items-baseline gap-1 text-xs">
              <span className="text-base font-bold text-zinc-900">{formatCurrency(pricePerNight, currency)}</span>
              <span className="text-zinc-500">/ night</span>
            </div>
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
              <span>{isMobileView ? 'Check Dates' : 'Check Availability'}</span>
            </button>
          )}

          {!isMobileView && hostPhone && (
            <a
              href={`tel:${hostPhone}`}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>Contact Host</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
