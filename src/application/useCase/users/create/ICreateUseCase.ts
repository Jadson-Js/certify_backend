import type {
  ICreateInputDTO,
  ICreateOutputDTO,
} from "../../../../infra/http/dtos/user/ICreate.js";

export interface ICreateUseCase {
  execute(params: ICreateInputDTO): Promise<ICreateOutputDTO>;
}
