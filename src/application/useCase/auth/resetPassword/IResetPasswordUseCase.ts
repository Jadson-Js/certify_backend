export interface IResetPasswordInputUseCase {
  token: string;
  password: string;
}

export interface IResetPasswordUseCase {
  execute(params: IResetPasswordInputUseCase): Promise<null>;
}
