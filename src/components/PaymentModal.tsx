'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Lock,
  Sparkles,
  CalendarCheck,
} from 'lucide-react';
import { PropertyTheme } from '@/types/property';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  pricePerNight: number;
  currency: string;
  selectedRange: DateRange | undefined;
  theme: PropertyTheme;
}

type ModalState = 'summary_and_payment' | 'processing' | 'confirmed';

export function PaymentModal({
  isOpen,
  onClose,
  propertyTitle,
  pricePerNight,
  currency,
  selectedRange,
  theme,
}: PaymentModalProps) {
  const [modalState, setModalState] = useState<ModalState>('summary_and_payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'wire'>('card');
  const [guestName, setGuestName] = useState('Alexander Wright');
  const [guestEmail, setGuestEmail] = useState('alex.wright@example.com');

  if (!isOpen) return null;

  const nights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 1;

  const grandTotal = nights * pricePerNight;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState('processing');

    // Simulate payment transaction with 1.5s delay
    setTimeout(() => {
      setModalState('confirmed');
    }, 1500);
  };

  const handleResetAndClose = () => {
    setModalState('summary_and_payment');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-zinc-100 overflow-hidden">
        {/* Close Button */}
        {modalState !== 'processing' && (
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* STATE A: Summary & Payment Selector */}
        {modalState === 'summary_and_payment' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-3 py-1 w-fit mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Direct Booking Guarantee</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Confirm Direct Reservation
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Securing stay at <strong className="text-zinc-800">{propertyTitle}</strong>
            </p>

            {/* Reservation summary card */}
            <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 text-xs space-y-3">
              <div className="flex justify-between items-center text-zinc-700">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">RESERVATION DATES</span>
                <span className="font-medium text-zinc-900">
                  {selectedRange?.from && selectedRange?.to
                    ? `${format(selectedRange.from, 'MMM d, yyyy')} – ${format(selectedRange.to, 'MMM d, yyyy')} (${nights}n)`
                    : 'Flexible stay'}
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-700">
                <span>Direct Rate (${pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'})</span>
                <span className="font-medium text-zinc-900">${grandTotal}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-700 text-[11px] font-medium pt-1">
                <span>Direct Booking Transparency</span>
                <span className="bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">No Hidden Fees</span>
              </div>
              <div className="pt-2.5 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                <span>Total Amount Due</span>
                <span className="text-xl font-bold">${grandTotal} <span className="text-xs font-normal text-zinc-500">{currency}</span></span>
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="mt-6 space-y-4">
              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 focus:border-zinc-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 focus:border-zinc-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'wallet'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <Smartphone className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Digital Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <Building2 className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Instant Wire</span>
                  </button>
                </div>
              </div>

              {/* Mock Payment Details Display */}
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3 text-xs text-zinc-600 flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>256-bit encrypted direct settlement. 100% money-back guarantee.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor || 'var(--color-accent, #10B981)',
                }}
              >
                Pay ${grandTotal} & Complete Reservation
              </button>
            </form>
          </div>
        )}

        {/* STATE B: Processing Simulation */}
        {modalState === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="relative flex items-center justify-center">
              <Loader2
                className="h-14 w-14 animate-spin"
                style={{ color: theme.accentColor || 'var(--color-accent, #10B981)' }}
              />
              <Lock className="h-6 w-6 text-zinc-400 absolute" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-zinc-900">
              Processing Reservation...
            </h3>
            <p className="mt-2 text-xs text-zinc-500 max-w-xs">
              Securing dates with the host and verifying direct authorization token.
            </p>
          </div>
        )}

        {/* STATE C: Reservation Confirmed */}
        {modalState === 'confirmed' && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Payment Confirmed</span>
            </div>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
              Reservation Confirmed!
            </h3>
            <p className="mt-2 text-xs text-zinc-600 max-w-sm mx-auto">
              Your stay at <strong className="text-zinc-900">{propertyTitle}</strong> is booked directly. A confirmation email has been dispatched to <strong>{guestEmail}</strong>.
            </p>

            <div className="mt-6 rounded-2xl bg-zinc-50 border border-zinc-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Booking Reference:</span>
                <span className="font-mono font-bold text-zinc-900">#DIR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Dates:</span>
                <span className="font-medium text-zinc-800">
                  {selectedRange?.from && selectedRange?.to
                    ? `${format(selectedRange.from, 'MMM d, yyyy')} – ${format(selectedRange.to, 'MMM d, yyyy')}`
                    : 'Confirmed dates'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Amount Paid:</span>
                <span className="font-bold text-emerald-700">${grandTotal} {currency}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-6 w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-zinc-800 transition-colors"
            >
              Done & Return to Showcase
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
