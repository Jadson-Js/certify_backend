export interface IAuthTokenService {
  createAuthSession(
    userId: string,
    authSessionId: string,
    refreshToken: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
