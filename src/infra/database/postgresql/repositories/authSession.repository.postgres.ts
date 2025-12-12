import { injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class AuthSessionRepositoryPostgres implements IAuthSessionRepository {
  async findById(id: string): Promise<IAuthSessionEntity | null> {
    const authSession = await prisma.authSession.findUnique({
      where: { id },
    });

    return authSession;
  }

  async create(params: IAuthSessionEntity): Promise<IAuthSessionEntity> {
    const authSession = await prisma.authSession.create({
      data: params,
    });

    return authSession;
  }

  async deleteById(id: string): Promise<null> {
    await prisma.authSession.delete({
      where: { id },
    });

    return null;
  }
}
