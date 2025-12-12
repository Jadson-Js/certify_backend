export interface IFindUserByEmailInputUseCase {
  email: string;
}

export interface IFindUserByEmailOutputUseCase {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IFindUserByEmailUseCase {
  execute(
    params: IFindUserByEmailInputUseCase,
  ): Promise<IFindUserByEmailOutputUseCase>;
}
