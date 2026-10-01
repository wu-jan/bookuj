import React from 'react';
import { formatCurrency } from '@/lib/utils';

interface MobileBottomCTAProps {
  pricePerNight: number;
  currency: string;
  accentColor: string;
  hasDateRange: boolean;
  onAction: () => void;
  isMobileView: boolean;
}

export function MobileBottomCTA({
  pricePerNight,
  currency,
  accentColor,
  hasDateRange,
  onAction,
  isMobileView,
}: MobileBottomCTAProps) {
  return (
    <div
      className={`${
        isMobileView
          ? 'sticky bottom-0 left-0 right-0 z-30'
          : 'md:hidden fixed bottom-0 left-0 right-0 z-30'
      } bg-white/95 backdrop-blur-lg border-t border-black/10 px-4 py-3 flex items-center justify-between shadow-2xl`}
    >
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
          Direct Price
        </span>
        <span className="text-base font-extrabold text-zinc-900">
          {formatCurrency(pricePerNight, currency)}{' '}
          <span className="text-xs font-normal text-zinc-500">/ night</span>
        </span>
      </div>

      <button
        type="button"
        onClick={onAction}
        className="rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
        style={{
          backgroundColor: accentColor || 'var(--color-accent, #10B981)',
        }}
      >
        {hasDateRange ? 'Proceed to Book' : 'Select Dates'}
      </button>
    </div>
  );
}
