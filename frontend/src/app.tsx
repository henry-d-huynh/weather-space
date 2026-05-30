import { useAppSelector } from "./store/hooks";
import { authSlice } from "./features/auth/store/auth.slice";
import { weatherSlice } from "./features/weather/store/weather.slice";
import { LOADABLE_STATUS } from "./types/loadable.type";
import { useWebSocket } from "./hooks/useWebSocket";
import { skyTheme, loginSkyTheme } from "./utility/sky-theme.utility";
import { SkyLayer } from "./components/layout/sky-layer";
import { weatherCodes } from "@weather-space/shared";
import styles from "./app.module.scss";

export const App = () => {
  const authState = useAppSelector((state) =>
    authSlice.selectors.getAuth(state.auth),
  );
  const weatherData = useAppSelector((state) =>
    weatherSlice.selectors.getWeatherData(state.weather),
  );
  const { subscribeToCity } = useWebSocket();

  const theme = (() => {
    if (authState.status !== LOADABLE_STATUS.LOADED) return loginSkyTheme;
    if (weatherData.status !== LOADABLE_STATUS.LOADED) return loginSkyTheme;
    const code = weatherCodes[weatherData.data.weatherCode];
    return skyTheme(code?.tone ?? "clear", weatherData.data.isDay);
  })();

  return (
    <div className={styles.app} style={theme as React.CSSProperties}>
      <SkyLayer />
      <div className={styles.content}>
        {authState.status !== LOADABLE_STATUS.LOADED ? (
          <div>Login page goes here</div>
        ) : (
          <div>Home page goes here</div>
        )}
      </div>
    </div>
  );
};
