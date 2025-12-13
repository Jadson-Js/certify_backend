import { inject, injectable } from 'inversify';
import type { ILogoutInputUseCase, ILogoutUseCase } from './ILogoutUseCase.js';
import { TYPES_AUTH_SESSION } from '../../../../infra/container/types.js';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';

@injectable()
export class LogoutUseCase implements ILogoutUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(params: ILogoutInputUseCase): Promise<null> {
    await this.authSessionRepository.deleteById(params.authSessionId);

    return null;
  }
}
