import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { EnvironmentService } from "../services/environment.service";

const userService = new UserService();
const environmentService = new EnvironmentService();

export const createAuthService = () =>
  new AuthService(environmentService, userService);
