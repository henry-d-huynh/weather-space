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

export const authenticatedUserSchema = loginDataSchema.extend({
  username: z.string(),
});

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;

export const loginCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
