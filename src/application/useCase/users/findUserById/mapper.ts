import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IFindByIdOutputDTO } from "../../../../infra/http/dtos/user/IFindById.js";

export function toDTO(user: IUserEntity): IFindByIdOutputDTO {
  const mapper = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  };

  return mapper;
}
