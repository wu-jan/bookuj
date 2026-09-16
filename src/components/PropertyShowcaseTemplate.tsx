'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { Property } from '@/types/property';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { HeroGallery } from '@/components/HeroGallery';
import { AmenitiesList } from '@/components/AmenitiesList';
import { BookingCalendar } from '@/components/BookingCalendar';
import { PaymentModal } from '@/components/PaymentModal';
import { Footer } from '@/components/Footer';
import { PropertySwitcher } from '@/components/PropertySwitcher';
import { MapPin, Star, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

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
  const calendarRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSpaces = () => {
    if (spacesRef.current) {
      spacesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider theme={property.theme}>
      <div className="flex min-h-screen flex-col">
        {/* Top Direct Booking Header */}
        <Header
          title={property.title}
          theme={property.theme}
          hostPhone={property.hostInfo.phone}
          hostName={property.hostInfo.name}
          hostAvatar={property.hostInfo.avatar}
          pricePerNight={property.pricePerNight}
          onCheckAvailability={scrollToCalendar}
        />

        {/* Main Content Showcase */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 pt-4 pb-16">
          {/* Cinematic Editorial Hero with Overlay & Direct Pricing Capsule */}
          <div className="relative h-[65vh] min-h-[460px] w-full overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              priority
              className="object-cover brightness-95"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            {/* Floating Top Badges & View Spaces Shortcut */}
            <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-zinc-900 backdrop-blur-md shadow-lg pointer-events-auto">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>Direct Guest Portal • 0% Third-Party Markup</span>
              </div>

              {/* Direct View Spaces Thumbnail Shortcut Button */}
              <button
                type="button"
                onClick={scrollToSpaces}
                className="group flex items-center gap-2.5 rounded-full bg-black/60 hover:bg-black/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg transition-all active:scale-95 pointer-events-auto cursor-pointer border border-white/20"
              >
                <div className="relative h-6 w-6 rounded-full overflow-hidden ring-1 ring-white/60 shrink-0">
                  <Image
                    src={property.images[1]}
                    alt="Preview interior"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <span>View Spaces & Photos</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">↓</span>
              </button>
            </div>

            {/* Hero Bottom Content & Capsule */}
            <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10 z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-300 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  {property.title}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-200 line-clamp-2 max-w-xl">
                  {property.description}
                </p>
              </div>

              {/* Floating Direct Price & Reserve Dates Capsule */}
              <button
                type="button"
                onClick={scrollToCalendar}
                className="shrink-0 flex items-center gap-3.5 rounded-2xl bg-white text-zinc-900 px-6 py-4 text-sm font-bold shadow-2xl hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer"
              >
                <div>
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    Direct Price
                  </span>
                  <span className="text-xl font-extrabold text-zinc-900">
                    ${property.pricePerNight} <span className="text-xs font-normal text-zinc-500">/ night</span>
                  </span>
                </div>
                <div className="h-8 w-px bg-zinc-200" />
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span>Reserve Dates</span>
                  <span className="text-base font-bold">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Clean Content Stack */}
          <div className="mt-12 space-y-12 max-w-5xl mx-auto">
            {/* Side-by-Side on Desktop: Host Welcome Letter (Left) & About Sanctuary (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Host Personal Welcome Banner */}
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-emerald-500/20 shrink-0">
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
                          Dedicated Concierge • Direct Inquiries
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 shrink-0">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Verified Host</span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-zinc-600 italic border-l-2 border-emerald-500/50 pl-3">
                    &ldquo;Welcome to {property.title}. When you book directly through this site, you are communicating directly with me. No hidden fees, no opaque algorithms, and zero middleman markups.&rdquo;
                  </p>
                </div>

                {/* Direct Booking Assurance Pills */}
                <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span><strong>No Hidden Fees:</strong> Cleanings & linens included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span><strong>Direct Rate:</strong> 0% portal surcharge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span><strong>Flexible Check-In:</strong> Priority arrival</span>
                  </div>
                </div>
              </div>

              {/* Property Narrative / Description */}
              <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-zinc-900" />
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                      About this sanctuary
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-700 whitespace-pre-line font-sans">
                    {property.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>Private retreat setting</span>
                  </span>
                  <button
                    type="button"
                    onClick={scrollToSpaces}
                    className="font-bold text-zinc-900 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View photo tour</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Spaces & Atmosphere Gallery */}
            <div ref={spacesRef} className="scroll-mt-24 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900">
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {property.images.slice(1, 4).map((img, idx) => (
                  <div key={idx} className="relative h-72 rounded-2xl overflow-hidden bg-zinc-100 group shadow-xs">
                    <Image
                      src={img}
                      alt={`${property.title} space ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Standardized Amenities Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs">
              <AmenitiesList amenities={property.amenities} />
            </div>

            {/* Dedicated Bottom Reservation Suite (Calendar + Direct Booking Action) */}
            <div ref={calendarRef} className="scroll-mt-24 pt-4">
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-lg">
                <div className="pb-6 mb-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                      Direct Reservation
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900">
                      Select Dates & Reserve Directly
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Transparent direct rates • No cleaning surcharge • Instant host notification
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl bg-zinc-50 border border-zinc-200/80 px-4 py-2.5">
                    <span className="text-2xl font-bold text-zinc-900">${property.pricePerNight}</span>
                    <span className="text-xs text-zinc-500">/ night (All-Inclusive)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <BookingCalendar
                      occupiedDates={property.occupiedDates}
                      selectedRange={selectedRange}
                      onSelectRange={setSelectedRange}
                      accentColor={property.theme.accentColor}
                    />
                  </div>

                  {/* Summary Box beside calendar */}
                  <div className="lg:col-span-4 rounded-2xl bg-zinc-50 border border-zinc-200 p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900">Stay Summary</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">Direct rate with zero hidden costs</p>

                      {selectedRange?.from && selectedRange?.to ? (
                        <div className="mt-5 space-y-3 text-xs">
                          <div className="rounded-xl bg-white p-3 border border-zinc-200">
                            <span className="text-[10px] uppercase font-bold text-zinc-400 block">Dates</span>
                            <p className="font-bold text-zinc-900 mt-0.5">
                              {format(selectedRange.from, 'MMM d')} – {format(selectedRange.to, 'MMM d, yyyy')}
                            </p>
                            <p className="text-emerald-700 font-semibold mt-0.5">
                              {differenceInCalendarDays(selectedRange.to, selectedRange.from)} nights stay
                            </p>
                          </div>

                          <div className="flex justify-between text-zinc-600 pt-2">
                            <span>Direct Rate (${property.pricePerNight} × {differenceInCalendarDays(selectedRange.to, selectedRange.from)}n)</span>
                            <span className="font-semibold text-zinc-900">
                              ${differenceInCalendarDays(selectedRange.to, selectedRange.from) * property.pricePerNight}
                            </span>
                          </div>

                          <div className="flex justify-between text-emerald-700">
                            <span>Cleaning & Linens</span>
                            <span className="font-bold">Included ($0)</span>
                          </div>

                          <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm font-bold text-zinc-900">
                            <span>Total Price</span>
                            <span className="text-2xl font-bold">
                              ${differenceInCalendarDays(selectedRange.to, selectedRange.from) * property.pricePerNight}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6 rounded-xl bg-white p-4 border border-dashed border-zinc-200 text-center text-xs text-zinc-500">
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
                      {selectedRange?.from && selectedRange?.to ? 'Book Direct' : 'Select Dates to Book'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer title={property.title} hostInfo={property.hostInfo} />

        {/* Checkout Payment Modal Simulation */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyTitle={property.title}
          pricePerNight={property.pricePerNight}
          currency={property.currency}
          selectedRange={selectedRange}
          theme={property.theme}
        />

        {/* Dev Property Switcher Floating Pill */}
        <PropertySwitcher
          properties={allProperties}
          currentSlug={property.slug}
        />
      </div>
    </ThemeProvider>
  );
}
