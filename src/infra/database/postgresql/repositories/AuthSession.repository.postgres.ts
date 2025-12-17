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

    if (!result) return null;

    return {
      id: result.id,
      userId: result.user_id,
      refreshTokenHash: result.refresh_token_hash,
      expiresAt: result.expires_at,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async create(params: IAuthSessionEntity): Promise<IAuthSessionEntity> {
    const result = await prisma.authSession.create({
      data: {
        id: params.id,
        user_id: params.userId,
        refresh_token_hash: params.refreshTokenHash,
        expires_at: params.expiresAt,
        created_at: params.createdAt,
        updated_at: params.updatedAt,
      },
    });

    return {
      id: result.id,
      userId: result.user_id,
      refreshTokenHash: result.refresh_token_hash,
      expiresAt: result.expires_at,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async deleteById(id: string): Promise<null> {
    await prisma.authSession.delete({
      where: { id },
    });

    return null;
  }

  async deleteByUserId(userId: string): Promise<null> {
    await prisma.authSession.deleteMany({
      where: { user_id: userId },
    });

    return null;
  }
}
