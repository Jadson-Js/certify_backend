import type { IFindUserByEmailInputDTO, IFindUserByEmailOutputDTO } from "../../../../infra/http/dtos/user/IFindByEmail.js";

export interface IFindUserByEmailUseCase {
  execute(params: IFindUserByEmailInputDTO): Promise<IFindUserByEmailOutputDTO>;
}
