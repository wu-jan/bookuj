import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getAllSlugs } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';
import { fetchOccupiedDates } from '@/lib/icalSync';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  return {
    title: `${property.title} - Direct Booking Showcase`,
    description: property.description,
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  if (property.icalUrl) {
    try {
      const icalDates = await fetchOccupiedDates(property.icalUrl);
      if (icalDates.length > 0) {
        property.occupiedDates = Array.from(
          new Set([...(property.occupiedDates || []), ...icalDates])
        ).sort();
      }
    } catch (err) {
      console.warn(`[SlugPage] Failed to sync iCal dates for ${slug}:`, err);
    }
  }

  return (
    <PropertyPage
      property={property}
    />
  );
}
