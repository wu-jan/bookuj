/**
 * @component ThemeProvider
 * @description Dynamic white-label CSS custom properties injector for property pages.
 *
 * Injects:
 * - `--color-primary`: Main property brand color (used for deep tones, dark elements).
 * - `--color-accent`: Main CTA highlight color (used for reservation buttons, active pills).
 * - `--color-bg`: Base page canvas background.
 * - `--font-heading`: Heading font family based on `theme.fontStyle` (Playfair Display for 'serif', Geist Sans for 'sans').
 *
 * Note: Body font defaults to `font-sans` for maximum readability across forms, buttons, and dates.
 */

import React from 'react';
import { PropertyTheme } from '@/types/property';

interface ThemeProviderProps {
  theme: PropertyTheme;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const styleVariables = {
    '--color-primary': theme.primaryColor,
    '--color-accent': theme.accentColor,
    '--color-bg': theme.backgroundColor,
    '--font-heading': theme.fontStyle === 'serif' ? 'var(--font-playfair)' : 'var(--font-geist-sans)',
  } as React.CSSProperties;

  return (
    <div
      className="min-h-screen transition-colors duration-300 font-sans"
      style={{
        ...styleVariables,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {children}
    </div>
  );
}
