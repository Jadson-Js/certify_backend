import { injectable } from 'inversify';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';
import type { IFindUserByIdInputDTO } from '../../../api/dtos/user/IFindById.js';
import type { IFindUserByEmailInputDTO } from '../../../api/dtos/user/IFindByEmail.js';

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAll(): Promise<IUserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(params: IFindUserByIdInputDTO): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id: params.id } });

    return user;
  }

  async findByEmail(
    params: IFindUserByEmailInputDTO,
  ): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email: params.email },
    });

    return user;
  }

  async create(params: {
    name: string;
    email: string;
    password_hash: string;
  }): Promise<IUserEntity> {
    const user = await prisma.user.create({
      data: params,
    });

    return user;
  }

  async deleteAll(): Promise<null> {
    await prisma.user.deleteMany();

    return null;
  }
}
