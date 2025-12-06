import { inject, injectable } from 'inversify';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { ICreateUserUseCase } from './ICreateUseCase.js';
import { TYPES_USER } from '../../../../infra/container/types.js';
import type {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
} from '../../../../infra/api/dtos/user/ICreate.js';
import { toDTO } from './mapper.js';

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    const user = await this.userRepository.create(params);

    return toDTO(user);
  }
}
