import React from 'react';
import { PropertyTheme } from '@/types/property';

interface ThemeProviderProps {
  theme: PropertyTheme;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const fontClass = theme.fontStyle === 'serif' ? 'font-serif' : 'font-sans';

  const styleVariables = {
    '--color-primary': theme.primaryColor,
    '--color-accent': theme.accentColor,
    '--color-bg': theme.backgroundColor,
  } as React.CSSProperties;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${fontClass}`}
      style={{
        ...styleVariables,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {children}
    </div>
  );
}
