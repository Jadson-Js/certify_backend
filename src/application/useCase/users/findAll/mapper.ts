import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IFindAllOutputDTO } from "../../../../infra/http/dtos/user/IFindAll.js";

export function toDTO(users: IUserEntity[]): IFindAllOutputDTO[] {
  const mapper = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  }));

  return mapper;
}
