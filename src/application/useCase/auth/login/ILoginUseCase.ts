import type {
  AuthSessionEntity,
  IAuthSessionEntity,
} from '../../../../domain/entities/authSession.entity.js';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { IRefreshToken } from '../../../../domain/services/IJwtService.js';
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from '../../../../infra/api/dtos/auth/ILogin.js';

export interface ILoginUseCase {
  execute(params: ILoginInputDTO): Promise<ILoginOutputDTO>;

  generateTokens(
    user: IUserEntity,
    authSessionId: string,
  ): Promise<{ accessToken: string; refreshToken: IRefreshToken }>;
}
