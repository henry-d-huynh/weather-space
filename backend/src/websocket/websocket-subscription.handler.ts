import { AppWebSocket } from "../types/websocket-message.type";

export class WebSocketSubscriptionHandler {
  handle(appWebSocket: AppWebSocket, city: string): void {
    appWebSocket.city = city;
    appWebSocket.send(JSON.stringify({ type: "subscribed", city }));
  }
}
