import type { ICreateUserInputDTO } from "../../infra/http/dtos/user/ICreate.js";
import type { IFindUserByEmailInputDTO } from "../../infra/http/dtos/user/IFindByEmail.js";
import type { IFindUserByIdInputDTO } from "../../infra/http/dtos/user/IFindById.js";
import type { IUserEntity } from "../entities/user.entity.js";

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(params: IFindUserByIdInputDTO): Promise<IUserEntity | null>;
  findByEmail(params: IFindUserByEmailInputDTO): Promise<IUserEntity | null>;
  create(params: ICreateUserInputDTO): Promise<IUserEntity>;
  deleteAll(): Promise<null>;
}
