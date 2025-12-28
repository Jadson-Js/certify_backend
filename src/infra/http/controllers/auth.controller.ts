import { inject, injectable } from 'inversify';
import { TYPES_AUTH } from '../../container/types.js';
import type { ISignupUseCase } from '../../../application/useCase/auth/signup/ISignupUseCase.js';
import type { ILoginUseCase } from '../../../application/useCase/auth/login/ILoginUseCase.js';
import type { Request, Response } from 'express';
import { ok } from '../../../shared/utils/helper.js';
import type { ITokenUseCase } from '../../../application/useCase/auth/token/ITokenUseCase.js';
import { signupPresenter } from '../../../application/presenters/auth/signupPresenter.js';
import { loginPresenter } from '../../../application/presenters/auth/loginPresenter.js';
import type { ILogoutUseCase } from '../../../application/useCase/auth/logout/ILogoutUseCase.js';
import type { IVerifyEmailTokenUseCase } from '../../../application/useCase/auth/verifyEmailToken/IVerifyEmailTokenUseCase.js';
import type { ISendResetPasswordEmailUseCase } from '../../../application/useCase/auth/sendResetPasswordEmail/ISendResetPasswordEmailUseCase.js';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES_AUTH.ISignupUseCase)
    private readonly signupUseCase: ISignupUseCase,

    @inject(TYPES_AUTH.ILoginUseCase)
    private readonly loginUseCase: ILoginUseCase,

    @inject(TYPES_AUTH.ITokenUseCase)
    private readonly tokenUseCase: ITokenUseCase,

    @inject(TYPES_AUTH.ILogoutUseCase)
    private readonly logoutUseCase: ILogoutUseCase,

    @inject(TYPES_AUTH.ISendResetPasswordEmailUseCase)
    private readonly sendResetPasswordEmailUseCase: ISendResetPasswordEmailUseCase,

    @inject(TYPES_AUTH.IVerifyEmailTokenUseCase)
    private readonly verifyEmailTokenUseCase: IVerifyEmailTokenUseCase,
  ) { }

  async signup(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.signupUseCase.execute(input);

    return ok(res, 201, signupPresenter(response));
  }

  async login(req: Request, res: Response) {
    const data = req.body;

    const input = {
      email: data.email,
      password: data.password,
    };

    const response = await this.loginUseCase.execute(input);

    res.cookie('accessToken', response.accessToken.token, {
      expires: response.accessToken.expiresAt,
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', response.refreshToken.token, {
      expires: response.refreshToken.expiresAt,
      httpOnly: true,
      secure: false,
    });

    return ok(res, 200, loginPresenter(response));
  }

  async token(req: Request, res: Response) {
    const { id } = req.authSession;

    const response = await this.tokenUseCase.execute({ authSessionId: id });

    res.cookie('accessToken', response.accessToken.token, {
      expires: response.accessToken.expiresAt,
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', response.refreshToken.token, {
      expires: response.refreshToken.expiresAt,
      httpOnly: true,
      secure: false,
    });

    return ok(res, 200);
  }

  async logout(req: Request, res: Response) {
    const { id } = req.authSession;

    await this.logoutUseCase.execute({ authSessionId: id });

    const cookieOptions = {
      httpOnly: true,
      secure: false,
    };

    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);

    return ok(res, 200);
  }

  async verifyEmailToken(req: Request, res: Response) {
    const { token } = req.body;

    await this.verifyEmailTokenUseCase.execute({ token });

    return ok(res, 200);
  }

  async resetPassword(req: Request, res: Response) {
    const data = req.body;

    const input = {
      email: data.email,
    };

    await this.sendResetPasswordEmailUseCase.execute(input);

    return ok(res, 200);
  }
}
