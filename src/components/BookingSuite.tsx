'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { Property } from '@/types/property';
import { BookingCalendar } from '@/components/BookingCalendar';
import { formatCurrency } from '@/lib/utils';

interface BookingSuiteProps {
  property: Property;
  selectedRange: DateRange | undefined;
  onSelectRange: (range: DateRange | undefined) => void;
  isMobileView: boolean;
  onOpenModal: () => void;
}

export function BookingSuite({
  property,
  selectedRange,
  onSelectRange,
  isMobileView,
  onOpenModal,
}: BookingSuiteProps) {
  const totalNights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 0;

  const totalStayPrice = totalNights * property.pricePerNight;

  return (
    <div className={`rounded-3xl border border-zinc-200 bg-white ${isMobileView ? 'p-3' : 'p-4 sm:p-8 md:p-10'} shadow-lg`}>
      <div className="pb-4 mb-4 sm:pb-6 sm:mb-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          {!isMobileView && (
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Direct Reservation
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Select Dates & Reserve Directly
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Transparent direct rates • Zero platform fee • Contactless host handoff
          </p>
        </div>

        {!isMobileView && (
          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-zinc-50 border border-zinc-200/80 px-4 py-2.5 shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-zinc-900">
              {formatCurrency(property.pricePerNight, property.currency)}
            </span>
            <span className="text-xs text-zinc-500">/ night (All-Inclusive)</span>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} gap-6 sm:gap-8 items-start`}>
        <div className={isMobileView ? 'w-full' : 'lg:col-span-8'}>
          <BookingCalendar
            occupiedDates={property.occupiedDates}
            selectedRange={selectedRange}
            onSelectRange={onSelectRange}
            accentColor={property.theme.accentColor}
            isMobileView={isMobileView}
          />
        </div>

        {/* Summary Box beside calendar */}
        <div className={`${isMobileView ? 'w-full' : 'lg:col-span-4'} rounded-2xl bg-zinc-50 border border-zinc-200 p-5 sm:p-6 flex flex-col justify-between`}>
          <div>
            <h4 className="font-bold text-sm text-zinc-900">Stay Summary</h4>
            <p className="text-xs text-zinc-500 mt-0.5">Direct rate with zero hidden costs</p>

            {selectedRange?.from && selectedRange?.to ? (
              <div className="mt-4 sm:mt-5 space-y-3 text-xs">
                <div className="rounded-xl bg-white p-3 border border-zinc-200">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Dates</span>
                  <p className="font-bold text-zinc-900 mt-0.5">
                    {format(selectedRange.from, 'MMM d')} – {format(selectedRange.to, 'MMM d, yyyy')}
                  </p>
                  <p className="text-emerald-700 font-semibold mt-0.5">
                    {totalNights} {totalNights === 1 ? 'night' : 'nights'} stay
                  </p>
                </div>

                <div className="flex justify-between text-zinc-600 pt-2">
                  <span>
                    Direct Rate ({formatCurrency(property.pricePerNight, property.currency)} × {totalNights}n)
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {formatCurrency(totalStayPrice, property.currency)}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-700">
                  <span>Cleaning & Linens</span>
                  <span className="font-bold">Included ($0)</span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                  <span>Total Stay Cost</span>
                  <span className="text-xl sm:text-2xl font-bold">
                    {formatCurrency(totalStayPrice, property.currency)}
                  </span>
                </div>

                <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200/60 text-[11px] text-amber-900">
                  <strong>10% Advance Deposit: {formatCurrency(Math.round(totalStayPrice * 0.1), property.currency)}</strong>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    Balance settled directly upon arrival.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-white p-4 border border-dashed border-zinc-200 text-center text-xs text-zinc-500">
                Select your check-in and check-out dates on the calendar to unlock direct reservation.
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={!selectedRange?.from || !selectedRange?.to}
            onClick={onOpenModal}
            className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-md transition-all ${
              selectedRange?.from && selectedRange?.to
                ? 'hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-emerald-500/20'
                : 'opacity-50 cursor-not-allowed bg-zinc-400'
            }`}
            style={{
              backgroundColor:
                selectedRange?.from && selectedRange?.to
                  ? property.theme.accentColor || 'var(--color-accent, #10B981)'
                  : undefined,
            }}
          >
            {selectedRange?.from && selectedRange?.to ? 'Request Direct Reservation' : 'Select Dates to Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
