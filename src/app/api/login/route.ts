// src/app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { signToken }           from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  // 🔒 Replace with your real auth logic
  if (username === process.env.AUTH_USER && password === process.env.AUTH_PASS) {
    const token = await signToken({ username })
    const res   = NextResponse.json({ ok: true })
    res.cookies.set({
      name:     'auth_token',
      value:    token,
      httpOnly: true,
      path:     '/',
      maxAge:   8 * 3600,       // 8 hours
      secure:   process.env.NODE_ENV === 'production',
    })
    return res
  }

  return NextResponse.json(
    { ok: false, message: 'Invalid credentials' },
    { status: 401 }
  )
}
