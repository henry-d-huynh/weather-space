import { z } from "zod";

export const GeoResultSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  country: z.string(),
});

export const GeoResponseSchema = z.object({
  results: z.array(GeoResultSchema).optional(),
});

export type GeoResult = z.infer<typeof GeoResultSchema>;
export type GeoResponse = z.infer<typeof GeoResponseSchema>;
