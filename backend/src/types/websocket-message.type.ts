import { AuthPayload } from "@weather-space/shared";
import { WebSocket } from "ws";
import { z } from "zod";

export type AppWebSocket = WebSocket & {
  city: string | null;
  user: AuthPayload | null;
  isAlive: boolean;
};

export function isAppWebSocket(ws: WebSocket): ws is AppWebSocket {
  return "isAlive" in ws;
}

export const ClientMessageSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("auth"), token: z.string() }),
  z.object({ type: z.literal("subscribe"), city: z.string() }),
]);
