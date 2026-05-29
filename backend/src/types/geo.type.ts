import { z } from "zod";

export const geoResultSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  country: z.string(),
});

export const geoResponseSchema = z.object({
  results: z.array(geoResultSchema).optional(),
});

export type GeoResult = z.infer<typeof geoResultSchema>;
export type GeoResponse = z.infer<typeof geoResponseSchema>;
