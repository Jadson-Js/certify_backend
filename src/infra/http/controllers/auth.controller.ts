import { inject, injectable } from 'inversify';
import { TYPES_AUTH } from '../../container/types.js';
import type { ISignupUseCase } from '../../../application/useCase/auth/signup/ISignupUseCase.js';
import type { ILoginUseCase } from '../../../application/useCase/auth/login/ILoginUseCase.js';
import type { Request, Response } from 'express';
import { ok } from '../../../shared/utils/helper.js';
import type { ITokenUseCase } from '../../../application/useCase/auth/token/ITokenUseCase.js';
import { signupPresenter } from '../../../application/presenters/auth/signupPresenter.js';
import { loginPresenter } from '../../../application/presenters/auth/loginPresenter.js';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES_AUTH.ISignupUseCase)
    private readonly signupUseCase: ISignupUseCase,

    @inject(TYPES_AUTH.ILoginUseCase)
    private readonly loginUseCase: ILoginUseCase,

    @inject(TYPES_AUTH.ITokenUseCase)
    private readonly tokenUseCase: ITokenUseCase,
  ) {}

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
    const data = req.body;

    const input = {
      refreshToken: data.refreshToken,
    };

    const response = await this.tokenUseCase.execute(input);

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
}
