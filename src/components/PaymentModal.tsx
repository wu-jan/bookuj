'use client';

import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import {
  X,
  Building2,
  Smartphone,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { PropertyTheme, HostInfo } from '@/types/property';
import { formatCurrency } from '@/lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  pricePerNight: number;
  currency: string;
  selectedRange: DateRange | undefined;
  theme: PropertyTheme;
  hostInfo?: HostInfo;
}

type ModalState = 'summary_and_payment' | 'processing' | 'confirmed';
type PaymentMethod = 'iban' | 'p2p' | 'arrival';

export function PaymentModal(props: PaymentModalProps) {
  if (!props.isOpen) return null;
  return <PaymentModalContent {...props} />;
}

function PaymentModalContent({
  onClose,
  propertyTitle,
  pricePerNight,
  currency,
  selectedRange,
  theme,
  hostInfo,
}: PaymentModalProps) {
  const [modalState, setModalState] = useState<ModalState>('summary_and_payment');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('iban');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bookingRef] = useState<string>(() => `DIR-${Math.floor(100000 + Math.random() * 900000)}`);

  const nights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 1;

  const grandTotal = nights * pricePerNight;
  const advanceDeposit = Math.round(grandTotal * 0.1); // 10% advance deposit
  const remainingDue = grandTotal - advanceDeposit;

  const handleCopy = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setModalState('processing');

    // Simulate direct reservation registration
    setTimeout(() => {
      setModalState('confirmed');
    }, 1200);
  };

  const handleResetAndClose = () => {
    setModalState('summary_and_payment');
    onClose();
  };

  // Mock host payment coordinates based on host info
  const hostFirstName = hostInfo?.name?.split(' ')[0] || 'Host';
  const mockIban = 'NO93 8601 1117 9422';
  const mockBic = 'DNBNO22';
  const mockP2pHandle = `@${hostFirstName.toLowerCase()}-direct`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-zinc-100 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        {modalState !== 'processing' && (
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* STATE A: Summary & Payment Selector */}
        {modalState === 'summary_and_payment' && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-3 py-1 w-fit mb-3">
              <ShieldCheck className="h-4 w-4" />
              <span>Direct Host Reservation • 0% Platform Fee</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
              Direct Reservation Request
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Booking directly with <strong className="text-zinc-800">{hostInfo?.name || 'Host'}</strong> for <strong className="text-zinc-800">{propertyTitle}</strong>
            </p>

            {/* Reservation summary card */}
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-xs space-y-2.5">
              <div className="flex justify-between items-center text-zinc-700">
                <span className="font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">DATES</span>
                <span className="font-medium text-zinc-900">
                  {selectedRange?.from && selectedRange?.to
                    ? `${format(selectedRange.from, 'MMM d, yyyy')} – ${format(selectedRange.to, 'MMM d, yyyy')} (${nights}n)`
                    : 'Flexible stay'}
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-700">
                <span>Direct Nightly Rate</span>
                <span className="font-medium text-zinc-900">{formatCurrency(pricePerNight, currency)} / night</span>
              </div>
              <div className="flex justify-between items-center text-emerald-700 text-[11px] font-medium">
                <span>Cleaning & Service Fees</span>
                <span className="bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">Included (0 extra)</span>
              </div>
              <div className="pt-2 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                <span>Total Stay Cost</span>
                <span className="text-xl font-bold text-zinc-900">{formatCurrency(grandTotal, currency)}</span>
              </div>

              {/* 10% Advance Deposit Notice */}
              <div className="rounded-xl bg-amber-50/80 border border-amber-200/70 p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>10% Advance Deposit required: {formatCurrency(advanceDeposit, currency)}</strong>
                  <p className="text-[10px] text-amber-700 mt-0.5">
                    Secures your dates directly with {hostFirstName}. Remaining {formatCurrency(remainingDue, currency)} settled upon arrival.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSimulatePayment} className="mt-5 space-y-4">
              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. maya@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1">
                  Note to Host (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Estimated arrival time or special inquiries..."
                  value={guestNotes}
                  onChange={(e) => setGuestNotes(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none"
                />
              </div>

              {/* Direct Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                  Preferred Direct Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('iban')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'iban'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <Building2 className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Bank Wire / IBAN</span>
                    <span className="text-[9px] opacity-70">Direct SEPA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('p2p')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'p2p'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <Smartphone className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">Revolut / PayPal</span>
                    <span className="text-[9px] opacity-70">Instant P2P</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('arrival')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'arrival'
                        ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                  >
                    <Banknote className="h-5 w-5 mb-1" />
                    <span className="text-[11px] font-semibold">On Arrival</span>
                    <span className="text-[9px] opacity-70">Card / Cash</span>
                  </button>
                </div>
              </div>

              {/* Direct Contactless Handoff Info Box */}
              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-xs text-zinc-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Contactless Host Handoff</span>
                </div>
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  We connect you directly to the property owner. No third-party payment middleman extracts commissions from your stay.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98] cursor-pointer"
                style={{
                  backgroundColor: theme.accentColor || 'var(--color-accent, #10B981)',
                }}
              >
                Request Reservation ({formatCurrency(advanceDeposit, currency)} Deposit)
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
            </div>
            <h3 className="mt-6 text-xl font-bold text-zinc-900">
              Notifying {hostFirstName}...
            </h3>
            <p className="mt-2 text-xs text-zinc-500 max-w-xs">
              Directly registering your dates and preparing host transfer coordinates.
            </p>
          </div>
        )}

        {/* STATE C: Reservation Confirmed & Host Handoff */}
        {modalState === 'confirmed' && (
          <div className="py-2 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Direct Reservation Requested</span>
            </div>

            <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900">
              You&apos;re Booked Directly!
            </h3>
            <p className="mt-1.5 text-xs text-zinc-600 max-w-sm mx-auto">
              Your dates at <strong className="text-zinc-900">{propertyTitle}</strong> have been requested. A confirmation copy has been sent to <strong>{guestEmail || 'your email'}</strong>.
            </p>

            <div className="mt-5 rounded-2xl bg-zinc-50 border border-zinc-200 p-4 text-left text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Booking Reference:</span>
                <span className="font-mono font-bold text-zinc-900">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Total Stay:</span>
                <span className="font-bold text-zinc-900">{formatCurrency(grandTotal, currency)} ({nights}n)</span>
              </div>
              <div className="flex justify-between items-center text-amber-800 bg-amber-100/60 p-2 rounded-lg font-medium">
                <span>10% Advance Deposit Due:</span>
                <span className="font-bold">{formatCurrency(advanceDeposit, currency)}</span>
              </div>
            </div>

            {/* Host Payment Coordinates Handoff */}
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 text-left text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                <span className="font-bold text-emerald-950">Host Transfer Instructions</span>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Direct Handoff
                </span>
              </div>

              {paymentMethod === 'iban' && (
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Beneficiary:</span>
                    <span className="font-semibold text-zinc-800">{hostInfo?.name || 'Host'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">IBAN:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(mockIban, 'iban')}
                      className="font-mono font-bold text-zinc-900 flex items-center gap-1 hover:text-emerald-700 cursor-pointer"
                    >
                      <span>{mockIban}</span>
                      {copiedField === 'iban' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-zinc-400" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">BIC / SWIFT:</span>
                    <span className="font-mono font-semibold text-zinc-800">{mockBic}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Payment Reference:</span>
                    <span className="font-mono font-bold text-emerald-800">{bookingRef}</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'p2p' && (
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Revolut / Wise / PayPal:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(mockP2pHandle, 'p2p')}
                      className="font-mono font-bold text-zinc-900 flex items-center gap-1 hover:text-emerald-700 cursor-pointer"
                    >
                      <span>{mockP2pHandle}</span>
                      {copiedField === 'p2p' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-zinc-400" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Transfer Note:</span>
                    <span className="font-mono font-bold text-emerald-800">{bookingRef}</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'arrival' && (
                <p className="text-[11px] text-zinc-600 pt-1 leading-relaxed">
                  {hostFirstName} has been notified of your direct booking request. You will pay the advance deposit or full balance via card/cash upon arrival.
                </p>
              )}

              {hostInfo?.phone && (
                <div className="pt-2 border-t border-emerald-100 flex justify-between items-center text-[11px]">
                  <span className="text-zinc-500">Host Direct Contact:</span>
                  <a href={`tel:${hostInfo.phone}`} className="font-semibold text-emerald-800 hover:underline">
                    {hostInfo.phone}
                  </a>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-5 w-full rounded-2xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Done & Return to Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

