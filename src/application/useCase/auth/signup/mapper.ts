import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { ISignupOutputDTO } from "../../../../infra/http/dtos/auth/ISignup.js";

export function toDTO(user: IUserEntity): ISignupOutputDTO {
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
