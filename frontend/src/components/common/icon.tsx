import type { FunctionComponent, ReactElement, SVGProps } from "react";

type WeatherIconName =
  | "cloud"
  | "cloud-moon"
  | "cloud-sun"
  | "drizzle"
  | "fog"
  | "moon"
  | "rain"
  | "snow"
  | "storm"
  | "sun"
  | "sun-cloud"
  | "wind";

type NavigationIconName =
  | "bell"
  | "chevron-down"
  | "logout"
  | "pin"
  | "search"
  | "send"
  | "x";

type WeatherStatsIconName = "droplet" | "gauge" | "thermometer";

type GeneralIconName = "check" | "circle" | "plus";

export type IconName =
  | WeatherIconName
  | NavigationIconName
  | WeatherStatsIconName
  | GeneralIconName;

const weatherIcons = import.meta.glob<{
  default: FunctionComponent<SVGProps<SVGSVGElement>>;
}>("../../assets/icons/weather/*.svg", { eager: true, query: "?react" });

const navigationIcons = import.meta.glob<{
  default: FunctionComponent<SVGProps<SVGSVGElement>>;
}>("../../assets/icons/navigation/*.svg", { eager: true, query: "?react" });

const weatherStatsIcons = import.meta.glob<{
  default: FunctionComponent<SVGProps<SVGSVGElement>>;
}>("../../assets/icons/weather-stats/*.svg", { eager: true, query: "?react" });

const generalIcons = import.meta.glob<{
  default: FunctionComponent<SVGProps<SVGSVGElement>>;
}>("../../assets/icons/general/*.svg", { eager: true, query: "?react" });

// Normally I would use Fontawesome, but for demo purposes I downloaded the required ones to use instead
// so you wouldn't have to provision your own API key
const iconMap: Record<IconName, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  // Weather
  cloud: weatherIcons["../../assets/icons/weather/cloud.svg"].default,
  "cloud-moon":
    weatherIcons["../../assets/icons/weather/cloud-moon.svg"].default,
  "cloud-sun": weatherIcons["../../assets/icons/weather/cloud-sun.svg"].default,
  drizzle: weatherIcons["../../assets/icons/weather/drizzle.svg"].default,
  fog: weatherIcons["../../assets/icons/weather/fog.svg"].default,
  moon: weatherIcons["../../assets/icons/weather/moon.svg"].default,
  rain: weatherIcons["../../assets/icons/weather/rain.svg"].default,
  snow: weatherIcons["../../assets/icons/weather/snow.svg"].default,
  storm: weatherIcons["../../assets/icons/weather/storm.svg"].default,
  sun: weatherIcons["../../assets/icons/weather/sun.svg"].default,
  "sun-cloud": weatherIcons["../../assets/icons/weather/sun-cloud.svg"].default,
  wind: weatherIcons["../../assets/icons/weather/wind.svg"].default,
  // Navigation
  bell: navigationIcons["../../assets/icons/navigation/bell.svg"].default,
  "chevron-down":
    navigationIcons["../../assets/icons/navigation/chevron-down.svg"].default,
  logout: navigationIcons["../../assets/icons/navigation/logout.svg"].default,
  pin: navigationIcons["../../assets/icons/navigation/pin.svg"].default,
  search: navigationIcons["../../assets/icons/navigation/search.svg"].default,
  send: navigationIcons["../../assets/icons/navigation/send.svg"].default,
  x: navigationIcons["../../assets/icons/navigation/x.svg"].default,
  // Weather stats
  droplet:
    weatherStatsIcons["../../assets/icons/weather-stats/droplet.svg"].default,
  gauge:
    weatherStatsIcons["../../assets/icons/weather-stats/gauge.svg"].default,
  thermometer:
    weatherStatsIcons["../../assets/icons/weather-stats/thermometer.svg"]
      .default,
  // General
  check: generalIcons["../../assets/icons/general/check.svg"].default,
  circle: generalIcons["../../assets/icons/general/circle.svg"].default,
  plus: generalIcons["../../assets/icons/general/plus.svg"].default,
};

type Props = {
  name: IconName;
  size?: number;
  className?: string;
};

export const Icon = ({ name, size = 20, className }: Props): ReactElement => {
  const SvgIcon = iconMap[name];
  return <SvgIcon width={size} height={size} className={className} />;
};
