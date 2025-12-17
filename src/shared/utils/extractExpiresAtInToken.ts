import jwt from 'jsonwebtoken';

export async function extractExpiresAtInToken(token: string) {
  const decoded = jwt.decode(token) as { exp: number };

  const expiresAt = new Date(decoded.exp * 1000);

  return expiresAt;
}
