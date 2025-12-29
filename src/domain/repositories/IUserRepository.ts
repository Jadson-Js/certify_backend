import type { IUserEntity } from '../entities/User.entity.js';

export interface ICreateUserInputRepository {
  name: string;
  email: string;
  passwordHash: string;
}

export interface IUpdateUserVerifiedAtInputRepository {
  id: string;
  verifiedAt: Date;
}

export interface IUpdateUserPasswordHashInputRepository {
  id: string;
  passwordHash: string;
}

export interface IUpdateUserSuspendedAtInputRepository {
  id: string;
  suspendedAt: Date;
}

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  updateVerifiedAtById(
    params: IUpdateUserVerifiedAtInputRepository,
  ): Promise<IUserEntity>;
  updatePasswordHashById(
    params: IUpdateUserPasswordHashInputRepository,
  ): Promise<IUserEntity>;
  updateSuspendedAtById(
    params: IUpdateUserSuspendedAtInputRepository,
  ): Promise<IUserEntity>;
  create(params: ICreateUserInputRepository): Promise<IUserEntity>;
}
