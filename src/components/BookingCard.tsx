'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { ShieldCheck, Sparkles, ArrowRight, Info, Check } from 'lucide-react';
import { PropertyTheme } from '@/types/property';

interface BookingCardProps {
  pricePerNight: number;
  currency: string;
  selectedRange: DateRange | undefined;
  theme: PropertyTheme;
  onOpenBookingModal: () => void;
  onOpenCalendarMobile?: () => void;
}

export function BookingCard({
  pricePerNight,
  currency,
  selectedRange,
  theme,
  onOpenBookingModal,
  onOpenCalendarMobile,
}: BookingCardProps) {
  const nights = React.useMemo(() => {
    if (selectedRange?.from && selectedRange?.to) {
      return differenceInCalendarDays(selectedRange.to, selectedRange.from);
    }
    return 0;
  }, [selectedRange]);

  const grandTotal = nights * pricePerNight;
  const isRangeSelected = nights > 0;

  return (
    <>
      {/* Desktop Sticky Sidebar Card */}
      <div className="hidden lg:block w-full max-w-sm sticky top-24 rounded-3xl border border-black/5 bg-white p-6 shadow-xl ring-1 ring-black/5">
        {/* Price header */}
        <div className="flex items-baseline justify-between border-b border-zinc-100 pb-4">
          <div>
            <span className="text-3xl font-bold tracking-tight text-zinc-900">
              ${pricePerNight}
            </span>
            <span className="text-sm font-medium text-zinc-500"> / night</span>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3 w-3" />
            <span>No Hidden Fees</span>
          </div>
        </div>

        {/* Date Selection preview box */}
        <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-3 text-xs">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-200">
            <div>
              <span className="block font-semibold uppercase tracking-wider text-zinc-500 text-[10px]">CHECK-IN</span>
              <span className="font-medium text-zinc-800">
                {selectedRange?.from ? format(selectedRange.from, 'MMM d, yyyy') : 'Add date'}
              </span>
            </div>
            <div className="border-l border-zinc-200 pl-2">
              <span className="block font-semibold uppercase tracking-wider text-zinc-500 text-[10px]">CHECK-OUT</span>
              <span className="font-medium text-zinc-800">
                {selectedRange?.to ? format(selectedRange.to, 'MMM d, yyyy') : 'Add date'}
              </span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between text-zinc-500">
            <span>Duration of stay:</span>
            <span className="font-semibold text-zinc-800">
              {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'Not selected'}
            </span>
          </div>
        </div>

        {/* Dynamic Price Breakdown */}
        {isRangeSelected ? (
          <div className="mt-5 space-y-3 text-sm text-zinc-600 border-t border-zinc-100 pt-4">
            <div className="flex justify-between">
              <span>Direct Rate (${pricePerNight} × {nights}n)</span>
              <span className="font-medium text-zinc-900">${grandTotal}</span>
            </div>
            <div className="flex justify-between items-center text-emerald-700 text-xs">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                <span>Cleaning, linens & amenities</span>
              </span>
              <span className="font-bold">Included</span>
            </div>
            <div className="flex justify-between items-center text-emerald-700 text-xs">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5" />
                <span>Middleman portal fee</span>
              </span>
              <span className="font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">$0 (Direct)</span>
            </div>

            <div className="border-t border-zinc-200 pt-3 flex justify-between items-baseline">
              <div>
                <span className="text-base font-bold text-zinc-900 block">Total Price</span>
                <span className="text-[11px] text-zinc-400 font-normal">All-inclusive direct rate</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-zinc-900">
                ${grandTotal} <span className="text-xs font-normal text-zinc-500">{currency}</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-center text-xs text-zinc-500 border border-dashed border-zinc-200">
            Select dates on the calendar to see total price with zero extra fees.
          </div>
        )}

        {/* Primary CTA button */}
        <button
          type="button"
          disabled={!isRangeSelected}
          onClick={onOpenBookingModal}
          className={`mt-6 w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 px-4 text-sm font-semibold text-white shadow-lg transition-all ${
            isRangeSelected
              ? 'hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-emerald-500/20'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{
            backgroundColor: isRangeSelected
              ? theme.accentColor || 'var(--color-accent, #10B981)'
              : '#9CA3AF',
          }}
        >
          <span>{isRangeSelected ? 'Book Direct' : 'Select Travel Dates'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>You won&apos;t be charged yet</span>
        </div>
      </div>

      {/* Mobile Fixed Bottom Floating Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur-md px-5 py-3.5 shadow-2xl">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-zinc-900">
                {isRangeSelected ? `$${grandTotal}` : `$${pricePerNight}`}
              </span>
              <span className="text-xs text-zinc-500">
                {isRangeSelected ? `total (${nights}n)` : '/ night'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {isRangeSelected && selectedRange?.from && selectedRange?.to
                ? `${format(selectedRange.from, 'MMM d')} - ${format(selectedRange.to, 'MMM d')}`
                : 'Direct rate • 0% fee'}
            </p>
          </div>

          <button
            type="button"
            onClick={isRangeSelected ? onOpenBookingModal : onOpenCalendarMobile}
            className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-95"
            style={{
              backgroundColor: theme.accentColor || 'var(--color-accent, #10B981)',
            }}
          >
            <span>{isRangeSelected ? 'Book Direct' : 'Select Dates'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
