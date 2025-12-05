import { inject, injectable } from 'inversify'
import { randomUUID } from 'crypto'
import type { ILoginUseCase } from './ILoginUseCase.js'
import {
  TYPES_AUTH,
  TYPES_AUTH_SESSION,
  TYPES_USER,
} from '../../../../infra/container/types.js'
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js'
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from '../../../../infra/http/dtos/auth/ILogin.js'
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../shared/error/AppError.js'
import type { IJwtService } from '../../../../domain/services/IJwtService.js'
import { toDTO } from './mapper.js'
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js'
import type {
  AuthSessionEntity,
  IAuthSessionEntity,
} from '../../../../domain/entities/authSession.entity.js'
import type { ICreateAuthSessionUseCase } from '../../authSession/create/ICreateUseCase.js'
import type { IUserEntity } from '../../../../domain/entities/user.entity.js'

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
    const { email, password } = params

    const user = await this.userRepository.findByEmail({ email })

    if (!user) {
      throw new NotFoundError(`User not found by email: ${email}`)
    }

    const validPassword = await this.encryptService.compare(
      password,
      user.password_hash,
    )

    /* 
    if (!user.verified_at) {
      throw new ConflictError("Email has not yet been verified.")
    } 
    */

    if (!validPassword) {
      throw new UnauthorizedError('Invalid credentials')
    }

    const { accessToken, refreshToken } = await this.generateTokens(user)

    return toDTO(user, accessToken, refreshToken)
  }

  async generateTokens(
    user: IUserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const authSessionTmp: IAuthSessionEntity = {
      id: randomUUID(),
      user_id: user.id,
      refresh_token_hash: '',
      expires_at: new Date(),
      revoked_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const accessToken = this.jwtService.generateAccessToken({
      user_id: user.id,
    })

    const refreshToken = this.jwtService.generateRefreshToken({
      auth_session_id: authSessionTmp.id,
    })

    await this.createAuthSession(authSessionTmp, refreshToken)

    return { accessToken, refreshToken: refreshToken.token }
  }

  async createAuthSession(
    data: IAuthSessionEntity,
    refreshToken: { token: string; expires_at: Date },
  ): Promise<null> {
    const refreshTokenHashed = await this.encryptService.hash(
      refreshToken.token,
    )
    data.refresh_token_hash = refreshTokenHashed
    data.expires_at = refreshToken.expires_at

    await this.createAuthSessionUseCase.execute(data)

    return null
  }
}
