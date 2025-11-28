import { inject, injectable } from "inversify";
import type { IFindByEmailUseCase } from "./IFindByEmailUseCase.js";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";

import { NotFoundError } from "../../../../shared/error/AppError.js";
import { toDTO } from "./mapper.js";
import type {
  IFindByEmailInputDTO,
  IFindByEmailOutputDTO,
} from "../../../../infra/http/dtos/user/IFindByEmail.js";

@injectable()
export class FindByEmailUseCase implements IFindByEmailUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: IFindByEmailInputDTO): Promise<IFindByEmailOutputDTO> {
    const users = await this.userRepository.findByEmail(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.email}`);
    }

    return toDTO(users);
  }
}
