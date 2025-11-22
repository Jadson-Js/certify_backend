import type { ICreateUserInputDTO } from "../../infra/http/dtos/user/ICreateUser.js";
import type { IFindUserByIdInputDTO } from "../../infra/http/dtos/user/IFindUserById.js";
import { type IUserEntity } from "../entities/user.entity.js";

export interface IUserRepository {
  findAllUsers(): Promise<IUserEntity[]>;
  findUserById(params: IFindUserByIdInputDTO): Promise<IUserEntity | null>;
  createUser(params: ICreateUserInputDTO): Promise<IUserEntity>;
  deleteAllUsers(): Promise<null>;
}
