import { AuthHandler } from "../handlers/auth.handler";
import { AuthService } from "../services/auth.service";
import { WeatherService } from "../services/weather.service";
import { WeatherHandler } from "../handlers/weather.handler";
import { MessageService } from "../services/message.service";
import { MessageHandler } from "../handlers/message.handler";
import { WebSocketServerService } from "../websocket/websocket.server";

export const createAuthHandler = (authService: AuthService) =>
  new AuthHandler(authService);

export const createWeatherHandler = (weatherService: WeatherService) =>
  new WeatherHandler(weatherService);

export const createMessageHandler = (
  messageService: MessageService,
  webSocketServerService: WebSocketServerService,
) => new MessageHandler(messageService, webSocketServerService);
