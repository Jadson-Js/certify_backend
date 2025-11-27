import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type { IFindByIdInputDTO } from "../../../http/dtos/user/IFindById.js";
import type { ICreateInputDTO } from "../../../http/dtos/user/ICreate.js";

const prisma = new PrismaClient();

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAll(): Promise<IUserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(params: IFindByIdInputDTO): Promise<IUserEntity | null> {
    const user = await prisma.user.findUnique({ where: { id: params.id } });

    return user;
  }

  async create(params: ICreateInputDTO): Promise<IUserEntity> {
    const user: IUserEntity = await prisma.user.create({ data: params });

    return user;
  }

  async deleteAll(): Promise<null> {
    await prisma.user.deleteMany();

    return null;
  }
}
