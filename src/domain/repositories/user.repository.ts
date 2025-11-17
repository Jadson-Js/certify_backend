import type { ICreateUserInputDTO } from "../../infra/http/dtos/user/ICreateUser.js";
import { type IUserEntity } from "../entities/user.entity.js";

export interface IUserRepository {
  findAllUsers(): Promise<IUserEntity[]>;
  createUser(params: ICreateUserInputDTO): Promise<IUserEntity>;
}
