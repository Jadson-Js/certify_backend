import { injectable } from 'inversify';
import type { IEmailVerificationTokenRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import type { IEmailVerificationTokenEntity } from '../../../../domain/entities/emailVerificationToken.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class EmailVerificationTokenRepositoryPostgres implements IEmailVerificationTokenRepository {
  async findByHashToken(
    tokenHash: string,
  ): Promise<IEmailVerificationTokenEntity | null> {
    const result = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    });

    return result;
  }

  async create(
    params: IEmailVerificationTokenEntity,
  ): Promise<IEmailVerificationTokenEntity> {
    const result = await prisma.emailVerificationToken.create({
      data: params,
    });

    return result;
  }

  async deleteById(id: string): Promise<null> {
    await prisma.emailVerificationToken.delete({
      where: { id },
    });

    return null;
  }
}
