// src/app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name:   'auth_token',
    value:  '',
    path:   '/',
    maxAge: 0,
  })
  return res
}
