'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { SlidersHorizontal, ChevronUp, ChevronDown, Check, Sparkles } from 'lucide-react';

interface PropertySwitcherProps {
  properties: Property[];
  currentSlug: string;
}

export function PropertySwitcher({ properties, currentSlug }: PropertySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentProperty = properties.find((p) => p.slug === currentSlug) || properties[0];

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-3 w-80 max-h-96 overflow-y-auto rounded-3xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Concierge Preview Mode</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
              10 Profiles
            </span>
          </div>

          <div className="mt-2 space-y-1">
            {properties.map((property) => {
              const isSelected = property.slug === currentSlug;
              return (
                <Link
                  key={property.slug}
                  href={`/demo/${property.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between gap-2 p-2.5 rounded-2xl text-xs transition-all ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-medium shadow-xs'
                      : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Color dot showing primary and accent theme */}
                    <div className="flex -space-x-1 shrink-0">
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-white"
                        style={{ backgroundColor: property.theme.primaryColor }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-white"
                        style={{ backgroundColor: property.theme.accentColor }}
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold truncate">{property.title}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-zinc-300' : 'text-zinc-400'}`}>
                        {property.location}
                      </p>
                    </div>
                  </div>

                  {isSelected && <Check className="h-4 w-4 shrink-0 text-white" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full border border-black/10 bg-zinc-900/90 text-white px-4 py-2.5 text-xs font-medium shadow-xl backdrop-blur-md hover:bg-zinc-900 transition-all active:scale-95 cursor-pointer ring-1 ring-white/10"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" />
        <span className="hidden sm:inline font-semibold">Demo Theme:</span>
        <span className="max-w-[120px] truncate text-zinc-300 font-medium">
          {currentProperty?.title}
        </span>
        {isOpen ? <ChevronDown className="h-3.5 w-3.5 text-zinc-400" /> : <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />}
      </button>
    </div>
  );
}
