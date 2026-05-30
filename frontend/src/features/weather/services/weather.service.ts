import type { Result, WeatherData } from "@weather-space/shared";
import { httpService } from "../../../services/http.service";

export const weatherService = {
  async getWeatherByCity(city: string): Promise<Result<WeatherData>> {
    return httpService.get<WeatherData>(
      `/weather?city=${encodeURIComponent(city)}`,
    );
  },
};
