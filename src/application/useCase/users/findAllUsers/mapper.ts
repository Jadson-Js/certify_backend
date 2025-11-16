import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IFindAllUsersOutputDTO } from "./IFindAllUsers.js";

export function toDTO(users: IUserEntity[]): IFindAllUsersOutputDTO[] {
  const mapper = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  }));

  return mapper;
}
