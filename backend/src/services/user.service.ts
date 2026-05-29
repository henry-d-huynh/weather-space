import { USERS } from "../config";
import { User } from "../types/user.type";

export class UserService {
  findByUsername(username: string): User | undefined {
    return USERS[username];
  }
}
