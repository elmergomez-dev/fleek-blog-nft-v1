// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken }      from './src/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('auth_token')?.value
    if (!token || !(await verifyToken(token))) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
