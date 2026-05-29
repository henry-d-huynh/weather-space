import { Request, Response } from "express";
import { WeatherService } from "../services/weather.service";
import { weatherRequestSchema } from "../types/weather-request.type";

export class WeatherHandler {
  constructor(private readonly weatherService: WeatherService) {}

  async getWeatherByCity(request: Request, response: Response): Promise<void> {
    const parseResult = weatherRequestSchema.safeParse(request.query);

    if (!parseResult.success) {
      response.status(400).json({ error: parseResult.error.message });
      return;
    }

    const { city } = parseResult.data;
    const result = await this.weatherService.getWeatherByCity(city);

    if (!result.success) {
      response.status(500).json({ error: result.errorMessage });
      return;
    }

    response.status(200).json(result.data);
  }
}
