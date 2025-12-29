export interface IEmailVerificationTokenEntity {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class EmailVerificationTokenEntity implements IEmailVerificationTokenEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _tokenHash: string,
    private readonly _expiresAt: Date,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) { }

  // Static factory method
  static from(data: IEmailVerificationTokenEntity): EmailVerificationTokenEntity {
    return new EmailVerificationTokenEntity(
      data.id,
      data.userId,
      data.tokenHash,
      data.expiresAt,
      data.createdAt,
      data.updatedAt,
    );
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get tokenHash(): string {
    return this._tokenHash;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Domain logic methods
  isExpired(): boolean {
    return new Date() > this._expiresAt;
  }
}

