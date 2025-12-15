export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  verified_at: Date | null;
  suspended_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export class UserEntity implements IUserEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password_hash: string,
    private readonly _verified_at: Date | null,
    private readonly _suspended_at: Date | null,
    private readonly _created_at: Date,
    private readonly _updated_at: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password_hash(): string {
    return this._password_hash;
  }

  get verified_at(): Date | null {
    return this._verified_at;
  }

  get suspended_at(): Date | null {
    return this._suspended_at;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
