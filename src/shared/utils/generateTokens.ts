import { JwtService } from '../../infra/services/JwtService.js';

export async function generateTokens(
  user_id: string,
  auth_session_id: string,
): Promise<{ accessToken: string; refreshToken: string }> {
  const jwtService = new JwtService();

  const accessToken = jwtService.generateAccessToken({
    user_id,
  });

  const refreshToken = jwtService.generateRefreshToken({
    auth_session_id,
  });

  return { accessToken, refreshToken: refreshToken };
}
