import { z } from "zod";

export const messageRequestSchema = z.object({
  city: z.string().min(1, "City is required"),
  message: z.string().min(1, "Message is required"),
});
