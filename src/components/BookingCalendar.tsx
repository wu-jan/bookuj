'use client';

import React from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { parseISO, isSameDay, format, differenceInCalendarDays } from 'date-fns';
import { Calendar as CalendarIcon, Info } from 'lucide-react';

interface BookingCalendarProps {
  occupiedDates: string[]; // ISO date strings (YYYY-MM-DD)
  selectedRange: DateRange | undefined;
  onSelectRange: (range: DateRange | undefined) => void;
  accentColor?: string;
}

export function BookingCalendar({
  occupiedDates,
  selectedRange,
  onSelectRange,
  accentColor,
}: BookingCalendarProps) {
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

  return (
    <div className="w-full rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-zinc-100">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-zinc-600" />
            <span>Select Dates</span>
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {selectedRange?.from ? (
              selectedRange.to ? (
                <span className="font-medium text-emerald-700">
                  {format(selectedRange.from, 'MMM d, yyyy')} – {format(selectedRange.to, 'MMM d, yyyy')} ({totalNights} {totalNights === 1 ? 'night' : 'nights'})
                </span>
              ) : (
                <span>Check-in: <strong className="text-zinc-800">{format(selectedRange.from, 'MMM d, yyyy')}</strong> — Please choose check-out date</span>
              )
            ) : (
              <span>Add your travel dates for accurate direct pricing</span>
            )}
          </p>
        </div>

        {selectedRange?.from && (
          <button
            type="button"
            onClick={() => onSelectRange(undefined)}
            className="self-start sm:self-auto text-xs font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-4 transition-colors"
          >
            Clear dates
          </button>
        )}
      </div>

      <div className="flex justify-center overflow-x-auto py-2">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={onSelectRange}
          disabled={isDateDisabled}
          numberOfMonths={2}
          className="font-sans"
        />
      </div>

      {/* Calendar Legend */}
      <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-500 gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border border-zinc-300 bg-white" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: accentColor || 'var(--color-accent, #10B981)' }}
            />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-zinc-200 line-through" />
            <span>Occupied</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-zinc-400">
          <Info className="h-3.5 w-3.5" />
          <span>Direct booking: 2 nights minimum recommended</span>
        </div>
      </div>
    </div>
  );
}
