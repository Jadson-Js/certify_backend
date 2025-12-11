import { inject, injectable } from 'inversify';
import { randomUUID } from 'crypto';
import type { ILoginUseCase } from './ILoginUseCase.js';
import {
  TYPES_AUTH,
  TYPES_AUTH_SESSION,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from '../../../../infra/api/dtos/auth/ILogin.js';
import {
  NotFoundError,
  UnauthorizedError,
} from '../../../../shared/error/AppError.js';
import type { IJwtService } from '../../../../domain/services/IJwtService.js';
import { toDTO } from './mapper.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { ICreateAuthSessionUseCase } from '../../authSession/create/ICreateUseCase.js';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import { generateTokens } from '../../../../shared/utils/generateTokens.js';
import { extractExpiresAtInToken } from '../../../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_AUTH_SESSION.ICreateAuthSessionUseCase)
    private readonly createAuthSessionUseCase: ICreateAuthSessionUseCase,

    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_AUTH.IJwtService)
    private readonly jwtService: IJwtService,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(params: ILoginInputDTO): Promise<ILoginOutputDTO> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new NotFoundError(`User not found by email: ${email}`);
    }

    const validPassword = await this.encryptService.compare(
      password,
      user.password_hash,
    );

    if (!validPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    /* 
    if (!user.verified_at) {
      throw new ConflictError("Email has not yet been verified.")
    }
    */

    const authSessionId = randomUUID();
    const { accessToken, refreshToken } = await generateTokens(
      user.id,
      authSessionId,
    );

    await this.createAuthSessionUseCase.execute({
      authSessionId,
      user,
      refreshToken,
    });

    const refreshTokenHashed = await this.encryptService.hash(refreshToken);
    const expiresAtToken = await extractExpiresAtInToken(refreshToken);

    const authSessionTmp: IAuthSessionEntity = {
      id: authSessionId,
      user_id: user.id,
      refresh_token_hash: refreshTokenHashed,
      expires_at: expiresAtToken,
      revoked_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await this.authSessionRepository.create(authSessionTmp);

    return toDTO(user, accessToken, refreshToken);
  }
}
