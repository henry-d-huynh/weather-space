import { z } from "zod";

// NTS: Keep all preoperties in lowercase, it's what the open-meto api returns unfortunately lol
export const currentWeatherSchema = z.object({
  temperature: z.number(),
  windspeed: z.number(),
  weathercode: z.number(),
  is_day: z.number(),
});

export const weatherResponseSchema = z.object({
  current_weather: currentWeatherSchema,
});

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;
export type WeatherResponse = z.infer<typeof weatherResponseSchema>;

export type WeatherData = {
  city: string;
  country: string;
  temperature: number;
  windspeed: number;
  weatherCode: number;
  description: string;
  isDay: boolean;
};
