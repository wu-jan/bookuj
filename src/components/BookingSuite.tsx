'use client';

import React from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';
import { Property } from '@/types/property';
import { BookingCalendar } from '@/components/BookingCalendar';
import { formatCurrency } from '@/lib/utils';
import { TranslationDictionary, Locale } from '@/lib/translations';

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
    <div className={`rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white ${isMobileView ? 'p-3' : 'p-3.5 sm:p-8 md:p-10'} shadow-lg w-full max-w-full overflow-hidden`}>
      <div className="pb-4 mb-4 sm:pb-6 sm:mb-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          {!isMobileView && (
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              {t.directReservation}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
            {t.selectDatesTitle}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {t.selectDatesSubtitle}
          </p>
        </div>

        {!isMobileView && (
          <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-zinc-50 border border-zinc-200/80 px-4 py-2.5 shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-zinc-900">
              {formatCurrency(property.pricePerNight, property.currency)}
            </span>
            <span className="text-xs text-zinc-500">{t.perNight} {t.allInclusive}</span>
          </div>
        )}
      </div>

      <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} gap-4 sm:gap-8 items-start w-full`}>
        <div className={isMobileView ? 'w-full' : 'w-full lg:col-span-8'}>
          <BookingCalendar
            occupiedDates={property.occupiedDates}
            selectedRange={selectedRange}
            onSelectRange={onSelectRange}
            accentColor={property.theme.accentColor}
            isMobileView={isMobileView}
            minimumStay={property.minimumStay || 1}
            t={t}
            locale={locale}
          />
        </div>

        {/* Summary Box beside calendar */}
        <div className={`${isMobileView ? 'w-full' : 'w-full lg:col-span-4'} rounded-2xl bg-zinc-50 border border-zinc-200 p-4 sm:p-6 flex flex-col justify-between`}>
          <div>
            <h4 className="font-bold text-sm text-zinc-900">{t.staySummary}</h4>
            <p className="text-xs text-zinc-500 mt-0.5">{t.staySummarySubtitle}</p>

            {selectedRange?.from && selectedRange?.to ? (
              <div className="mt-4 sm:mt-5 space-y-3 text-xs">
                <div className="rounded-xl bg-white p-3 border border-zinc-200">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">{t.dates}</span>
                  <p className="font-bold text-zinc-900 mt-0.5">
                    {format(selectedRange.from, shortDateFormatPattern, { locale: dateFnsLocale })} – {format(selectedRange.to, dateFormatPattern, { locale: dateFnsLocale })}
                  </p>
                  <p className="text-emerald-700 font-semibold mt-0.5">
                    {t.nightCount(totalNights)}
                  </p>
                </div>

                {property.minimumStay && totalNights < property.minimumStay && (
                  <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200 text-xs text-amber-900 font-medium">
                    ⚠️ {t.minStayAlert(property.minimumStay, totalNights)}
                  </div>
                )}

                <div className="flex justify-between text-zinc-600 pt-2">
                  <span>
                    {t.directRate} ({formatCurrency(property.pricePerNight, property.currency)} × {totalNights}n)
                  </span>
                  <span className="font-semibold text-zinc-900">
                    {formatCurrency(totalStayPrice, property.currency)}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-700">
                  <span>{t.cleaningAndLinens}</span>
                  <span className="font-bold">{t.includedFree}</span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                  <span>{t.totalStayCost}</span>
                  <span className="text-xl sm:text-2xl font-bold">
                    {formatCurrency(totalStayPrice, property.currency)}
                  </span>
                </div>

                <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200/60 text-[11px] text-amber-900">
                  <strong>{t.advanceDeposit(property.depositPercent || 10, formatCurrency(Math.round(totalStayPrice * ((property.depositPercent || 10) / 100)), property.currency))}</strong>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    {t.depositBalanceNote}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl bg-white p-4 border border-dashed border-zinc-200 text-center text-xs text-zinc-500">
                {t.selectDatesPrompt}
                {property.minimumStay && property.minimumStay > 1 && (
                  <div className="mt-2 text-[11px] text-zinc-400">
                    ({t.minStayNotice(property.minimumStay)})
                  </div>
                )}
              </div>
            )}
          </div>

          {(() => {
            const hasDates = Boolean(selectedRange?.from && selectedRange?.to);
            const isMinStayMet = !property.minimumStay || totalNights >= property.minimumStay;
            const canBook = hasDates && isMinStayMet;

            return (
              <button
                type="button"
                disabled={!canBook}
                onClick={onOpenModal}
                className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-md transition-all ${
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
                {!hasDates
                  ? t.selectDatesToBook
                  : !isMinStayMet
                  ? t.minStayButtonLabel(property.minimumStay || 1)
                  : t.requestDirectReservation}
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
