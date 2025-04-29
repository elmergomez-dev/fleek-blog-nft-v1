// src/lib/auth.ts (Uncomment and Export verifyToken)

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

// --- Define your JWT Secret Key ---
// IMPORTANT: Ensure JWT_SECRET_KEY is set in .env.local and Fleek!
const secretKey = process.env.JWT_SECRET_KEY;
const encodedSecret = secretKey ? new TextEncoder().encode(secretKey) : null; // Encode the key only once

// Function to sign a token
export async function signToken(payload: JWTPayload): Promise<string> {
  if (!encodedSecret) {
    throw new Error('JWT Secret Key is not defined or invalid in environment variables (JWT_SECRET_KEY).');
  }
  // console.log("Signing JWT with payload:", payload); // Optional log
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('8h') // Example expiration
      .sign(encodedSecret);
    return token;
  } catch (error) {
      console.error("Error signing token:", error);
      throw new Error("Failed to sign token.");
  }
}

// --- VERIFY TOKEN FUNCTION (Uncommented and Exported) ---
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  // Check if token exists
  if (!token) {
      return null;
  }
  // Check if secret key is available
  if (!encodedSecret) {
    console.error('JWT Secret Key not defined for verification.');
    return null; // Cannot verify without secret
  }

  try {
    // Verify the token using the secret and expected algorithm
    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ['HS256'], // Must match the signing algorithm
    });
    return payload; // Return the decoded payload if valid
  } catch (error: any) {
    // Log common JWT errors (like expiration) without crashing, return null
    // console.error("JWT Verification Error:", error.code || error.message); // Example logging
    // Common error codes: 'ERR_JWT_EXPIRED', 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED', 'ERR_JWS_INVALID'
    return null; // Return null if token is invalid, expired, etc.
  }
}
// --- END verifyToken ---