'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DateRange } from 'react-day-picker';
import { format, differenceInCalendarDays } from 'date-fns';
import { Property } from '@/types/property';
import { BookingCalendar } from '@/components/BookingCalendar';
import { PaymentModal } from '@/components/PaymentModal';
import { AmenitiesList } from '@/components/AmenitiesList';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Wine,
  CheckCircle2,
  ArrowRight,
  Heart,
  Quote,
  Compass,
  Coffee,
  CalendarCheck,
} from 'lucide-react';

interface DirectHostShowcaseProps {
  property: Property;
}

export function DirectHostShowcase({ property }: DirectHostShowcaseProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reservationRef = useRef<HTMLDivElement>(null);

  const scrollToReservation = () => {
    reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nights =
    selectedRange?.from && selectedRange?.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 0;

  const accommodationTotal = nights * property.pricePerNight;
  const cleaningFee = nights > 0 ? 60 : 0;
  const otaEstimatedFee = Math.round(accommodationTotal * 0.16); // ~16% typical Airbnb fee
  const grandTotal = accommodationTotal + cleaningFee;

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* Top Bespoke Host Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#FBFBFA]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-emerald-600/30">
              <Image
                src={property.hostInfo.avatar}
                alt={property.hostInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="block text-sm font-bold tracking-tight text-zinc-900">
                {property.title}
              </span>
              <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Hosted directly by {property.hostInfo.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${property.hostInfo.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 px-3 py-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 shadow-xs transition-all"
            >
              <Phone className="h-3.5 w-3.5 text-zinc-500" />
              <span>{property.hostInfo.phone}</span>
            </a>

            <button
              onClick={scrollToReservation}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-zinc-800 active:scale-95 transition-all"
            >
              <span>Book with {property.hostInfo.name.split(' ')[0]}</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero: Visual & Personal Invitation */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12 mx-auto max-w-7xl">
        <div className="relative h-[65vh] min-h-[460px] w-full overflow-hidden rounded-3xl shadow-xl">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            priority
            className="object-cover brightness-95"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Floating Personal Host Badge Over Hero */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-zinc-900 backdrop-blur-md shadow-lg">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Direct Guest Portal • 0% Third-Party Markup</span>
          </div>

          {/* Hero Bottom Narrative Overlay */}
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

            <button
              onClick={scrollToReservation}
              className="shrink-0 flex items-center gap-3 rounded-2xl bg-white text-zinc-900 px-6 py-4 text-sm font-bold shadow-2xl hover:bg-zinc-100 active:scale-95 transition-all"
            >
              <div>
                <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Direct Price</span>
                <span className="text-xl font-extrabold text-zinc-900">${property.pricePerNight} <span className="text-xs font-normal text-zinc-500">/ night</span></span>
              </div>
              <div className="h-8 w-px bg-zinc-200" />
              <div className="flex items-center gap-1 text-emerald-700 font-bold">
                <span>Reserve Dates</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Personal Host Welcome Letter & Value Proposition */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Host Story Box */}
          <div className="lg:col-span-8 rounded-3xl bg-white p-8 sm:p-10 border border-zinc-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <Quote className="absolute top-6 right-6 h-20 w-20 text-zinc-100 -z-0 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-emerald-50 shadow-md">
                  <Image
                    src={property.hostInfo.avatar}
                    alt={property.hostInfo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    A personal welcome from {property.hostInfo.name}
                  </h3>
                  <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Host & Property Owner • Typically responds within 10 minutes</span>
                  </p>
                </div>
              </div>

              <p className="text-base text-zinc-700 leading-relaxed italic">
                &ldquo;We built {property.title} as a genuine private sanctuary, not a sterile rental unit. When you reserve through this website, you are communicating directly with me. There are no opaque booking platform algorithms, no surprise markups, and no call centers—just honest hospitality and a memorable stay tailored to your wishes.&rdquo;
              </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Verified Direct Host • In-Person Keyless Concierge</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${property.hostInfo.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 px-3.5 py-2 rounded-xl transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Message {property.hostInfo.name.split(' ')[0]}</span>
                </a>
              </div>
            </div>
          </div>

          {/* The "Direct Booking Privilege" Card (Savings & Transparency) */}
          <div className="lg:col-span-4 rounded-3xl bg-zinc-900 text-white p-8 border border-zinc-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 mb-4">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Direct Booking Privileges</span>
              </div>
              <h4 className="text-xl font-bold tracking-tight">Why booking directly matters</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Online travel agencies take up to 18% in fees from both parties. By reserving here, 100% of your investment goes into your experience.
              </p>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <div>
                    <strong className="text-zinc-100 block">Best Rate Guarantee</strong>
                    <span className="text-zinc-400">At least $60–$120 cheaper per night than OTA listings.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <div>
                    <strong className="text-zinc-100 block">Complimentary Host Basket</strong>
                    <span className="text-zinc-400">Artisanal local breakfast treats & chilled wine upon arrival.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</div>
                  <div>
                    <strong className="text-zinc-100 block">Flexible Early Check-In</strong>
                    <span className="text-zinc-400">Direct guests receive priority arrival flexibility whenever available.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
                Direct Host Guarantee • Zero Hidden Fees
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Atmosphere: Asymmetric Editorial Gallery with Host Notes */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Atmosphere & Design</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Curated corners of the sanctuary
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-sm">
            Every room was conceived with acoustic serenity, panoramic mountain vistas, and organic materials.
          </p>
        </div>

        {/* 3 Asymmetric Visual Vignettes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {property.images.slice(1, 4).map((img, idx) => {
            const captions = [
              'Morning light across the timber living pavilion',
              'The panoramic cedar sauna overlooking the fjord',
              'Cozy fireside lounge designed for reading and evening unwind',
            ];
            return (
              <div key={idx} className="group relative overflow-hidden rounded-3xl bg-zinc-100 shadow-sm">
                <div className="relative h-96 w-full">
                  <Image
                    src={img}
                    alt={`${property.title} detail ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">Space 0{idx + 1}</span>
                  <p className="text-xs font-medium text-zinc-100 mt-0.5">{captions[idx]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Host Recommendations Guidebook */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="rounded-3xl bg-emerald-950 text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800/60 px-3 py-1 text-xs font-semibold text-emerald-200 mb-4">
              <Compass className="h-3.5 w-3.5 text-emerald-300" />
              <span>{property.hostInfo.name}&apos;s Neighborhood Secrets</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Personal recommendations from someone who lives here
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-emerald-200 leading-relaxed">
              When our guests arrive, we hand them our private handbook. Here are three spots we love that you won&apos;t find on crowded tourist blogs:
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-2xl bg-emerald-900/60 p-4 border border-emerald-800/60">
                <Coffee className="h-4 w-4 text-amber-300 mb-2" />
                <h5 className="font-bold text-white text-sm">Fjord Bakery & Roast</h5>
                <p className="text-emerald-200 mt-1 text-[11px]">7 min scenic walk. Try their warm sourdough cardamon rolls straight from the wood-fired oven.</p>
              </div>

              <div className="rounded-2xl bg-emerald-900/60 p-4 border border-emerald-800/60">
                <Compass className="h-4 w-4 text-emerald-300 mb-2" />
                <h5 className="font-bold text-white text-sm">Eagle Ridge Hidden Trail</h5>
                <p className="text-emerald-200 mt-1 text-[11px]">Unmarked ridge trail starting behind the cabin. 360-degree sunset view over the Arctic sea.</p>
              </div>

              <div className="rounded-2xl bg-emerald-900/60 p-4 border border-emerald-800/60">
                <Wine className="h-4 w-4 text-rose-300 mb-2" />
                <h5 className="font-bold text-white text-sm">Hav Fishery Cellar</h5>
                <p className="text-emerald-200 mt-1 text-[11px]">Locally smoked Arctic char and natural wines curated by our friend and sommelier, Lars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <AmenitiesList amenities={property.amenities} />
      </section>

      {/* The Direct Reservation Suite (Full-Width, Welcoming, Transparent) */}
      <section ref={reservationRef} className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-xl ring-1 ring-black/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-zinc-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <CalendarCheck className="h-4 w-4" />
                <span>Direct Host Booking Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                Select Your Dates with {property.hostInfo.name}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Occupied dates are blocked. Guaranteed real-time availability with instant host notification.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-zinc-50 p-3 rounded-2xl border border-zinc-100 text-xs">
              <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                <Image
                  src={property.hostInfo.avatar}
                  alt={property.hostInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-zinc-900">Need assistance or customized dates?</p>
                <a href={`tel:${property.hostInfo.phone}`} className="text-emerald-700 font-semibold hover:underline">
                  Call {property.hostInfo.name.split(' ')[0]} directly: {property.hostInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Calendar */}
            <div className="lg:col-span-7">
              <BookingCalendar
                occupiedDates={property.occupiedDates}
                selectedRange={selectedRange}
                onSelectRange={setSelectedRange}
                accentColor={property.theme.accentColor}
              />
            </div>

            {/* Direct Booking Breakdown & Price Transparency */}
            <div className="lg:col-span-5 bg-zinc-50/80 rounded-3xl p-6 sm:p-8 border border-zinc-200">
              <h3 className="text-lg font-bold text-zinc-900">
                Your Direct Reservation Summary
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Transparent direct calculation with zero intermediary commissions.
              </p>

              {nights > 0 ? (
                <div className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="rounded-2xl bg-white p-3.5 border border-zinc-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Selected Stay</span>
                    <p className="font-bold text-zinc-900 text-sm">
                      {selectedRange?.from && format(selectedRange.from, 'MMM d, yyyy')} —{' '}
                      {selectedRange?.to && format(selectedRange.to, 'MMM d, yyyy')}
                    </p>
                    <p className="text-emerald-700 font-semibold text-xs">{nights} {nights === 1 ? 'night' : 'nights'} direct stay</p>
                  </div>

                  <div className="space-y-2.5 pt-2 text-zinc-600">
                    <div className="flex justify-between">
                      <span>Direct Rate (${property.pricePerNight} × {nights} nights)</span>
                      <span className="font-semibold text-zinc-900">${accommodationTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning & Linen Service</span>
                      <span className="font-semibold text-zinc-900">${cleaningFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-700">
                      <span className="flex items-center gap-1">
                        <span>Portal Fee Savings</span>
                        <span className="line-through text-zinc-400 text-xs">~${otaEstimatedFee}</span>
                      </span>
                      <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs">
                        $0 Fee (Direct)
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 flex justify-between items-baseline">
                    <div>
                      <span className="block text-sm font-bold text-zinc-900">Total Direct Due</span>
                      <span className="text-xs text-emerald-700 font-medium">Includes all taxes & fees</span>
                    </div>
                    <span className="text-3xl font-extrabold text-zinc-900">
                      ${grandTotal} <span className="text-xs font-normal text-zinc-500">{property.currency}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 w-full rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white py-4 text-sm font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Reserve Directly with {property.hostInfo.name.split(' ')[0]}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                  </button>

                  <p className="text-center text-[11px] text-zinc-400 pt-2">
                    🔒 Instant confirmation • Encrypted direct settlement • Host directly notified
                  </p>
                </div>
              ) : (
                <div className="mt-8 py-12 text-center rounded-2xl border border-dashed border-zinc-200 bg-white p-6">
                  <CalendarCheck className="mx-auto h-8 w-8 text-zinc-400 mb-2" />
                  <p className="text-sm font-bold text-zinc-700">Choose dates on the calendar</p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                    Select your check-in and check-out dates to calculate direct rates and proceed to reservation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Host Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={property.hostInfo.avatar}
                alt={property.hostInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-zinc-900">{property.title}</p>
              <p className="text-[11px] text-zinc-400">Direct Booking Concierge • Hosted with pride by {property.hostInfo.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href={`tel:${property.hostInfo.phone}`} className="hover:text-zinc-900 transition-colors">
              Tel: {property.hostInfo.phone}
            </a>
            <button onClick={scrollToReservation} className="font-bold text-emerald-700 hover:underline">
              Check Availability
            </button>
          </div>
        </div>
      </footer>

      {/* Comparison Switcher Floating Bar (Dev comparison) */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-semibold shadow-2xl backdrop-blur-md">
          <span className="text-zinc-400 text-[11px] font-mono">LAYOUT VIEW:</span>
          <span className="rounded-full bg-emerald-600 text-white px-2.5 py-1 text-[11px]">
            Direct Host Concierge
          </span>
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-950 px-2 py-1 hover:bg-zinc-100 rounded-full transition-colors text-[11px]"
          >
            Switch to Marketplace View →
          </Link>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={property.title}
        pricePerNight={property.pricePerNight}
        currency={property.currency}
        selectedRange={selectedRange}
        theme={property.theme}
      />
    </div>
  );
}
