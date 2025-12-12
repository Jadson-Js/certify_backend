export interface ILoginInputUseCase {
  email: string;
  password: string;
}

export interface ILoginOutputUseCase {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginUseCase {
  execute(params: ILoginInputUseCase): Promise<ILoginOutputUseCase>;
}
