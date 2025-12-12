import type { IUserEntity } from '../entities/user.entity.js';

export interface ICreateUserInputRepository {
  name: string;
  email: string;
  password_hash: string;
}

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  create(params: ICreateUserInputRepository): Promise<IUserEntity>;
}
