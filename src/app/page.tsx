import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, AlertCircle, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nie określono obiektu — bookuj.pl',
  description: 'Dedykowana platforma bezpośrednich rezerwacji dla niezależnych gospodarzy.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-200/50 border border-stone-200/80 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-medium mb-6">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Wymagany adres obiektu</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 mb-3">
          Nie określono obiektu
        </h1>

        {/* Message */}
        <p className="text-stone-600 text-sm leading-relaxed mb-6">
          bookuj.pl obsługuje dedykowane, niezależne strony rezerwacji. Aby wyświetlić wizytówkę i kalendarz obiektu, skorzystaj z bezpośredniego adresu przekazanego przez gospodarza.
        </p>

        {/* Explanation Box */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/60 text-left text-xs text-stone-600 mb-6 space-y-2.5">
          <div className="flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-stone-800 block">Wymagany format adresu:</span>
              <code className="text-emerald-700 font-mono font-semibold">bookuj.vercel.app/twoj-obiekt</code>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Bezpośrednie rezerwacje bez marży i prowizji pośredników.</span>
          </div>
        </div>

        {/* Demo Shortcut */}
        <div className="pt-1">
          <Link
            href="/zakopane-gorna-chata"
            className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm"
          >
            Zobacz pokazowy obiekt (Zakopane) →
          </Link>
        </div>
      </div>

      <p className="text-xs text-stone-400 mt-8 tracking-wide">
        bookuj.pl • System Bezpośrednich Rezerwacji
      </p>
    </main>
  );
}
