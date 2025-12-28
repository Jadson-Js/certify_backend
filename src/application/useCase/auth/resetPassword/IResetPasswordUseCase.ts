export interface IResetPasswordInputUseCase {
  email: string;
}

export interface IResetPasswordUseCase {
  execute(params: IResetPasswordInputUseCase): Promise<null>;
}
