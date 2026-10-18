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
import { PropertyGallery } from '@/components/PropertyGallery';
import { BookingSuite } from '@/components/BookingSuite';
import { MobileBottomCTA } from '@/components/MobileBottomCTA';
import { MobileDeviceFrame } from '@/components/MobileDeviceFrame';
import { PaymentModal } from '@/components/PaymentModal';
import { PropertyMap } from '@/components/PropertyMap';
import { PropertyFAQ } from '@/components/PropertyFAQ';
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
            isMobileView={isMobileView}
          />

          {/* Main Content Showcase */}
          <main
            className={`mx-auto w-full max-w-7xl flex-1 ${
              isMobileView ? 'px-3 pt-3 pb-20' : 'px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-16'
            }`}
          >
            {/* Cinematic Hero */}
            <PropertyHero
              property={activeProperty}
              t={t}
              isMobileView={isMobileView}
              onScrollToCalendar={scrollToCalendar}
              onScrollToGallery={scrollToSpaces}
              onScrollToMap={scrollToMap}
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
                />
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer
            title={activeProperty.title}
            hostInfo={activeProperty.hostInfo}
            isMobileView={isMobileView}
            locale={currentLocale}
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
