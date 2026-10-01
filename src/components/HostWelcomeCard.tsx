import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Property } from '@/types/property';

interface HostWelcomeCardProps {
  property: Property;
}

export function HostWelcomeCard({ property }: HostWelcomeCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-5 sm:p-8 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full ring-2 ring-emerald-500/20 shrink-0">
              <Image
                src={property.hostInfo.avatar}
                alt={property.hostInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Hosted by {property.hostInfo.name}
              </h2>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Direct Communication • Personal Concierge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 shrink-0">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Verified Host</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 italic border-l-2 border-emerald-500/50 pl-3">
          &ldquo;Welcome to {property.title}. When you book directly through this site, you are communicating directly with me. No hidden fees, no opaque algorithms, and zero middleman markups.&rdquo;
        </p>
      </div>

      {/* About the property summary */}
      <div className="mt-5 pt-4 sm:mt-6 sm:pt-5 border-t border-zinc-100">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">About this stay</h3>
        <p className="text-xs text-zinc-600 leading-relaxed line-clamp-4">
          {property.description}
        </p>
      </div>
    </div>
  );
}
