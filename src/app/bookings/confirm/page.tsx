'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Booking {
  booking_ref: string;
  property_slug: string;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  check_in: string;
  check_out: string;
  nights: number;
  total_price?: number;
  deposit_amount?: number;
  payment_method?: string;
  status: string;
  special_requests?: string;
}

function ConfirmBookingContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      setError('Brak numeru referencyjnego rezerwacji w linku.');
      return;
    }

    async function fetchBooking() {
      try {
        const res = await fetch(`/api/bookings/confirm?ref=${encodeURIComponent(ref!)}`);
        if (!res.ok) {
          throw new Error('Nie znaleziono rezerwacji');
        }
        const data = await res.json();
        setBooking(data.booking);
        if (data.booking.status === 'confirmed') {
          setConfirmed(true);
        }
      } catch (err: any) {
        setError(err.message || 'Błąd podczas wczytywania rezerwacji');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [ref]);

  const handleConfirm = async () => {
    if (!ref) return;
    setConfirming(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Nie udało się potwierdzić rezerwacji');
      }

      setBooking(data.booking);
      setConfirmed(true);
    } catch (err: any) {
      setError(err.message || 'Wystąpił błąd podczas potwierdzania');
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-800 border-t-transparent" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 text-2xl">
          ⚠️
        </div>
        <h1 className="text-xl font-bold text-stone-900">Nie znaleziono rezerwacji</h1>
        <p className="mt-2 text-sm text-stone-500">{error || 'Rezerwacja mogła zostać usunięta.'}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Wróć do strony głównej
        </Link>
      </div>
    );
  }

  const cleanPhone = booking.guest_phone ? booking.guest_phone.replace(/[\s\-\(\)]/g, '') : '';
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
        `Dzień dobry ${booking.guest_name}, z tej strony gospodarz obiektu. Potwierdzam rezerwację ${booking.booking_ref} na termin ${booking.check_in} - ${booking.check_out}.`
      )}`
    : null;

  return (
    <div className="mx-auto max-w-xl">
      {/* Header card */}
      <div className="overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-sm">
        <div className="bg-stone-900 p-6 text-white sm:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              Panel Gospodarza Bookuj
            </span>
            <span className="font-mono text-xs tracking-wider text-stone-400">
              {booking.booking_ref}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {confirmed ? 'Rezerwacja potwierdzona' : 'Potwierdzenie zadatku'}
          </h1>
          <p className="mt-1 text-sm text-stone-300">
            Obiekt: <strong className="text-white capitalize">{booking.property_slug.replace(/-/g, ' ')}</strong>
          </p>
        </div>

        {/* Status banner */}
        <div
          className={`border-b px-6 py-3.5 sm:px-8 text-sm flex items-center justify-between ${
            confirmed
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
              : 'bg-amber-50 border-amber-100 text-amber-800'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            <span>{confirmed ? '✅' : '⏳'}</span>
            <span>
              {confirmed
                ? 'Wpłata zadatku zaksięgowana • Termin zablokowany'
                : 'Oczekiwanie na zaksięgowanie wpłaty zadatku'}
            </span>
          </div>
          <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-white/80">
            {confirmed ? 'Potwierdzona' : 'Oczekuje'}
          </span>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Summary table */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Szczegóły pobytu gościa
            </h2>
            <div className="divide-y divide-stone-100 rounded-2xl border border-stone-200/80 bg-stone-50/50 p-4 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Gość:</span>
                <span className="font-semibold text-stone-900">{booking.guest_name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Email:</span>
                <a href={`mailto:${booking.guest_email}`} className="font-medium text-amber-600 hover:underline">
                  {booking.guest_email}
                </a>
              </div>
              {booking.guest_phone && (
                <div className="flex justify-between py-2">
                  <span className="text-stone-500">Telefon:</span>
                  <a href={`tel:${booking.guest_phone}`} className="font-medium text-stone-900">
                    {booking.guest_phone}
                  </a>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Termin:</span>
                <span className="font-semibold text-stone-900">
                  {booking.check_in} — {booking.check_out} ({booking.nights} nocy)
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Metoda wpłaty:</span>
                <span className="font-medium uppercase text-stone-900">{booking.payment_method || 'Bezpośrednia'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-stone-500 font-medium">Wymagany zadatek:</span>
                <span className="font-bold text-amber-700 text-base">
                  {booking.deposit_amount ? `${booking.deposit_amount} zł` : 'W cenie'}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-stone-500 font-bold">Wartość całkowita:</span>
                <span className="font-bold text-stone-900 text-base">
                  {booking.total_price ? `${booking.total_price} zł` : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Action button */}
          {!confirmed ? (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full rounded-2xl bg-amber-600 px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-amber-700 disabled:opacity-50"
              >
                {confirming ? 'Aktualizacja...' : '✓ Potwierdź wpłatę zadatku i wyślij email gościowi'}
              </button>
              <p className="mt-2 text-xs text-stone-500">
                Po kliknięciu status rezerwacji zmieni się na potwierdzony, a gość otrzyma oficjalny e-mail.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center">
              <p className="text-sm font-semibold text-emerald-900">
                Wpłata została zatwierdzona! E-mail potwierdzający został wysłany do gościa.
              </p>
            </div>
          )}

          {/* Quick guest contact tools */}
          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Bezpośredni kontakt z gościem
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <span>💬</span>
                  <span>Napisz na WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${booking.guest_email}?subject=${encodeURIComponent(`Rezerwacja ${booking.booking_ref}`)}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
              >
                <span>✉️</span>
                <span>Wyślij e-mail</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmBookingPage() {
  return (
    <div className="min-h-screen bg-stone-100/60 px-4 py-12 sm:px-6 sm:py-16">
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-800 border-t-transparent" />
          </div>
        }
      >
        <ConfirmBookingContent />
      </Suspense>
    </div>
  );
}
