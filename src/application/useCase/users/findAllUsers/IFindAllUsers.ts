import type { IFindAllUsersOutputDTO } from "../../../../infra/http/dtos/user/IFindAllUsers.js";

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputDTO[]>;
}
