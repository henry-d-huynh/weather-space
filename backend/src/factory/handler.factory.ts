import { AuthHandler } from "../handlers/auth.handler";
import { AuthService } from "../services/auth.service";

export const createAuthHandler = (authService: AuthService) =>
  new AuthHandler(authService);
