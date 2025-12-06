import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { IRefreshToken } from '../../../../domain/services/IJwtService.js';

export interface ICreateAuthSessionInputUseCase {
  authSessionId: string;
  user: IUserEntity;
  refreshToken: IRefreshToken;
}

export interface ICreateAuthSessionUseCase {
  execute(params: ICreateAuthSessionInputUseCase): Promise<null>;
}
