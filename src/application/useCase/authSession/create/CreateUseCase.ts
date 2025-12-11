import { inject, injectable } from 'inversify';
import type { IAuthSessionRepository } from '../../../../domain/repositories/IAuthSessionRepository.js';
import {
  TYPES_AUTH,
  TYPES_AUTH_SESSION,
} from '../../../../infra/container/types.js';
import type {
  ICreateAuthSessionInputUseCase,
  ICreateAuthSessionUseCase,
} from './ICreateUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IAuthSessionEntity } from '../../../../domain/entities/authSession.entity.js';

@injectable()
export class CreateAuthSessionUseCase implements ICreateAuthSessionUseCase {
  constructor(
    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,
  ) {}

  async execute(params: ICreateAuthSessionInputUseCase): Promise<null> {
    return null;
  }
}
