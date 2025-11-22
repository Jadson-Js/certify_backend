import type {
  IFindUserByIdInputDTO,
  IFindUserByIdOutputDTO,
} from "../../../../infra/http/dtos/user/IFindUserById.js";

export interface IFindUserByIdUseCase {
  execute(params: IFindUserByIdInputDTO): Promise<IFindUserByIdOutputDTO>;
}
