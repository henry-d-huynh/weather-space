import express from "express";
import cors from "cors";
import { createAuthRouter } from "./routes/auth.route";
import { createWeatherRouter } from "./routes/weather.route";
import { createMessageRouter } from "./routes/message.route";
import { AuthHandler } from "./handlers/auth.handler";
import { WeatherHandler } from "./handlers/weather.handler";
import { MessageHandler } from "./handlers/message.handler";
import { AuthMiddleware } from "./middleware/auth.middleware";

type AppDependencies = {
  authHandler: AuthHandler;
  weatherHandler: WeatherHandler;
  messageHandler: MessageHandler;
  authMiddleware: AuthMiddleware;
};

export function createApp(dependencies: AppDependencies) {
  const { authHandler, weatherHandler, messageHandler, authMiddleware } =
    dependencies;

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", createAuthRouter(authHandler));

  app.use(
    "/api/weather",
    (request, response, next) =>
      authMiddleware.authenticate(request, response, next),
    createWeatherRouter(weatherHandler),
  );
  app.use(
    "/api/message",
    (request, response, next) =>
      authMiddleware.authenticate(request, response, next),
    createMessageRouter(messageHandler),
  );

  app.get("/health", (_request, response) => response.json({ status: "ok" }));

  return app;
}
