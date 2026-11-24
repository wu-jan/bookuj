/**
 * @component PropertyPage
 * @description Main client orchestrator for dedicated direct booking property pages.
 *
 * Core Responsibilities:
 * - Locale state management (initial locale inferred from `property.defaultLocale` or currency).
 * - Layout preset branch:
 *   - `boutique`: Editorial, spacious retreat layout (BoutiqueHostStory, BoutiqueAmenities, BoutiqueLocation, dark reservation suite).
 *   - standard (`minimal`): Card grid layout (HostWelcomeCard, DirectBookingBenefitsCard, PropertyGallery, AmenitiesList).
 * - Date selection state and modal controller (PaymentModal, PropertyGalleryModal).
 * - Interactive mobile device frame simulator (`isMobileView`).
 */

'use client';

import React, { useState, useRef } from 'react';
import { DateRange } from 'react-day-picker';
import { Property } from '@/types/property';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { AmenitiesList } from '@/components/AmenitiesList';
import { PropertyHero } from '@/components/PropertyHero';
import { HostWelcomeCard } from '@/components/HostWelcomeCard';
import { DirectBookingBenefitsCard } from '@/components/DirectBookingBenefitsCard';
import { BoutiqueHostStory } from '@/components/BoutiqueHostStory';
import { BoutiqueAmenities } from '@/components/BoutiqueAmenities';
import { BoutiqueLocation } from '@/components/BoutiqueLocation';
import { PropertyGallery } from '@/components/PropertyGallery';
import { BookingSuite } from '@/components/BookingSuite';
import { MobileBottomCTA } from '@/components/MobileBottomCTA';
import { ShieldCheck } from 'lucide-react';
import { MobileDeviceFrame } from '@/components/MobileDeviceFrame';
import { PaymentModal } from '@/components/PaymentModal';
import { PropertyMap } from '@/components/PropertyMap';
import { PropertyFAQ } from '@/components/PropertyFAQ';
import { PropertyGalleryModal } from '@/components/PropertyGalleryModal';
import { Footer } from '@/components/Footer';
import { DemoPropertySwitcher } from '@/components/DemoPropertySwitcher';
import { dictionaries, getLocalizedProperty, Locale } from '@/lib/translations';

interface PropertyPageProps {
  property: Property;
  allProperties?: Property[];
  isDemo?: boolean;
}

export function PropertyPage({
  property,
  allProperties,
  isDemo = false,
}: PropertyPageProps) {
  // Infer initial locale: if property has defaultLocale or currency is PLN -> 'pl', otherwise 'en'
  const initialLocale: Locale =
    property.defaultLocale || (property.currency === 'PLN' ? 'pl' : 'en');
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleOpenGallery = (index: number = 0) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  const scrollToCalendar = () => {
    const el = document.getElementById('reserve');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSpaces = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      spacesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMap = () => {
    const el = document.getElementById('location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resolve localized text for current property
  const activeProperty = getLocalizedProperty(property, currentLocale);
  const t = dictionaries[currentLocale];
  const hasTranslations = Boolean(
    property.translations && (property.translations.pl || property.translations.en)
  );

  const toggleLocale = () => {
    setCurrentLocale((prev) => (prev === 'pl' ? 'en' : 'pl'));
  };

  // Interactive layout toggle override (for demo / concierge preview)
  const [layoutOverride, setLayoutOverride] = useState<'boutique' | 'minimal' | undefined>(undefined);
  const effectiveLayout = layoutOverride ?? activeProperty.theme.layout ?? 'minimal';
  const effectiveProperty: Property = {
    ...activeProperty,
    theme: {
      ...activeProperty.theme,
      layout: effectiveLayout,
    },
  };

  const hostFirstName = effectiveProperty.hostInfo.name.split(' ')[0];
  const isBoutique = effectiveLayout === 'boutique';

  return (
    <ThemeProvider theme={effectiveProperty.theme}>
      <MobileDeviceFrame
        isActive={isMobileView}
        onExit={() => setIsMobileView(false)}
      >
        <div className={`transition-all duration-300 w-full ${isMobileView ? '' : 'flex flex-col pb-20 md:pb-0'}`}>
          {/* Top Direct Booking Header */}
          <Header
            title={effectiveProperty.title}
            theme={effectiveProperty.theme}
            t={t}
            locale={currentLocale}
            onToggleLocale={toggleLocale}
            hasTranslations={hasTranslations}
            hostPhone={effectiveProperty.hostInfo?.phone}
            hostWhatsapp={effectiveProperty.hostInfo?.whatsappNumber || effectiveProperty.hostInfo?.phone}
            hostName={effectiveProperty.hostInfo?.name}
            hostAvatar={effectiveProperty.hostInfo?.avatar}
            pricePerNight={effectiveProperty.pricePerNight}
            currency={effectiveProperty.currency}
            directContactEnabled={effectiveProperty.directContactEnabled !== false}
            onCheckAvailability={scrollToCalendar}
            onOpenGallery={() => handleOpenGallery(0)}
            isMobileView={isMobileView}
          />

          {isBoutique ? (
            /* =========================================================================
             * BOUTIQUE EDITORIAL LAYOUT PRESET (Inspired by zacnylasek.com & bespoke retreats)
             * ========================================================================= */
            <main className="w-full flex-1 flex flex-col">
              {/* Full width hero on desktop, rounded shape on mobile always */}
              <div className={isMobileView ? 'w-full px-3 pt-3' : 'w-full px-3 pt-3 md:px-0 md:pt-0'}>
                <PropertyHero
                  property={effectiveProperty}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                  onScrollToCalendar={scrollToCalendar}
                  onScrollToGallery={() => handleOpenGallery(0)}
                  onScrollToMap={scrollToMap}
                  onOpenGallery={() => handleOpenGallery(0)}
                />
              </div>

              {/* Section-based vertical rhythm with generous editorial breathing room */}
              <div
                className={`w-full max-w-6xl mx-auto ${
                  isMobileView
                    ? 'px-3 py-4 space-y-5 pb-6'
                    : 'px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8 pb-6 sm:pb-8'
                }`}
              >
                {/* 1. Host Story & Authentic Philosophy */}
                <BoutiqueHostStory
                  property={effectiveProperty}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                  onCheckDates={scrollToCalendar}
                />

                {/* 2. Splitted Interior & Comfort Showcase (matches Zacny Lasek Screenshot 4) */}
                <BoutiqueAmenities
                  amenities={effectiveProperty.amenities}
                  image={effectiveProperty.images[2] || effectiveProperty.images[1]}
                  themeColor={effectiveProperty.theme.primaryColor || '#944933'}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                  onOpenGallery={() => handleOpenGallery(effectiveProperty.images[2] ? 2 : 1)}
                />

                {/* 3. Setting & Surroundings Map with Sample Distances (matches Zacny Lasek Screenshot 4) */}
                {effectiveProperty.coordinates && (
                  <div ref={mapRef}>
                    <BoutiqueLocation
                      lat={effectiveProperty.coordinates.lat}
                      lng={effectiveProperty.coordinates.lng}
                      locationName={effectiveProperty.location}
                      title={effectiveProperty.title}
                      locale={currentLocale}
                      t={t}
                      isMobileView={isMobileView}
                    />
                  </div>
                )}

                {/* 4. Frequently Asked Questions */}
                {effectiveProperty.faq && effectiveProperty.faq.length > 0 && (
                  <PropertyFAQ
                    faq={effectiveProperty.faq}
                    hostFirstName={hostFirstName}
                    isMobileView={isMobileView}
                    t={t}
                  />
                )}

                {/* 5. Dedicated Luxury Reservation Area */}
                <section id="reserve" ref={calendarRef} className="scroll-mt-24 w-full">
                  <BookingSuite
                    property={effectiveProperty}
                    selectedRange={selectedRange}
                    onSelectRange={setSelectedRange}
                    isMobileView={isMobileView}
                    onOpenModal={() => setIsModalOpen(true)}
                    t={t}
                    locale={currentLocale}
                  />
                </section>
              </div>
            </main>
          ) : (
            /* =========================================================================
             * STANDARD / MINIMAL LAYOUT PRESET (Card grid container)
             * ========================================================================= */
            <main
              className={`mx-auto w-full max-w-7xl flex-1 ${
                isMobileView ? 'px-3 pt-3 pb-20' : 'px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-16'
              }`}
            >
              {/* Cinematic Hero Card */}
              <PropertyHero
                property={effectiveProperty}
                t={t}
                locale={currentLocale}
                isMobileView={isMobileView}
                onScrollToCalendar={scrollToCalendar}
                onScrollToGallery={() => handleOpenGallery(0)}
                onScrollToMap={scrollToMap}
                onOpenGallery={() => handleOpenGallery(0)}
              />

              {/* Content Stack */}
              <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12 max-w-5xl mx-auto">
                {/* Host Welcome & Direct Booking Benefits */}
                <div
                  className={`grid grid-cols-1 ${
                    isMobileView ? '' : 'md:grid-cols-2'
                  } gap-6 sm:gap-8 items-stretch`}
                >
                  <HostWelcomeCard property={effectiveProperty} t={t} />
                  <DirectBookingBenefitsCard
                    hostFirstName={hostFirstName}
                    onCheckDates={scrollToCalendar}
                    t={t}
                  />
                </div>

                {/* Spaces & Atmosphere Gallery */}
                <div ref={spacesRef} className="scroll-mt-24">
                  <PropertyGallery
                    images={effectiveProperty.images}
                    title={effectiveProperty.title}
                    isMobileView={isMobileView}
                    onCheckDates={scrollToCalendar}
                    t={t}
                  />
                </div>

                {/* Standardized Amenities Grid */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
                  <AmenitiesList amenities={effectiveProperty.amenities} locale={currentLocale} />
                </div>

                {/* Location & Map Section */}
                {effectiveProperty.coordinates && (
                  <div ref={mapRef}>
                    <PropertyMap
                      lat={effectiveProperty.coordinates.lat}
                      lng={effectiveProperty.coordinates.lng}
                      locationName={effectiveProperty.location}
                      title={effectiveProperty.title}
                      t={t}
                    />
                  </div>
                )}

                {/* Frequently Asked Questions */}
                {effectiveProperty.faq && effectiveProperty.faq.length > 0 && (
                  <PropertyFAQ
                    faq={effectiveProperty.faq}
                    hostFirstName={hostFirstName}
                    isMobileView={isMobileView}
                    t={t}
                  />
                )}

                {/* Dedicated Reservation Suite */}
                <div ref={calendarRef} className="scroll-mt-24 pt-4">
                  <BookingSuite
                    property={effectiveProperty}
                    selectedRange={selectedRange}
                    onSelectRange={setSelectedRange}
                    isMobileView={isMobileView}
                    onOpenModal={() => setIsModalOpen(true)}
                    t={t}
                    locale={currentLocale}
                  />
                </div>
              </div>
            </main>
          )}

          {/* Footer */}
          <Footer
            title={effectiveProperty.title}
            hostInfo={effectiveProperty.hostInfo}
            isMobileView={isMobileView}
            locale={currentLocale}
            t={t}
          />

          {/* Mobile Bottom CTA */}
          <MobileBottomCTA
            pricePerNight={effectiveProperty.pricePerNight}
            currency={effectiveProperty.currency}
            accentColor={effectiveProperty.theme.accentColor}
            hasDateRange={Boolean(selectedRange?.from && selectedRange?.to)}
            onAction={scrollToCalendar}
            isMobileView={isMobileView}
            actionLabel={Boolean(selectedRange?.from && selectedRange?.to) ? t.proceedToBook : t.travelDates}
            priceLabel={t.directRate}
            perNightSuffix={t.perNightSuffix}
          />
        </div>

        {/* Checkout Payment Modal */}
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertySlug={effectiveProperty.slug}
          propertyTitle={effectiveProperty.title}
          pricePerNight={effectiveProperty.pricePerNight}
          currency={effectiveProperty.currency}
          selectedRange={selectedRange}
          theme={effectiveProperty.theme}
          hostInfo={effectiveProperty.hostInfo}
          depositPercent={effectiveProperty.depositPercent}
          cancellationPolicy={effectiveProperty.cancellationPolicy}
          softHoldHours={effectiveProperty.softHoldHours}
          paymentMethods={effectiveProperty.paymentMethods}
          allowPayOnArrival={effectiveProperty.allowPayOnArrival}
          t={t}
          locale={currentLocale}
        />

        {/* Fullscreen Photo Gallery Lightbox Modal */}
        <PropertyGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={effectiveProperty.images}
          title={effectiveProperty.title}
          t={t}
          initialIndex={galleryInitialIndex}
        />

        {/* Demo Property Switcher Floating Pill - only rendered on demo routes where allProperties is supplied */}
        {allProperties && allProperties.length > 0 && (
          <DemoPropertySwitcher
            properties={allProperties}
            currentSlug={property.slug}
            isMobileSimulated={isMobileView}
            onToggleMobileSimulated={() => setIsMobileView(!isMobileView)}
            basePath={isDemo ? '/demo' : ''}
            currentLayout={effectiveLayout}
            onSelectLayout={setLayoutOverride}
          />
        )}
      </MobileDeviceFrame>
    </ThemeProvider>
  );
}
