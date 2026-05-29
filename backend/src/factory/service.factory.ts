import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { EnvironmentService } from "../services/environment.service";
import { WeatherService } from "../services/weather.service";
import { HttpService } from "../services/http.service";
import { MessageService } from "../services/message.service";

export const createEnvironmentService = () => new EnvironmentService();

export const createUserService = () => new UserService();

export const createHttpService = () => new HttpService();

export const createMessageService = () => new MessageService();

export const createWeatherService = (httpService: HttpService) =>
  new WeatherService(httpService);

export const createAuthService = (
  environmentService: EnvironmentService,
  userService: UserService,
) => new AuthService(environmentService, userService);
