import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { ILoginOutputDTO } from '../../../../infra/api/dtos/auth/ILogin.js';
import type { ILoginOutputUseCase } from '../login/ILoginUseCase.js';

export function toDTO(
  user: IUserEntity,
  accessToken: string,
  refresh_token: string,
): ILoginOutputUseCase {
  const mapper = {
    accessToken: accessToken,
    refreshToken: refresh_token,
  };

  return mapper;
}
