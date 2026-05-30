import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from "@weather-space/shared";

type WeatherState = {
  selectedCity: string;
  data: WeatherData | undefined;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: WeatherState = {
  selectedCity: "Melbourne", // Realistically we'd be using the user's geolocation using a custom hook
  data: undefined,
  isLoading: false,
  error: undefined,
};

const slice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.data = action.payload;
      state.error = undefined;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const getSelectedCity = (state: WeatherState) => state.selectedCity;
const getWeatherData = (state: WeatherState) => state.data;
const getIsLoading = (state: WeatherState) => state.isLoading;
const getError = (state: WeatherState) => state.error;

export const weatherSlice = {
  reducer: slice.reducer,
  actions: slice.actions,
  selectors: {
    getSelectedCity,
    getWeatherData,
    getIsLoading,
    getError,
  },
};
