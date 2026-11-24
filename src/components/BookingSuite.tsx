/**
 * @component BookingSuite
 * @description Availability calendar and transparent rate breakdown section.
 * Handles date selection, minimum stay validation, night calculation,
 * deposit estimation, and triggers the direct reservation modal.
 */

'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';
import { Property } from '@/types/property';
import { BookingCalendar } from '@/components/BookingCalendar';
import { formatCurrency } from '@/lib/utils';
import { TranslationDictionary, Locale } from '@/lib/translations';
import { ShieldCheck } from 'lucide-react';

interface BookingSuiteProps {
  property: Property;
  selectedRange: DateRange | undefined;
  onSelectRange: (range: DateRange | undefined) => void;
  isMobileView: boolean;
  onOpenModal: () => void;
  t: TranslationDictionary;
  locale?: Locale;
}

export function BookingSuite({
  property,
  selectedRange,
  onSelectRange,
  isMobileView,
  onOpenModal,
  t,
  locale = 'en',
}: BookingSuiteProps) {
  const dateFnsLocale = locale === 'pl' ? pl : enUS;
  const dateFormatPattern = locale === 'pl' ? 'd MMM yyyy' : 'MMM d, yyyy';
  const shortDateFormatPattern = locale === 'pl' ? 'd MMM' : 'MMM d';

  const totalNights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 0;

  const totalStayPrice = totalNights * property.pricePerNight;

  return (
    <div className={`rounded-3xl border border-stone-200/80 bg-white ${isMobileView ? 'p-3.5 sm:p-5' : 'p-5 sm:p-7'} shadow-md w-full max-w-full overflow-hidden`}>
      {/* Header: Title + Trust Badge */}
      <div className="flex items-center justify-between gap-4 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-stone-100">
        <h3 className="font-serif text-lg sm:text-2xl font-normal text-stone-900 tracking-tight">
          {t.selectDatesTitle}
        </h3>
        <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          <span>
            {locale === 'pl'
              ? 'Rezerwacja bezpośrednia u gospodarza'
              : 'Direct host reservation'}
          </span>
        </div>
      </div>

      {/* Full-width 2-Month Calendar */}
      <div className="w-full">
        <BookingCalendar
          occupiedDates={property.occupiedDates}
          selectedRange={selectedRange}
          onSelectRange={onSelectRange}
          accentColor={property.theme.accentColor}
          isMobileView={isMobileView}
          minimumStay={property.minimumStay || 1}
          icalUrl={property.icalUrl}
          t={t}
          locale={locale}
        />
      </div>

      {/* Horizontal Reservation Summary & Direct CTA Bar */}
      {(() => {
        const hasDates = Boolean(selectedRange?.from && selectedRange?.to);
        const isMinStayMet = !property.minimumStay || totalNights >= property.minimumStay;
        const canBook = hasDates && isMinStayMet;
        const depositAmount = Math.round(totalStayPrice * ((property.depositPercent || 25) / 100));

        return (
          <div className="mt-4 pt-3.5 border-t border-zinc-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-5 bg-zinc-50/70 -mx-3.5 -mb-3.5 sm:-mx-7 sm:-mb-7 p-3.5 sm:p-5 rounded-b-3xl">
            {/* Left: Selected stay details */}
            <div className="min-w-0 flex-1">
              {hasDates ? (
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm sm:text-base text-zinc-900">
                      {format(selectedRange!.from!, shortDateFormatPattern, { locale: dateFnsLocale })} – {format(selectedRange!.to!, dateFormatPattern, { locale: dateFnsLocale })}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {t.nightCount(totalNights)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectRange(undefined)}
                      className="text-xs font-medium text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors cursor-pointer ml-1"
                    >
                      {t.clearDates}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 mt-1">
                    <span>{formatCurrency(property.pricePerNight, property.currency)} × {totalNights}n</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{t.cleaningAndLinens}: {t.includedFree}</span>
                    <span>•</span>
                    <span className="text-zinc-600 font-medium">0% prowizji</span>
                  </div>
                  {property.minimumStay && totalNights < property.minimumStay && (
                    <div className="mt-1.5 text-xs font-semibold text-amber-700">
                      ⚠️ {t.minStayAlert(property.minimumStay, totalNights)}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <span className="font-bold text-sm text-zinc-900 block">
                    {t.staySummary}
                  </span>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {t.selectDatesPrompt}
                    {property.minimumStay && property.minimumStay > 1 && (
                      <span className="ml-1 text-zinc-400">({t.minStayNotice(property.minimumStay)})</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Middle: Price & Deposit */}
            <div className="shrink-0 flex items-center lg:flex-col lg:items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-3 lg:pt-0 lg:pl-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block lg:text-right">
                  {t.totalStayCost}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-zinc-900 block lg:text-right">
                  {hasDates
                    ? formatCurrency(totalStayPrice, property.currency)
                    : `${formatCurrency(property.pricePerNight, property.currency)} / noc`}
                </span>
              </div>
              {hasDates && (
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md mt-1">
                  {t.advanceDeposit(property.depositPercent || 25, formatCurrency(depositAmount, property.currency))}
                </span>
              )}
            </div>

            {/* Right: CTA Button */}
            <div className="shrink-0 w-full lg:w-auto">
              <button
                type="button"
                disabled={!canBook}
                onClick={onOpenModal}
                className={`w-full lg:w-auto min-w-[220px] px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                  canBook
                    ? 'hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-emerald-500/20'
                    : 'opacity-50 cursor-not-allowed bg-zinc-400'
                }`}
                style={{
                  backgroundColor: canBook
                    ? property.theme.accentColor || 'var(--color-accent, #10B981)'
                    : undefined,
                }}
              >
                <span>
                  {!hasDates
                    ? t.selectDatesToBook
                    : !isMinStayMet
                    ? t.minStayButtonLabel(property.minimumStay || 1)
                    : `${t.requestDirectReservation}`}
                </span>
                {canBook && <span className="text-base font-normal">→</span>}
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
