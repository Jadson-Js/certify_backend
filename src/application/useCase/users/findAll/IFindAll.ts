export interface IFindAllUsersOutputUseCase {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface IFindAllUsersUseCase {
  execute(): Promise<IFindAllUsersOutputUseCase[]>;
}
