import { inject, injectable } from 'inversify';
import {
  TYPES_SERVICE,
  TYPES_USER,
} from '../../../../infra/container/types.js';
import type {
  ISignupInputUseCase,
  ISignupOutputUseCase,
  ISignupUseCase,
} from './ISignupUseCase.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

@injectable()
export class SignupUseCase implements ISignupUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_SERVICE.IEncryptService)
    private readonly encryptService: IEncryptService,
  ) { }

  async execute(params: ISignupInputUseCase): Promise<ISignupOutputUseCase> {
    const { name, email, password } = params;
    const hashPassword = await this.encryptService.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      passwordHash: hashPassword,
    });

    return user;
  }
}
