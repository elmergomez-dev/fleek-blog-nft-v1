// src/app/admin/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { TinaAdmin } from 'tinacms' // adjust import to your actual admin component

export default function AdminPage() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <div>
      <button
        onClick={logout}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}
      >
        Log out
      </button>
      {/* Replace the next line with your actual Tina admin component */}
      <TinaAdmin />
    </div>
  )
}
