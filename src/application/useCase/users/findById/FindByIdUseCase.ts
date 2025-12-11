import { inject, injectable } from 'inversify';
import type {
  IFindUserByIdInputUseCase,
  IFindUserByIdOutputUseCase,
  IFindUserByIdUseCase,
} from './IFindByIdUseCase.js';
import { TYPES_USER } from '../../../../infra/container/types.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type {
  IFindUserByIdInputDTO,
  IFindUserByIdOutputDTO,
} from '../../../../infra/api/dtos/user/IFindById.js';
import { NotFoundError } from '../../../../shared/error/AppError.js';
import { toDTO } from './mapper.js';
import type { IUserEntity } from '../../../../domain/entities/user.entity.js';

@injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    params: IFindUserByIdInputUseCase,
  ): Promise<IFindUserByIdOutputUseCase> {
    const users = await this.userRepository.findById(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.id}`);
    }

    return users;
  }
}
