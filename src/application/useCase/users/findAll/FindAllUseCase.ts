import { inject, injectable } from 'inversify';
import { TYPES_USER } from '../../../../infra/container/types.js';
import type { IUserRepository } from '../../../../domain/repositories/IUserRepository.js';
import type { IFindAllUsersUseCase } from './IFindAll.js';
import type { IFindAllUsersOutputDTO } from '../../../../infra/api/dtos/user/IFindAll.js';
import { toDTO } from './mapper.js';

@injectable()
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IFindAllUsersOutputDTO[]> {
    const users = await this.userRepository.findAll();

    return toDTO(users);
  }
}
