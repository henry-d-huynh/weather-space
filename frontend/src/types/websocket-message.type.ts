import { z } from "zod";

export const webSocketMessageSchema = z.union([
  z.object({ type: z.literal("auth"), status: z.literal("ok") }),
  z.object({
    type: z.literal("auth"),
    status: z.literal("error"),
    error: z.string(),
  }),
  z.object({ type: z.literal("subscribed"), city: z.string() }),
  z.object({ type: z.literal("alert"), message: z.string(), city: z.string() }),
]);

export type WebSocketMessage = z.infer<typeof webSocketMessageSchema>;
