import "dotenv/config";
import http from "http";
import { createApp } from "./app";
import {
  createEnvironmentService,
  createUserService,
  createHttpService,
  createMessageService,
  createAuthService,
  createWeatherService,
} from "./factory/service.factory";
import {
  createAuthHandler,
  createWeatherHandler,
  createMessageHandler,
} from "./factory/handler.factory";
import { createAuthMiddleware } from "./factory/middleware.factory";
import {
  createWebSocketAuthHandler,
  createWebSocketSubscriptionHandler,
  createWebSocketServer,
} from "./factory/websocket.factory";

// Services
const environmentService = createEnvironmentService();
const userService = createUserService();
const httpService = createHttpService();
const messageService = createMessageService();
const authService = createAuthService(environmentService, userService);
const weatherService = createWeatherService(httpService);

// WebSocket
const webSocketAuthHandler = createWebSocketAuthHandler(environmentService);
const webSocketSubscriptionHandler = createWebSocketSubscriptionHandler();
const webSocketServerService = createWebSocketServer(
  webSocketAuthHandler,
  webSocketSubscriptionHandler,
);

// Middleware
const authMiddleware = createAuthMiddleware(environmentService);

// Handlers
const authHandler = createAuthHandler(authService);
const weatherHandler = createWeatherHandler(weatherService);
const messageHandler = createMessageHandler(
  messageService,
  webSocketServerService,
);

// App
const app = createApp({
  authHandler,
  weatherHandler,
  messageHandler,
  authMiddleware,
});
const httpServer = http.createServer(app);

webSocketServerService.init(httpServer);

const PORT = environmentService.getPort();

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
