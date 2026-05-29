import { z } from "zod";

export const weatherRequestSchema = z.object({
  city: z.string().min(1, "City is required"),
});
