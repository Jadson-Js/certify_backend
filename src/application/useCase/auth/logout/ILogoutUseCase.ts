export interface ILogoutInputUseCase {
  authSessionId: string;
}

export interface ILogoutUseCase {
  execute(params: ILogoutInputUseCase): Promise<void>;
}
