'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser]   = useState('')
  const [pass, setPass]   = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ username: user, password: pass }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const { message } = await res.json()
      setError(message || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '4rem auto', padding: 20 }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        placeholder="Username"
        value={user}
        onChange={e => setUser(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        required
      />
      <button type="submit">Log In</button>
    </form>
  )
}
