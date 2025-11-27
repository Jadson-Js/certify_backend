import type {
  ISignupInputDTO,
  ISignupOutputDTO,
} from "../../../../infra/http/dtos/auth/ISignup.js";

export interface ISignupUseCase {
  execute(params: ISignupInputDTO): Promise<ISignupOutputDTO>;
}
