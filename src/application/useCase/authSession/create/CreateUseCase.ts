import { inject, injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import {
  TYPES_AUTH,
  TYPES_AUTH_SESSION,
} from '../../../../infra/container/types.js';
import type {
  ICreateAuthSessionInputUseCase,
  ICreateAuthSessionUseCase,
} from './ICreateUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';

@injectable()
export class CreateAuthSessionUseCase implements ICreateAuthSessionUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,
  ) {}

  async execute(params: ICreateAuthSessionInputUseCase): Promise<null> {
    const refreshTokenHashed = await this.encryptService.hash(
      params.refreshToken.token,
    );

    const authSessionTmp: IAuthSessionEntity = {
      id: params.authSessionId,
      user_id: params.user.id,
      refresh_token_hash: refreshTokenHashed,
      expires_at: params.refreshToken.expires_at,
      revoked_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await this.authSessionRepository.create(authSessionTmp);

    return null;
  }
}
