export interface IAuthSessionEntity {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthSessionEntity implements IAuthSessionEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _refreshTokenHash: string,
    private readonly _expiresAt: Date,
    private readonly _revokedAt: Date | null,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

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

  get revokedAt(): Date | null {
    return this._revokedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
