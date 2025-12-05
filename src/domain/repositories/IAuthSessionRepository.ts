import type { ICreateAuthSessionInputDTO } from "../../infra/http/dtos/authSession/ICreate.js";
import type { IAuthSessionEntity } from "../entities/authSession.entity.js";

export interface IAuthSessionRepository {
  create(params: ICreateAuthSessionInputDTO): Promise<IAuthSessionEntity>;
}
