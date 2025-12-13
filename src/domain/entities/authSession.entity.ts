export interface IAuthSessionEntity {
  id: string;
  user_id: string;
  refresh_token_hash: string;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
}

export class AuthSessionEntity implements IAuthSessionEntity {
  constructor(
    private readonly _id: string,
    private readonly _user_id: string,
    private readonly _refresh_token_hash: string,
    private readonly _expires_at: Date,
    private readonly _revoked_at: Date | null,
    private readonly _created_at: Date,
    private readonly _updated_at: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get refresh_token_hash(): string {
    return this._refresh_token_hash;
  }

  get expires_at(): Date {
    return this._expires_at;
  }

  get revoked_at(): Date | null {
    return this._revoked_at;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
