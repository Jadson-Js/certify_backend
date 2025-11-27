import { inject, injectable } from "inversify";
import { TYPES_USER } from "../../../../infra/container/types.js";
import type { ISignupUseCase } from "./ISignupUseCase.js";
import type {
  ISignupInputDTO,
  ISignupOutputDTO,
} from "../../../../infra/http/dtos/auth/ISignup.js";
import type { ICreateUseCase } from "../../users/create/ICreateUseCase.js";

@injectable()
export class SignupUseCase implements ISignupUseCase {
  constructor(
    @inject(TYPES_USER.ICreateUseCase)
    private readonly createUseCase: ICreateUseCase,
  ) {}

  async execute(params: ISignupInputDTO): Promise<ISignupOutputDTO> {
    const user = await this.createUseCase.execute(params);

    return user;
  }
}
