import { WeatherHandler } from "./weather.handler";
import { WeatherService } from "../services/weather.service";
import { mock, when, instance, reset, anything } from "ts-mockito";
import { WeatherData } from "../types/weather.type";
import { weatherDescriptions } from "../constants/weather-descriptions.constant";

const mockWeatherService = mock(WeatherService);

const mockCity = "Melbourne";

const mockWeatherData: WeatherData = {
  city: mockCity,
  country: "Australia",
  temperature: 18.5,
  windSpeed: 12.3,
  weatherCode: 2,
  description: weatherDescriptions[2],
  isDay: true,
};

const mockRequest = (query: unknown) => ({ query }) as any;
const mockResponse = () => {
  const response: any = {};
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
};

describe("WeatherHandler", () => {
  beforeEach(() => {
    reset(mockWeatherService);
  });

  describe("getWeatherByCity", () => {
    it("should return 200 with weather data for a valid city", async () => {
      when(mockWeatherService.getWeatherByCity(anything())).thenResolve({
        success: true,
        data: mockWeatherData,
      });

      const handler = new WeatherHandler(instance(mockWeatherService));
      const request = mockRequest({ city: mockCity });
      const response = mockResponse();

      await handler.getWeatherByCity(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(mockWeatherData);
    });

    it("should return 400 when city is missing", async () => {
      const handler = new WeatherHandler(instance(mockWeatherService));
      const request = mockRequest({});
      const response = mockResponse();

      await handler.getWeatherByCity(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 when city is empty", async () => {
      const handler = new WeatherHandler(instance(mockWeatherService));
      const request = mockRequest({ city: "" });
      const response = mockResponse();

      await handler.getWeatherByCity(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 500 when weather service fails", async () => {
      when(mockWeatherService.getWeatherByCity(anything())).thenResolve({
        success: false,
        errorMessage: "Failed to fetch weather data",
        code: "WeatherService.getWeatherByCity",
      });

      const handler = new WeatherHandler(instance(mockWeatherService));
      const request = mockRequest({ city: mockCity });
      const response = mockResponse();

      await handler.getWeatherByCity(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: "Failed to fetch weather data",
      });
    });
  });
});
