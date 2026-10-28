import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-stone-200/50 border border-stone-200/80 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/60 text-rose-800 text-xs font-medium mb-6">
          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>Błąd 404 • Nie znaleziono obiektu</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 mb-3">
          Obiekt nie istnieje
        </h1>

        {/* Message */}
        <p className="text-stone-600 text-sm leading-relaxed mb-6">
          Podany adres obiektu jest nieprawidłowy lub oferta została wycofana przez gospodarza.
        </p>

        {/* Action */}
        <Link
          href="/zakopane-gorna-chata"
          className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm"
        >
          Przejdź do przykładowego obiektu →
        </Link>
      </div>

      <p className="text-xs text-stone-400 mt-8 tracking-wide">
        bookuj.pl • System Bezpośrednich Rezerwacji
      </p>
    </main>
  );
}

