import { injectable } from 'inversify';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type {
  ICreateUserInputRepository,
  IUserRepository,
} from '../../../../domain/repositories/IUserRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAll(): Promise<IUserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(id: string): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(params: ICreateUserInputRepository): Promise<IUserEntity> {
    const user = await prisma.user.create({
      data: params,
    });

    return user;
  }
}
