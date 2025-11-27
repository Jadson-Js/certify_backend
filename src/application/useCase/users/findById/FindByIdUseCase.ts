import { inject, injectable } from "inversify";
import type { IFindByIdUseCase } from "./IFindByIdUseCase.js";
import { TYPES } from "../../../../infra/container/types.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";
import type {
  IFindByIdInputDTO,
  IFindByIdOutputDTO,
} from "../../../../infra/http/dtos/user/IFindById.js";
import { NotFoundError } from "../../../../shared/error/AppError.js";
import { toDTO } from "./mapper.js";

@injectable()
export class FindByIdUseCase implements IFindByIdUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: IFindByIdInputDTO): Promise<IFindByIdOutputDTO> {
    const users = await this.userRepository.findById(params);

    if (!users) {
      throw new NotFoundError(`User not found by id ${params.id}`);
    }

    return toDTO(users);
  }
}
