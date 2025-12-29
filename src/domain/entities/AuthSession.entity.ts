export interface IAuthSessionEntity {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isExpired(): boolean;
}

export class AuthSessionEntity implements IAuthSessionEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _refreshTokenHash: string,
    private readonly _expiresAt: Date,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) { }

  // Static factory method
  static from(data: Omit<IAuthSessionEntity, 'isExpired'>): AuthSessionEntity {
    return new AuthSessionEntity(
      data.id,
      data.userId,
      data.refreshTokenHash,
      data.expiresAt,
      data.createdAt,
      data.updatedAt,
    );
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get refreshTokenHash(): string {
    return this._refreshTokenHash;
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

