import { inject, injectable } from 'inversify';
import { TYPES_AUTH_SESSION, TYPES_SERVICE } from '../container/types.js';
import type { IAuthSessionRepository } from '../../domain/repositories/IAuthSessionRepository.js';
import type { IJwtService } from '../../domain/services/IJwtService.js';
import type { IEncryptService } from '../../domain/services/IEncryptService.js';
import { randomUUID } from 'crypto';
import { extractExpiresAtInToken } from '../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionEntity } from '../../domain/entities/authSession.entity.js';
import type { IAuthTokenService } from '../../domain/services/ITokenService.js';

@injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_SERVICE.IJwtService)
    private readonly jwtService: IJwtService,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,
  ) {}

  async createAuthSession(
    userId: string,
    authSessionId: string,
    refreshToken: string,
  ): Promise<IAuthSessionEntity> {
    const refreshTokenHashed = await this.encryptService.hash(refreshToken);
    const expiresAtToken = await extractExpiresAtInToken(refreshToken);

    const authSessionTmp = {
      id: authSessionId,
      user_id: userId,
      refresh_token_hash: refreshTokenHashed,
      expires_at: expiresAtToken,
    };

    return await this.authSessionRepository.create(authSessionTmp);
  }
}
