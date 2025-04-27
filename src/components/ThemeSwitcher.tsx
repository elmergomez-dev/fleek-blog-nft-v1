'use client' // Required: Mark as a Client Component

import * as React from 'react'
import { useTheme } from 'next-themes'

// Optional: Example using simple emojis. Replace with icons if preferred.
// import { SunIcon, MoonIcon } from '@radix-ui/react-icons' // Example

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so we can safely show the UI
  // This avoids hydration mismatch errors
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder on the server and initial client render
    // to avoid layout shift and hydration errors. Adjust size as needed.
    return <div style={{ width: '24px', height: '24px' }} />
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      // Add some basic styling with Tailwind
      className="p-2 rounded-full text-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      {theme === 'dark' ? (
        // <SunIcon className="h-5 w-5 text-yellow-500" /> // Example icon usage
        '☀️' // Sun emoji for Dark mode (to switch to Light)
      ) : (
        // <MoonIcon className="h-5 w-5 text-gray-900" /> // Example icon usage
        '🌙' // Moon emoji for Light mode (to switch to Dark)
      )}
    </button>
  )
}