import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH_SESSION,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type {
  ITokenInputUseCase,
  ITokenOutputUseCase,
  ITokenUseCase,
} from './ITokenUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IJwtService } from '../../../../domain/services/IJwtService.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../shared/error/AppError.js';
import { randomUUID } from 'crypto';
import { extractExpiresAtInToken } from '../../../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IAuthSessionService } from '../../../../domain/services/IAuthSessionService.js';

@injectable()
export class TokenUseCase implements ITokenUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_SERVICE.IJwtService)
    private readonly jwtService: IJwtService,

    @inject(TYPES_SERVICE.IAuthSessionService)
    private readonly authSessionService: IAuthSessionService,
  ) {}

  async execute(params: ITokenInputUseCase): Promise<ITokenOutputUseCase> {
    const authSession = await this.authSessionRepository.findById(
      params.authSessionId,
    );
    if (!authSession) throw new NotFoundError('Auth Session not found');
    if (new Date(authSession.expires_at) < new Date())
      throw new ConflictError('Auth Session expiried');
    await this.authSessionRepository.deleteById(authSession.id);

    const user = await this.userRepository.findById(authSession.user_id);
    if (!user) throw new NotFoundError('User not found');
    // if (user.verified_at == null) throw new UnauthorizedError('The user is not verified');
    // if (user.suspended_at) throw new ConflictError("User has been suspended.")

    const authSessionId = randomUUID();
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
    });
    const refreshToken = this.jwtService.generateRefreshToken({
      authSessionId,
    });

    await this.authSessionService.create(user.id, authSessionId, refreshToken);

    const response = this.mapper(accessToken, refreshToken);
    return response;
  }

  private async mapper(accessToken: string, refreshToken: string) {
    const accessTokenExpiresAt = await extractExpiresAtInToken(accessToken);
    const refreshTokenExpiresAt = await extractExpiresAtInToken(refreshToken);

    return {
      accessToken: {
        token: accessToken,
        expiresAt: accessTokenExpiresAt,
      },
      refreshToken: {
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt,
      },
    };
  }
}
