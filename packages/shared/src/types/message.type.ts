import { isoDateSchema } from "./iso-date.type";
import { z } from "zod";

const messageSchema = z.object({
  city: z.string(),
  message: z.string(),
  timestamp: isoDateSchema,
});

export type Message = z.infer<typeof messageSchema>;

const sendMessageRequestSchema = z.object({
  city: z.string(),
  message: z.string(),
});

export type SendMessageRequest = z.infer<typeof sendMessageRequestSchema>;
