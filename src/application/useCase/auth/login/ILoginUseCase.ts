import type {
  AuthSessionEntity,
  IAuthSessionEntity,
} from "../../../../domain/entities/authSession.entity.js";
import type { IUserEntity } from "../../../../domain/entities/user.entity.js";
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from "../../../../infra/http/dtos/auth/ILogin.js";

export interface ILoginUseCase {
  execute(params: ILoginInputDTO): Promise<ILoginOutputDTO>;
  generateTokens(
    user: IUserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  createAuthSession(
    data: IAuthSessionEntity,
    refreshToken: { token: string; expires_at: Date },
  ): Promise<null>;
}
