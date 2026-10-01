import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface DirectBookingBenefitsCardProps {
  hostFirstName: string;
  onCheckDates: () => void;
}

export function DirectBookingBenefitsCard({
  hostFirstName,
  onCheckDates,
}: DirectBookingBenefitsCardProps) {
  return (
    <div className="rounded-3xl bg-zinc-900 text-white p-5 sm:p-8 border border-zinc-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-4">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Direct Booking Privilege</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          Why booking directly matters
        </h3>
        <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
          Online booking portals take up to 18% in commissions from both guests and hosts. By reserving directly here, 100% of your stay rate goes to authentic hospitality.
        </p>

        <div className="mt-5 space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">All-Inclusive Direct Rate</strong>
              <span className="text-zinc-400">Zero cleaning markups, zero guest service fees added at checkout.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">Direct Host Relationship</strong>
              <span className="text-zinc-400">Personal communication with {hostFirstName} without call-center bots.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">Priority Arrival Flexibility</strong>
              <span className="text-zinc-400">Direct guests receive flexible check-in arrangements whenever available.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 sm:mt-6 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="text-emerald-400 font-semibold uppercase tracking-wider">
          Transparent • Direct • Fee-Free
        </span>
        <button
          type="button"
          onClick={onCheckDates}
          className="text-white hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Check Dates</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
