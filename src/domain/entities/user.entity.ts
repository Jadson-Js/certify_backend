export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UserEntity implements IUserEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _password: string,
    private readonly _email_verified: boolean,
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

  get password(): string {
    return this._password;
  }

  get email_verified(): boolean {
    return this._email_verified;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
