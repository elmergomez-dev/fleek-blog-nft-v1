// src/lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'

const SECRET = process.env.AUTH_SECRET!
if (!SECRET) throw new Error('Missing AUTH_SECRET env var')

/**
 * Signs a JWT with the given payload.
 * Expires in 8 hours.
 */
export async function signToken(payload: object): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(new TextEncoder().encode(SECRET))
}

/**
 * Verifies a JWT string. Returns true if valid, false otherwise.
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, new TextEncoder().encode(SECRET))
    return true
  } catch {
    return false
  }
}
