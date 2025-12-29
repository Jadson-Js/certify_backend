import { injectable } from 'inversify';
import type { IUserEntity } from '../../../../domain/entities/User.entity.js';
import { UserEntity } from '../../../../domain/entities/User.entity.js';
import type {
  ICreateUserInputRepository,
  ICreateUserWithVerificationTokenInput,
  ICreateUserWithVerificationTokenOutput,
  IResetPasswordAndDeleteTokenInput,
  ISuspendUserAndRevokeSessionsInput,
  IUpdateUserPasswordHashInputRepository,
  IUpdateUserSuspendedAtInputRepository,
  IUpdateUserVerifiedAtInputRepository,
  IUserRepository,
  IVerifyUserAndDeleteTokenInput,
} from '../../../../domain/repositories/IUserRepository.js';
import { prisma } from '../../../../../prisma/prisma.js';

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAll(): Promise<IUserEntity[]> {
    const results = await prisma.user.findMany();

    return results.map((user) => UserEntity.from(user));
  }

  async findById(id: string): Promise<IUserEntity | null> {
    const result = await prisma.user.findUnique({ where: { id } });

    if (!result) return null;

    return UserEntity.from(result);
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const result = await prisma.user.findUnique({
      where: { email },
    });

    if (!result) return null;

    return UserEntity.from(result);
  }

  async create(params: ICreateUserInputRepository): Promise<IUserEntity> {
    const result = await prisma.user.create({
      data: params,
    });

    return UserEntity.from(result);
  }

  async updateSuspendedAtById(
    params: IUpdateUserSuspendedAtInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return UserEntity.from(result);
  }

  async updateVerifiedAtById(
    params: IUpdateUserVerifiedAtInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return UserEntity.from(result);
  }

  async updatePasswordHashById(
    params: IUpdateUserPasswordHashInputRepository,
  ): Promise<IUserEntity> {
    const result = await prisma.user.update({
      data: params,
      where: {
        id: params.id,
      },
    });

    return UserEntity.from(result);
  }

  // Atomic transaction methods
  async createUserWithVerificationToken(
    params: ICreateUserWithVerificationTokenInput,
  ): Promise<ICreateUserWithVerificationTokenOutput> {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: params.user,
      });

      const token = await tx.emailVerificationToken.create({
        data: {
          userId: user.id,
          tokenHash: params.token.tokenHash,
          expiresAt: params.token.expiresAt,
        },
      });

      return {
        user: UserEntity.from(user),
        tokenId: token.id,
      };
    });

    return result;
  }

  async verifyUserAndDeleteToken(
    params: IVerifyUserAndDeleteTokenInput,
  ): Promise<IUserEntity> {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: params.userId },
        data: { verifiedAt: new Date() },
      });

      await tx.emailVerificationToken.delete({
        where: { id: params.tokenId },
      });

      return UserEntity.from(user);
    });

    return result;
  }

  async resetPasswordAndDeleteToken(
    params: IResetPasswordAndDeleteTokenInput,
  ): Promise<IUserEntity> {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: params.userId },
        data: { passwordHash: params.passwordHash },
      });

      await tx.emailVerificationToken.delete({
        where: { id: params.tokenId },
      });

      return UserEntity.from(user);
    });

    return result;
  }

  async suspendUserAndRevokeSessions(
    params: ISuspendUserAndRevokeSessionsInput,
  ): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await tx.userSuspended.create({
        data: {
          userId: params.userId,
          category: params.suspensionData.category,
          details: params.suspensionData.details,
        },
      });

      await tx.authSession.deleteMany({
        where: { userId: params.userId },
      });

      await tx.user.update({
        where: { id: params.userId },
        data: { suspendedAt: new Date() },
      });
    });
  }
}
