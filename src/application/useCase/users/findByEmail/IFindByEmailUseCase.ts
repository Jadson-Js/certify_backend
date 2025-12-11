export interface IFindUserByEmailInputUseCase {
  email: string;
}

export interface IFindUserByEmailOutputUseCase {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface IFindUserByEmailUseCase {
  execute(
    params: IFindUserByEmailInputUseCase,
  ): Promise<IFindUserByEmailOutputUseCase>;
}
