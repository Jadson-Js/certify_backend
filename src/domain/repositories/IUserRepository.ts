import type { IFindUserByEmailInputDTO } from '../../infra/api/dtos/user/IFindByEmail.js';
import type { IFindUserByIdInputDTO } from '../../infra/api/dtos/user/IFindById.js';
import type { IUserEntity } from '../entities/user.entity.js';

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(params: IFindUserByIdInputDTO): Promise<IUserEntity | null>;
  findByEmail(params: IFindUserByEmailInputDTO): Promise<IUserEntity | null>;
  create(params: {
    name: string;
    email: string;
    password_hash: string;
  }): Promise<IUserEntity>;
  deleteAll(): Promise<null>;
}
