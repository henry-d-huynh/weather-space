import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { WeatherData } from "@weather-space/shared";
import { type Loadable, LOADABLE_STATUS } from "../../../types/loadable.type";
import { weatherService } from "../services/weather.service";

type WeatherState = {
  selectedCity: string;
  weatherData: Loadable<WeatherData>;
};

const initialState: WeatherState = {
  selectedCity: "Melbourne", // Realistically we'd be using the user's geolocation using a custom hook
  weatherData: {
    status: LOADABLE_STATUS.IDLE,
  },
};

const fetchWeatherThunk = createAsyncThunk<WeatherData, string>(
  "weather/fetch",
  async (city, { rejectWithValue }) => {
    const result = await weatherService.getWeatherByCity(city);

    if (!result.success) {
      return rejectWithValue(result.errorMessage);
    }

    return result.data;
  },
);

const slice = createSlice({
  name: "weather",
  initialState: initialState as WeatherState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<string>) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherThunk.pending, (state) => {
        state.weatherData = { status: LOADABLE_STATUS.LOADING };
      })
      .addCase(fetchWeatherThunk.fulfilled, (state, action) => {
        state.weatherData = {
          status: LOADABLE_STATUS.LOADED,
          data: action.payload,
        };
      })
      .addCase(fetchWeatherThunk.rejected, (state, action) => {
        state.weatherData = {
          status: LOADABLE_STATUS.ERROR,
          error: action.error.message,
        };
      });
  },
});

const getSelectedCity = (state: WeatherState) => state.selectedCity;
const getWeatherData = (state: WeatherState) => state.weatherData;

export const weatherSlice = {
  reducer: slice.reducer,
  actions: {
    ...slice.actions,
    fetchWeatherThunk,
  },
  selectors: {
    getSelectedCity,
    getWeatherData,
  },
};
