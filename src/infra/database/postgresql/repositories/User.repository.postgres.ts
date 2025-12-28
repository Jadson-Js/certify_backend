import { injectable } from 'inversify';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type {
  ICreateUserInputRepository,
  IUpdateUserPasswordHashInputRepository,
  IUpdateUserSuspendedAtInputRepository,
  IUpdateUserVerifiedAtInputRepository,
  IUserRepository,
} from '../../../../domain/repositories/IUserRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAll(): Promise<IUserEntity[]> {
    const results = await prisma.user.findMany();

    return results;
  }

  async findById(id: string): Promise<IUserEntity | null> {
    const result = await prisma.user.findUnique({ where: { id } });

    if (!result) return null;

    return result;
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const result = await prisma.user.findUnique({
      where: { email },
    });

    if (!result) return null;

    return result;
  }

  async create(params: ICreateUserInputRepository): Promise<IUserEntity> {
    const result = await prisma.user.create({
      data: params,
    });

    return result;
  }

  async updateSuspendedAtById(
    params: IUpdateUserSuspendedAtInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return result;
  }

  async updateVerifiedAtById(
    params: IUpdateUserVerifiedAtInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return result;
  }

  async updatePasswordHashById(
    params: IUpdateUserPasswordHashInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return result;
  }
}
