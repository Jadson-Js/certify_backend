export interface IRefreshToken {
  token: string;
  expires_at: Date;
}

export interface IJwtService {
  generateAccessToken(payload: { user_id: string }): string;
  generateRefreshToken(payload: { auth_session_id: string }): IRefreshToken;
  verifyAccess(accessToken: string): Record<string, unknown>;
  verifyRefresh(refreshToken: string): Record<string, unknown>;
}
