import { inject, injectable } from 'inversify';
import { randomUUID } from 'crypto';
import type {
  ILoginInputUseCase,
  ILoginOutputUseCase,
  ILoginUseCase,
} from './ILoginUseCase.js';
import {
  TYPES_AUTH_SESSION,
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../shared/error/AppError.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import { extractExpiresAtInToken } from '../../../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IJwtService } from '../../../../domain/services/IJwtService.js';
import type { IAuthSessionService } from '../../../services/AuthSessionService.js';
import type { IUserEntity } from '../../../../domain/entities/User.entity.js';

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_SERVICE.IJwtService)
    private readonly jwtService: IJwtService,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_SERVICE.IAuthSessionService)
    private readonly authSessionService: IAuthSessionService,
  ) { }

  async execute(params: ILoginInputUseCase): Promise<ILoginOutputUseCase> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundError(`User not found by email: ${email}`);

    // Use domain methods for validation
    if (!user.isVerified()) {
      throw new ConflictError('Email has not yet been verified.');
    }
    if (user.isSuspended()) {
      throw new ConflictError('User has been suspended.');
    }

    const validPassword = await this.encryptService.compare(
      password,
      user.passwordHash,
    );
    if (!validPassword) throw new UnauthorizedError('Invalid credentials');

    const authSessionId = randomUUID();
    const accessToken = this.jwtService.generateAccessToken({
      userId: user.id,
    });
    const refreshToken = this.jwtService.generateRefreshToken({
      authSessionId: authSessionId,
    });

    await this.authSessionService.create(user.id, authSessionId, refreshToken);

    const response = this.mapper(accessToken, refreshToken, user);
    return response;
  }

  private async mapper(
    accessToken: string,
    refreshToken: string,
    user: IUserEntity,
  ) {
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
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }
}
