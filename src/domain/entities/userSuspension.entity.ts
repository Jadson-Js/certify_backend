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
  userId: string;
  category: (typeof CATEGORY_USER_SUSPENSION)[keyof typeof CATEGORY_USER_SUSPENSION];
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserSuspensionEntity implements IUserSuspensionEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _category: ICATEGORY_USER_SUSPENSION,
    private readonly _details: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) { }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get category(): ICATEGORY_USER_SUSPENSION {
    return this._category;
  }

  get details(): string {
    return this._details;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
