import { injectable } from "inversify";
import { type IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import { PrismaClient } from "../../../../../generated/prisma/client.js";
import type { ICreateUserInputDTO } from "../../../http/dtos/user/ICreateUser.js";
import type { IFindUserByIdInputDTO } from "../../../http/dtos/user/IFindUserById.js";
const prisma = new PrismaClient();

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAllUsers(): Promise<IUserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findUserById(
    params: IFindUserByIdInputDTO,
  ): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id: params.id } });

    return user;
  }

  async createUser(params: ICreateUserInputDTO): Promise<IUserEntity> {
    const user: IUserEntity = await prisma.user.create({ data: params });

    return user;
  }

  async deleteAllUsers(): Promise<null> {
    await prisma.user.deleteMany();

    return null;
  }
}
