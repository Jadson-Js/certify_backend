import { injectable } from 'inversify';
import type {
  ICreateUserSuspendedInputRepository,
  IUserSuspendedRepository,
} from '../../../../domain/repositories/IUserSuspendedRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';
import type { IUserSuspendedEntity } from '../../../../domain/entities/userSuspended.entity.js';
import { UserSuspendedEntity } from '../../../../domain/entities/userSuspended.entity.js';

@injectable()
export class UserSuspendedRepositoryPostgres implements IUserSuspendedRepository {
  async create(
    params: ICreateUserSuspendedInputRepository,
  ): Promise<IUserSuspendedEntity> {
    const result = await prisma.userSuspended.create({
      data: params,
    });

    return UserSuspendedEntity.from(result);
  }
}
