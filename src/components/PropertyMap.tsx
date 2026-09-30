'use client';

import React from 'react';
import { MapPin, Compass, ShieldCheck } from 'lucide-react';

interface PropertyMapProps {
  lat: number;
  lng: number;
  locationName: string;
  title: string;
}

export function PropertyMap({ lat, lng, locationName, title }: PropertyMapProps) {
  // Approximate bounding box calculation (~0.04 deg offset, ~3-4km radius)
  const bbox = `${lng - 0.04}%2C${lat - 0.03}%2C${lng + 0.04}%2C${lat + 0.03}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const osmViewUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=13/${lat}/${lng}`;

  return (
    <div id="location-map" className="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full w-fit mb-2">
            <Compass className="h-3.5 w-3.5 text-emerald-600" />
            <span>Approximate Location • Privacy Protected</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">
            Location & Surroundings
          </h3>
          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            <span>{locationName}</span>
          </p>
        </div>

        <a
          href={osmViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Open in OpenStreetMap ↗
        </a>
      </div>

      {/* Embedded OpenStreetMap with privacy radius overlay info */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
        <iframe
          title={`Map of ${title}`}
          src={osmEmbedUrl}
          className="w-full h-full border-0 grayscale-[20%] contrast-[105%]"
          loading="lazy"
        />

        {/* Floating Privacy Badge on Map */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md border border-black/5 text-[11px] text-zinc-600 flex items-center gap-2 max-w-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>To preserve privacy, exact address is dispatched with your host confirmation.</span>
        </div>
      </div>
    </div>
  );
}
