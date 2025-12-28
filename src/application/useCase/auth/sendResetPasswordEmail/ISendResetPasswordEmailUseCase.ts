export interface ISendResetPasswordEmailInputUseCase {
  email: string;
}

export interface ISendResetPasswordEmailUseCase {
  execute(params: ISendResetPasswordEmailInputUseCase): Promise<null>;
}
