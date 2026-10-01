import { getAllProperties } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direct Booking Concierge - Showcase',
  description: 'Experience bespoke direct booking websites crafted for luxury properties.',
};

export default function HomePage() {
  const allProperties = getAllProperties();
  const defaultProperty = allProperties[0];

  return (
    <PropertyPage
      property={defaultProperty}
      allProperties={allProperties}
    />
  );
}
