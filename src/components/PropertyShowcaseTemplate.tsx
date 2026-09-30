'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { Property } from '@/types/property';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { AmenitiesList } from '@/components/AmenitiesList';
import { BookingCalendar } from '@/components/BookingCalendar';
import { PaymentModal } from '@/components/PaymentModal';
import { PropertyMap } from '@/components/PropertyMap';
import { Footer } from '@/components/Footer';
import { PropertySwitcher } from '@/components/PropertySwitcher';
import {
  MapPin,
  ShieldCheck,
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PropertyShowcaseTemplateProps {
  property: Property;
  allProperties: Property[];
}

export function PropertyShowcaseTemplate({
  property,
  allProperties,
}: PropertyShowcaseTemplateProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpaces = () => {
    spacesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalNights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 0;

  const totalStayPrice = totalNights * property.pricePerNight;


  // Gallery keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeGalleryIndex === null) return;
      if (e.key === 'Escape') setActiveGalleryIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveGalleryIndex((prev) =>
          prev !== null ? (prev + 1) % property.images.length : null
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveGalleryIndex((prev) =>
          prev !== null
            ? (prev - 1 + property.images.length) % property.images.length
            : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGalleryIndex, property.images.length]);

  return (
    <ThemeProvider theme={property.theme}>
      <div className={`min-h-screen transition-all duration-300 ${isMobileView ? 'bg-zinc-900 py-6 sm:py-10 px-2 sm:px-4 flex flex-col items-center' : ''}`}>
        {/* Mobile Device Simulation Frame Header Bar */}
        {isMobileView && (
          <div className="mb-4 flex items-center justify-between gap-4 text-white text-xs bg-zinc-800/90 border border-zinc-700/80 px-4 py-2 rounded-full shadow-lg backdrop-blur-md max-w-sm w-full animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-zinc-200">Mobile Device Preview</span>
              <span className="text-[10px] text-zinc-400 font-mono">(iPhone 15 Pro, 393px)</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileView(false)}
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Exit Frame ✕
            </button>
          </div>
        )}

        {/* Outer Frame Container */}
        <div
          className={`transition-all duration-300 w-full ${
            isMobileView
              ? 'max-w-[400px] rounded-[48px] border-[10px] border-zinc-800 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden bg-white relative ring-1 ring-zinc-700 min-h-[820px] max-h-[92vh] overflow-y-auto'
              : 'flex flex-col pb-20 md:pb-0'
          }`}
        >
          {/* Simulated iPhone Status Bar & Dynamic Island */}
          {isMobileView && (
            <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between border-b border-zinc-100">
              <span className="text-[11px] font-bold text-zinc-800 font-mono tracking-tighter">9:41</span>
              <div className="h-4 w-24 bg-black rounded-full shadow-inner" />
              <div className="flex items-center gap-1.5 text-zinc-800">
                <span className="text-[10px] font-bold">5G</span>
                <div className="w-5 h-2.5 border border-zinc-800 rounded-xs p-0.5 flex items-center">
                  <div className="w-full h-full bg-zinc-800 rounded-2xs" />
                </div>
              </div>
            </div>
          )}

          {/* Top Direct Booking Header */}
          <Header
            title={property.title}
            theme={property.theme}
            hostPhone={property.hostInfo.phone}
            hostName={property.hostInfo.name}
            hostAvatar={property.hostInfo.avatar}
            pricePerNight={property.pricePerNight}
            currency={property.currency}
            onCheckAvailability={scrollToCalendar}
            isMobileView={isMobileView}
          />

          {/* Main Content Showcase */}
          <main className={`mx-auto w-full max-w-7xl flex-1 ${isMobileView ? 'px-3 pt-3 pb-20' : 'px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-16'}`}>

          {/* Cinematic Editorial Hero with Ken Burns effect & Direct Pricing Capsule */}
          <div className={`relative ${isMobileView ? 'h-[500px]' : 'h-[60vh] min-h-[420px] sm:h-[65vh] sm:min-h-[480px]'} w-full overflow-hidden rounded-3xl shadow-xl`}>
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
            <div className={`absolute ${isMobileView ? 'top-3 left-3 right-3' : 'top-4 sm:top-8 left-4 right-4 sm:left-10 sm:right-10'} z-10 flex items-start justify-between gap-2 sm:gap-3 pointer-events-none`}>
              {/* Left: Direct Booking badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/95 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium text-zinc-900 backdrop-blur-md shadow-lg pointer-events-auto shrink-0">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                <span className={isMobileView ? 'hidden' : 'hidden sm:inline'}>Direct Guest Portal • 0% Markup</span>
                <span className={isMobileView ? 'inline' : 'sm:hidden'}>Direct Portal</span>
              </div>

              {/* Right: Stacked quick-navigation widgets */}
              <div className="flex flex-col gap-1.5 sm:gap-2 pointer-events-auto">
                {/* View Photos Widget */}
                <button
                  type="button"
                  onClick={scrollToSpaces}
                  className={`group flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-white text-zinc-900 ${
                    isMobileView ? 'px-2.5 py-2 w-auto' : 'px-3 py-2.5 sm:px-6 sm:py-4 w-full sm:w-[300px]'
                  } shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
                >
                  <div className={`relative ${isMobileView ? 'h-7 w-7' : 'h-8 w-8 sm:h-11 sm:w-11'} rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-zinc-100`}>
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
                    <span className={`font-extrabold text-zinc-900 block leading-snug ${isMobileView ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                      Photos
                    </span>
                  </div>
                  <span className={`font-bold text-emerald-700 shrink-0 ${isMobileView ? 'text-[11px]' : 'text-xs hidden sm:flex items-center gap-1'}`}>
                    {property.images.length} ↓
                  </span>
                </button>

                {/* View on Map Widget */}
                {property.coordinates && (
                  <button
                    type="button"
                    onClick={scrollToMap}
                    className={`group flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-white text-zinc-900 ${
                      isMobileView ? 'px-2.5 py-2 w-auto' : 'px-3 py-2.5 sm:px-6 sm:py-4 w-full sm:w-[300px]'
                    } shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
                  >
                    <div className={`relative ${isMobileView ? 'h-7 w-7' : 'h-8 w-8 sm:h-11 sm:w-11'} rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-emerald-50 flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-200" />
                      <Compass className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-700 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      {!isMobileView && (
                        <span className="hidden sm:block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                          Surroundings
                        </span>
                      )}
                      <span className={`font-extrabold text-zinc-900 block leading-snug ${isMobileView ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                        Map
                      </span>
                    </div>
                    <span className={`font-bold text-emerald-700 shrink-0 ${isMobileView ? 'text-[11px]' : 'text-xs hidden sm:flex items-center gap-1'}`}>
                      Explore ↓
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Hero Bottom Content & Capsule */}
            <div className={`absolute ${isMobileView ? 'bottom-3 left-3 right-3' : 'bottom-5 sm:bottom-8 left-4 right-4 sm:left-10 sm:right-10'} z-10 text-white flex flex-col ${isMobileView ? 'gap-2.5' : 'sm:flex-row sm:items-end'} justify-between gap-3 sm:gap-6`}>
              <div className="max-w-2xl">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-emerald-300 mb-1 sm:mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{property.location}</span>
                </div>
                <h1 className={`${isMobileView ? 'text-2xl' : 'text-2xl sm:text-5xl lg:text-6xl'} font-extrabold tracking-tight leading-tight`}>
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
                onClick={scrollToCalendar}
                className={`shrink-0 flex items-center justify-between gap-3 rounded-2xl bg-white text-zinc-900 ${
                  isMobileView ? 'px-3.5 py-2.5 w-full' : 'px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-[300px]'
                } text-sm font-bold shadow-2xl hover:bg-zinc-50 active:scale-95 transition-all cursor-pointer`}
              >
                <div>
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-left">
                    Direct Rate
                  </span>
                  <span className={`${isMobileView ? 'text-lg' : 'text-xl'} font-extrabold text-zinc-900 text-left block`}>
                    {formatCurrency(property.pricePerNight, property.currency)} <span className="text-xs font-normal text-zinc-500">/ night</span>
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

          {/* Clean Content Stack */}

          <div className={`mt-8 sm:mt-12 space-y-8 sm:space-y-12 max-w-5xl mx-auto`}>
            {/* Side-by-Side on Desktop: Host Welcome (Left) & Why Booking Directly Matters (Right) */}
            <div className={`grid grid-cols-1 ${isMobileView ? '' : 'md:grid-cols-2'} gap-6 sm:gap-8 items-stretch`}>
              {/* Host Personal Welcome Banner */}
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

              {/* Explicit "Why Booking Directly Matters" Box */}
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
                        <span className="text-zinc-400">Personal communication with {property.hostInfo.name.split(' ')[0]} without call-center bots.</span>
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
                    onClick={scrollToCalendar}
                    className="text-white hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Check Dates</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Spaces & Atmosphere Gallery */}
            <div ref={spacesRef} className="scroll-mt-24 bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-6 gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                    Spaces & Atmosphere
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Authentic photography of the interior, private relaxation spaces, and surrounding nature.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToCalendar}
                  className="self-start sm:self-auto text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  Check dates for these spaces ↓
                </button>
              </div>

              <div className={`grid grid-cols-1 ${isMobileView ? 'gap-4' : 'sm:grid-cols-3 gap-5'}`}>
                {property.images.slice(1, 4).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGalleryIndex(idx + 1)}
                    className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-zinc-100 group shadow-xs cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <Image
                      src={img}
                      alt={`${property.title} space ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 bg-white/95 text-zinc-900 rounded-full px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-md transform translate-y-2 group-hover:translate-y-0 transition-all">
                        <Maximize2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>View Fullscreen</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>


            {/* Standardized Amenities Grid */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
              <AmenitiesList amenities={property.amenities} />
            </div>

            {/* Location & Map Section */}
            {property.coordinates && (
              <div ref={mapRef}>
                <PropertyMap
                  lat={property.coordinates.lat}
                  lng={property.coordinates.lng}
                  locationName={property.location}
                  title={property.title}
                />
              </div>
            )}

            {/* Dedicated Bottom Reservation Suite (Calendar + Direct Booking Action) */}
            <div ref={calendarRef} className="scroll-mt-24 pt-4">
              <div className={`rounded-3xl border border-zinc-200 bg-white ${isMobileView ? 'p-3' : 'p-4 sm:p-8 md:p-10'} shadow-lg`}>
                <div className="pb-4 mb-4 sm:pb-6 sm:mb-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    {!isMobileView && (
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                        Direct Reservation
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">
                      Select Dates & Reserve Directly
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Transparent direct rates • Zero platform fee • Contactless host handoff
                    </p>
                  </div>

                  {!isMobileView && (
                    <div className="hidden sm:flex items-center gap-2 rounded-2xl bg-zinc-50 border border-zinc-200/80 px-4 py-2.5 shrink-0">
                      <span className="text-xl sm:text-2xl font-bold text-zinc-900">
                        {formatCurrency(property.pricePerNight, property.currency)}
                      </span>
                      <span className="text-xs text-zinc-500">/ night (All-Inclusive)</span>
                    </div>
                  )}
                </div>

                <div className={`grid grid-cols-1 ${isMobileView ? '' : 'lg:grid-cols-12'} gap-6 sm:gap-8 items-start`}>
                  <div className={isMobileView ? 'w-full' : 'lg:col-span-8'}>
                    <BookingCalendar
                      occupiedDates={property.occupiedDates}
                      selectedRange={selectedRange}
                      onSelectRange={setSelectedRange}
                      accentColor={property.theme.accentColor}
                      isMobileView={isMobileView}
                    />
                  </div>

                  {/* Summary Box beside calendar */}
                  <div className={`${isMobileView ? 'w-full' : 'lg:col-span-4'} rounded-2xl bg-zinc-50 border border-zinc-200 p-5 sm:p-6 flex flex-col justify-between`}>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900">Stay Summary</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">Direct rate with zero hidden costs</p>

                      {selectedRange?.from && selectedRange?.to ? (
                        <div className="mt-4 sm:mt-5 space-y-3 text-xs">
                          <div className="rounded-xl bg-white p-3 border border-zinc-200">
                            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Dates</span>
                            <p className="font-bold text-zinc-900 mt-0.5">
                              {format(selectedRange.from, 'MMM d')} – {format(selectedRange.to, 'MMM d, yyyy')}
                            </p>
                            <p className="text-emerald-700 font-semibold mt-0.5">
                              {totalNights} {totalNights === 1 ? 'night' : 'nights'} stay
                            </p>
                          </div>

                          <div className="flex justify-between text-zinc-600 pt-2">
                            <span>
                              Direct Rate ({formatCurrency(property.pricePerNight, property.currency)} × {totalNights}n)
                            </span>
                            <span className="font-semibold text-zinc-900">
                              {formatCurrency(totalStayPrice, property.currency)}
                            </span>
                          </div>

                          <div className="flex justify-between text-emerald-700">
                            <span>Cleaning & Linens</span>
                            <span className="font-bold">Included ($0)</span>
                          </div>

                          <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                            <span>Total Stay Cost</span>
                            <span className="text-xl sm:text-2xl font-bold">
                              {formatCurrency(totalStayPrice, property.currency)}
                            </span>
                          </div>

                          <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200/60 text-[11px] text-amber-900">
                            <strong>10% Advance Deposit: {formatCurrency(Math.round(totalStayPrice * 0.1), property.currency)}</strong>
                            <p className="text-[10px] text-amber-700 mt-0.5">
                              Balance settled directly upon arrival.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5 rounded-xl bg-white p-4 border border-dashed border-zinc-200 text-center text-xs text-zinc-500">
                          Select your check-in and check-out dates on the calendar to unlock direct reservation.
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!selectedRange?.from || !selectedRange?.to}
                      onClick={() => setIsModalOpen(true)}
                      className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-bold text-white shadow-md transition-all ${
                        selectedRange?.from && selectedRange?.to
                          ? 'hover:brightness-105 active:scale-[0.98] cursor-pointer shadow-emerald-500/20'
                          : 'opacity-50 cursor-not-allowed bg-zinc-400'
                      }`}
                      style={{
                        backgroundColor:
                          selectedRange?.from && selectedRange?.to
                            ? property.theme.accentColor || 'var(--color-accent, #10B981)'
                            : undefined,
                      }}
                    >
                      {selectedRange?.from && selectedRange?.to ? 'Request Direct Reservation' : 'Select Dates to Book'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer title={property.title} hostInfo={property.hostInfo} isMobileView={isMobileView} />

        {/* Mobile Sticky Bottom CTA Bar (Active on mobile viewports OR when mobile simulation is enabled) */}
        <div
          className={`${
            isMobileView
              ? 'sticky bottom-0 left-0 right-0 z-30'
              : 'md:hidden fixed bottom-0 left-0 right-0 z-30'
          } bg-white/95 backdrop-blur-lg border-t border-black/10 px-4 py-3 flex items-center justify-between shadow-2xl`}
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
              Direct Price
            </span>
            <span className="text-base font-extrabold text-zinc-900">
              {formatCurrency(property.pricePerNight, property.currency)}{' '}
              <span className="text-xs font-normal text-zinc-500">/ night</span>
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToCalendar}
            className="rounded-full px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: property.theme.accentColor || 'var(--color-accent, #10B981)',
            }}
          >
            {selectedRange?.from && selectedRange?.to ? 'Proceed to Book' : 'Select Dates'}
          </button>
        </div>
        </div>

        {/* Checkout Payment Modal Simulation */}

        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyTitle={property.title}
          pricePerNight={property.pricePerNight}
          currency={property.currency}
          selectedRange={selectedRange}
          theme={property.theme}
          hostInfo={property.hostInfo}
        />

        {/* Animated Maximized Photo Gallery Lightbox */}
        {activeGalleryIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
            {/* Top Bar with Counter and Close Button */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-200">
                  {property.title}
                </span>
                <span className="text-xs text-zinc-400 bg-white/10 px-2.5 py-1 rounded-full font-mono">
                  {activeGalleryIndex + 1} / {property.images.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveGalleryIndex(null)}
                className="rounded-full p-2.5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Active Image View with Smooth Transitions */}
            <div className="relative w-full h-[70vh] max-w-5xl mx-4 flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={property.images[activeGalleryIndex]}
                  alt={`${property.title} photo ${activeGalleryIndex + 1}`}
                  fill
                  priority
                  className="object-contain animate-in fade-in zoom-in-95 duration-200"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIndex(
                    (activeGalleryIndex - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveGalleryIndex((activeGalleryIndex + 1) % property.images.length)
                }
                className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/80 text-white p-3 backdrop-blur-md border border-white/20 shadow-xl transition-all cursor-pointer active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Thumbnails Strip */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 flex justify-center gap-2 px-4 overflow-x-auto py-2">
              {property.images.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeGalleryIndex === idx
                      ? 'border-emerald-500 scale-105 shadow-lg'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dev Property Switcher Floating Pill */}
        <PropertySwitcher
          properties={allProperties}
          currentSlug={property.slug}
          isMobileSimulated={isMobileView}
          onToggleMobileSimulated={() => setIsMobileView(!isMobileView)}
        />
      </div>
    </ThemeProvider>
  );
}



