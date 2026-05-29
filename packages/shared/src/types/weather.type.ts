import { z } from "zod";

export const currentWeatherSchema = z.object({
  temperature_2m: z.number(),
  wind_speed_10m: z.number(),
  weather_code: z.number(),
  is_day: z.number(),
});

export const weatherResponseSchema = z.object({
  current: currentWeatherSchema,
});

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  description: string | undefined;
  isDay: boolean;
};
