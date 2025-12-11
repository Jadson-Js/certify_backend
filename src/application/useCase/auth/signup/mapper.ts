import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { ISignupOutputUseCase } from './ISignupUseCase.js';

export function toDTO(user: IUserEntity): ISignupOutputUseCase {
  const mapper = {
    id: user.id,
    email: user.email,
  };

  return mapper;
}
