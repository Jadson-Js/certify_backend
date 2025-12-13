export interface ILoginInputUseCase {
  email: string;
  password: string;
}

export interface ILoginOutputUseCase {
  accessToken: {
    token: string;
    expiresAt: Date;
  };
  refreshToken: {
    token: string;
    expiresAt: Date;
  };
  user: {
    id: string;
    name: string;
  };
}

export interface ILoginUseCase {
  execute(params: ILoginInputUseCase): Promise<ILoginOutputUseCase>;
}
