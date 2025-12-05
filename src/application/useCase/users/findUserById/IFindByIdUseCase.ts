import type {
  IFindUserByIdInputDTO,
  IFindUserByIdOutputDTO,
} from "../../../../infra/http/dtos/user/IFindById.js";

export interface IFindUserByIdUseCase {
  execute(params: IFindUserByIdInputDTO): Promise<IFindUserByIdOutputDTO>;
}
