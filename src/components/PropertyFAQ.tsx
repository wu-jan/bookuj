'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types/property';
import { TranslationDictionary } from '@/lib/translations';

interface PropertyFAQProps {
  faq: FAQItem[];
  hostFirstName: string;
  isMobileView?: boolean;
  t: TranslationDictionary;
}

export function PropertyFAQ({
  faq,
  hostFirstName,
  isMobileView = false,
  t,
}: PropertyFAQProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First open by default

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (!faq || faq.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs">
      <div className="pb-5 sm:pb-6 border-b border-zinc-100">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
          <HelpCircle className="h-4 w-4" />
          <span>{t.faqBadge}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-zinc-900">
          {t.faqHeading}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          {t.faqSubheading(hostFirstName)}
        </p>
      </div>

      {/* Accordion list */}
      <div className="mt-4 sm:mt-6 divide-y divide-zinc-100 font-sans">
        {faq.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-medium text-zinc-900 group-hover:text-emerald-700 transition-colors">
                  {item.question}
                </span>
                <div
                  className={`h-7 w-7 rounded-full bg-zinc-50 border border-zinc-200/80 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-emerald-50 border-emerald-200 text-emerald-700' : 'text-zinc-500'
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="mt-3 pr-8 text-xs sm:text-sm text-zinc-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150 font-normal">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
