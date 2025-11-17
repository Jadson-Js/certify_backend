import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { ICreateUserOutputDTO } from "../../../../infra/http/dtos/user/ICreateUser.js";

export function toDTO(user: IUserEntity): ICreateUserOutputDTO {
  const mapper = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_verified: user.is_verified,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return mapper;
}
