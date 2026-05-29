import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, USERS } from "../config";
import { Result, success, failure } from "../types/result.type";

export type LoginData = {
  name: string;
  token: string;
};

export class AuthService {
  login(username: string, password: string): Result<LoginData> {
    if (!JWT_SECRET) {
      return failure("JWT_SECRET is not configured");
    }

    const user = USERS[username];

    if (!user || user.password !== password) {
      return failure("Invalid credentials");
    }

    const token = jwt.sign({ username, name: user.name }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return success({ token, name: user.name });
  }
}
