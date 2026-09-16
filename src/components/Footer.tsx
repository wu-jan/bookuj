import React from 'react';
import Image from 'next/image';
import { HostInfo } from '@/types/property';
import { ShieldCheck, Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  title: string;
  hostInfo: HostInfo;
}

export function Footer({ title, hostInfo }: FooterProps) {
  return (
    <footer className="w-full border-t border-black/5 bg-white/50 backdrop-blur-xs mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-center">
          {/* Host identity */}
          <div className="flex items-center gap-4">
            <Image
              src={hostInfo.avatar}
              alt={hostInfo.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-200"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Hosted with care by</p>
              <p className="text-sm font-semibold text-zinc-900">{hostInfo.name}</p>
            </div>
          </div>

          {/* Direct reservation perks */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>0% Commission • Best Rate Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-rose-500" />
              <span>Personalized Guest Experience</span>
            </div>
          </div>

          {/* Direct contact info */}
          <div className="flex items-center md:justify-end gap-3 text-xs text-zinc-600">
            <a
              href={`tel:${hostInfo.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{hostInfo.phone}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
          <p className="text-zinc-400">Direct booking concierge & bespoke stay experience</p>
        </div>
      </div>
    </footer>
  );
}
