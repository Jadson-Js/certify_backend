import type { IUserEntity } from '../entities/User.entity.js';

export interface ICreateUserInputRepository {
  name: string;
  email: string;
  passwordHash: string;
}

export interface IUpdateUserVerifiedAtInputRepository {
  id: string;
  verifiedAt: Date;
}

export interface IUpdateUserPasswordHashInputRepository {
  id: string;
  passwordHash: string;
}

export interface IUpdateUserSuspendedAtInputRepository {
  id: string;
  suspendedAt: Date;
}

export interface ICreateUserWithVerificationTokenInput {
  user: ICreateUserInputRepository;
  token: {
    tokenHash: string;
    expiresAt: Date;
  };
}

export interface ICreateUserWithVerificationTokenOutput {
  user: IUserEntity;
  tokenId: string;
}

export interface IVerifyUserAndDeleteTokenInput {
  userId: string;
  tokenId: string;
}

export interface IResetPasswordAndDeleteTokenInput {
  userId: string;
  tokenId: string;
  passwordHash: string;
}

export interface ISuspendUserAndRevokeSessionsInput {
  userId: string;
  suspensionData: {
    category: import('../entities/UserSuspended.entity.js').ICATEGORY_USER_SUSPENDED;
    details: string;
  };
}

export interface IUserRepository {
  findAll(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity | null>;
  findByEmail(email: string): Promise<IUserEntity | null>;
  updateVerifiedAtById(
    params: IUpdateUserVerifiedAtInputRepository,
  ): Promise<IUserEntity>;
  updatePasswordHashById(
    params: IUpdateUserPasswordHashInputRepository,
  ): Promise<IUserEntity>;
  updateSuspendedAtById(
    params: IUpdateUserSuspendedAtInputRepository,
  ): Promise<IUserEntity>;
  create(params: ICreateUserInputRepository): Promise<IUserEntity>;

  // Atomic transaction methods
  createUserWithVerificationToken(
    params: ICreateUserWithVerificationTokenInput,
  ): Promise<ICreateUserWithVerificationTokenOutput>;
  verifyUserAndDeleteToken(
    params: IVerifyUserAndDeleteTokenInput,
  ): Promise<IUserEntity>;
  resetPasswordAndDeleteToken(
    params: IResetPasswordAndDeleteTokenInput,
  ): Promise<IUserEntity>;
  suspendUserAndRevokeSessions(
    params: ISuspendUserAndRevokeSessionsInput,
  ): Promise<void>;
}
