import { getAllProperties } from '@/lib/properties';
import { PropertyShowcaseTemplate } from '@/components/PropertyShowcaseTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direct Booking Concierge - Showcase',
  description: 'Experience bespoke direct booking websites crafted for luxury properties.',
};

export default function HomePage() {
  const allProperties = getAllProperties();
  const defaultProperty = allProperties[0];

  return (
    <PropertyShowcaseTemplate
      property={defaultProperty}
      allProperties={allProperties}
    />
  );
}
