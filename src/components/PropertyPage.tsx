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
  allProperties: Property[];
}

export function PropertyPage({
  property,
  allProperties,
}: PropertyPageProps) {
  // Infer initial locale: if property has defaultLocale or currency is PLN -> 'pl', otherwise 'en'
  const initialLocale: Locale =
    property.defaultLocale || (property.currency === 'PLN' ? 'pl' : 'en');
  const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

  const hostFirstName = activeProperty.hostInfo.name.split(' ')[0];
  const isBoutique = activeProperty.theme.layout === 'boutique';

  return (
    <ThemeProvider theme={activeProperty.theme}>
      <MobileDeviceFrame
        isActive={isMobileView}
        onExit={() => setIsMobileView(false)}
      >
        <div className={`transition-all duration-300 w-full ${isMobileView ? '' : 'flex flex-col pb-20 md:pb-0'}`}>
          {/* Top Direct Booking Header */}
          <Header
            title={activeProperty.title}
            theme={activeProperty.theme}
            t={t}
            locale={currentLocale}
            onToggleLocale={toggleLocale}
            hasTranslations={hasTranslations}
            hostPhone={activeProperty.hostInfo.phone}
            hostWhatsapp={activeProperty.hostInfo.whatsappNumber}
            hostName={activeProperty.hostInfo.name}
            hostAvatar={activeProperty.hostInfo.avatar}
            pricePerNight={activeProperty.pricePerNight}
            currency={activeProperty.currency}
            onCheckAvailability={scrollToCalendar}
            onOpenGallery={() => setIsGalleryOpen(true)}
            isMobileView={isMobileView}
          />

          {isBoutique ? (
            /* =========================================================================
             * BOUTIQUE EDITORIAL LAYOUT PRESET (Inspired by zacnylasek.com & bespoke retreats)
             * ========================================================================= */
            <main className="w-full flex-1 flex flex-col">
              {/* Rounded Hero Card with container margins */}
              <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
                <PropertyHero
                  property={activeProperty}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                  onScrollToCalendar={scrollToCalendar}
                  onScrollToGallery={() => setIsGalleryOpen(true)}
                  onScrollToMap={scrollToMap}
                  onOpenGallery={() => setIsGalleryOpen(true)}
                />
              </div>

              {/* Section-based vertical rhythm with generous editorial breathing room */}
              <div
                className={`w-full max-w-6xl mx-auto ${
                  isMobileView
                    ? 'px-3 py-6 space-y-8 pb-20'
                    : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16 pb-24 md:pb-16'
                }`}
              >
                {/* 1. Host Story & Authentic Philosophy */}
                <BoutiqueHostStory
                  property={activeProperty}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                  onCheckDates={scrollToCalendar}
                />

                {/* 2. Splitted Interior & Comfort Showcase (matches Zacny Lasek Screenshot 4) */}
                <BoutiqueAmenities
                  amenities={activeProperty.amenities}
                  image={activeProperty.images[2] || activeProperty.images[1]}
                  themeColor={activeProperty.theme.primaryColor || '#944933'}
                  t={t}
                  locale={currentLocale}
                  isMobileView={isMobileView}
                />

                {/* 3. Setting & Surroundings Map with Sample Distances (matches Zacny Lasek Screenshot 4) */}
                {activeProperty.coordinates && (
                  <div ref={mapRef}>
                    <BoutiqueLocation
                      lat={activeProperty.coordinates.lat}
                      lng={activeProperty.coordinates.lng}
                      locationName={activeProperty.location}
                      title={activeProperty.title}
                      locale={currentLocale}
                      t={t}
                      isMobileView={isMobileView}
                    />
                  </div>
                )}

                {/* 4. Frequently Asked Questions */}
                {activeProperty.faq && activeProperty.faq.length > 0 && (
                  <PropertyFAQ
                    faq={activeProperty.faq}
                    hostFirstName={hostFirstName}
                    isMobileView={isMobileView}
                    t={t}
                  />
                )}

                {/* 5. Dedicated Luxury Reservation Area */}
                <div id="reserve" ref={calendarRef} className="scroll-mt-24 w-full">
                  <div className="bg-stone-900 border border-stone-800 text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-12 shadow-2xl">
                    <div className="max-w-2xl mb-5 sm:mb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-400">
                          {t.directPrivilege}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
                        {t.reserveBoutiqueTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
                        {t.reserveBoutiqueSubtitle}
                      </p>
                    </div>

                    <BookingSuite
                      property={activeProperty}
                      selectedRange={selectedRange}
                      onSelectRange={setSelectedRange}
                      isMobileView={isMobileView}
                      onOpenModal={() => setIsModalOpen(true)}
                      t={t}
                      locale={currentLocale}
                    />
                  </div>
                </div>
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
                property={activeProperty}
                t={t}
                locale={currentLocale}
                isMobileView={isMobileView}
                onScrollToCalendar={scrollToCalendar}
                onScrollToGallery={() => setIsGalleryOpen(true)}
                onScrollToMap={scrollToMap}
                onOpenGallery={() => setIsGalleryOpen(true)}
              />

              {/* Content Stack */}
              <div className="mt-8 sm:mt-12 space-y-8 sm:space-y-12 max-w-5xl mx-auto">
                {/* Host Welcome & Direct Booking Benefits */}
                <div
                  className={`grid grid-cols-1 ${
                    isMobileView ? '' : 'md:grid-cols-2'
                  } gap-6 sm:gap-8 items-stretch`}
                >
                  <HostWelcomeCard property={activeProperty} t={t} />
                  <DirectBookingBenefitsCard
                    hostFirstName={hostFirstName}
                    onCheckDates={scrollToCalendar}
                    t={t}
                  />
                </div>

                {/* Spaces & Atmosphere Gallery */}
                <div ref={spacesRef} className="scroll-mt-24">
                  <PropertyGallery
                    images={activeProperty.images}
                    title={activeProperty.title}
                    isMobileView={isMobileView}
                    onCheckDates={scrollToCalendar}
                    t={t}
                  />
                </div>

                {/* Standardized Amenities Grid */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border border-zinc-200/80 shadow-xs">
                  <AmenitiesList amenities={activeProperty.amenities} locale={currentLocale} />
                </div>

                {/* Location & Map Section */}
                {activeProperty.coordinates && (
                  <div ref={mapRef}>
                    <PropertyMap
                      lat={activeProperty.coordinates.lat}
                      lng={activeProperty.coordinates.lng}
                      locationName={activeProperty.location}
                      title={activeProperty.title}
                      t={t}
                    />
                  </div>
                )}

                {/* Frequently Asked Questions */}
                {activeProperty.faq && activeProperty.faq.length > 0 && (
                  <PropertyFAQ
                    faq={activeProperty.faq}
                    hostFirstName={hostFirstName}
                    isMobileView={isMobileView}
                    t={t}
                  />
                )}

                {/* Dedicated Reservation Suite */}
                <div ref={calendarRef} className="scroll-mt-24 pt-4">
                  <BookingSuite
                    property={activeProperty}
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
            title={activeProperty.title}
            hostInfo={activeProperty.hostInfo}
            isMobileView={isMobileView}
            locale={currentLocale}
            t={t}
          />

          {/* Mobile Bottom CTA */}
          <MobileBottomCTA
            pricePerNight={activeProperty.pricePerNight}
            currency={activeProperty.currency}
            accentColor={activeProperty.theme.accentColor}
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
          propertyTitle={activeProperty.title}
          pricePerNight={activeProperty.pricePerNight}
          currency={activeProperty.currency}
          selectedRange={selectedRange}
          theme={activeProperty.theme}
          hostInfo={activeProperty.hostInfo}
          depositPercent={activeProperty.depositPercent}
          cancellationPolicy={activeProperty.cancellationPolicy}
          t={t}
          locale={currentLocale}
        />

        {/* Fullscreen Photo Gallery Lightbox Modal */}
        <PropertyGalleryModal
          isOpen={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          images={activeProperty.images}
          title={activeProperty.title}
          t={t}
        />

        {/* Demo Property Switcher Floating Pill */}
        <DemoPropertySwitcher
          properties={allProperties}
          currentSlug={property.slug}
          isMobileSimulated={isMobileView}
          onToggleMobileSimulated={() => setIsMobileView(!isMobileView)}
        />
      </MobileDeviceFrame>
    </ThemeProvider>
  );
}
