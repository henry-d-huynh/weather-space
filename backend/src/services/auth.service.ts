import jwt from "jsonwebtoken";
import {
  Result,
  success,
  failure,
  LoginData,
  LoginCredentials,
} from "@weather-space/shared";
import { EnvironmentService } from "./environment.service";
import { UserService } from "./user.service";
import { JWT_EXPIRY } from "../constants/jwt.constant";

export class AuthService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly userService: UserService,
  ) {}

  login({ username, password }: LoginCredentials): Result<LoginData> {
    const jwtSecret = this.environmentService.getJwtSecret();

    if (!jwtSecret) {
      return failure({
        errorMessage: "JWT_SECRET is not configured",
        code: "AuthService.login",
      });
    }

    const user = this.userService.findByUsername(username);

    if (!user || user.password !== password) {
      return failure({
        errorMessage: "Invalid credentials",
        code: "AuthService.login",
      });
    }

    const token = jwt.sign({ username, name: user.name }, jwtSecret, {
      expiresIn: JWT_EXPIRY,
    });

    return success({ token, name: user.name });
  }
}
