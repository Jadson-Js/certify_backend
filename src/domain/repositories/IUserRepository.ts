import type { ICreateInputDTO } from "../../infra/http/dtos/user/ICreate.js";
import type { IFindByIdInputDTO } from "../../infra/http/dtos/user/IFindById.js";
import type { IUserEntity } from "../entities/user.entity.js";

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(params: IFindByIdInputDTO): Promise<IUserEntity | null>;
  create(params: ICreateInputDTO): Promise<IUserEntity>;
  deleteAll(): Promise<null>;
}
