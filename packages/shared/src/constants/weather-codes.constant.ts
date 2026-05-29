export type WeatherTone = "clear" | "cloud" | "fog" | "rain" | "snow" | "storm";

export type WeatherCodeEntry = {
  label: string;
  icon: string;
  tone: WeatherTone;
};

export const weatherCodes: Record<number, WeatherCodeEntry> = {
  0: { label: "Clear sky", icon: "sun", tone: "clear" },
  1: { label: "Mainly clear", icon: "sun-cloud", tone: "clear" },
  2: { label: "Partly cloudy", icon: "cloud-sun", tone: "cloud" },
  3: { label: "Overcast", icon: "cloud", tone: "cloud" },
  45: { label: "Fog", icon: "fog", tone: "fog" },
  48: { label: "Rime fog", icon: "fog", tone: "fog" },
  51: { label: "Light drizzle", icon: "drizzle", tone: "rain" },
  53: { label: "Drizzle", icon: "drizzle", tone: "rain" },
  55: { label: "Heavy drizzle", icon: "drizzle", tone: "rain" },
  56: { label: "Freezing drizzle", icon: "drizzle", tone: "rain" },
  57: { label: "Freezing drizzle", icon: "drizzle", tone: "rain" },
  61: { label: "Light rain", icon: "rain", tone: "rain" },
  63: { label: "Rain", icon: "rain", tone: "rain" },
  65: { label: "Heavy rain", icon: "rain", tone: "rain" },
  66: { label: "Freezing rain", icon: "rain", tone: "rain" },
  67: { label: "Freezing rain", icon: "rain", tone: "rain" },
  71: { label: "Light snow", icon: "snow", tone: "snow" },
  73: { label: "Snow", icon: "snow", tone: "snow" },
  75: { label: "Heavy snow", icon: "snow", tone: "snow" },
  77: { label: "Snow grains", icon: "snow", tone: "snow" },
  80: { label: "Rain showers", icon: "rain", tone: "rain" },
  81: { label: "Rain showers", icon: "rain", tone: "rain" },
  82: { label: "Violent showers", icon: "rain", tone: "rain" },
  85: { label: "Snow showers", icon: "snow", tone: "snow" },
  86: { label: "Snow showers", icon: "snow", tone: "snow" },
  95: { label: "Thunderstorm", icon: "storm", tone: "storm" },
  96: { label: "Thunderstorm + hail", icon: "storm", tone: "storm" },
  99: { label: "Thunderstorm + hail", icon: "storm", tone: "storm" },
};
