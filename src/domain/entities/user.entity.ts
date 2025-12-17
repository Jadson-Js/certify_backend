export interface IUserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  verifiedAt: Date | null;
  suspendedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity implements IUserEntity {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _email: string,
    private readonly _passwordHash: string,
    private readonly _verifiedAt: Date | null,
    private readonly _suspendedAt: Date | null,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) { }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get verifiedAt(): Date | null {
    return this._verifiedAt;
  }

  get suspendedAt(): Date | null {
    return this._suspendedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
