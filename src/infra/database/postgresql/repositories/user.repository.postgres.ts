import { injectable } from "inversify";
import { UserEntity } from "../../../../domain/entities/user.entity.js";
import type { IUserRepository } from "../../../../domain/repositories/user.repository.js";

@injectable()
export class UserRepositoryPostgres implements IUserRepository {
  async findAllUsers(): Promise<UserEntity[]> {
    const users: UserEntity[] = [
      new UserEntity(
        "1", // _id
        "admin", // _name
        "123", // _cnpj
        "admin@admin.com", // _email
        "admin123", // _password (hash, idealmente)
        true, // _email_verified
        new Date("2024-10-20T10:00:00Z"), // _created_at
        new Date("2024-10-20T10:00:00Z"), // _updated_at
      ),

      // Você pode adicionar mais instâncias
      new UserEntity(
        "2", // _id
        "user2", // _name
        "456", // _cnpj
        "user2@test.com", // _email
        "pass456", // _password
        false, // _email_verified
        new Date(), // _created_at
        new Date(), // _updated_at
      ),
    ];

    await new Promise((resolve) => setTimeout(resolve, 20));

    // Agora 'users' é um array de UserEntity reais, e o TypeScript fica feliz.
    return users;
  }
}
