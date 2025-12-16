import { inject, injectable } from 'inversify';
import {
  TYPES_AUTH_SESSION,
  TYPES_USER,
  TYPES_USER_SUSPENSION,
} from '../../../../infra/container/types.js';
import type {
  ISuspendUserInputUseCase,
  ISuspendUserUseCase,
} from './ISuspendUseCase.js';
import type { IUserSuspensionRepository } from '../../../../domain/repositories/IUserSuspensionRepository.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

@injectable()
export class SuspendUserUseCase implements ISuspendUserUseCase {
  constructor(
    @inject(TYPES_USER_SUSPENSION.IUserSuspensionRepository)
    private readonly userSuspensionRepository: IUserSuspensionRepository,

    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,

    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: ISuspendUserInputUseCase): Promise<void> {
    const { userId, category, details } = params;

    await this.userSuspensionRepository.create({
      user_id: userId,
      category,
      details,
    });

    await this.authSessionRepository.deleteByUserId(userId);

    await this.userRepository.updateSuspendedAtById({
      id: userId,
      suspended_at: new Date(),
    });
  }
}
