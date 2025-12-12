export interface IJwtService {
  generateAccessToken(payload: { userId: string }): string;
  generateRefreshToken(payload: { authSessionId: string }): string;
  verifyAccess(accessToken: string): Record<string, unknown>;
  verifyRefresh(refreshToken: string): Record<string, unknown>;
}
