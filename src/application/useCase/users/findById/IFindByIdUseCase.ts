export interface IFindUserByIdInputUseCase {
  id: string;
}

export interface IFindUserByIdOutputUseCase {
  id: string;
  name: string;
  email: string;
  verified_at: Date | null;
  created_at: Date;
}

export interface IFindUserByIdUseCase {
  execute(
    params: IFindUserByIdInputUseCase,
  ): Promise<IFindUserByIdOutputUseCase>;
}
