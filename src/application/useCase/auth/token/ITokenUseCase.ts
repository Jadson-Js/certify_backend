export interface ITokenInputUseCase {
  refreshToken: string;
}

export interface ITokenOutputUseCase {
  accessToken: {
    token: string;
    expiresAt: Date;
  };
  refreshToken: {
    token: string;
    expiresAt: Date;
  };
}

export interface ITokenUseCase {
  execute(params: ITokenInputUseCase): Promise<ITokenOutputUseCase>;
}
