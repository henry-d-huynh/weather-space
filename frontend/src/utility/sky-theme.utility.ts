import type { WeatherTone } from "@weather-space/shared";

type SkyPhase = "day" | "night";
type SkyKey = `${WeatherTone}-${"d" | "n"}`;

type SkyGradient = {
  top: string;
  bottom: string;
  isDark: boolean;
};

type SkyTheme = Record<string, string>;

const gradients: Record<SkyKey, SkyGradient> = {
  "clear-d": { top: "#2f7fd1", bottom: "#a6d2f2", isDark: false },
  "clear-n": { top: "#0b1430", bottom: "#26406e", isDark: true },
  "cloud-d": { top: "#8294a6", bottom: "#bccad6", isDark: false },
  "cloud-n": { top: "#1a2430", bottom: "#34434f", isDark: true },
  "rain-d": { top: "#536472", bottom: "#8496a3", isDark: true },
  "rain-n": { top: "#141c25", bottom: "#2b3742", isDark: true },
  "snow-d": { top: "#ccd8e6", bottom: "#eef4fa", isDark: false },
  "snow-n": { top: "#3a4656", bottom: "#5b6a7d", isDark: true },
  "fog-d": { top: "#adb3ba", bottom: "#ced3d8", isDark: false },
  "fog-n": { top: "#24292f", bottom: "#3f4650", isDark: true },
  "storm-d": { top: "#171c27", bottom: "#2c3340", isDark: true },
  "storm-n": { top: "#10141d", bottom: "#262d39", isDark: true },
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
  "--elev": "0 22px 54px rgba(0,0,0,0.40)",
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
  "--elev": "0 22px 54px rgba(20,40,80,0.20)",
};

export function skyTheme(tone: WeatherTone, isDay: boolean): SkyTheme {
  const phase: SkyPhase = isDay ? "day" : "night";
  const key: SkyKey = `${tone}-${phase === "day" ? "d" : "n"}`;
  const gradient = gradients[key] ?? gradients["clear-d"];

  return {
    "--sky-top": gradient.top,
    "--sky-bottom": gradient.bottom,
    ...(gradient.isDark ? darkInk : lightInk),
  };
}

export const loginSkyTheme = skyTheme("clear", false);
