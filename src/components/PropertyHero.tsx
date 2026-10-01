import React from 'react';
import Image from 'next/image';
import { Sparkles, Compass, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { formatCurrency } from '@/lib/utils';

interface PropertyHeroProps {
  property: Property;
  isMobileView: boolean;
  onScrollToCalendar: () => void;
  onScrollToGallery: () => void;
  onScrollToMap: () => void;
}

export function PropertyHero({
  property,
  isMobileView,
  onScrollToCalendar,
  onScrollToGallery,
  onScrollToMap,
}: PropertyHeroProps) {
  return (
    <div
      className={`relative ${
        isMobileView
          ? 'h-[500px]'
          : 'h-[60vh] min-h-[420px] sm:h-[65vh] sm:min-h-[480px]'
      } w-full overflow-hidden rounded-3xl shadow-xl`}
    >
      <div className="relative h-full w-full animate-ken-burns">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          priority
          className="object-cover brightness-95"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Floating Top Badges & Navigation Widgets */}
      <div
        className={`absolute ${
          isMobileView
            ? 'top-3 left-3 right-3'
            : 'top-4 sm:top-8 left-4 right-4 sm:left-10 sm:right-10'
        } z-10 flex items-start justify-between gap-2 sm:gap-3 pointer-events-none`}
      >
        {/* Left: Direct Booking badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/95 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium text-zinc-900 backdrop-blur-md shadow-lg pointer-events-auto shrink-0">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
          <span className={isMobileView ? 'hidden' : 'hidden sm:inline'}>
            Direct Guest Portal • 0% Markup
          </span>
          <span className={isMobileView ? 'inline' : 'sm:hidden'}>
            Direct Portal
          </span>
        </div>

        {/* Right: Stacked quick-navigation widgets */}
        <div className="flex flex-col gap-1.5 sm:gap-2 pointer-events-auto">
          {/* View Photos Widget */}
          <button
            type="button"
            onClick={onScrollToGallery}
            className={`group flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-white text-zinc-900 ${
              isMobileView
                ? 'px-2.5 py-2 w-auto'
                : 'px-3 py-2.5 sm:px-6 sm:py-4 w-full sm:w-[300px]'
            } shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
          >
            <div
              className={`relative ${
                isMobileView ? 'h-7 w-7' : 'h-8 w-8 sm:h-11 sm:w-11'
              } rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-zinc-100`}
            >
              {property.images[1] ? (
                <Image
                  src={property.images[1]}
                  alt="Photo tour preview"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-zinc-500" />
                </div>
              )}
            </div>
            <div className="text-left flex-1 min-w-0">
              {!isMobileView && (
                <span className="hidden sm:block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Spaces & Interior
                </span>
              )}
              <span
                className={`font-extrabold text-zinc-900 block leading-snug ${
                  isMobileView ? 'text-xs' : 'text-xs sm:text-sm'
                }`}
              >
                Photos
              </span>
            </div>
            <span
              className={`font-bold text-emerald-700 shrink-0 ${
                isMobileView ? 'text-[11px]' : 'text-xs hidden sm:flex items-center gap-1'
              }`}
            >
              {property.images.length} ↓
            </span>
          </button>

          {/* View on Map Widget */}
          {property.coordinates && (
            <button
              type="button"
              onClick={onScrollToMap}
              className={`group flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-white text-zinc-900 ${
                isMobileView
                  ? 'px-2.5 py-2 w-auto'
                  : 'px-3 py-2.5 sm:px-6 sm:py-4 w-full sm:w-[300px]'
              } shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
            >
              <div
                className={`relative ${
                  isMobileView ? 'h-7 w-7' : 'h-8 w-8 sm:h-11 sm:w-11'
                } rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-emerald-50 flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200" />
                <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="text-left flex-1 min-w-0">
                {!isMobileView && (
                  <span className="hidden sm:block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Surroundings
                  </span>
                )}
                <span
                  className={`font-extrabold text-zinc-900 block leading-snug ${
                    isMobileView ? 'text-xs' : 'text-xs sm:text-sm'
                  }`}
                >
                  Map
                </span>
              </div>
              <span
                className={`font-bold text-emerald-700 shrink-0 ${
                  isMobileView ? 'text-[11px]' : 'text-xs hidden sm:flex items-center gap-1'
                }`}
              >
                Explore ↓
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Bottom Content & Capsule */}
      <div
        className={`absolute ${
          isMobileView
            ? 'bottom-3 left-3 right-3'
            : 'bottom-5 sm:bottom-8 left-4 right-4 sm:left-10 sm:right-10'
        } z-10 text-white flex flex-col ${
          isMobileView ? 'gap-2.5' : 'sm:flex-row sm:items-end'
        } justify-between gap-3 sm:gap-6`}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-emerald-300 mb-1 sm:mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{property.location}</span>
          </div>
          <h1
            className={`${
              isMobileView ? 'text-2xl' : 'text-2xl sm:text-5xl lg:text-6xl'
            } font-extrabold tracking-tight leading-tight`}
          >
            {property.title}
          </h1>
          {!isMobileView && (
            <p className="mt-2 text-xs sm:text-base text-zinc-200 line-clamp-2 max-w-xl hidden sm:block">
              {property.description}
            </p>
          )}
        </div>

        {/* Floating Direct Price & Reserve Dates Capsule */}
        <button
          type="button"
          onClick={onScrollToCalendar}
          className={`shrink-0 flex items-center justify-between gap-3 rounded-2xl bg-white text-zinc-900 ${
            isMobileView ? 'px-3.5 py-2.5 w-full' : 'px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-[300px]'
          } text-sm font-bold shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
        >
          <div>
            <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">
              Direct Rate
            </span>
            <span
              className={`${
                isMobileView ? 'text-lg' : 'text-xl'
              } font-extrabold text-zinc-900 text-left block`}
            >
              {formatCurrency(property.pricePerNight, property.currency)}{' '}
              <span className="text-xs font-normal text-zinc-500">/ night</span>
            </span>
          </div>
          <div className="h-7 w-px bg-zinc-200" />
          <div className="flex items-center gap-1 text-emerald-700 font-bold shrink-0 text-xs sm:text-sm">
            <span>Reserve Dates</span>
            <span className="font-bold">→</span>
          </div>
        </button>
      </div>
    </div>
  );
}
