import { injectable } from 'inversify';
import type {
  ICreateUserSuspensionInputRepository,
  IUserSuspensionRepository,
} from '../../../../domain/repositories/IUserSuspensionRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';
import type { IUserSuspensionEntity } from '../../../../domain/entities/userSuspension.entity.js';

@injectable()
export class UserSuspensionRepositoryPostgres implements IUserSuspensionRepository {
  async create(
    params: ICreateUserSuspensionInputRepository,
  ): Promise<IUserSuspensionEntity> {
    const result = await prisma.userSuspension.create({
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
