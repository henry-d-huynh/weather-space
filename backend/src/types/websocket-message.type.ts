import { AuthPayload } from "./auth-payload.type";
import { WebSocket } from "ws";

export type AppWebSocket = WebSocket & {
  city: string | null;
  user: AuthPayload | null;
  isAlive: boolean;
};

export type ClientMessage =
  | { type: "auth"; token: string }
  | { type: "subscribe"; city: string };

export type ServerMessage =
  | { type: "auth"; status: "ok" }
  | { type: "auth"; status: "error"; error: string }
  | { type: "subscribed"; city: string }
  | { type: "alert"; message: string; city: string };
