import { inject, injectable } from "inversify";
import { TYPES_AUTH } from "../../container/types.js";
import type { Request, Response } from "express";
import type { ISignupUseCase } from "../../../application/useCase/auth/signup/ISignupUseCase.js";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES_AUTH.ISignupUseCase)
    private readonly signupUseCase: ISignupUseCase,
  ) {}

  async signup(req: Request, res: Response) {
    const data = req.body;

    const input = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await this.signupUseCase.execute(input);

    return res.status(201).json(response);
  }
}
