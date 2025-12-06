import type { ICreateUserInputDTO } from '../../infra/api/dtos/user/ICreate.js';
import type { IFindUserByEmailInputDTO } from '../../infra/api/dtos/user/IFindByEmail.js';
import type { IFindUserByIdInputDTO } from '../../infra/api/dtos/user/IFindById.js';
import type { IUserEntity } from '../entities/user.entity.js';

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(params: IFindUserByIdInputDTO): Promise<IUserEntity | null>;
  findByEmail(params: IFindUserByEmailInputDTO): Promise<IUserEntity | null>;
  create(params: ICreateUserInputDTO): Promise<IUserEntity>;
  deleteAll(): Promise<null>;
}
