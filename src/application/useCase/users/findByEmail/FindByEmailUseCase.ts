import { inject, injectable } from 'inversify';
import { TYPES_USER } from '../../../../infra/container/types.js';
import type {
  IFindUserByEmailInputUseCase,
  IFindUserByEmailOutputUseCase,
  IFindUserByEmailUseCase,
} from './IFindByEmailUseCase.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type {
  IFindUserByEmailInputDTO,
  IFindUserByEmailOutputDTO,
} from '../../../../infra/api/dtos/user/IFindByEmail.js';
import { NotFoundError } from '../../../../shared/error/AppError.js';
import { toDTO } from './mapper.js';

@injectable()
export class FindUserByEmailUseCase implements IFindUserByEmailUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    params: IFindUserByEmailInputUseCase,
  ): Promise<IFindUserByEmailOutputUseCase> {
    const users = await this.userRepository.findByEmail(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.email}`);
    }

    return toDTO(users);
  }
}
