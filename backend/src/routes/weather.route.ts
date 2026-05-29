import { Router } from "express";
import { WeatherHandler } from "../handlers/weather.handler";

export function createWeatherRouter(weatherHandler: WeatherHandler): Router {
  const router = Router();

  router.get("/", (request, response) =>
    weatherHandler.getWeatherByCity(request, response),
  );

  return router;
}
