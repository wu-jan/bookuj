'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaq = useMemo(() => {
    if (!searchQuery.trim()) return faq;
    const q = searchQuery.toLowerCase().trim();
    return faq.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [faq, searchQuery]);

  if (!faq || faq.length === 0) return null;

  return (
    <section id="faq" className="scroll-mt-24 bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-zinc-200/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <HelpCircle className="h-4 w-4" />
            <span>{t.faqBadge}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
            {t.faqHeading}
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {t.faqSubheading(hostFirstName)}
          </p>
        </div>

        {/* Live client-side search box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faqSearchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400 hover:text-zinc-700 bg-zinc-200/60 rounded px-1.5 py-0.5"
            >
              {t.faqClear}
            </button>
          )}
        </div>
      </div>

      {/* Accordion list */}
      <div className="mt-6 divide-y divide-zinc-100">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
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
                  <div className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400">
            {t.faqNoResults(searchQuery, hostFirstName)}
          </div>
        )}
      </div>
    </section>
  );
}
