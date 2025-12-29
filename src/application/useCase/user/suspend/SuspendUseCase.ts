import { inject, injectable } from 'inversify';
import { TYPES_USER } from '../../../../infra/container/types.js';
import type {
  ISuspendUserInputUseCase,
  ISuspendUserUseCase,
} from './ISuspendUseCase.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

@injectable()
export class SuspendUserUseCase implements ISuspendUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(params: ISuspendUserInputUseCase): Promise<void> {
    const { userId, category, details } = params;

    // ✅ ATOMIC: Suspension created, sessions revoked, and user updated together in a transaction
    await this.userRepository.suspendUserAndRevokeSessions({
      userId,
      suspensionData: {
        category,
        details,
      },
    });
  }
}
