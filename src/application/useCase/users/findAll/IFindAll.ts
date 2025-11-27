import type { IFindAllOutputDTO } from "../../../../infra/http/dtos/user/IFindAll.js";

export interface IFindAllUseCase {
  execute(): Promise<IFindAllOutputDTO[]>;
}
