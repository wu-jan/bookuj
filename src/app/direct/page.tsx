import { getPropertyBySlug, getAllProperties } from '@/lib/properties';
import { DirectHostShowcase } from '@/components/DirectHostShowcase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direct Host Concierge - Astrid Lindholm',
  description: 'Book directly with host Astrid Lindholm at Nordic Glass Sanctuary. Zero OTA platform fees.',
};

export default function DirectHostPreviewPage() {
  const property = getPropertyBySlug('nordic-glass-sanctuary');

  if (!property) {
    notFound();
  }

  return <DirectHostShowcase property={property} />;
}
