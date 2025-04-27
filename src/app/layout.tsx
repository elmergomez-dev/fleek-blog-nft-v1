import React from 'react'
import { ThemeProvider } from '@/app/providers' // Adjust path if you placed it elsewhere
import Header from '@/components/Header'
import './globals.css'
// Import your font if needed (e.g., Inter)
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Add suppressHydrationWarning to <html> recommended by next-themes
    <html lang="en" suppressHydrationWarning>
      {/* If using next/font, apply font class here: className={inter.className} */}
      <body>
        <ThemeProvider
          attribute="class" // Tells next-themes to add 'light' or 'dark' class to the html tag
          defaultTheme="system" // Defaults to user's OS preference
          enableSystem // Allows detecting system preference
          disableTransitionOnChange // Optional: Prevents brief flicker on theme change
        >
          <Header />
          {/* Wrap main content if needed */}
          <main>{children}</main>
          {/* Footer etc. */}
        </ThemeProvider>
      </body>
    </html>
  )
}
