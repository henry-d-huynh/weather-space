import { z } from "zod";

export const isoDateSchema = z.object({
  type: z.literal("date"),
  format: z.literal("iso8601"), // normally it's a union in case we want to handle epoch values also
  value: z.string(),
});

export type IsoDate = z.infer<typeof isoDateSchema>;
