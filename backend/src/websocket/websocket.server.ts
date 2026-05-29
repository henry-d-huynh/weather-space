import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { AppWebSocket, ClientMessage } from "../types/websocket-message.type";
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

    let count = 0;
    this.webSocketServer.clients.forEach((client) => {
      const appWebSocket = client as AppWebSocket;
      if (
        appWebSocket.readyState === WebSocket.OPEN &&
        appWebSocket.city?.toLowerCase() === city.toLowerCase()
      ) {
        appWebSocket.send(JSON.stringify({ type: "alert", message, city }));
        count++;
      }
    });
    return count;
  }

  private handleMessage(appWebSocket: AppWebSocket, data: string): void {
    try {
      const message = JSON.parse(data) as ClientMessage;

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
        const appWebSocket = client as AppWebSocket;
        if (!appWebSocket.isAlive) return appWebSocket.terminate();
        appWebSocket.isAlive = false;
        appWebSocket.ping();
      });
    }, 30_000);

    this.webSocketServer.on("close", () => clearInterval(interval));
  }
}
