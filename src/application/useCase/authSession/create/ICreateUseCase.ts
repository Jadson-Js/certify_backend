import type {
  ICreateAuthSessionInputDTO,
  ICreateAuthSessionOutputDTO,
} from "../../../../infra/http/dtos/authSession/ICreate.js";

export interface ICreateAuthSessionUseCase {
  execute(
    params: ICreateAuthSessionInputDTO,
  ): Promise<ICreateAuthSessionOutputDTO>;
}
