import { WebSocketServerService } from "../websocket/websocket.server";
import { WebSocketAuthHandler } from "../websocket/websocket-auth.handler";
import { WebSocketSubscriptionHandler } from "../websocket/websocket-subscription.handler";
import { EnvironmentService } from "../services/environment.service";

export const createWebSocketAuthHandler = (
  environmentService: EnvironmentService,
) => new WebSocketAuthHandler(environmentService);

export const createWebSocketSubscriptionHandler = () =>
  new WebSocketSubscriptionHandler();

export const createWebSocketServer = (
  authHandler: WebSocketAuthHandler,
  subscriptionHandler: WebSocketSubscriptionHandler,
) => new WebSocketServerService(authHandler, subscriptionHandler);
