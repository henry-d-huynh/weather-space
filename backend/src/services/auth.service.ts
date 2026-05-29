import jwt from "jsonwebtoken";
import { Result, success, failure } from "../types/result.type";
import { EnvironmentService } from "./environment.service";
import { UserService } from "./user.service";
import { JWT_EXPIRY } from "../constants/jwt.constant";

export type LoginData = {
  name: string;
  token: string;
};

export class AuthService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly userService: UserService,
  ) {}

  login(username: string, password: string): Result<LoginData> {
    const jwtSecret = this.environmentService.getJwtSecret();

    if (!jwtSecret) {
      return failure("JWT_SECRET is not configured", "AuthService.login");
    }

    const user = this.userService.findByUsername(username);

    if (!user || user.password !== password) {
      return failure("Invalid credentials", "AuthService.login");
    }

    const token = jwt.sign({ username, name: user.name }, jwtSecret, {
      expiresIn: JWT_EXPIRY,
    });

    return success({ token, name: user.name });
  }
}
