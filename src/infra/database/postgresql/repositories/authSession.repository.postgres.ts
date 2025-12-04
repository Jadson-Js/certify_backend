import { injectable } from "inversify";

import { prisma } from "../../../../../prisma/prisma.js";
import type { IAuthSessionRepository } from "../../../../domain/repositories/IAuthSessionRepository.js";
import type { ICreateInputDTO } from "../../../http/dtos/authSession/ICreate.js";
import type { IAuthSessionEntity } from "../../../../domain/entities/authSession.entity.js";

@injectable()
export class authSessionRepositoryPostgres implements IAuthSessionRepository {
  async create(params: ICreateInputDTO): Promise<IAuthSessionEntity> {

    const authSession = await prisma.authSession.create({
      data: params,
    });

    return authSession;
  }
}
