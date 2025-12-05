import { inject, injectable } from "inversify";
import type { IAuthSessionRepository } from "../../../../domain/repositories/IAuthSessionRepository.js";
import { TYPES_AUTH_SESSION } from "../../../../infra/container/types.js";
import type { ICreateAuthSessionUseCase } from "./ICreateUseCase.js";
import type { ICreateAuthSessionInputDTO, ICreateAuthSessionOutputDTO } from "../../../../infra/http/dtos/authSession/ICreate.js";

@injectable()
export class CreateAuthSessionUseCase implements ICreateAuthSessionUseCase {
  constructor(
    @inject(TYPES_AUTH_SESSION.IAuthSessionRepository)
    private readonly authSessionRepository: IAuthSessionRepository,
  ) {}

  async execute(params: ICreateAuthSessionInputDTO): Promise<ICreateAuthSessionOutputDTO> {
    const user = await this.authSessionRepository.create(params);

    return user;
  }
}
