import { inject, injectable } from "inversify";
import type { ILoginUseCase } from "./ILoginUseCase.js";
import { TYPES_AUTH, TYPES_USER } from "../../../../infra/container/types.js";
import type { IEncryptService } from "../../../../domain/services/IEncryptService.js";
import type {
  ILoginInputDTO,
  ILoginOutputDTO,
} from "../../../../infra/http/dtos/auth/ILogin.js";
import {
  NotFoundError,
  UnauthorizedError,
} from "../../../../shared/error/AppError.js";
import type { IJwtService } from "../../../../domain/services/IJwtService.js";
import { toDTO } from "./mapper.js";
import type { IUserRepository } from "../../../../domain/repositories/IUserRepository.js";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES_USER.IUserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES_AUTH.IEncryptService)
    private readonly encryptService: IEncryptService,

    @inject(TYPES_AUTH.IJwtService)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(params: ILoginInputDTO): Promise<ILoginOutputDTO> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail({ email });

    if (!user) {
      throw new NotFoundError(`User not found by email: ${email}`);
    }

    const validPassword = await this.encryptService.compare(
      password,
      user.password_hash,
    );

    if (!validPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const accessToken = this.jwtService.generateAccessToken({ user_id: user.id });

    const authSession = 
  
    // const refreshToken = this.jwtService.generateRefreshToken({ auth_session_id: authSession.id });

    // refreshTokenHash  = hash para encriptografar o refreshToken

    // authSession.refresh_token_hash

    // repository para criar auth_session enviando o authSession

    return toDTO(user, accessToken, "refreshToken");
  }
}
