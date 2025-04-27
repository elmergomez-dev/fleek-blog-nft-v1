'use client' // Mark as client component

import * as React from 'react'
// Import ThemeProvider and its props type directly from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes' // <-- CORRECTED import path

// REMOVE the incorrect deep import line that caused the error:
// import type { ThemeProviderProps } from 'next-themes/dist/types'

// The rest of the component stays the same
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}