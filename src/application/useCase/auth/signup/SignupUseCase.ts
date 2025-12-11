import { inject, injectable } from 'inversify';
import { TYPES_AUTH, TYPES_USER } from '../../../../infra/container/types.js';
import type { ISignupUseCase } from './ISignupUseCase.js';
import type {
  ISignupInputDTO,
  ISignupOutputDTO,
} from '../../../../infra/api/dtos/auth/ISignup.js';
import type { IEncryptService } from '../../../../domain/services/IEncryptService.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';

@injectable()
export class SignupUseCase implements ISignupUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,
  ) {}

  async execute(params: ISignupInputDTO): Promise<ISignupOutputDTO> {
    const { name, email, password } = params;
    const hashPassword = await this.encryptService.hash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password_hash: hashPassword,
    });

    return user;
  }
}
