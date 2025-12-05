import { inject, injectable } from "inversify";
import { TYPES_AUTH } from "../../container/types.js";
import type { ISignupUseCase } from "../../../application/useCase/auth/signup/ISignupUseCase.js";
import type { ILoginUseCase } from "../../../application/useCase/auth/login/ILoginUseCase.js";
import type { Request, Response } from "express";
import { ok } from "../../../shared/utils/helper.js";


@injectable()
export class AuthController {
  constructor(
    @inject(TYPES_AUTH.ISignupUseCase)
    private readonly signupUseCase: ISignupUseCase,

    @inject(TYPES_AUTH.ILoginUseCase)
    private readonly loginUseCase: ILoginUseCase,
  ) {}

  async signup(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.signupUseCase.execute(input);

    return ok(res, 201, "Signup successfully", response);
  }

  async login(req: Request, res: Response) {
    const data = req.body;

    const input = {
      email: data.email,
      password: data.password,
    };

    const response = await this.loginUseCase.execute(input);

    return ok(res, 200, "Login successfully", response);
  }
}
