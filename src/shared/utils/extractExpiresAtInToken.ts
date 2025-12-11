import jwt from 'jsonwebtoken';

export async function extractExpiresAtInToken(token: string) {
  const decoded = jwt.decode(token) as { exp: number };

  const expires_at = new Date(decoded.exp * 1000);

  return expires_at;
}
