import { injectable } from 'inversify';
import type {
  ICreateUserSuspendedInputRepository,
  IUserSuspendedRepository,
} from '../../../../domain/repositories/IUserSuspendedRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';
import type { IUserSuspendedEntity } from '../../../../domain/entities/userSuspended.entity.js';

@injectable()
export class UserSuspendedRepositoryPostgres implements IUserSuspendedRepository {
  async create(
    params: ICreateUserSuspendedInputRepository,
  ): Promise<IUserSuspendedEntity> {
    const result = await prisma.userSuspended.create({
      data: {
        user_id: params.userId,
        category: params.category,
        details: params.details,
      },
    });

    return {
      id: result.id,
      userId: result.user_id,
      category: result.category,
      details: result.details,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }
}
