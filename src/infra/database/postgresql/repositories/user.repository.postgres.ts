import { injectable } from "inversify";
import { type IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";
import { PrismaClient } from "../../../../../generated/prisma/client.js";
import type { ICreateUserInputDTO } from "../../../http/dtos/user/ICreateUser.js";
const prisma = new PrismaClient();

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAllUsers(): Promise<IUserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
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
