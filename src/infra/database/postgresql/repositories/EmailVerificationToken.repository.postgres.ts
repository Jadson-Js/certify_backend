import { injectable } from 'inversify';
import type { IEmailVerificationTokenRepository, ICreateEmailVerificationTokenInputRepository } from '../../../../domain/repositories/IEmailVerificationTokenRepository.js';
import { EmailVerificationTokenEntity } from '../../../../domain/entities/EmailVerificationToken.entity.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class EmailVerificationTokenRepositoryPostgres implements IEmailVerificationTokenRepository {
  async findByHashToken(
    tokenHash: string,
  ): Promise<EmailVerificationTokenEntity | null> {
    const result = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
    });

    if (!result) return null;

    return EmailVerificationTokenEntity.from(result);
  }

  async create(
    params: ICreateEmailVerificationTokenInputRepository,
  ): Promise<EmailVerificationTokenEntity> {
    const result = await prisma.emailVerificationToken.create({
      data: params,
    });

    return EmailVerificationTokenEntity.from(result);
  }

  async deleteById(id: string): Promise<null> {
    await prisma.emailVerificationToken.delete({
      where: { id },
    });

    return null;
  }
}
