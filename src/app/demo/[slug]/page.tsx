import { redirect } from 'next/navigation';
import { getAllSlugs } from '@/lib/propertyData';

interface DemoSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function DemoSlugPage({ params }: DemoSlugPageProps) {
  const { slug } = await params;
  redirect(`/${slug}`);
}

