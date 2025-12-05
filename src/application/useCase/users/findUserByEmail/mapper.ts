import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IFindUserByEmailOutputDTO } from "../../../../infra/http/dtos/user/IFindByEmail.js";

export function toDTO(user: IUserEntity): IFindUserByEmailOutputDTO {
  const mapper = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };

  return mapper;
}
