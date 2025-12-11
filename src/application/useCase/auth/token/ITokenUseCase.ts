export interface ITokenInputUseCase {
  refreshToken: string;
}

export interface ITokenOutputUseCase {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenUseCase {
  execute(params: ITokenInputUseCase): Promise<ITokenOutputUseCase>;
}
