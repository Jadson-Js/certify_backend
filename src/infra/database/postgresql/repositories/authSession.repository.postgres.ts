import { injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';
import type { IFindAuthSessionByIdInputDTO } from '../../../api/dtos/authSession/IFindById.js';
import type { IDeleteAuthSessionByIdInputDTO } from '../../../api/dtos/authSession/IDeleteById.js';

@injectable()
export class AuthSessionRepositoryPostgres implements IAuthSessionRepository {
  async findById(
    params: IFindAuthSessionByIdInputDTO,
  ): Promise<IAuthSessionEntity | null> {
    const authSession = await prisma.authSession.findUnique({
      where: { id: params.id },
    });

    return authSession;
  }

  async create(params: IAuthSessionEntity): Promise<IAuthSessionEntity> {
    const authSession = await prisma.authSession.create({
      data: params,
    });

    return authSession;
  }

  async deleteById(params: IDeleteAuthSessionByIdInputDTO): Promise<null> {
    await prisma.authSession.delete({
      where: { id: params.id },
    });

    return null;
  }
}
