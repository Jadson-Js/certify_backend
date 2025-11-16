import { UserEntity } from "../entities/user.entity.js";

export interface IUserRepository {
  findAllUsers(): Promise<UserEntity[]>;
}
