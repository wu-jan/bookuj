import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'PLN';

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbolMap: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    PLN: 'zł',
  };

  const symbol = symbolMap[currency] || '$';

  if (currency === 'PLN') {
    return `${amount.toLocaleString()} zł`;
  }

  return `${symbol}${amount.toLocaleString()}`;
}

