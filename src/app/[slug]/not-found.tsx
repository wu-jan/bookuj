import Link from 'next/link';
import { Home } from 'lucide-react';

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-zinc-200">
        <span className="text-4xl">🏡</span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900">
          Property Not Found
        </h1>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
          The boutique property you are looking for does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 transition-all cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Return to Showcase</span>
        </Link>
      </div>
    </div>
  );
}
