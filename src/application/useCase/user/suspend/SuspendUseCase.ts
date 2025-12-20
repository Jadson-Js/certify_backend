import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH_SESSION,
  TYPES_USER,
  TYPES_USER_SUSPENDED,
} from '../../../../infra/container/types.js';
import type {
  ISuspendUserInputUseCase,
  ISuspendUserUseCase,
} from './ISuspendUseCase.js';
import type { IUserSuspendedRepository } from '../../../../domain/repositories/IUserSuspendedRepository.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

@injectable()
export class SuspendUserUseCase implements ISuspendUserUseCase {
  constructor(
    @inject(TYPES_USER_SUSPENDED.IUserSuspendedRepository)
    private readonly userSuspendedRepository: IUserSuspendedRepository,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(params: ISuspendUserInputUseCase): Promise<void> {
    const { userId, category, details } = params;

    await this.userSuspendedRepository.create({
      userId: userId,
      category,
      details,
    });

    await this.authSessionRepository.deleteByUserId(userId);

    await this.userRepository.updateSuspendedAtById({
      id: userId,
      suspendedAt: new Date(),
    });
  }
}
