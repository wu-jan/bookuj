import { getAllProperties, getPropertyBySlug } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const featuredSlug = process.env.NEXT_PUBLIC_FEATURED_SLUG;
  const all = await getAllProperties();
  const property = featuredSlug
    ? await getPropertyBySlug(featuredSlug)
    : all[0];

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

export default async function HomePage() {
  const allProperties = await getAllProperties();
  const featuredSlug = process.env.NEXT_PUBLIC_FEATURED_SLUG;
  const defaultProperty = featuredSlug
    ? ((await getPropertyBySlug(featuredSlug)) ?? allProperties[0])
    : allProperties[0];

  return (
    <PropertyPage
      property={defaultProperty}
      allProperties={allProperties}
    />
  );
}
