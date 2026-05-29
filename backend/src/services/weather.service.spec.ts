import { WeatherService } from "./weather.service";
import { HttpService } from "./http.service";
import { mock, when, instance, reset, anything } from "ts-mockito";
import {
  assertSuccessResult,
  assertFailureResult,
} from "../utility/test-helper.utility";
import { WeatherData } from "../types/weather.type";
import { weatherCodes } from "@weather-space/shared";

const mockGeoResponseResult = {
  name: "Melbourne",
  country: "Australia",
  latitude: -37.81,
  longitude: 144.96,
};

const mockGeoResponse = {
  results: [mockGeoResponseResult],
};

const mockWeatherResponse = {
  current: {
    temperature_2m: 18.5,
    wind_speed_10m: 12.3,
    weather_code: 2,
    is_day: 1,
  },
};

const mockHttpService = mock(HttpService);

describe("WeatherService", () => {
  beforeEach(() => {
    reset(mockHttpService);
  });

  describe("getWeatherByCity", () => {
    it("should return weather data for a valid city", async () => {
      when(mockHttpService.get(anything()))
        .thenResolve({ success: true, data: mockGeoResponse })
        .thenResolve({ success: true, data: mockWeatherResponse });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      const expectedResult: WeatherData = {
        city: mockGeoResponseResult.name,
        country: mockGeoResponseResult.country,
        temperature: mockWeatherResponse.current.temperature_2m,
        windSpeed: mockWeatherResponse.current.wind_speed_10m,
        weatherCode: mockWeatherResponse.current.weather_code,
        description:
          weatherCodes[mockWeatherResponse.current.weather_code].label,
        isDay: mockWeatherResponse.current.is_day === 1,
      };

      assertSuccessResult(result);
      expect(result.data).toEqual(expectedResult);
    });

    it("should return undefined description for unknown weather code", async () => {
      const unknownWeatherResponse = {
        current: {
          temperature_2m: 18.5,
          wind_speed_10m: 12.3,
          weather_code: 999,
          is_day: 1,
        },
      };

      when(mockHttpService.get(anything()))
        .thenResolve({ success: true, data: mockGeoResponse })
        .thenResolve({ success: true, data: unknownWeatherResponse });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      const expectedResult: WeatherData = {
        city: mockGeoResponseResult.name,
        country: mockGeoResponseResult.country,
        temperature: unknownWeatherResponse.current.temperature_2m,
        windSpeed: unknownWeatherResponse.current.wind_speed_10m,
        weatherCode: unknownWeatherResponse.current.weather_code,
        description:
          weatherCodes[unknownWeatherResponse.current.weather_code].label,
        isDay: unknownWeatherResponse.current.is_day === 1,
      };

      assertSuccessResult(result);
      expect(result.data).toEqual(expectedResult);
    });

    it("should return a failure when geocoding request fails", async () => {
      when(mockHttpService.get(anything())).thenResolve({
        success: false,
        errorMessage: "GET request failed",
        code: "HttpService.get",
      });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      assertFailureResult(result);
      expect(result.code).toBe("HttpService.get");
    });

    it("should return a failure when geo response is invalid", async () => {
      when(mockHttpService.get(anything())).thenResolve({
        success: true,
        data: { unexpected: "shape" },
      });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      assertFailureResult(result);
      expect(result.code).toBe("WeatherService.fetchGeoData");
      expect(result.context).toBeDefined();
    });

    it("should return a failure when city is not found", async () => {
      when(mockHttpService.get(anything())).thenResolve({
        success: true,
        data: { results: [] },
      });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("UnknownCity");

      assertFailureResult(result);
      expect(result.errorMessage).toBe('City "UnknownCity" not found');
      expect(result.code).toBe("WeatherService.getWeatherByCity");
    });

    it("should return a failure when weather request fails", async () => {
      when(mockHttpService.get(anything()))
        .thenResolve({ success: true, data: mockGeoResponse })
        .thenResolve({
          success: false,
          errorMessage: "GET request failed",
          code: "HttpService.get",
        });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      assertFailureResult(result);
      expect(result.code).toBe("HttpService.get");
    });

    it("should return a failure when weather response is invalid", async () => {
      when(mockHttpService.get(anything()))
        .thenResolve({ success: true, data: mockGeoResponse })
        .thenResolve({ success: true, data: { unexpected: "shape" } });

      const weatherService = new WeatherService(instance(mockHttpService));
      const result = await weatherService.getWeatherByCity("Melbourne");

      assertFailureResult(result);
      expect(result.code).toBe("WeatherService.fetchWeatherData");
      expect(result.context).toBeDefined();
    });
  });
});
