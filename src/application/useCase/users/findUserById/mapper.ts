import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { IFindUserByIdOutputDTO } from '../../../../infra/api/dtos/user/IFindById.js';

export function toDTO(user: IUserEntity): IFindUserByIdOutputDTO {
  const mapper = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };

  return mapper;
}
