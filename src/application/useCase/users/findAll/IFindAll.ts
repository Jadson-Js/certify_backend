import type { IFindAllUsersOutputDTO } from "../../../../infra/http/dtos/user/IFindAll.js";

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputDTO[]>;
}
