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
import { Footer } from '@/components/Footer';
import { DemoPropertySwitcher } from '@/components/DemoPropertySwitcher';

interface PropertyPageProps {
  property: Property;
  allProperties: Property[];
}

export function PropertyPage({
  property,
  allProperties,
}: PropertyPageProps) {
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

  const hostFirstName = property.hostInfo.name.split(' ')[0];

  return (
    <ThemeProvider theme={property.theme}>
      <MobileDeviceFrame
        isActive={isMobileView}
        onExit={() => setIsMobileView(false)}
      >
        <div className={`transition-all duration-300 w-full ${isMobileView ? '' : 'flex flex-col pb-20 md:pb-0'}`}>
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
          <main
            className={`mx-auto w-full max-w-7xl flex-1 ${
              isMobileView ? 'px-3 pt-3 pb-20' : 'px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-16'
            }`}
          >
            {/* Cinematic Hero */}
            <PropertyHero
              property={property}
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
                <HostWelcomeCard property={property} />
                <DirectBookingBenefitsCard
                  hostFirstName={hostFirstName}
                  onCheckDates={scrollToCalendar}
                />
              </div>

              {/* Spaces & Atmosphere Gallery */}
              <div ref={spacesRef} className="scroll-mt-24">
                <PropertyGallery
                  images={property.images}
                  title={property.title}
                  isMobileView={isMobileView}
                  onCheckDates={scrollToCalendar}
                />
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

              {/* Dedicated Reservation Suite */}
              <div ref={calendarRef} className="scroll-mt-24 pt-4">
                <BookingSuite
                  property={property}
                  selectedRange={selectedRange}
                  onSelectRange={setSelectedRange}
                  isMobileView={isMobileView}
                  onOpenModal={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </main>

          {/* Footer */}
          <Footer
            title={property.title}
            hostInfo={property.hostInfo}
            isMobileView={isMobileView}
          />

          {/* Mobile Bottom CTA */}
          <MobileBottomCTA
            pricePerNight={property.pricePerNight}
            currency={property.currency}
            accentColor={property.theme.accentColor}
            hasDateRange={Boolean(selectedRange?.from && selectedRange?.to)}
            onAction={scrollToCalendar}
            isMobileView={isMobileView}
          />
        </div>

        {/* Checkout Payment Modal */}
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
