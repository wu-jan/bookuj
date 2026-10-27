import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getAllProperties, getAllSlugs } from '@/lib/propertyData';
import { PropertyPage } from '@/components/PropertyPage';

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

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

  const allProperties = await getAllProperties();

  return (
    <PropertyPage
      property={property}
      allProperties={allProperties}
    />
  );
}
