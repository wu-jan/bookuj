import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPropertyBySlug, getAllProperties, getAllSlugs } from '@/lib/properties';
import { PropertyShowcaseTemplate } from '@/components/PropertyShowcaseTemplate';

interface DemoSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DemoSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

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

export default async function DemoSlugPage({ params }: DemoSlugPageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const allProperties = getAllProperties();

  return (
    <PropertyShowcaseTemplate
      property={property}
      allProperties={allProperties}
    />
  );
}
