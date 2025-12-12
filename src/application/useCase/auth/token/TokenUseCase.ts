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
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import type { IFindUserByIdUseCase } from '../../users/findById/IFindByIdUseCase.js';
import { randomUUID } from 'crypto';
import { extractExpiresAtInToken } from '../../../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

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
  ) {}

  async execute(params: ITokenInputUseCase): Promise<ITokenOutputUseCase> {
    const decodedJwt = this.jwtService.verifyRefresh(params.refreshToken);
    if (!decodedJwt) throw new UnauthorizedError('Refresh token is not valid');

    const authSession = await this.authSessionRepository.findById(
      decodedJwt.authSessionId as string,
    );
    if (!authSession) throw new NotFoundError('Auth Session not found');
    if (new Date(authSession.expires_at) < new Date())
      throw new ConflictError('Auth Session expiried');
    if (authSession.revoked_at !== null)
      throw new UnauthorizedError('Auth Session is revoked');

    await this.authSessionRepository.deleteById(authSession.id);

    const user = await this.userRepository.findById(authSession.user_id);
    if (!user) throw new NotFoundError('User not found');
    // if (user.verified_at == null) throw new UnauthorizedError('The user is not verified');

    const accessToken = this.jwtService.generateAccessToken({
      userId: user?.id,
    });

    const authSessionId = randomUUID();
    const refreshToken = this.jwtService.generateRefreshToken({
      authSessionId,
    });

    const refreshTokenHashed = await this.encryptService.hash(refreshToken);
    const expiresAtToken = await extractExpiresAtInToken(refreshToken);

    const authSessionTmp = {
      id: authSessionId,
      user_id: user.id,
      refresh_token_hash: refreshTokenHashed,
      expires_at: expiresAtToken,
    };

    await this.authSessionRepository.create(authSessionTmp);

    return { accessToken, refreshToken };
  }
}
