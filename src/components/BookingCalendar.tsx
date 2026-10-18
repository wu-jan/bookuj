'use client';

import React, { useState, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { parseISO, isSameDay, format, differenceInCalendarDays } from 'date-fns';
import { Calendar as CalendarIcon, X, Check, Sparkles } from 'lucide-react';
import { TranslationDictionary } from '@/lib/translations';

interface BookingCalendarProps {
  occupiedDates: string[]; // ISO date strings (YYYY-MM-DD)
  selectedRange: DateRange | undefined;
  onSelectRange: (range: DateRange | undefined) => void;
  accentColor?: string;
  isMobileView?: boolean;
  minimumStay?: number;
  t: TranslationDictionary;
}

export function BookingCalendar({
  occupiedDates,
  selectedRange,
  onSelectRange,
  accentColor = 'var(--color-accent, #10B981)',
  isMobileView = false,
  minimumStay = 1,
  t,
}: BookingCalendarProps) {
  // Mobile detection for true viewport
  const [isWindowMobile, setIsWindowMobile] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsWindowMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const showMobileWidget = isMobileView || isWindowMobile;

  // Convert ISO string dates to Date objects
  const disabledDates = React.useMemo(() => {
    return occupiedDates.map((d) => parseISO(d));
  }, [occupiedDates]);

  // Disable past dates as well as occupied dates
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return disabledDates.some((disabledDate) => isSameDay(disabledDate, date));
  };

  const totalNights = React.useMemo(() => {
    if (selectedRange?.from && selectedRange?.to) {
      return differenceInCalendarDays(selectedRange.to, selectedRange.from);
    }
    return 0;
  }, [selectedRange]);

  // Check if a range spans across any disabled dates
  const handleSelectRange = (range: DateRange | undefined) => {
    if (!range) {
      onSelectRange(undefined);
      return;
    }

    if (range.from && range.to) {
      const fromTime = range.from.getTime();
      const toTime = range.to.getTime();
      const hasOccupiedWithin = disabledDates.some((d) => {
        const t = d.getTime();
        return t >= fromTime && t <= toTime;
      });

      if (hasOccupiedWithin) {
        onSelectRange({ from: range.to, to: undefined });
        return;
      }
    }

    onSelectRange(range);
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. MOBILE VIEW: Airbnb-Style Travel Date Capsule Card
          ───────────────────────────────────────────────────────────── */}
      {showMobileWidget && (
        <div className="w-full rounded-3xl border border-zinc-200/90 bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CalendarIcon className="h-3.5 w-3.5 text-emerald-600" />
              <span>{t.travelDates}</span>
            </div>
            {selectedRange?.from && (
              <button
                type="button"
                onClick={() => onSelectRange(undefined)}
                className="text-xs text-zinc-400 hover:text-zinc-700 underline cursor-pointer"
              >
                {t.clearDates}
              </button>
            )}
          </div>

          {/* Airbnb-style 2-column date picker button trigger */}
          <button
            type="button"
            onClick={() => setIsMobileSheetOpen(true)}
            className="w-full text-left rounded-2xl border-2 border-zinc-200 hover:border-emerald-500 active:scale-[0.99] transition-all bg-zinc-50/70 p-3 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <div className="grid grid-cols-2 divide-x divide-zinc-200">
              <div className="pr-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  {t.checkIn}
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block mt-0.5 truncate">
                  {selectedRange?.from ? format(selectedRange.from, 'MMM d, yyyy') : t.addDate}
                </span>
              </div>
              <div className="pl-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  {t.checkOut}
                </span>
                <span className="text-sm font-extrabold text-zinc-900 block mt-0.5 truncate">
                  {selectedRange?.to ? format(selectedRange.to, 'MMM d, yyyy') : t.addDate}
                </span>
              </div>
            </div>

            {selectedRange?.from && selectedRange?.to && (
              <div className="mt-2.5 pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs font-semibold">
                {totalNights < minimumStay ? (
                  <span className="text-amber-700">⚠️ {t.minStayAlert(minimumStay, totalNights)}</span>
                ) : (
                  <span className="text-emerald-700">{t.nightCount(totalNights)}</span>
                )}
                <span className="text-zinc-600">→</span>
              </div>
            )}
          </button>

          <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-zinc-400 shrink-0" />
              <span>{t.instantBookingConfirmation}</span>
            </div>
            {minimumStay > 1 && (
              <span className="font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                {t.minStayNotice(minimumStay)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. DESKTOP VIEW: Full Side-by-Side 2-Month Calendar Grid
          ───────────────────────────────────────────────────────────── */}
      {!showMobileWidget && (
        <div className="w-full rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-zinc-100">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-zinc-600" />
                <span>{t.selectDatesTitle}</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {selectedRange?.from ? (
                  selectedRange.to ? (
                    <span className="font-medium text-emerald-700">
                      {format(selectedRange.from, 'MMM d, yyyy')} – {format(selectedRange.to, 'MMM d, yyyy')} ({t.nightCount(totalNights)})
                    </span>
                  ) : (
                    <span>{t.checkIn}: <strong className="text-zinc-800">{format(selectedRange.from, 'MMM d, yyyy')}</strong></span>
                  )
                ) : (
                  <span>{t.selectDatesSubtitle}</span>
                )}
              </p>
            </div>

            {selectedRange?.from && (
              <button
                type="button"
                onClick={() => onSelectRange(undefined)}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-colors cursor-pointer"
              >
                {t.clearDates}
              </button>
            )}
          </div>

          <div className="flex justify-center w-full py-1">
            <DayPicker
              mode="range"
              selected={selectedRange}
              onSelect={handleSelectRange}
              disabled={isDateDisabled}
              numberOfMonths={2}
              className="font-sans text-sm"
            />
          </div>

          {/* Minimum stay notice & alert */}
          {selectedRange?.from && selectedRange?.to && totalNights < minimumStay && (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-900 flex items-center justify-between">
              <span className="font-medium">
                ⚠️ {t.minStayAlert(minimumStay, totalNights)}
              </span>
            </div>
          )}

          {/* Calendar Legend */}
          <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-zinc-300 bg-white" />
                <span>{t.available}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span>{t.selected}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-200 line-through" />
                <span>{t.occupied}</span>
              </div>
            </div>

            {minimumStay > 1 && (
              <div className="text-xs text-zinc-500 font-medium bg-zinc-100 px-2.5 py-1 rounded-full">
                {t.minStayNotice(minimumStay)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE SLIDE-UP BOTTOM SHEET MODAL (Airbnb-style)
          ───────────────────────────────────────────────────────────── */}
      {isMobileSheetOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[32px] max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300 overflow-hidden">
            {/* Drawer Drag Pill & Header */}
            <div className="pt-3 pb-2 px-5 border-b border-zinc-100 flex flex-col items-center relative">
              <div className="w-12 h-1.5 bg-zinc-300 rounded-full mb-3" />
              <div className="w-full flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-zinc-900">{t.travelDates}</h4>
                  <p className="text-[11px] text-zinc-500">
                    {selectedRange?.from && selectedRange?.to
                      ? `${format(selectedRange.from, 'MMM d')} – ${format(selectedRange.to, 'MMM d, yyyy')} (${t.nightCount(totalNights)})`
                      : t.selectDatesPrompt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Month Calendar Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleSelectRange}
                disabled={isDateDisabled}
                numberOfMonths={1}
                className="font-sans text-sm"
              />

              {/* Mobile sheet min stay alert */}
              {selectedRange?.from && selectedRange?.to && totalNights < minimumStay && (
                <div className="w-full mt-2 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900 text-center">
                  ⚠️ {t.minStayAlert(minimumStay, totalNights)}
                </div>
              )}
            </div>

            {/* Drawer Bottom Action Bar */}
            <div className="p-4 border-t border-zinc-100 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onSelectRange(undefined)}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 underline cursor-pointer px-2"
              >
                {t.clearDates}
              </button>
              <button
                type="button"
                disabled={Boolean(selectedRange?.from && selectedRange?.to && totalNights < minimumStay)}
                onClick={() => setIsMobileSheetOpen(false)}
                className={`flex-1 rounded-full py-3 px-5 text-xs font-bold text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 ${
                  selectedRange?.from && selectedRange?.to && totalNights < minimumStay
                    ? 'opacity-50 cursor-not-allowed bg-zinc-400'
                    : 'cursor-pointer'
                }`}
                style={{
                  backgroundColor:
                    selectedRange?.from && selectedRange?.to && totalNights < minimumStay
                      ? undefined
                      : accentColor,
                }}
              >
                <Check className="h-4 w-4" />
                <span>
                  {selectedRange?.from && selectedRange?.to
                    ? totalNights < minimumStay
                      ? t.selectAtLeastNights(minimumStay)
                      : t.confirmDatesWithCount(totalNights)
                    : t.saveAndClose}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

