import { z } from "zod";

// NTS: Keep all preoperties in lowercase, it's what the open-meto api returns unfortunately lol
export const CurrentWeatherSchema = z.object({
  temperature: z.number(),
  windspeed: z.number(),
  weathercode: z.number(),
  is_day: z.number(),
});

export const WeatherResponseSchema = z.object({
  current_weather: CurrentWeatherSchema,
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;
export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  windspeed: number;
  weatherCode: number;
  description: string;
  isDay: boolean;
};
