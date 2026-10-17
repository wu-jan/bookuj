import { getAllProperties, getPropertyBySlug } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const featuredSlug = process.env.NEXT_PUBLIC_FEATURED_SLUG;
  const property = featuredSlug
    ? getPropertyBySlug(featuredSlug)
    : getAllProperties()[0];

  if (property) {
    return {
      title: `${property.title} — Direct Booking`,
      description: property.description,
    };
  }
  return {
    title: 'Direct Booking Concierge — Showcase',
    description: 'Experience bespoke direct booking websites crafted for luxury properties.',
  };
}

export default function HomePage() {
  const allProperties = getAllProperties();
  const featuredSlug = process.env.NEXT_PUBLIC_FEATURED_SLUG;
  const defaultProperty = featuredSlug
    ? (getPropertyBySlug(featuredSlug) ?? allProperties[0])
    : allProperties[0];

  return (
    <PropertyPage
      property={defaultProperty}
      allProperties={allProperties}
    />
  );
}
