import type {
  IFindByEmailInputDTO,
  IFindByEmailOutputDTO,
} from "../../../../infra/http/dtos/user/IFindByEmail.js";

export interface IFindByEmailUseCase {
  execute(params: IFindByEmailInputDTO): Promise<IFindByEmailOutputDTO>;
}
