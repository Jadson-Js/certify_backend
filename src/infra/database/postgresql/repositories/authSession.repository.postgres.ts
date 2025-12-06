import { injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { ICreateAuthSessionInputDTO } from '../../../api/dtos/authSession/ICreate.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class authSessionRepositoryPostgres implements IAuthSessionRepository {
  async create(params: IAuthSessionEntity): Promise<IAuthSessionEntity> {
    const authSession = await prisma.authSession.create({
      data: params,
    });

    return authSession;
  }
}
