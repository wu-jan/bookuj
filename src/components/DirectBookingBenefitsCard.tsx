import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { TranslationDictionary } from '@/lib/translations';

interface DirectBookingBenefitsCardProps {
  hostFirstName: string;
  onCheckDates: () => void;
  t: TranslationDictionary;
}

export function DirectBookingBenefitsCard({
  hostFirstName,
  onCheckDates,
  t,
}: DirectBookingBenefitsCardProps) {
  return (
    <div className="rounded-3xl bg-zinc-900 text-white p-5 sm:p-8 border border-zinc-800 shadow-xl flex flex-col justify-between">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-4">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>{t.directPrivilege}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
          {t.whyDirectMatters}
        </h3>
        <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
          {t.benefitsIntro}
        </p>

        <div className="mt-5 space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">{t.allInclusiveTitle}</strong>
              <span className="text-zinc-400">{t.allInclusiveDesc}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">{t.relationshipTitle}</strong>
              <span className="text-zinc-400">{t.relationshipDesc(hostFirstName)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-100 block">{t.flexibilityTitle}</strong>
              <span className="text-zinc-400">{t.flexibilityDesc}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 sm:mt-6 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="text-emerald-400 font-semibold uppercase tracking-wider">
          {t.benefitsBadge}
        </span>
        <button
          type="button"
          onClick={onCheckDates}
          className="text-white hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{t.checkDates}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
