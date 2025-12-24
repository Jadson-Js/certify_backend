export interface IVerifyEmailTokenInputUseCase {
  token: string;
}

export interface IVerifyEmailTokenUseCase {
  execute(params: IVerifyEmailTokenInputUseCase): Promise<null>;
}
