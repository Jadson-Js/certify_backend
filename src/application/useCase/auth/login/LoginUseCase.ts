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
import type {
  IJwtService,
  IRefreshToken,
} from '../../../../domain/services/IJwtService.js';
import { toDTO } from './mapper.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { ICreateAuthSessionUseCase } from '../../authSession/create/ICreateUseCase.js';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';

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
    const { accessToken, refreshToken } = await this.generateTokens(
      user,
      authSessionId,
    );

    await this.createAuthSessionUseCase.execute({
      authSessionId,
      user,
      refreshToken,
    });

    return toDTO(user, accessToken, refreshToken.token);
  }

  async generateTokens(
    user: IUserEntity,
    authSessionId: string,
  ): Promise<{ accessToken: string; refreshToken: IRefreshToken }> {
    const accessToken = this.jwtService.generateAccessToken({
      user_id: user.id,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      auth_session_id: authSessionId,
    });

    return { accessToken, refreshToken: refreshToken };
  }
}
