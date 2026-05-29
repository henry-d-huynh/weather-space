import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import {
  AppWebSocket,
  ClientMessageSchema,
  isAppWebSocket,
} from "../types/websocket-message.type";
import { WebSocketAuthHandler } from "./websocket-auth.handler";
import { WebSocketSubscriptionHandler } from "./websocket-subscription.handler";

export class WebSocketServerService {
  private webSocketServer: WebSocketServer | null = null;

  constructor(
    private readonly authHandler: WebSocketAuthHandler,
    private readonly subscriptionHandler: WebSocketSubscriptionHandler,
  ) {}

  init(httpServer: Server): void {
    this.webSocketServer = new WebSocketServer({ server: httpServer });

    this.webSocketServer.on("connection", (appWebSocket: AppWebSocket) => {
      appWebSocket.city = null;
      appWebSocket.user = null;
      appWebSocket.isAlive = true;

      appWebSocket.on("message", (data) =>
        this.handleMessage(appWebSocket, data.toString()),
      );
      appWebSocket.on("pong", () => {
        appWebSocket.isAlive = true;
      });
      appWebSocket.on("error", console.error);
    });

    this.startHeartbeat();

    console.log("WebSocket server ready");
  }

  broadcastToCity(city: string, message: string): number {
    if (!this.webSocketServer) return 0;

    const targets = Array.from(this.webSocketServer.clients).filter(
      (client): client is AppWebSocket => {
        if (!isAppWebSocket(client)) return false;
        if (client.readyState !== WebSocket.OPEN) return false;
        return client.city?.toLowerCase() === city.toLowerCase();
      },
    );

    targets.forEach((client) =>
      client.send(JSON.stringify({ type: "alert", message, city })),
    );

    return targets.length;
  }

  private handleMessage(appWebSocket: AppWebSocket, data: string): void {
    try {
      const result = ClientMessageSchema.safeParse(JSON.parse(data));

      if (!result.success) return;

      const message = result.data;

      if (message.type === "auth") {
        this.authHandler.handle(appWebSocket, message.token);
      }

      if (message.type === "subscribe" && appWebSocket.user) {
        this.subscriptionHandler.handle(appWebSocket, message.city);
      }
    } catch {}
  }

  private startHeartbeat(): void {
    if (!this.webSocketServer) return;

    const interval = setInterval(() => {
      this.webSocketServer!.clients.forEach((client) => {
        if (!isAppWebSocket(client)) return;
        if (!client.isAlive) return client.terminate();
        client.isAlive = false;
        client.ping();
      });
    }, 30_000);

    this.webSocketServer.on("close", () => clearInterval(interval));
  }
}
