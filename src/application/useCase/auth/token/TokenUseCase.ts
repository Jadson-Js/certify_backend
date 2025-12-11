import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH,
  TYPES_AUTH_SESSION,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type { ITokenUseCase } from './ITokenUseCase.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { ICreateAuthSessionUseCase } from '../../authSession/create/ICreateUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IJwtService } from '../../../../domain/services/IJwtService.js';
import type {
  ITokenInputDTO,
  ITokenOutputDTO,
} from '../../../../infra/api/dtos/auth/IToken.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../shared/error/AppError.js';
import type { IFindAuthSessionByIdUseCase } from '../../authSession/findById/IFindByIdUseCase.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import type { IDeleteAuthSessionByIdUseCase } from '../../authSession/deleteById/IDeleteByIdUseCase.js';
import type { IFindUserByIdUseCase } from '../../users/findById/IFindByIdUseCase.js';
import { randomUUID } from 'crypto';
import { extractExpiresAtInToken } from '../../../../shared/utils/extractExpiresAtInToken.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';

@injectable()
export class TokenUseCase implements ITokenUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.ICreateAuthSessionUseCase)
    private readonly createAuthSessionUseCase: ICreateAuthSessionUseCase,

    @inject(TYPES_AUTH_SESSION.IFindAuthSessionByIdUseCase)
    private readonly findAuthSessionByIdUseCase: IFindAuthSessionByIdUseCase,

    @inject(TYPES_USER.IFindUserByIdUseCase)
    private readonly findUserByIdUseCase: IFindUserByIdUseCase,

    @inject(TYPES_AUTH_SESSION.IDeleteAuthSessionByIdUseCase)
    private readonly deleteAuthSessionByIdUseCase: IDeleteAuthSessionByIdUseCase,

    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_AUTH.IJwtService)
    private readonly jwtService: IJwtService,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(params: ITokenInputDTO): Promise<ITokenOutputDTO> {
    // [CONCLUIDO] Verifica de refresh token é valido
    // Verifica na table authSession se este token existe, se não foi expirado, não foi revogado, user foi verifiead
    // deleta o authSession atual
    // gera um novo refreshToken

    const decodedJwt = this.jwtService.verifyRefresh(params.refreshToken);
    if (!decodedJwt) throw new UnauthorizedError('Refresh token is not valid');

    const authSession = await this.findAuthSessionByIdUseCase.execute({
      id: decodedJwt.auth_session_id as string,
    });
    if (!authSession) throw new NotFoundError('Auth Session not found');
    if (new Date(authSession.expires_at) < new Date())
      throw new ConflictError('Auth Session expiried');
    if (authSession.revoked_at !== null)
      throw new UnauthorizedError('Auth Session is revoked');

    const user = await this.findUserByIdUseCase.execute({
      id: authSession.user_id,
    });
    /*
    if (user.verified_at == null)
      throw new UnauthorizedError('The user is not verified');
    // Validar se o User está bloqueado
    */

    await this.deleteAuthSessionByIdUseCase.execute({ id: authSession.id });

    const newAuthSessionId = randomUUID();
    const refreshToken = this.jwtService.generateRefreshToken({
      auth_session_id: newAuthSessionId,
    });

    const newAuthSession = this.createAuthSessionUseCase.execute({
      authSessionId: newAuthSessionId,
      user,
      refreshToken,
    });

    const accessToken = this.jwtService.generateAccessToken({
      user_id: user.id,
    });

    const authSessionId = randomUUID();

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

    return { accessToken, refreshToken };
  }
}
