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
    const authSession = await prisma.userSuspension.create({
      data: params,
    });

    return authSession;
  }
}
