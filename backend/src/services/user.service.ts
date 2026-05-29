import { User } from "../types/user.type";
import { USERS } from "../constants/users.constant";

export class UserService {
  findByUsername(username: string): User | undefined {
    return USERS[username];
  }
}
