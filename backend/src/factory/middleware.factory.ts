import { EnvironmentService } from "../services/environment.service";
import { AuthMiddleware } from "../middleware/auth.middleware";

export const createAuthMiddleware = (environmentService: EnvironmentService) =>
  new AuthMiddleware(environmentService);
