import type {
  IFindByIdInputDTO,
  IFindByIdOutputDTO,
} from "../../../../infra/http/dtos/user/IFindById.js";

export interface IFindByIdUseCase {
  execute(params: IFindByIdInputDTO): Promise<IFindByIdOutputDTO>;
}
