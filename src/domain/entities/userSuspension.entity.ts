export const CATEGORY_USER_SUSPENSION = {
  SUSPECT: 'SUSPECT',
  FRAUD: 'FRAUD',
  SPAM: 'SPAM',
  ABUSE: 'ABUSE',
} as const;
export type ICATEGORY_USER_SUSPENSION =
  (typeof CATEGORY_USER_SUSPENSION)[keyof typeof CATEGORY_USER_SUSPENSION];

export interface IUserSuspensionEntity {
  id: string;
  user_id: string;
  category: (typeof CATEGORY_USER_SUSPENSION)[keyof typeof CATEGORY_USER_SUSPENSION];
  details: string;
  created_at: Date;
  updated_at: Date;
}

export class UserSuspensionEntity implements IUserSuspensionEntity {
  constructor(
    private readonly _id: string,
    private readonly _user_id: string,
    private readonly _category: ICATEGORY_USER_SUSPENSION,
    private readonly _details: string,
    private readonly _created_at: Date,
    private readonly _updated_at: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get category(): ICATEGORY_USER_SUSPENSION {
    return this._category;
  }

  get details(): string {
    return this._details;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }
}
