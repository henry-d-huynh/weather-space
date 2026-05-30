import type { WeatherTone } from "@weather-space/shared";

type SkyPhase = "day" | "night";
type SkyKey = `${WeatherTone}-${"day" | "night"}`;

type SkyGradient = {
  top: string;
  bottom: string;
  isDark: boolean;
};

type SkyTheme = Record<string, string>;

const gradients: Record<SkyKey, SkyGradient> = {
  "clear-day": { top: "#2f7fd1", bottom: "#a6d2f2", isDark: false },
  "clear-night": { top: "#0b1430", bottom: "#26406e", isDark: true },
  "cloud-day": { top: "#8294a6", bottom: "#bccad6", isDark: false },
  "cloud-night": { top: "#1a2430", bottom: "#34434f", isDark: true },
  "rain-day": { top: "#536472", bottom: "#8496a3", isDark: true },
  "rain-night": { top: "#141c25", bottom: "#2b3742", isDark: true },
  "snow-day": { top: "#ccd8e6", bottom: "#eef4fa", isDark: false },
  "snow-night": { top: "#3a4656", bottom: "#5b6a7d", isDark: true },
  "fog-day": { top: "#adb3ba", bottom: "#ced3d8", isDark: false },
  "fog-night": { top: "#24292f", bottom: "#3f4650", isDark: true },
  "storm-day": { top: "#171c27", bottom: "#2c3340", isDark: true },
  "storm-night": { top: "#10141d", bottom: "#262d39", isDark: true },
};

const darkInk = {
  "--ink": "rgba(255,255,255,0.96)",
  "--ink-soft": "rgba(255,255,255,0.70)",
  "--ink-faint": "rgba(255,255,255,0.42)",
  "--hair": "rgba(255,255,255,0.16)",
  "--panel": "rgba(255,255,255,0.08)",
  "--panel-2": "rgba(255,255,255,0.14)",
  "--panel-border": "rgba(255,255,255,0.20)",
  "--on-ink": "#10151f",
  "--elevation-shadow": "0 22px 54px rgba(0,0,0,0.40)",
};

const lightInk = {
  "--ink": "rgba(15,22,33,0.93)",
  "--ink-soft": "rgba(15,22,33,0.62)",
  "--ink-faint": "rgba(15,22,33,0.40)",
  "--hair": "rgba(15,22,33,0.14)",
  "--panel": "rgba(255,255,255,0.44)",
  "--panel-2": "rgba(255,255,255,0.66)",
  "--panel-border": "rgba(255,255,255,0.76)",
  "--on-ink": "#fbfdff",
  "--elevation-shadow": "0 22px 54px rgba(20,40,80,0.20)",
};

export function skyTheme(tone: WeatherTone, isDay: boolean): SkyTheme {
  const phase: SkyPhase = isDay ? "day" : "night";
  const key: SkyKey = `${tone}-${phase}`;
  const gradient = gradients[key] ?? gradients["clear-day"];

  return {
    "--sky-top": gradient.top,
    "--sky-bottom": gradient.bottom,
    ...(gradient.isDark ? darkInk : lightInk),
  };
}

export const loginSkyTheme = skyTheme("clear", false);
