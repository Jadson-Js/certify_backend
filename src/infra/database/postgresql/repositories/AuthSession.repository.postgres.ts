import { injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class AuthSessionRepositoryPostgres implements IAuthSessionRepository {
  async findById(id: string): Promise<IAuthSessionEntity | null> {
    const result = await prisma.authSession.findUnique({
      where: { id },
    });

    return result;
  }

  async create(params: IAuthSessionEntity): Promise<IAuthSessionEntity> {
    const result = await prisma.authSession.create({
      data: params,
    });

    return result;
  }

  async deleteById(id: string): Promise<null> {
    await prisma.authSession.delete({
      where: { id },
    });

    return null;
  }

  async deleteByUserId(userId: string): Promise<null> {
    await prisma.authSession.deleteMany({
      where: { userId },
    });

    return null;
  }
}
