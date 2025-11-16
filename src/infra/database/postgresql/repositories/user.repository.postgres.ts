import { injectable } from "inversify";
import { UserEntity } from "../../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAllUsers(): Promise<UserEntity[]> {
    const users: UserEntity[] = [
      new UserEntity(
        "1",
        "admin",
        "123",
        "admin@admin.com",
        "admin123", // _password (hash,
        true,
        new Date("2024-10-20T10:00:00Z"),
        new Date("2024-10-20T10:00:00Z"),
      ),
      new UserEntity(
        "2",
        "user",
        "456",
        "user@user.com",
        "user123",
        true,
        new Date(),
        new Date(),
      ),
    ];

    await new Promise((resolve) => setTimeout(resolve, 20));

    return users;
  }
}
