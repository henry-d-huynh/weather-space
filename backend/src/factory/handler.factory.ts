import { AuthHandler } from "../handlers/auth.handler";
import { AuthService } from "../services/auth.service";
import { WeatherService } from "../services/weather.service";
import { WeatherHandler } from "../handlers/weather.handler";
import { MessageService } from "../services/message.service";
import { MessageHandler } from "../handlers/message.handler";

export const createAuthHandler = (authService: AuthService) =>
  new AuthHandler(authService);

export const createWeatherHandler = (weatherService: WeatherService) =>
  new WeatherHandler(weatherService);

export const createMessageHandler = (messageService: MessageService) =>
  new MessageHandler(messageService);
