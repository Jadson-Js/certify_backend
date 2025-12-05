export interface IJwtService {
  generateAccessToken(payload: { user_id: string }): string;
  generateRefreshToken(payload: { auth_session_id: string }): {
    token: string;
    expires_at: Date;
  };
  verifyAccess(accessToken: string): Record<string, unknown>;
  verifyRefresh(refreshToken: string): Record<string, unknown>;
}
