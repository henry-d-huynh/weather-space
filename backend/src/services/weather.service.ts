import { Result, success, failure } from "../types/result.type";
import { geoResponseSchema, GeoResponse } from "../types/geo.type";
import {
  weatherResponseSchema,
  WeatherData,
  WeatherResponse,
} from "../types/weather.type";
import { weatherDescriptions } from "../constants/weather-descriptions.constant";
import { HttpService } from "./http.service";

export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherByCity(city: string): Promise<Result<WeatherData>> {
    const geoResult = await this.fetchGeoData(city);

    if (!geoResult.success) {
      return geoResult;
    }

    if (!geoResult.data.results.length) {
      return failure({
        errorMessage: `City "${city}" not found`,
        code: "WeatherService.getWeatherByCity",
      });
    }

    const { latitude, longitude, name, country } = geoResult.data.results[0];

    const weatherResult = await this.fetchWeatherData(latitude, longitude);

    if (!weatherResult.success) {
      return weatherResult;
    }

    const current = weatherResult.data.current;

    return success({
      city: name,
      country,
      temperature: current.temperature_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      description: weatherDescriptions[current.weather_code],
      isDay: current.is_day === 1,
    });
  }

  private async fetchGeoData(city: string): Promise<Result<GeoResponse>> {
    const result = await this.httpService.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    );

    if (!result.success) {
      return result;
    }

    const parseResult = geoResponseSchema.safeParse(result.data);

    if (!parseResult.success) {
      return failure({
        errorMessage: parseResult.error.message,
        code: "WeatherService.fetchGeoData",
        context: parseResult.error,
      });
    }

    return success(parseResult.data);
  }

  private async fetchWeatherData(
    latitude: number,
    longitude: number,
  ): Promise<Result<WeatherResponse>> {
    const units = [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "is_day",
    ];

    const unitsFormatted = units.join(",");

    const result = await this.httpService.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${unitsFormatted}`,
    );

    if (!result.success) {
      return result;
    }

    const parseResult = weatherResponseSchema.safeParse(result.data);

    if (!parseResult.success) {
      return failure({
        errorMessage: parseResult.error.message,
        code: "WeatherService.fetchWeatherData",
        context: parseResult.error,
      });
    }

    return success(parseResult.data);
  }
}
