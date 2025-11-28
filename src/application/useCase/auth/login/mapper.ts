import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { ILoginOutputDTO } from "../../../../infra/http/dtos/auth/ILogin.js";

export function toDTO(user: IUserEntity, accessToken: string): ILoginOutputDTO {
  const mapper = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_verified: user.is_verified,
    created_at: user.created_at,
    updated_at: user.updated_at,
    access_token: accessToken,
  };

  return mapper;
}
