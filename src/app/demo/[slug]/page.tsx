import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getAllProperties, getAllSlugs } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';
import { fetchOccupiedDates } from '@/lib/icalSync';

interface DemoSlugPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found — Demo',
    };
  }

  return {
    title: `[Demo] ${property.title} — Direct Booking Showcase`,
    description: property.description,
  };
}

export default async function DemoSlugPage({ params }: DemoSlugPageProps) {
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
      console.warn(`[DemoSlugPage] Failed to sync iCal dates for ${slug}:`, err);
    }
  }

  const allProperties = await getAllProperties();

  return (
    <PropertyPage
      property={property}
      allProperties={allProperties}
      isDemo={true}
    />
  );
}
