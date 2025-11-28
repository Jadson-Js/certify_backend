import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from "../../../../infra/http/dtos/auth/ILogin.js";

export interface ILoginUseCase {
  execute(params: ILoginInputDTO): Promise<ILoginOutputDTO>;
}
