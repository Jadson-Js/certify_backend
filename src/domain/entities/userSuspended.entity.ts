export const CATEGORY_USER_SUSPENDED = {
  SUSPECT: 'SUSPECT',
  FRAUD: 'FRAUD',
  SPAM: 'SPAM',
  ABUSE: 'ABUSE',
} as const;
export type ICATEGORY_USER_SUSPENDED =
  (typeof CATEGORY_USER_SUSPENDED)[keyof typeof CATEGORY_USER_SUSPENDED];

export interface IUserSuspendedEntity {
  id: string;
  userId: string;
  category: (typeof CATEGORY_USER_SUSPENDED)[keyof typeof CATEGORY_USER_SUSPENDED];
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserSuspendedEntity implements IUserSuspendedEntity {
  constructor(
    private readonly _id: string,
    private readonly _userId: string,
    private readonly _category: ICATEGORY_USER_SUSPENDED,
    private readonly _details: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) { }

  // Static factory method
  static from(data: IUserSuspendedEntity): UserSuspendedEntity {
    return new UserSuspendedEntity(
      data.id,
      data.userId,
      data.category,
      data.details,
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

  get category(): ICATEGORY_USER_SUSPENDED {
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