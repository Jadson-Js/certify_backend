export interface ISignupInputUseCase {
  name: string;
  email: string;
  password: string;
}

export interface ISignupOutputUseCase {
  id: string;
  email: string;
}

export interface ISignupUseCase {
  execute(params: ISignupInputUseCase): Promise<ISignupOutputUseCase>;
}
