import propertiesData from '@/data/properties.json';
import { Property } from '@/types/property';

const properties: Property[] = propertiesData as Property[];

/**
 * Fetch all available properties.
 */
export function getAllProperties(): Property[] {
  return properties;
}

/**
 * Fetch a single property by its unique URL slug.
 */
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

/**
 * Fetch all property slugs for static route generation or navigation.
 */
export function getAllSlugs(): string[] {
  return properties.map((p) => p.slug);
}
