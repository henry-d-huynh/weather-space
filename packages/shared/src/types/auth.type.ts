import { z } from "zod";

export const authPayloadSchema = z.object({
  username: z.string(),
  name: z.string(),
});

export type AuthPayload = z.infer<typeof authPayloadSchema>;

export const loginDataSchema = z.object({
  token: z.string(),
  name: z.string(),
});

export type LoginData = z.infer<typeof loginDataSchema>;
