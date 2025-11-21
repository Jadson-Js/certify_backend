import type {
  ICreateUserInputDTO,
  ICreateUserOutputDTO,
} from "../../../../infra/http/dtos/user/ICreateUser.js";

export interface ICreateUserUseCase {
  execute(params: ICreateUserInputDTO): Promise<ICreateUserOutputDTO>;
}
